# -*- coding: utf-8 -*-
"""
15박 16일 유럽 여행 스케줄러 - SQLite DB REST API Server
"""

import http.server
import socketserver
import json
import sqlite3
import os
import urllib.parse

PORT = 8085
DB_FILE = os.path.join(os.path.dirname(__file__), 'europe_travel.db')

def init_db():
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()

    cursor.execute('DROP TABLE IF EXISTS schedule')

    # 1. Schedule Table
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
            lng REAL,
            waypoints_json TEXT
        )
    ''')

    # 2. Bookings Table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS bookings (
            id TEXT PRIMARY KEY,
            type TEXT,
            type_name TEXT,
            title TEXT,
            meta TEXT,
            code TEXT,
            passengers TEXT,
            details TEXT,
            voucher_tip TEXT,
            pdf_path TEXT
        )
    ''')

    # 3. Routes Table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS saved_routes (
            id TEXT PRIMARY KEY,
            category TEXT,
            title TEXT,
            desc TEXT,
            url TEXT
        )
    ''')

    # 4. City Guides Table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS city_guides (
            city_key TEXT PRIMARY KEY,
            name TEXT,
            subtitle TEXT,
            spots_json TEXT,
            foods_json TEXT
        )
    ''')

    # 5. Checklist Table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS checklist (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            category TEXT,
            item_text TEXT,
            is_checked INTEGER
        )
    ''')

    # 6. Expenses Table (New Feature: DB Expense Log & Split Bill)
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

    # Always ensure tables are seeded
    seed_db(conn)

    conn.close()

def seed_db(conn):
    cursor = conn.cursor()
    cursor.execute('DELETE FROM schedule')
    cursor.execute('DELETE FROM bookings')
    cursor.execute('DELETE FROM saved_routes')

    # Initial Schedule Data
    schedules = [
        ("2026-09-23", "09/23 (수)", 9, 23, "수", "부다페스트", "🛫 인천 출발 ➔ 부다페스트 도착", "아시아나 OZ547 (12:35 인천 출발 ➔ 18:05 부다페스트 도착, 12시간 30분 비행)", "ibis Styles Budapest Airport (1박)", '["flight", "hotel"]', "theme-flight", "아시아나 OZ547 / 이비스 1764625360", "18:05 공항 도착 후 도보로 공항 바로 앞 이비스 스타일스 호텔 체크인.", 47.4979, 19.0402, '[{"name":"1. 🛫 인천국제공항 T2 (OZ547 출발)","lat":37.4602,"lng":126.4407,"desc":"12:35 아시아나 OZ547 탑승"},{"name":"2. 🛬 부다페스트 공항 T2","lat":47.4369,"lng":19.2556,"desc":"18:05 부다페스트 도착 & 입국"},{"name":"3. 🏨 ibis Styles Budapest Airport","lat":47.4390,"lng":19.2590,"desc":"공항 앞 이비스 호텔 도보 체크인"}]'),
        ("2026-09-24", "09/24 (목)", 9, 24, "목", "부다페스트 ➔ 트레비소 ➔ 코르티나 담페초", "🛫 부다페스트 ➔ 트레비소 (라이언에어 FR4305) & 🚗 렌터카 수령", "라이언에어 FR4305 (11:10 부다페스트 ➔ 12:35 트레비소 공항 도착)\n13:30 트레비소 공항 렌터카(Sicily By Car) 픽업 후 돌로미티 이동", "Best Western Hotel Nevada (1박/총2박)", '["flight", "car", "hotel"]', "theme-flight", "라이언에어 FR4305(Y1FBSF) / 렌터카 IT588376222 / HH2636095198", "부다페스트 11:10 출발 라이언에어 탑승 ➔ 12:35 트레비소 도착 후 13:30 렌터카 수령.", 46.5369, 12.1357, '[{"name":"1. 🏨 ibis Styles Budapest Airport","lat":47.4390,"lng":19.2590,"desc":"09:30 체크아웃"},{"name":"2. 🛫 부다페스트 공항 T2","lat":47.4369,"lng":19.2556,"desc":"11:10 라이언에어 FR4305 탑승"},{"name":"3. 🛬 트레비소 공항 & 🚗 Sicily By Car","lat":45.6484,"lng":12.1944,"desc":"12:35 도착 & 렌터카 인수"},{"name":"4. 🏨 Best Western Hotel Nevada","lat":46.4636,"lng":12.1583,"desc":"코르티나 담페초 체크인"}]'),
        ("2026-09-25", "09/25 (금)", 9, 25, "금", "돌로미티 동부 (코르티나 담페초)", "⛰️ 트레치메 라바레도 트레킹 & 미주리나 호수", "🅿️ 트레치메 아우론조 산장 주차 예약 완료 (06:30 ~ 18:29 티켓 보유)\n돌로미티 동부 핵심 트레킹 (04°C~12°C 패딩/방풍의 필수)", "Best Western Hotel Nevada (2박/총2박)", '["car", "hotel"]', "theme-dolomites", "주차티켓 P26230761", "오전 06:30 예약 시간에 맞춰 아우론조 산장 주차장 입장.", 46.6186, 12.3017, '[{"name":"1. 🏨 Best Western Hotel Nevada","lat":46.4636,"lng":12.1583,"desc":"06:00 출발"},{"name":"2. ⛰️ 트레치메 라바레도 (아우론조 산장)","lat":46.6186,"lng":12.3017,"desc":"06:30 예약 주차장 입장 & 순환 트레킹"},{"name":"3. 🌊 미주리나 호수 (Lago di Misurina)","lat":46.5828,"lng":12.2544,"desc":"에메랄드 산정 호수 조망"},{"name":"4. 🏨 Best Western Hotel Nevada","lat":46.4636,"lng":12.1583,"desc":"숙소 복귀"}]'),
        ("2026-09-26", "09/26 (토)", 9, 26, "토", "코르티나 담페초 ➔ 발 가르데나", "🌊 브라이에스 호수 탐방 & 🚗 돌로미티 서부 이동", "아침 08:30 브라이에스 호수 에메랄드빛 산책 ➔ 서부 셀바 디 발 가르데나 이동", "Hotel Eda (1박/총3박)", '["hotel", "car"]', "theme-dolomites", "Hotel Eda (5658.440.161 / PIN 3285)", "체크인 14:30 ~ 19:00 사이 진행.", 46.5556, 11.7584, '[{"name":"1. 🏨 Best Western Hotel Nevada","lat":46.4636,"lng":12.1583,"desc":"08:00 체크아웃"},{"name":"2. 🌊 브라이에스 호수 (Lago di Braies)","lat":46.6947,"lng":12.0854,"desc":"08:30 호수 산책 & 보트 체험"},{"name":"3. ⛰️ 파소 지아우 (Passo Giau 2,236m)","lat":46.4825,"lng":12.0536,"desc":"알프스 360도 드라이빙"},{"name":"4. 🏨 Hotel Eda (발 가르데나 셀바)","lat":46.5556,"lng":11.7584,"desc":"돌로미티 서부 3박 체크인"}]'),
        ("2026-09-27", "09/27 (일)", 9, 27, "일", "돌로미티 서부 (발 가르데나)", "🏔️ 세체다 절벽 & 🌲 알페 디 시우시 고원 휴양", "오전 09:00 세체다 케이블카 ➔ 오후 14:00 유럽 최대 고원 알페 디 시우시 산책", "Hotel Eda (2박/총3박)", '["hotel"]', "theme-dolomites", "Hotel Eda (5658.440.161)", "조식 포함. 세체다 오전 구름 없는 타임 탑승.", 46.5983, 11.7244, '[{"name":"1. 🏨 Hotel Eda","lat":46.5556,"lng":11.7584,"desc":"08:30 출발"},{"name":"2. 🏔️ 오르티세이 세체다 케이블카 (2,500m)","lat":46.5756,"lng":11.6742,"desc":"세체다 악마의 척추 절벽"},{"name":"3. 🌲 알페 디 시우시 (Alpe di Siusi)","lat":46.5700,"lng":11.6700,"desc":"유럽 최대 푸른 고원 산책"},{"name":"4. ⛪ 산 지오반니 교회","lat":46.6385,"lng":11.7236,"desc":"암봉 배경 엽서 포토존"},{"name":"5. 🏨 Hotel Eda","lat":46.5556,"lng":11.7584,"desc":"숙소 복귀"}]'),
        ("2026-09-28", "09/28 (월)", 9, 28, "월", "돌로미티 서부 (발 가르데나)", "🏔️ 돌로미티 주요 패스 드라이빙", "파소 가르데나(Passo Gardena), 파소 세일라 등 돌로미티 알프스 패스 드라이빙 코스 탐방", "Hotel Eda (3박/총3박)", '["hotel", "car"]', "theme-dolomites", "Hotel Eda (5658.440.161)", "렌터카 반납 전 주유 상태 점검.", 46.5494, 11.8086, '[{"name":"1. 🏨 Hotel Eda","lat":46.5556,"lng":11.7584,"desc":"09:30 패스 드라이빙 출발"},{"name":"2. 🏔️ 파소 가르데나 (Passo Gardena)","lat":46.5494,"lng":11.8086,"desc":"알프스 굽이길 드라이브"},{"name":"3. 🏔️ 파소 세일라 (Passo Sella)","lat":46.5083,"lng":11.7575,"desc":"웅장한 고산 패스 조망"},{"name":"4. 🏨 Hotel Eda","lat":46.5556,"lng":11.7584,"desc":"숙소 복귀"}]'),
        ("2026-09-29", "09/29 (화)", 9, 29, "화", "트레비소 ➔ 베네치아 메스트레", "🚗 렌터카 반납 & 🛶 베네치아 이동", "10:00 트레비소 공항 렌터카 반납\n⚠️ 트레비소 공항 ➔ 베네치아 메스트레 (ATVO 셔틀버스 현장 표 구매 탑승)", "Anda Venice Hostel (1박/총2박)", '["pending", "hotel"]', "theme-venice", "Anda Venice (5380.194.531 / PIN 4874)", "트레비소 공항 반납 후 메스트레행 ATVO 버스표(약 €12) 현장 구매.", 45.4842, 12.2359, '[{"name":"1. 🏨 Hotel Eda","lat":46.5556,"lng":11.7584,"desc":"08:00 체크아웃"},{"name":"2. 🚗 트레비소 공항 렌터카 반납","lat":45.6484,"lng":12.1944,"desc":"10:00 만유 반납 & ATVO 버스 탑승"},{"name":"3. 🏨 Anda Venice Hostel (메스트레)","lat":45.4842,"lng":12.2359,"desc":"베네치아 숙소 체크인"}]'),
        ("2026-09-30", "09/30 (수)", 9, 30, "수", "베네치아 본섬 & 부라노섬", "🎭 베네치아 낭만 운하 관광", "바포레토 수상버스 이용 산마르코 광장, 리알토 다리, 탄식의 다리, 알록달록 부라노섬 탐방", "Anda Venice Hostel (2박/총2박)", '["hotel"]', "theme-venice", "Anda Venice (5380.194.531)", "메스트레역에서 본섬(산타루치아역)까지 기차로 10분 소요.", 45.4342, 12.3385, '[{"name":"1. 🏨 Anda Venice Hostel","lat":45.4842,"lng":12.2359,"desc":"09:00 출발"},{"name":"2. 🚆 베네치아 메스트레역","lat":45.4828,"lng":12.2330,"desc":"본섬 기차 10분 이동"},{"name":"3. ⛵ 산마르코 광장 & 탄식의 다리","lat":45.4342,"lng":12.3385,"desc":"수상버스 바포레토"},{"name":"4. 🌉 리알토 다리 (Rialto)","lat":45.4380,"lng":12.3358,"desc":"대운하 조망"},{"name":"5. 🎨 부라노섬 (Burano)","lat":45.4854,"lng":12.4167,"desc":"12번 바포레토 파스텔톤 마을"},{"name":"6. 🏨 Anda Venice Hostel","lat":45.4842,"lng":12.2359,"desc":"메스트레 복귀"}]'),
        ("2026-10-01", "10/01 (목)", 10, 1, "목", "베네치아 ➔ 로마", "🚆 베네치아 ➔ 로마 초고속 열차 이동", "이탈로 8905 (08:17 Venezia Mestre 출발 ➔ 12:10 Roma Termini 도착)\n로마 시내 콜로세움, 트레비 분수 탐방", "Bonavista inn (1박/총2박)", '["train", "hotel"]', "theme-rome", "이탈로 VE44SP / Bonavista 2608212305083885965", "로마 테르미니역 도착 후 숙소(Via Veneto 97) 체크인.", 41.9009, 12.4833, '[{"name":"1. 🏨 Anda Venice Hostel","lat":45.4842,"lng":12.2359,"desc":"07:45 체크아웃"},{"name":"2. 🚆 메스트레역 (이탈로 8905)","lat":45.4828,"lng":12.2330,"desc":"08:17 출발"},{"name":"3. 🚆 로마 테르미니역","lat":41.9009,"lng":12.5020,"desc":"12:10 로마 도착"},{"name":"4. 🏨 Bonavista inn (Via Veneto 97)","lat":41.9090,"lng":12.4920,"desc":"로마 숙소 체크인"},{"name":"5. ⛲ 트레비 분수 & 판테온","lat":41.9009,"lng":12.4833,"desc":"로마 시내 산책"},{"name":"6. 🏛️ 콜로세움 (Colosseum)","lat":41.8902,"lng":12.4922,"desc":"야경 조망"}]'),
        ("2026-10-02", "10/02 (금)", 10, 2, "금", "로마 / 바티칸 시국", "🇻🇦 바티칸 박물관 패스트트랙 가이드 투어", "07:40~09:40 오타비아노(Ottaviano)역 OKAIDI 매장 앞 미팅\n바티칸 박물관, 라파엘로의 방, 시스티나 경당, 성 베드로 대성당", "Bonavista inn (2박/총2박)", '["tour", "hotel"]', "theme-rome", "바티칸투어 UTT169357 (KLK4045845180)", "미팅 시각 5분 전까지 지정 장소 도착. 여권 실물 지참.", 41.9065, 12.4536, '[{"name":"1. 🏨 Bonavista inn","lat":41.9090,"lng":12.4920,"desc":"07:10 출발"},{"name":"2. 🚇 오타비아노역 OKAIDI 매장","lat":41.9085,"lng":12.4578,"desc":"07:40 가이드 미팅"},{"name":"3. 🇻🇦 바티칸 박물관 & 라파엘로의 방","lat":41.9065,"lng":12.4536,"desc":"패스트트랙 관람"},{"name":"4. 🇻🇦 성 베드로 대성당","lat":41.9022,"lng":12.4539,"desc":"대성당 내부 관람"},{"name":"5. ☕ Tazza d\'Oro & Giolitti 젤라또","lat":41.8986,"lng":12.4769,"desc":"로마 에스프레소"}]'),
        ("2026-10-03", "10/03 (토)", 10, 3, "토", "로마 ➔ 살레르노 ➔ 포시타노", "🚆 기차 & 🚢 남부 해안 페리 이동", "트랜이탈리아 Frecciarossa 8863 (08:56 로마 ➔ 10:37 살레르노 도착)\n⚠️ 살레르노 항구 ➔ 포시타노 (Travelmar 페리 현장/온라인 예매 탑승)", "Relais Il Sogno di Positano (1박/총2박)", '["train", "pending", "hotel"]', "theme-positano", "트랜이탈리아 PT9U45 / Hotels.com 73527180310662", "살레르노역에서 도보 10분 항구 이동 후 포시타노행 페리 탑승.", 40.6281, 14.4850, '[{"name":"1. 🏨 Bonavista inn","lat":41.9090,"lng":12.4920,"desc":"08:15 체크아웃"},{"name":"2. 🚆 로마 테르미니역","lat":41.9009,"lng":12.5020,"desc":"08:56 트랜이탈리아 탑승"},{"name":"3. 🚆 살레르노 기차역","lat":40.6750,"lng":14.7720,"desc":"10:37 도착"},{"name":"4. 🚢 살레르노 Molo Manfredi 항구","lat":40.6740,"lng":14.7570,"desc":"Travelmar 페리 탑승"},{"name":"5. 🚢 포시타노 항구","lat":40.6281,"lng":14.4850,"desc":"지중해 페리 도착"},{"name":"6. 🏨 Relais Il Sogno di Positano","lat":40.6310,"lng":14.4870,"desc":"오션뷰 숙소 체크인"}]'),
        ("2026-10-04", "10/04 (일)", 10, 4, "일", "포시타노 & 아말피 해안", "🌊 포시타노 & 아말피 해안 휴양", "지중해 절벽 마을 포시타노 골목길 산책, 아말피/라벨로 일일 관광", "Relais Il Sogno di Positano (2박/총2박)", '["hotel"]', "theme-positano", "Hotels.com 73527180310662", "체크아웃 10:00 이전.", 40.6508, 14.6114, '[{"name":"1. 🏨 Relais Il Sogno di Positano","lat":40.6310,"lng":14.4870,"desc":"09:30 출발"},{"name":"2. 🏖️ 포시타노 메인 비치","lat":40.6285,"lng":14.4855,"desc":"지중해 해변"},{"name":"3. ⛵ 아말피 마을 항구","lat":40.6340,"lng":14.6027,"desc":"아말피 골목 탐방"},{"name":"4. 🏛️ 라벨로 빌라 치임브로네","lat":40.6475,"lng":14.6114,"desc":"무한의 테라스 절벽 조망"},{"name":"5. 🏨 Relais Il Sogno di Positano","lat":40.6310,"lng":14.4870,"desc":"숙소 복귀"}]'),
        ("2026-10-05", "10/05 (월)", 10, 5, "월", "포시타노", "🌺 포시타노 오션뷰 럭셔리 휴식", "포시타노 내 숙소 이동 체크인, 테라스 오션뷰 프라이빗 감상 & 힐링", "Villa Rosa Positano (1박)", '["hotel"]', "theme-positano", "Villa Rosa (ERIC_27142947 / PIN 7C9lX)", "포시타노 내 Villa Rosa로 짐 이동 후 오션뷰 객실 투숙.", 40.6300, 14.5000, '[{"name":"1. 🏨 Relais Il Sogno di Positano","lat":40.6310,"lng":14.4870,"desc":"09:00 체크아웃"},{"name":"2. 🌅 신들의 길 (Sentiero degli Dei)","lat":40.6190,"lng":14.5020,"desc":"해안 트레킹"},{"name":"3. 🍸 Franco\'s Bar","lat":40.6295,"lng":14.4865,"desc":"석양 칵테일바"},{"name":"4. 🏨 Villa Rosa Positano","lat":40.6300,"lng":14.4860,"desc":"베란다 조식 오션뷰 호텔"}]'),
        ("2026-10-06", "10/06 (화)", 10, 6, "화", "포시타노 ➔ 나폴리 시내", "🍕 나폴리 이동 & 피자 맛집 탐방", "⚠️ 포시타노 ➔ 나폴리 이동 (직항 페리 또는 SITA 버스 + 소렌토 열차)\n나폴리 시내 U259 B&B 체크인 및 역사지구 관광", "U259 B&B (1박)", '["pending", "hotel"]', "theme-rome", "U259 B&B (1400828497803175 / PIN 2949)", "나폴리 B&B 체크인 13:30 이후.", 40.8518, 14.2681, '[{"name":"1. 🏨 Villa Rosa Positano","lat":40.6300,"lng":14.4860,"desc":"10:00 체크아웃"},{"name":"2. 🚢 포시타노 항구","lat":40.6281,"lng":14.4850,"desc":"나폴리 직항 페리 탑승"},{"name":"3. 🚢 나폴리 항구 (Molo Beverello)","lat":40.8350,"lng":14.2560,"desc":"도착"},{"name":"4. 🏨 U259 B&B","lat":40.8518,"lng":14.2681,"desc":"나폴리 숙소 체크인"},{"name":"5. 🍕 L\'Antica Pizzeria da Michele","lat":40.8498,"lng":14.2635,"desc":"정통 나폴리 피자 성지"},{"name":"6. 🏰 카스텔 델로보 (달걀성)","lat":40.8282,"lng":14.2476,"desc":"석양 항구 조망"}]'),
        ("2026-10-07", "10/07 (수)", 10, 7, "수", "나폴리 ➔ 부다페스트 ➔ 인천 귀국", "🛫 나폴리 출발 ➔ 부다페스트 환승 ➔ 인천", "위즈에어 W4 2360 (12:00 나폴리 ➔ 13:40 부다페스트 도착)\n아시아나 OZ548 (20:00 부다페스트 ➔ 다음날 13:35 인천 도착)", "✈️ 기내박 (In-Flight)", '["flight"]', "theme-flight", "WizzAir UQ2RPT / 아시아나 OZ548", "부다페스트 공항 대기시간 6시간 20분 여유.", 47.4369, 19.2556, '[{"name":"1. 🏨 U259 B&B","lat":40.8518,"lng":14.2681,"desc":"09:30 체크아웃"},{"name":"2. 🛫 나폴리 공항 (W4 2360)","lat":40.8860,"lng":14.2908,"desc":"12:00 위즈에어 탑승"},{"name":"3. 🛬 부다페스트 공항 T2B","lat":47.4369,"lng":19.2556,"desc":"13:40 도착 & 환승 대기"},{"name":"4. 🛫 부다페스트 공항 (OZ548)","lat":47.4369,"lng":19.2556,"desc":"20:00 아시아나 귀국 탑승"}]'),
        ("2026-10-08", "10/08 (목)", 10, 8, "목", "인천 국제공항", "🛬 인천 국제공항 도착 & 입국", "13:35 인천국제공항 T2 도착. 15박 16일 여행 성공적 종료! 🎉", "-", '["flight"]', "theme-flight", "OZ548", "귀국 완료.", 37.4602, 126.4407, '[{"name":"1. 🛫 기내 (In-Flight)","lat":47.4369,"lng":19.2556,"desc":"귀국 기내박"},{"name":"2. 🛬 인천국제공항 T2","lat":37.4602,"lng":126.4407,"desc":"13:35 귀국 입국 완료"}]')
    ]

    cursor.executemany('''
        INSERT INTO schedule (date, day_str, month, day, day_of_week, city, title, detail, hotel, category, theme, booking_ref, notes, lat, lng, waypoints_json)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', schedules)

    # Initial Bookings Data
    bookings = [
        ("b1", "flight", "국제선 항공권", "인천 ↔ 부다페스트 왕복 (아시아나)", "OZ547 (09/23 12:35 ICN ➔ BUD) / OZ548 (10/07 20:00 BUD ➔ ICN)", "예약번호: ED7MT8", "LEE/YOUNHO MR, MS KIM DAHYE", "· 인천공항 Terminal 2 이용 (2026년 1월부터 T2 운항)\n· 위탁수하물: 1인당 1PC (23kg) 포함\n· 결제 금액: ₩3,357,200 (성인 2인 왕복 총액 / 1인당 ₩1,678,600)", "탑승 24시간 전 아시아나 모바일 웹/앱을 통해 모바일 탑승권 온라인 체크인 가능.", "/vouchers/asiana_flight_voucher.pdf"),
        ("b2", "flight", "유럽내 항공권", "부다페스트 ➔ 트레비소 베네치아 (라이언에어)", "09/24 (목) 11:10 BUD 출발 ➔ 12:35 TSF 도착 (FR4305)", "예약번호: Y1FBSF", "Ms DAHYE KIM, Mr YOUNGHO LEE", "· 출발지: 부다페스트 공항 (BUD) ➔ 도착지: 트레비소 공항 (TSF)\n· 수하물: Ms Dahye Kim (23kg 위탁 수하물 1개 포함)\n· 결제 금액: 31,367.00 HUF", "라이언에어 전용 앱을 통해 모바일 탑승권을 미리 다운로드해야 함 (종이 티켓 출력본 비허용).", "/vouchers/ryanair_flight_voucher.pdf"),
        ("b3", "flight", "유럽내 항공권", "나폴리 ➔ 부다페스트 (위즈에어)", "10/07 (수) 12:00 NAP 출발 ➔ 13:40 BUD 도착 (W4 2360)", "예약코드: UQ2RPT", "MS Dahye Kim, MR Youngho Lee", "· 출발지: 나폴리 공항 (NAP) ➔ 도착지: 부다페스트 Terminal 2B (BUD)\n· 수하물: 32kg Checked-in bag 1개 포함\n· 결제 금액: 159.03 EUR", "출발 48시간 전 위즈에어 웹/앱에서 온라인 체크인 진행 필수.", "/vouchers/wizzair_flight_voucher.pdf"),
        ("b4", "hotel", "부다페스트 숙소", "ibis Styles Budapest Airport (1박)", "09/23 (수) 체크인 After 15:00 ~ 09/24 (목) 체크아웃 ~12:00", "예약번호: 1764625360", "YOUNGHO LEE (성인 2명)", "· 객실 유형: 스탠다드룸 (더블베드 1개)\n· 옵션: 무료 Wi-Fi\n· 예약처: 트립비토즈 (Tripbtoz)", "부다페스트 공항 터미널 도보 3분 거리에 위치하여 밤 도착 후 편리하게 투숙 가능.", "/vouchers/ibis_budapest_voucher.pdf"),
        ("b5", "car", "렌터카", "이탈리아 돌로미티 렌터카 (Sicily By Car)", "09/24 13:30 픽업 ~ 09/29 10:00 반납 (트레비소 공항 TSF)", "예약번호: IT588376222", "주 운전자: youngho lee", "· 차종: 이코노미 Opel Corsa 또는 동급 (자동변속기, 에어컨, 5인승)\n· 주행거리: 무제한 무료 킬로미터\n· 보증금/면책금: 픽업 시 €200.00 가승인", "카운터 인수 시 주 운전자 명의의 실물 신용카드, 국내 면허증, 국제 면허증, 여권 4종 필수 지참.", "/vouchers/rentacar_sicilybycar_voucher.pdf"),
        ("b6", "car", "산장 주차권", "트레치메 아우론조 산장 주차 예약", "09/25 (금) 06:30 ~ 18:29 주차 이용 확정", "티켓번호: P26230761", "차량 1대 (40.00 유로 결제 완료)", "· 장소: Tre Cime Rifugio Auronzo 주차장\n· 입차 예정 시간: 2026년 9월 25일 오전 6시 30분", "진입 바리어에서 주차 티켓 QR코드를 제시하여 빠른 통과 가능.", "/vouchers/auronzo_parking_voucher.pdf"),
        ("b7", "hotel", "돌로미티 동부 숙소", "Best Western Hotel Nevada (2박)", "09/24 (목) ~ 09/26 (토) (San Vito di Cadore / Cortina d'Ampezzo)", "예약번호: HH2636095198", "MS KIM DAHYE, MR ETC1 (성인 2명)", "· 객실: 1 King Bed Mountain View Shower Only\n· 식사: 조식 불포함\n· 예약처: 하나투어 (Hotelbeds 중개)", "체크인 시 하나투어 바우처 실물 또는 PDF 지참 필수.", "/vouchers/hotel_nevada_voucher.pdf"),
        ("b8", "hotel", "돌로미티 서부 숙소", "Hotel Eda (호텔 에다 - 3박)", "09/26 (토) 14:30 체크인 ~ 09/29 (화) 10:00 체크아웃", "Confirm No: 5658.440.161 (PIN: 3285)", "Lee YoungHo (성인 2명)", "· 위치: Str. Plan 25, 39048 Selva di Val Gardena, Italy\n· 객실: 수페리어 더블룸 (초대형 더블침대 1개)\n· 식사: 조식 포함\n· 요금: €590.40 (도시세 불포함)", "18시 이후 늦은 체크인 시 50유로 추가 비용 발생할 수 있으므로 미리 도착 시간 통보 권장.", "/vouchers/hotel_eda_voucher_kr.pdf"),
        ("b9", "hotel", "베네치아 숙소", "Anda Venice Hostel (안다 베니스 - 2박)", "09/29 (화) 14:00 체크인 ~ 10/01 (목) 10:00 체크아웃", "Confirm No: 5380.194.531 (PIN: 4874)", "Lee Youngho, Youngho Lee (성인 2명)", "· 위치: Via Ortigara, 10, 30171 Mestre, Italy\n· 객실: 6베드 혼성 도미토리룸 내 침대 2개\n· 요금: €117.43 (도시세 1인 1박 €1.40 불포함)", "메스트레역 도보 3분 거리에 위치. 개인 수건 미지참 시 현장에서 5유로 렌탈 가능.", "/vouchers/anda_venice_voucher.pdf"),
        ("b10", "train", "초고속 열차", "베네치아 메스트레 ➔ 로마 테르미니 (이탈로)", "10/01 (목) 08:17 Venezia Mestre 출발 ➔ 12:10 Roma Termini 도착", "티켓코드: VE44SP", "Dahye Kim (7호차 15석), Youngho Lee (7호차 16석)", "· 열차편: Italo 8905 (Ambience Smart Fare Economy)\n· 비고: 승차 시 승무원 요청 시 스마트폰 이티켓 화면 제시", "메스트레역 플랫폼 탑승 전 타임테이블 화면에서 전광판 열차 번호(8905) 확인.", "/vouchers/italo_train_voucher.pdf"),
        ("b11", "hotel", "로마 숙소", "Bonavista inn (로마 - 2박)", "10/01 (목) 체크인 ~ 10/03 (토) 체크아웃", "예약번호: 2608212305083885965", "YoungHo Lee (성인 2명)", "· 주소: 97 Corso d'Italia, Via Veneto, Roma, 00187, Italy\n· 객실: Classic Triple Room (NonSmoke, LargeBed)\n· 옵션: 익스프레스 체크인, 조식 포함, 무료 Wi-Fi\n· 현지 지불 요금: 세금 및 봉사료 KRW 39,080 현장 결제", "로마 테르미니역에서 버스 또는 택시로 10분 거리에 위치.", "/vouchers/bonavista_rome_voucher.pdf"),
        ("b12", "tour", "가이드 투어", "로마 바티칸 박물관 패스트트랙 가이드 투어", "10/02 (금) 07:40 ~ 09:40 미팅 (바티칸 오전 투어)", "바우처 No: KLK4045845180 (UTT169357)", "LEE YOUNGHO / 대표 예약자: 김다혜 (성인 2명)", "· 미팅 장소: Ottaviano 지하철역 근처 'OKAIDI' 아동복 매장 앞 (Via Ottaviano 120-124)\n· 코스: 피나코테카 ➔ 솔방울정원 ➔ 지도의 방 ➔ 라파엘로의 방 ➔ 시스티나 경당 ➔ 성 베드로 대성당", "정확한 미팅 시각은 투어 전날 현지 시간 오전 중 오픈되는 카카오톡 단톡방에서 안내되므로 단톡방 확인 필수!", "/vouchers/vatican_tour_voucher.pdf"),
        ("b13", "train", "초고속 열차", "로마 테르미니 ➔ 살레르노 (트랜이탈리아)", "10/03 (토) 08:56 Roma Termini 출발 ➔ 10:37 Salerno 도착", "PNR: PT9U45", "Dahye Kim (10호차 5D), Youngho Lee (10호차 6D)", "· 열차편: Frecciarossa 8863 (2° Standard Economy)\n· 결제 금액: €43.90 x 2명 = €87.80", "살레르노역 도착 후 도보 10분거리 선착장에서 포시타노행 Travelmar 페리 연결 가능.", "/vouchers/trenitalia_train_voucher.pdf"),
        ("b14", "hotel", "포시타노 숙소 1", "Relais Il Sogno di Positano (2박)", "10/03 (토) 15:00 체크인 ~ 10/05 (월) 10:00 체크아웃", "일정번호: 73527180310662", "Lee YoungHo (성인 2명)", "· 주소: 46 Via Liparlati, Positano, SA, 84017, Italy\n· 객실: 패밀리 스튜디오, 바다 전망 (Ocean View)\n· 결제: Hotels.com ₩1,133,532 결제 완료 / 필수 도시세 €2.50 (1인 1박) 현지 결제", "프런트 데스크가 없는 숙소이므로 도착 72시간 전 숙소 측에 이메일/전화로 체크인 키 박스 정보 안내 요청 필수.", "/vouchers/relais_sogno_positano_voucher.pdf"),
        ("b15", "hotel", "포시타노 숙소 2", "Villa Rosa Positano (1박)", "10/05 (월) 체크인 ~ 10/06 (화) 체크아웃", "예약번호: ERIC_27142947 (PIN: 7C9lX)", "YoungHo Lee, Dahye Kim (성인 2명)", "· 주소: Via C. Colombo, 127, 84017 Positano (SA), Italy\n· 객실: Standard Vista Mare (테라스 바다 전망)\n· 요금: €350.00 (Bed & Breakfast 조식 포함)", "포시타노 절벽 마을의 대표적인 오션뷰 베란다 조식 제공 유명 호텔.", "/vouchers/villa_rosa_positano_voucher.pdf"),
        ("b16", "hotel", "나폴리 숙소", "U259 B&B (나폴리 - 1박)", "10/06 (화) 13:30 체크인 ~ 10/07 (수) 11:00 체크아웃", "예약번호: 1400828497803175 (PIN: 2949)", "lee Youngho (성인 2명)", "· 주소: Corso Umberto I, 259, 80138 Napoli, Italy\n· 객실: 스탠다드 더블룸 (퀸침대 1개, 10/7 조식 2인 포함)\n· 요금: EUR 144.50 현지 결제 (세금 EUR 12.14 포함)", "나폴리 중앙역 및 역사지구 접근성이 우수한 대로변 위치.", "/vouchers/u259_napoli_voucher.pdf")
    ]

    cursor.executemany('''
        INSERT OR REPLACE INTO bookings (id, type, type_name, title, meta, code, passengers, details, voucher_tip, pdf_path)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', bookings)

    cursor.execute('DELETE FROM city_guides')

    # Initial Routes Data
    routes = [
        ("r1", "돌로미티 드라이빙", "트레치메 라바레도 드라이빙 (코르티나 ➔ 아우론조 산장)", "코르티나 담페초에서 트레치메 라바레도 유료 도로 진입 및 산장 주차장까지 (약 45분)", "https://www.google.com/maps/dir/?api=1&origin=Cortina+d'Ampezzo,+Italy&destination=Rifugio+Auronzo,+Italy"),
        ("r2", "돌로미티 드라이빙", "돌로미티 동부 ➔ 서부 산악 드라이브 (코르티나 ➔ 발 가르데나)", "파소 파자레고 및 파소 가르데나를 경유하는 알프스 최고의 절경 드라이빙 코스 (약 1시간 20분)", "https://www.google.com/maps/dir/?api=1&origin=Cortina+d'Ampezzo,+Italy&destination=Selva+di+Val+Gardena,+Italy"),
        ("r3", "돌로미티 트레킹", "세체다 & 오르티세이 케이블카 이동 루트", "셀바 디 발 가르데나에서 오르티세이 세체다 케이블카 탑승장까지 (약 15분)", "https://www.google.com/maps/dir/?api=1&origin=Selva+di+Val+Gardena,+Italy&destination=Ortisei+Seceda+Cableway,+Italy"),
        ("r4", "돌로미티 트레킹", "알페 디 시우시 (Alpe di Siusi) 고원 접근 경로", "오르티세이에서 알페 디 시우시 케이블카 하부 승강장 이동 (약 12분)", "https://www.google.com/maps/dir/?api=1&origin=Ortisei,+Italy&destination=Alpe+di+Siusi+Cable+car,+Ortisei,+Italy"),
        ("r5", "도시 간 이동", "트레비소 공항 ➔ 코르티나 담페초 렌터카 드라이빙", "트레비소 공항(TSF)에서 A27 고속도로를 이용해 돌로미티 관문 코르티나로 (약 1시간 40분)", "https://www.google.com/maps/dir/?api=1&origin=Treviso+Airport,+Italy&destination=Cortina+d'Ampezzo,+Italy"),
        ("r6", "남부 해안 페리/드라이브", "살레르노 항구 ➔ 포시타노 해안 경로", "살레르노 페리 선착장에서 포시타노 항구까지 (Travelmar 페리 약 1시간 10분)", "https://www.google.com/maps/dir/?api=1&origin=Salerno,+Italy&destination=Positano,+Italy")
    ]

    cursor.executemany('''
        INSERT OR REPLACE INTO saved_routes (id, category, title, desc, url)
        VALUES (?, ?, ?, ?, ?)
    ''', routes)

    # Initial Expenses Seed Data (Pre-paid / Pre-booked Items)
    cursor.execute('DELETE FROM expenses')
    seed_expenses = [
        ("exp-01", "2026-09-23", "공동", "아시아나 국제선 왕복 항공권 (인천 ↔ 부다페스트 2인)", 3357200.0, "KRW", 3357200.0, "교통"),
        ("exp-02", "2026-09-23", "공동", "ibis Styles Budapest Airport 숙소 (부다페스트 1박)", 148000.0, "KRW", 148000.0, "숙소"),
        ("exp-03", "2026-09-24", "공동", "라이언에어 유럽내 항공권 (부다페스트 ➔ 트레비소 2인)", 31367.0, "HUF", 119200.0, "교통"),
        ("exp-04", "2026-09-24", "공동", "Sicily By Car 이탈리아 렌터카 (5일 대여)", 380000.0, "KRW", 380000.0, "교통"),
        ("exp-05", "2026-09-24", "공동", "Best Western Hotel Nevada 숙소 (코르티나 담페초 2박)", 420000.0, "KRW", 420000.0, "숙소"),
        ("exp-06", "2026-09-25", "공동", "트레치메 아우론조 산장 유료 도로 주차 티켓", 40.0, "EUR", 59200.0, "교통"),
        ("exp-07", "2026-09-26", "공동", "Hotel Eda 숙소 (발 가르데나 3박 / 조식 포함)", 590.40, "EUR", 873800.0, "숙소"),
        ("exp-08", "2026-09-29", "공동", "Anda Venice Hostel 숙소 (베네치아 메스트레 2박)", 117.43, "EUR", 173800.0, "숙소"),
        ("exp-09", "2026-10-01", "공동", "이탈로 초고속 열차 (베네치아 ➔ 로마 테르미니 2인)", 150000.0, "KRW", 150000.0, "교통"),
        ("exp-10", "2026-10-01", "공동", "Bonavista inn 숙소 (로마 2박 / 조식 포함)", 380000.0, "KRW", 380000.0, "숙소"),
        ("exp-11", "2026-10-02", "공동", "로마 바티칸 박물관 패스트트랙 가이드 투어 (2인)", 120000.0, "KRW", 120000.0, "티켓/관광"),
        ("exp-12", "2026-10-03", "공동", "트랜이탈리아 초고속 열차 (로마 ➔ 살레르노 2인)", 87.80, "EUR", 130000.0, "교통"),
        ("exp-13", "2026-10-03", "공동", "Relais Il Sogno di Positano 숙소 (포시타노 2박 오션뷰)", 1133532.0, "KRW", 1133532.0, "숙소"),
        ("exp-14", "2026-10-05", "공동", "Villa Rosa Positano 숙소 (포시타노 1박 오션뷰 베란다조식)", 350.00, "EUR", 518000.0, "숙소"),
        ("exp-15", "2026-10-06", "공동", "U259 B&B 숙소 (나폴리 1박 / 조식 포함)", 144.50, "EUR", 213860.0, "숙소"),
        ("exp-16", "2026-10-07", "공동", "위즈에어 유럽내 항공권 (나폴리 ➔ 부다페스트 2인)", 159.03, "EUR", 235400.0, "교통")
    ]
    cursor.executemany('''
        INSERT INTO expenses (id, date, payer, item, amount, currency, krw_amount, category)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ''', seed_expenses)

    conn.commit()

class RequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    def do_GET(self):

        parsed = urllib.parse.urlparse(self.path)
        
        if parsed.path == '/api/all-data':
            self.send_response(200)
            self.send_header('Content-type', 'application/json; charset=utf-8')
            self.end_headers()

            conn = sqlite3.connect(DB_FILE)
            conn.row_factory = sqlite3.Row
            cursor = conn.cursor()

            # Schedule
            cursor.execute('SELECT * FROM schedule ORDER BY id ASC')
            schedules = []
            for r in cursor.fetchall():
                item = dict(r)
                try:
                    item['category'] = json.loads(item['category'])
                except:
                    pass
                schedules.append(item)

            # Bookings
            cursor.execute('SELECT * FROM bookings')
            bookings = [dict(r) for r in cursor.fetchall()]

            # Saved Routes
            cursor.execute('SELECT * FROM saved_routes')
            routes = [dict(r) for r in cursor.fetchall()]

            # Expenses
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

        elif parsed.path == '/api/checklist':
            self.send_response(200)
            self.send_header('Content-type', 'application/json; charset=utf-8')
            self.end_headers()
            conn = sqlite3.connect(DB_FILE)
            cursor = conn.cursor()
            cursor.execute('CREATE TABLE IF NOT EXISTS checklist_state (id INTEGER PRIMARY KEY, indices_json TEXT)')
            cursor.execute('SELECT indices_json FROM checklist_state WHERE id = 1')
            row = cursor.fetchone()
            conn.close()
            indices = json.loads(row[0]) if row and row[0] else []
            self.wfile.write(json.dumps({"indices": indices}).encode('utf-8'))
            return

        elif parsed.path == '/api/custom-checklist':
            self.send_response(200)
            self.send_header('Content-type', 'application/json; charset=utf-8')
            self.end_headers()
            conn = sqlite3.connect(DB_FILE)
            conn.row_factory = sqlite3.Row
            cursor = conn.cursor()
            cursor.execute('CREATE TABLE IF NOT EXISTS custom_checklist (id TEXT PRIMARY KEY, card_idx INTEGER, text TEXT, checked INTEGER)')
            cursor.execute('SELECT * FROM custom_checklist')
            rows = [dict(r) for r in cursor.fetchall()]
            conn.close()
            self.wfile.write(json.dumps(rows, ensure_ascii=False).encode('utf-8'))
            return

        return super().do_GET()

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        content_length = int(self.headers.get('Content-Length', 0))
        post_data = self.rfile.read(content_length).decode('utf-8')

        if parsed.path == '/api/custom-checklist/save':
            try:
                data = json.loads(post_data)
                conn = sqlite3.connect(DB_FILE)
                cursor = conn.cursor()
                cursor.execute('CREATE TABLE IF NOT EXISTS custom_checklist (id TEXT PRIMARY KEY, card_idx INTEGER, text TEXT, checked INTEGER)')
                cursor.execute('''
                    INSERT OR REPLACE INTO custom_checklist (id, card_idx, text, checked)
                    VALUES (?, ?, ?, ?)
                ''', (data['id'], data['card_idx'], data['text'], 1 if data.get('checked') else 0))
                conn.commit()
                conn.close()
                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"status": "success"}).encode('utf-8'))
            except Exception as e:
                self.send_response(500)
                self.end_headers()
                self.wfile.write(str(e).encode('utf-8'))
            return

        elif parsed.path == '/api/custom-checklist/delete':
            try:
                data = json.loads(post_data)
                conn = sqlite3.connect(DB_FILE)
                cursor = conn.cursor()
                cursor.execute('DELETE FROM custom_checklist WHERE id = ?', (data['id'],))
                conn.commit()
                conn.close()
                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"status": "success"}).encode('utf-8'))
            except Exception as e:
                self.send_response(500)
                self.end_headers()
                self.wfile.write(str(e).encode('utf-8'))
            return

        if parsed.path == '/api/checklist':
            try:
                data = json.loads(post_data)
                indices_json = json.dumps(data.get('indices', []))
                conn = sqlite3.connect(DB_FILE)
                cursor = conn.cursor()
                cursor.execute('CREATE TABLE IF NOT EXISTS checklist_state (id INTEGER PRIMARY KEY, indices_json TEXT)')
                cursor.execute('INSERT OR REPLACE INTO checklist_state (id, indices_json) VALUES (1, ?)', (indices_json,))
                conn.commit()
                conn.close()
                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"status": "success"}).encode('utf-8'))
            except Exception as e:
                self.send_response(500)
                self.end_headers()
                self.wfile.write(str(e).encode('utf-8'))
            return

        if parsed.path == '/api/routes/add':
            try:
                data = json.loads(post_data)
                conn = sqlite3.connect(DB_FILE)
                cursor = conn.cursor()
                cursor.execute('''
                    INSERT INTO saved_routes (id, category, title, desc, url)
                    VALUES (?, ?, ?, ?, ?)
                ''', (data['id'], data['category'], data['title'], data['desc'], data['url']))
                conn.commit()
                conn.close()

                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"status": "success"}).encode('utf-8'))
            except Exception as e:
                self.send_response(500)
                self.end_headers()
                self.wfile.write(str(e).encode('utf-8'))
            return

        elif parsed.path == '/api/expenses/add':
            try:
                data = json.loads(post_data)
                conn = sqlite3.connect(DB_FILE)
                cursor = conn.cursor()
                cursor.execute('''
                    INSERT INTO expenses (id, date, payer, item, amount, currency, krw_amount, category)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                ''', (data['id'], data['date'], data['payer'], data['item'], data['amount'], data['currency'], data['krw_amount'], data['category']))
                conn.commit()
                conn.close()

                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"status": "success"}).encode('utf-8'))
            except Exception as e:
                self.send_response(500)
                self.end_headers()
                self.wfile.write(str(e).encode('utf-8'))
            return

        elif parsed.path == '/api/expenses/delete':
            try:
                data = json.loads(post_data)
                conn = sqlite3.connect(DB_FILE)
                cursor = conn.cursor()
                cursor.execute('DELETE FROM expenses WHERE id = ?', (data['id'],))
                conn.commit()
                conn.close()

                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"status": "success"}).encode('utf-8'))
            except Exception as e:
                self.send_response(500)
                self.end_headers()
                self.wfile.write(str(e).encode('utf-8'))
            return

        elif parsed.path == '/api/schedule/add':
            try:
                data = json.loads(post_data)
                conn = sqlite3.connect(DB_FILE)
                cursor = conn.cursor()
                wp_json = json.dumps(data.get('waypoints', [])) if isinstance(data.get('waypoints'), list) else data.get('waypoints_json', '[]')
                cursor.execute('''
                    INSERT INTO schedule (date, day_str, month, day, day_of_week, city, title, detail, hotel, category, theme, booking_ref, notes, lat, lng, waypoints_json)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                ''', (data.get('date',''), data.get('day_str',''), data.get('month',9), data.get('day',1), data.get('day_of_week','월'), data.get('city','부다페스트'), data.get('title',''), data.get('detail',''), data.get('hotel','-'), json.dumps(data.get('category',['tour'])), data.get('theme','theme-rome'), data.get('booking_ref','-'), data.get('notes',''), data.get('lat',47.4979), data.get('lng',19.0402), wp_json))
                conn.commit()
                conn.close()

                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"status": "success"}).encode('utf-8'))
            except Exception as e:
                self.send_response(500)
                self.end_headers()
                self.wfile.write(str(e).encode('utf-8'))
            return

        elif parsed.path == '/api/schedule/edit':
            try:
                data = json.loads(post_data)
                conn = sqlite3.connect(DB_FILE)
                cursor = conn.cursor()
                wp_json = json.dumps(data.get('waypoints', [])) if isinstance(data.get('waypoints'), list) else data.get('waypoints_json', '[]')
                cursor.execute('''
                    UPDATE schedule 
                    SET date=?, day_str=?, month=?, day=?, day_of_week=?, city=?, title=?, detail=?, hotel=?, category=?, theme=?, booking_ref=?, notes=?, lat=?, lng=?, waypoints_json=?
                    WHERE id=?
                ''', (data.get('date',''), data.get('day_str',''), data.get('month',9), data.get('day',1), data.get('day_of_week','월'), data.get('city',''), data.get('title',''), data.get('detail',''), data.get('hotel','-'), json.dumps(data.get('category',['tour'])), data.get('theme','theme-rome'), data.get('booking_ref','-'), data.get('notes',''), data.get('lat',47.4979), data.get('lng',19.0402), wp_json, data['id']))
                conn.commit()
                conn.close()

                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"status": "success"}).encode('utf-8'))
            except Exception as e:
                self.send_response(500)
                self.end_headers()
                self.wfile.write(str(e).encode('utf-8'))
            return

        elif parsed.path == '/api/schedule/delete':
            try:
                data = json.loads(post_data)
                conn = sqlite3.connect(DB_FILE)
                cursor = conn.cursor()
                cursor.execute('DELETE FROM schedule WHERE id = ?', (data['id'],))
                conn.commit()
                conn.close()

                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"status": "success"}).encode('utf-8'))
            except Exception as e:
                self.send_response(500)
                self.end_headers()
                self.wfile.write(str(e).encode('utf-8'))
            return

        self.send_error(404, "Endpoint not found")

if __name__ == '__main__':
    init_db()
    print(f"Server starting on http://localhost:{PORT} with SQLite DB support...")
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), RequestHandler) as httpd:
        httpd.serve_forever()

