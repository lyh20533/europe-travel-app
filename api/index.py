# -*- coding: utf-8 -*-
"""
Vercel Serverless API Handler for Europe Travel WebApp
"""

import http.server
import json
import sqlite3
import os
import urllib.parse

DB_FILE = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'europe_travel.db')

def init_db():
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()

    cursor.execute('''
        CREATE TABLE IF NOT EXISTS schedule (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            date TEXT,
            day_str TEXT,
            month INTEGER,
            day INTEGER,
            day_of_week TEXT,
            city TEXT,
            title TEXT,
            detail TEXT,
            hotel TEXT,
            category TEXT,
            theme TEXT,
            booking_ref TEXT,
            notes TEXT,
            lat REAL,
            lng REAL
        )
    ''')

    cursor.execute('''
        CREATE TABLE IF NOT EXISTS bookings (
            id TEXT PRIMARY KEY,
            title TEXT,
            type TEXT,
            date TEXT,
            time TEXT,
            ref_no TEXT,
            status TEXT,
            cost TEXT,
            notes TEXT
        )
    ''')

    cursor.execute('''
        CREATE TABLE IF NOT EXISTS saved_routes (
            id TEXT PRIMARY KEY,
            category TEXT,
            title TEXT,
            desc TEXT,
            url TEXT
        )
    ''')

    cursor.execute('''
        CREATE TABLE IF NOT EXISTS expenses (
            id TEXT PRIMARY KEY,
            date TEXT,
            payer TEXT,
            item TEXT,
            amount REAL,
            currency TEXT,
            krw_amount REAL,
            category TEXT
        )
    ''')

    conn.commit()
    conn.close()

class handler(http.server.BaseHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_GET(self):
        init_db()
        parsed = urllib.parse.urlparse(self.path)

        if parsed.path.endswith('/all-data') or parsed.path.endswith('/all-data/'):
            self.send_response(200)
            self.send_header('Content-type', 'application/json; charset=utf-8')
            self.end_headers()

            conn = sqlite3.connect(DB_FILE)
            conn.row_factory = sqlite3.Row
            cursor = conn.cursor()

            cursor.execute('SELECT * FROM schedule ORDER BY id ASC')
            schedules = []
            for r in cursor.fetchall():
                item = dict(r)
                try:
                    item['category'] = json.loads(item['category'])
                except:
                    pass
                schedules.append(item)

            cursor.execute('SELECT * FROM bookings')
            bookings = [dict(r) for r in cursor.fetchall()]

            cursor.execute('SELECT * FROM saved_routes')
            routes = [dict(r) for r in cursor.fetchall()]

            cursor.execute('SELECT * FROM expenses ORDER BY date DESC, id DESC')
            expenses = [dict(r) for r in cursor.fetchall()]

            conn.close()

            response_data = {
                "schedule": schedules,
                "bookings": bookings,
                "routes": routes,
                "expenses": expenses
            }

            self.wfile.write(json.dumps(response_data, ensure_ascii=False).encode('utf-8'))
            return

        self.send_response(404)
        self.end_headers()
        self.wfile.write(b'{"error": "Not Found"}')

    def do_POST(self):
        init_db()
        parsed = urllib.parse.urlparse(self.path)
        content_length = int(self.headers.get('Content-Length', 0))
        post_data = self.rfile.read(content_length).decode('utf-8')

        if parsed.path.endswith('/routes/add'):
            try:
                data = json.loads(post_data)
                conn = sqlite3.connect(DB_FILE)
                cursor = conn.cursor()
                cursor.execute('''
                    INSERT INTO saved_routes (id, category, title, desc, url)
                    VALUES (?, ?, ?, ?, ?)
                ''', (data.get('id'), data.get('category'), data.get('title'), data.get('desc'), data.get('url')))
                conn.commit()
                conn.close()

                self.send_response(200)
                self.send_header('Content-type', 'application/json; charset=utf-8')
                self.end_headers()
                self.wfile.write(json.dumps({"status": "success"}).encode('utf-8'))
            except Exception as e:
                self.send_response(500)
                self.end_headers()
                self.wfile.write(json.dumps({"error": str(e)}).encode('utf-8'))
            return

        if parsed.path.endswith('/expenses/add'):
            try:
                data = json.loads(post_data)
                conn = sqlite3.connect(DB_FILE)
                cursor = conn.cursor()
                cursor.execute('''
                    INSERT INTO expenses (id, date, payer, item, amount, currency, krw_amount, category)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                ''', (
                    data.get('id'), data.get('date'), data.get('payer'), data.get('item'),
                    float(data.get('amount', 0)), data.get('currency'), float(data.get('krw_amount', 0)),
                    data.get('category')
                ))
                conn.commit()
                conn.close()

                self.send_response(200)
                self.send_header('Content-type', 'application/json; charset=utf-8')
                self.end_headers()
                self.wfile.write(json.dumps({"status": "success"}).encode('utf-8'))
            except Exception as e:
                self.send_response(500)
                self.end_headers()
                self.wfile.write(json.dumps({"error": str(e)}).encode('utf-8'))
            return

        self.send_response(404)
        self.end_headers()
        self.wfile.write(b'{"error": "Not Found"}')
