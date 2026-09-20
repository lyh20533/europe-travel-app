// =========================================================
// 15박 16일 유럽 여행 스케줄러 - JavaScript Engine (v6.0 SQLite DB Integrated)
// =========================================================

let travelData = {
  tripInfo: {
    title: "15박 16일 부다페스트 & 이탈리아 전일정",
    departure: "2026-09-23T12:35:00",
    travelers: ["이영호 (YoungHo Lee)", "김다혜 (Dahye Kim)"]
  },
  schedule: [],
  bookings: [],
  defaultRoutes: [],
  cityGuides: {
    budapest: {
      name: "부다페스트 (Budapest)",
      pillName: "🏰 부다페스트",
      subtitle: "다뉴브 강변의 낭만과 웅장한 국회의사당 야경 & 전통 온천",
      spots: [
        { title: "🏰 부다페스트 국회의사당 & 다뉴브 강변", rating: "⭐️ 4.9 / 5.0 (리뷰 45,000+)", hours: "⏰ 08:00 ~ 18:00", breakTime: "☕ 브레이크 타임: 없음", closedDays: "🚫 휴무일: 연중무휴 (국행사시 통제)", desc: "세계에서 가장 아름다운 야경 스팟. 겔레르트 언덕이나 다뉴브 강 유람선에서 보는 야경이 일품.", price: "🎟️ 입장료: 내부 13,000 HUF (약 ₩49,400) / 강변 야경 FREE" },
        { title: "🏛️ 세체니 온천 (Széchenyi Thermal Bath)", rating: "⭐️ 4.6 / 5.0 (리뷰 38,000+)", hours: "⏰ 09:00 ~ 20:00", breakTime: "☕ 브레이크 타임: 없음", closedDays: "🚫 휴무일: 연중무휴", desc: "유럽 최대 규모의 야외 노천 온천. 고풍스러운 야외 온천탕에서 즐기는 힐링과 체스 게임.", price: "🎟️ 입장료: 주중 10,500 HUF (약 ₩39,900) / 주말 11,500 HUF" },
        { title: "🌉 세체니 다리 & 어부의 요새 (Fisherman's Bastion)", rating: "⭐️ 4.8 / 5.0 (리뷰 32,000+)", hours: "⏰ 24시간 오픈 (상부 09:00~19:00)", breakTime: "☕ 브레이크 타임: 없음", closedDays: "🚫 휴무일: 연중무휴", desc: "부다 지구 어부의 요새 7개 탑 테라스에서 페스트 지구 국회의사당 전체 전경 조망.", price: "🎟️ 입장료: 상부 탑 1,200 HUF (약 ₩4,500, 19시 이후 무료) / 하부 FREE" },
        { title: "⛪ 성 이슈트반 대성당 (St. Stephen's Basilica)", rating: "⭐️ 4.7 / 5.0 (리뷰 28,000+)", hours: "⏰ 09:00 ~ 17:45", breakTime: "☕ 브레이크 타임: 없음", closedDays: "🚫 휴무일: 일요일 오전 미사시 내부제한", desc: "부다페스트 최대 성당. 파노라마 전망대 엘리베이터로 부다페스트 시내 360도 조망.", price: "🎟️ 입장료: 대성당 2,000 HUF / 파노라마 전망대 3,200 HUF" },
        { title: "🏰 부다 왕궁 & 겔레르트 언덕 (Buda Castle)", rating: "⭐️ 4.7 / 5.0 (리뷰 25,000+)", hours: "⏰ 24시간 외관 오픈 (미술관 10:00~18:00)", breakTime: "☕ 브레이크 타임: 없음", closedDays: "🚫 휴무일: 미술관 매주 월요일", desc: "부다페스트 시내가 한눈에 들어오는 언덕 위 영웅들의 궁전과 석양 스팟.", price: "🎟️ 입장료: 정원/외관 FREE / 국립미술관 4,200 HUF" }
      ],
      foods: [
        { title: "🍲 Menzabistro (멘자 비스트로)", rating: "⭐️ 4.6 / 5.0 (리뷰 21,000+ / 한국인 1위)", hours: "⏰ 11:30 ~ 23:30", breakTime: "☕ 브레이크 타임: 없음", closedDays: "🚫 휴무일: 연중무휴", desc: "한국인 여행객 필수 코스! 깊은 풍미의 정통 굴라쉬 스튜와 부드러운 오리가슴살 스테이크 맛집.", price: "💶 예산: 굴라쉬 3,800 HUF (약 ₩14,400) / 오리고기 6,900 HUF" },
        { title: "🍷 Comme Chez Soi (콤 셰 소아)", rating: "⭐️ 4.8 / 5.0 (리뷰 6,500+ / 예약필수)", hours: "⏰ 12:00 ~ 23:00", breakTime: "☕ 15:30 ~ 18:00", closedDays: "🚫 휴무일: 매주 일요일/월요일", desc: "부다페스트 1위 비스트로. 최고의 푸아그라 스테이크, 트러플 파스타 및 환상적인 식전주 서비스.", price: "💶 예산: 푸아그라 €26.00 (약 ₩38,400) / 해산물 파스타 €18.00" },
        { title: "🍲 Gettó Gulyás (겟토 굴라쉬)", rating: "⭐️ 4.7 / 5.0 (리뷰 5,800+)", hours: "⏰ 12:00 ~ 23:00", breakTime: "☕ 브레이크 타임: 없음", closedDays: "🚫 휴무일: 연중무휴", desc: "유대인 지구 위치 정통 헝가리 집밥 굴라쉬와 소고기 푀젤렉 스튜 전문점.", price: "💶 예산: 소고기 굴라쉬 3,400 HUF (약 ₩12,900) / 닭고기 파프리카시 4,200 HUF" },
        { title: "🥩 Stand25 Bistro (스탠드25 비스트로)", rating: "⭐️ 4.7 / 5.0 (미슐랭 빕구르망)", hours: "⏰ 12:00 ~ 22:00", breakTime: "☕ 15:00 ~ 17:30", closedDays: "🚫 휴무일: 매주 일요일", desc: "미슐랭 셰프가 운영하는 가성비 최고 파인다이닝 비스트로. 헝가리 전통 요리의 현대적 재해석.", price: "💶 예산: 런치 3코스 12,500 HUF (약 ₩47,500)" },
        { title: "☕ New York Café Budapest (뉴욕 카페)", rating: "⭐️ 4.5 / 5.0 (리뷰 35,000+ / 세계최고화려)", hours: "⏰ 07:00 ~ 24:00", breakTime: "☕ 브레이크 타임: 없음", closedDays: "🚫 휴무일: 연중무휴", desc: "세계에서 가장 아름다운 궁전풍 카페. 24k 골드 라떼, 디저트 및 오케스트라 라이브 연주.", price: "☕ 예산: 24k 골드 라떼 4,900 HUF (약 ₩18,600) / 몽블랑 3,900 HUF" }
      ]
    },
    cortina: {
      name: "돌로미티 동부 (Cortina d'Ampezzo)",
      pillName: "⛰️ 돌로미티 동부 (코르티나)",
      subtitle: "알프스의 장엄한 암봉 트레치메 라바레도 & 에메랄드빛 산정 호수",
      spots: [
        { title: "⛰️ 트레치메 라바레도 (Tre Cime di Lavaredo)", rating: "⭐️ 4.9 / 5.0 (리뷰 18,000+)", hours: "⏰ 06:00 ~ 19:30 (조기 진입)", breakTime: "☕ 브레이크 타임: 없음", closedDays: "🚫 휴무일: 동계 도로통제 (5월~10월 오픈)", desc: "돌로미티의 상징 세 암봉. 아우론조 산장 주차장 입장 후 알프스 최고 360도 순환 트레킹.", price: "🎟️ 유료도로/주차: €40.00 (차량 1대당)" },
        { title: "🌊 브라이에스 호수 (Lago di Braies)", rating: "⭐️ 4.8 / 5.0 (리뷰 24,000+)", hours: "⏰ 24시간 오픈 (목조보트 09:00~17:00)", breakTime: "☕ 브레이크 타임: 없음", closedDays: "🚫 휴무일: 연중무휴", desc: "돌로미티 최고 에메랄드 빛 산정 호수. 물빛에 반사되는 산봉우리와 목조 보트 탑승 스팟.", price: "🎟️ 입장료: 호수 FREE / 통제주차 €15.00 / 목조 보트 30분 €35.00" },
        { title: "🏔️ 파소 지아우 (Passo Giau 2,236m)", rating: "⭐️ 4.9 / 5.0 (리뷰 12,000+)", hours: "⏰ 24시간 오픈 (추천 17:00~18:30 석양)", breakTime: "☕ 브레이크 타임: 없음", closedDays: "🚫 휴무일: 기상 악화 시 폭설 통제", desc: "360도 알프스 파노라마 절경과 영화 촬영지로 유명한 돌로미티 최고의 드라이빙 일몰 스팟.", price: "🎟️ 입장료: FREE (산악 드라이빙 도로 무료)" },
        { title: "🌊 미주리나 호수 (Lago di Misurina)", rating: "⭐️ 4.7 / 5.0 (리뷰 9,500+)", hours: "⏰ 24시간 오픈", breakTime: "☕ 브레이크 타임: 없음", closedDays: "🚫 휴무일: 연중무휴", desc: "트레치메 입구에 위치한 평화로운 호수. 호숫가 산책로 및 노란색 그랜드 호텔 반영 포토존.", price: "🎟️ 입장료: FREE / 호수 주차 €3.00/시간" },
        { title: "🏠 아우론조 산장 (Rifugio Auronzo)", rating: "⭐️ 4.8 / 5.0 (리뷰 7,200+)", hours: "⏰ 07:00 ~ 20:00", breakTime: "☕ 브레이크 타임: 없음", closedDays: "🚫 휴무일: 10월 중순~5월 동계 휴장", desc: "트레치메 라바레도 트레킹의 출발점. 고산 지대 파스타와 구운 소세지 산장 음식 레스토랑.", price: "🎟️ 이용 예산: 산악 파스타 €14.00 / 에스프레소 €2.00" }
      ],
      foods: [
        { title: "🥩 Osteria Baita Frizzi (바이타 프리치)", rating: "⭐️ 4.7 / 5.0 (한국인 산장 1위)", hours: "⏰ 12:00 ~ 15:00 / 19:00 ~ 22:00", breakTime: "☕ 15:00 ~ 19:00 (브레이크 필수)", closedDays: "🚫 휴무일: 매주 수요일", desc: "돌로미티 산악 스타일 사슴고기 파스타, 사슴 안심 스테이크 및 정통 소고기 굴라시 파스타 맛집.", price: "💶 메뉴 예산: 사슴 파스타 €16.00 (약 ₩23,600) / 사슴 스테이크 €24.00" },
        { title: "🍷 Ristorante Tivoli (티볼리 - 미슐랭 1스타)", rating: "⭐️ 4.8 / 5.0 (미슐랭 1스타)", hours: "⏰ 12:30 ~ 14:30 / 19:30 ~ 22:00", breakTime: "☕ 14:30 ~ 19:30", closedDays: "🚫 휴무일: 매주 화요일", desc: "코르티나 최고 고급 정통 파인다이닝. 제철 송로버섯(트러플) 파스타와 알프스 사슴 고기 디쉬.", price: "💶 메뉴 예산: 테이스팅 코스 €110.00 (약 ₩162,800) / 단품 €28.00" },
        { title: "🥩 La Tavernetta di Cortina (라 타베르네타)", rating: "⭐️ 4.6 / 5.0 (구글 리뷰 3,200+)", hours: "⏰ 12:00 ~ 15:00 / 19:00 ~ 22:30", breakTime: "☕ 15:00 ~ 19:00", closedDays: "🚫 휴무일: 매주 월요일", desc: "코르티나 시내 전통 오스테리아. 따뜻한 이탈리아 가정식 스테이크와 수제 뇨끼 전문점.", price: "💶 메뉴 예산: 수제 뇨끼 €15.00 / 티본 스테이크 €32.00" },
        { title: "☕ Café Pasticceria Alverà (알베라 카페)", rating: "⭐️ 4.7 / 5.0 (코르티나 1위 카페)", hours: "⏰ 07:30 ~ 20:00", breakTime: "☕ 브레이크 타임: 없음", closedDays: "🚫 휴무일: 연중무휴", desc: "코르티나 중심가 최고 케이크 & 아침 카푸치노 전문점. 알프스 베리 타르트 및 크루아상 명가.", price: "☕ 예산: 카푸치노 €2.50 (약 ₩3,700) / 베리 타르트 €5.00" },
        { title: "🥐 Embassy Pastry (엠버시 디저트)", rating: "⭐️ 4.6 / 5.0 (70년 역사 디저트)", hours: "⏰ 08:00 ~ 19:30", breakTime: "☕ 브레이크 타임: 없음", closedDays: "🚫 휴무일: 매주 목요일", desc: "코르티나 쇼핑 거리 명물 알프스 티롤 스타일 디저트 전문점. 사과 스트루델(Strudel) 명가.", price: "🍰 예산: 사과 스트루델 €4.50 (약 ₩6,600) / 에스프레소 €1.80" }
      ]
    },
    valgardena: {
      name: "돌로미티 서부 (Selva / Ortisei)",
      pillName: "🏔️ 돌로미티 서부 (오르티세이)",
      subtitle: "알프스 세체다의 칼날 절벽과 알페 디 시우시 광활한 초원",
      spots: [
        { title: "🏔️ 세체다 (Seceda 2,500m)", rating: "⭐️ 4.9 / 5.0 (리뷰 16,000+)", hours: "⏰ 케이블카 08:30 ~ 17:30", breakTime: "☕ 브레이크 타임: 없음", closedDays: "🚫 휴무일: 케이블카 점검 기간 (11월/4월)", desc: "악마의 척추라 불리는 날카로운 깎아지른 절벽 능선. 오르티세이 케이블카 타고 정상 직행.", price: "🎟️ 케이블카: 성인 왕복 €45.00 (약 ₩66,600)" },
        { title: "🌲 알페 디 시우시 (Alpe di Siusi)", rating: "⭐️ 4.9 / 5.0 (리뷰 22,000+)", hours: "⏰ 케이블카 08:30 ~ 17:00", breakTime: "☕ 브레이크 타임: 없음", closedDays: "🚫 휴무일: 케이블카 점검 기간 (11월/4월)", desc: "유럽 최대 높이의 야생화 푸른 고원 초원. 리프트 타고 산책하며 와인과 젤라또 즐기기.", price: "🎟️ 케이블카: 성인 왕복 €32.00 / 09~17시 승용차 통제" },
        { title: "⛪ 산 지오반니 교회 (Chiesetta di San Giovanni)", rating: "⭐️ 4.8 / 5.0 (리뷰 8,800+)", hours: "⏰ 24시간 외관 (내부 10:00~17:00)", breakTime: "☕ 브레이크 타임: 없음", closedDays: "🚫 휴무일: 연중무휴", desc: "람포이 암봉을 배경으로 넓은 푸른 초원 속 서있는 엽서 속 인생샷 최고의 포토존 스팟.", price: "🎟️ 입장료: 포토존 FREE / 내부 무인 게이트 €4.00" },
        { title: "🚠 오르티세이 마을 & 케이블카 승강장", rating: "⭐️ 4.7 / 5.0 (리뷰 11,000+)", hours: "⏰ 08:00 ~ 19:00", breakTime: "☕ 브레이크 타임: 없음", closedDays: "🚫 휴무일: 연중무휴", desc: "돌로미티 서부의 보석 같은 목조 산악 마을. 쇼핑과 산책, 맛있는 이탈리안 카페거리.", price: "🎟️ 마을 산책 FREE / 지하 유료 주차장 이용" },
        { title: "🏔️ 파소 가르데나 (Passo Gardena 2,121m)", rating: "⭐️ 4.9 / 5.0 (리뷰 7,500+)", hours: "⏰ 24시간 드라이빙 오픈", breakTime: "☕ 브레이크 타임: 없음", closedDays: "🚫 휴무일: 연중무휴 (폭설 시 도로통제)", desc: "셀바 마을에서 가르데나 산악 도로를 따라 펼쳐지는 웅장한 암봉 산악 파노라마 도로.", price: "🎟️ 입장료: FREE (산악 드라이빙 도로 무료)" }
      ],
      foods: [
        { title: "🍝 Ristorante L'Anker (셀바 앵커)", rating: "⭐️ 4.7 / 5.0 (리뷰 2,800+ / 한국인 추천)", hours: "⏰ 12:00 ~ 14:30 / 18:30 ~ 21:30", breakTime: "☕ 14:30 ~ 18:30", closedDays: "🚫 휴무일: 매주 화요일", desc: "셀바 마을 중심 위치 이탈리안 해산물 스파게티 및 블랙 트러플 뇨끼 최고 맛집.", price: "💶 메뉴 예산: 트러플 뇨끼 €17.50 (약 ₩25,900) / 라자냐 €16.00" },
        { title: "🍻 Suinsom (수인솜 - 미슐랭 가이드)", rating: "⭐️ 4.9 / 5.0 (미슐랭 럭셔리)", hours: "⏰ 19:30 ~ 22:00", breakTime: "☕ 디너 전용 영업", closedDays: "🚫 휴무일: 매주 월요일 (사전예약 필수)", desc: "미슐랭 가이드 등재 럭셔리 돌로미티 파인다이닝 레스토랑. 고산 지대 제철 요리 예술 코스.", price: "💶 메뉴 예산: 알프스 코스 디너 €130.00 (약 ₩192,400)" },
        { title: "🥩 Restaurant Tubladel (오르티세이 투블라델)", rating: "⭐️ 4.7 / 5.0 (리뷰 3,400+)", hours: "⏰ 12:00 ~ 14:00 / 18:30 ~ 22:00", breakTime: "☕ 14:00 ~ 18:30", closedDays: "🚫 휴무일: 매주 수요일", desc: "오르티세이 최고 인기의 나무 산장 분위기 스테이크하우스. 무쇠팬 티본 스테이크 및 퐁듀.", price: "💶 메뉴 예산: 티본 스테이크 1kg €75.00 / 수제 파스타 €18.00" },
        { title: "🍷 Baita Sofie Hütte (바이타 소피 와인 산장)", rating: "⭐️ 4.8 / 5.0 (세체다 정상 2,410m)", hours: "⏰ 08:30 ~ 17:00", breakTime: "☕ 브레이크 타임: 없음", closedDays: "🚫 휴무일: 동계 케이블카 휴장시", desc: "세체다 정상 2,410m 위치 유럽 최고 높이의 와인 산장. 절벽 테라스에서 감상하는 알프스 조망.", price: "🍷 예산: 돌로미티 고산 파스타 €18.00 (약 ₩26,600) / 와인 글라스 €6.00" },
        { title: "☕ Café Coster Ortisei (코스터 카페)", rating: "⭐️ 4.6 / 5.0 (오르티세이 중심가)", hours: "⏰ 07:00 ~ 20:00", breakTime: "☕ 브레이크 타임: 없음", closedDays: "🚫 휴무일: 연중무휴", desc: "오르티세이 광장 중심의 감성 테라스 에스프레소 & 아인슈페너 및 피스타치오 크루아상 전문점.", price: "☕ 예산: 아인슈페너 €4.50 (약 ₩6,600) / 피스타치오 크루아상 €2.20" }
      ]
    },
    venice: {
      name: "베네치아 (Venice)",
      pillName: "🛶 베네치아",
      subtitle: "물 위의 낭만 운하와 부라노섬의 알록달록 컬러",
      spots: [
        { title: "🛶 산마르코 광장 & 대성당 (Piazza San Marco)", rating: "⭐️ 4.8 / 5.0 (리뷰 85,000+)", hours: "⏰ 09:30 ~ 17:15 (대성당)", breakTime: "☕ 브레이크 타임: 없음", closedDays: "🚫 휴무일: 연중무휴 (미사시간 제한)", desc: "세계에서 가장 아름다운 응접실. 비잔틴 양식의 성당 내부 황금 모자이크 조망.", price: "🎟️ 입장료: 대성당 패스트트랙 €3.00 / 테라스 박물관 €10.00" },
        { title: "🎨 부라노섬 (Burano Island)", rating: "⭐️ 4.8 / 5.0 (리뷰 42,000+)", hours: "⏰ 24시간 오픈 (바포레토 12번 24시간)", breakTime: "☕ 브레이크 타임: 없음", closedDays: "🚫 휴무일: 연중무휴", desc: "알록달록 파스텔톤 알록달록 레이스 마을. 인생샷 사진 촬영 베네치아 최고의 스팟.", price: "🎟️ 바포레토: 24시간 교통 패스 €25.00 (약 ₩37,000)" },
        { title: "🌉 탄식의 다리 & 리알토 다리 (Rialto Bridge)", rating: "⭐️ 4.7 / 5.0 (리뷰 78,000+)", hours: "⏰ 24시간 오픈", breakTime: "☕ 브레이크 타임: 없음", closedDays: "🚫 휴무일: 연중무휴", desc: "대운하를 건너는 가장 오래되고 아름다운 석조 다리와 석양 곤돌라 포토존.", price: "🎟️ 입장료: 다리 전경 FREE / 곤돌라 30분 €90.00" },
        { title: "⛵ 산 조르조 마조레 종탑 (San Giorgio Maggiore)", rating: "⭐️ 4.9 / 5.0 (리뷰 14,000+ / 줄없음)", hours: "⏰ 09:00 ~ 19:00", breakTime: "☕ 브레이크 타임: 없음", closedDays: "🚫 휴무일: 연중무휴", desc: "산마르코 종탑 대기 없이 엘리베이터로 올라가 360도 베네치아 대운하 전체 조망.", price: "🎟️ 입장료: 엘리베이터 종탑 €8.00 (약 ₩11,800)" },
        { title: "🎨 페기 구겐하임 미술관 (Peggy Guggenheim)", rating: "⭐️ 4.7 / 5.0 (리뷰 18,000+)", hours: "⏰ 10:00 ~ 18:00", breakTime: "☕ 브레이크 타임: 없음", closedDays: "🚫 휴무일: 매주 화요일", desc: "대운하 변 피카소, 달리, 몬드리안 등 현대 미술 거장들의 작품을 모아놓은 전시장.", price: "🎟️ 입장료: 일반 €17.00" }
      ],
      foods: [
        { title: "🍝 Trattoria Al Gatto Nero (부라노 검은고양이)", rating: "⭐️ 4.7 / 5.0 (리뷰 4,200+ / 미슐랭 빕구르망)", hours: "⏰ 12:30 ~ 15:00 / 19:30 ~ 21:30", breakTime: "☕ 15:00 ~ 19:30", closedDays: "🚫 휴무일: 매주 월요일", desc: "부라노섬 최고의 명가. 베네치아 오징어 먹물 생면 파스타와 해산물 사프란 리소토 최고 존맛.", price: "💶 메뉴 예산: 먹물 파스타 €22.00 (약 ₩32,500) / 생선 리소토 €24.00" },
        { title: "🍝 Trattoria Bar Pontini (폰티니)", rating: "⭐️ 4.6 / 5.0 (리뷰 6,800+ / 한국인 1위)", hours: "⏰ 12:00 ~ 15:00 / 19:00 ~ 22:30", breakTime: "☕ 15:00 ~ 19:00", closedDays: "🚫 휴무일: 매주 일요일", desc: "리알토 근처 가성비 1위 생면 파스타 명가. 푸짐한 해산물 생면 파스타와 랍스터 파스타.", price: "💶 메뉴 예산: 해산물 생면 파스타 €16.00 (약 ₩23,600) / 랍스터 파스타 €22.00" },
        { title: "🍝 Trattoria Al Gazzettino (알 가제티노)", rating: "⭐️ 4.7 / 5.0 (리뷰 7,500+ / 디저트서비스)", hours: "⏰ 12:00 ~ 16:00 / 18:30 ~ 22:30", breakTime: "☕ 16:00 ~ 18:30", closedDays: "🚫 휴무일: 연중무휴", desc: "친절함과 맛 모두 갖춘 맛집. 해산물 파스타, 스테이크 주문 시 무제한 첼로주/티라미수 서비스.", price: "💶 메뉴 예산: 해산물 파스타 €18.00 / 소고기 스테이크 €26.00" },
        { title: "🎻 Caffè Florian (카페 플로리안 1720)", rating: "⭐️ 4.6 / 5.0 (1720년 창업 유럽 최초)", hours: "⏰ 09:00 ~ 23:00", breakTime: "☕ 브레이크 타임: 없음", closedDays: "🚫 휴무일: 연중무휴", desc: "1720년 창업 유럽 최초의 카페. 산마르코 광장 오케스트라 라이브 연주 들으며즐기는 에스프레소.", price: "☕ 예산: 에스프레소 €7.00 (약 ₩10,300) / 핫초코 €12.00 (음악차지 €6/인)" },
        { title: "☕ Rosa Salva (로사 살바 1879)", rating: "⭐️ 4.6 / 5.0 (현지인 최고 가성비)", hours: "⏰ 08:00 ~ 20:00", breakTime: "☕ 브레이크 타임: 없음", closedDays: "🚫 휴무일: 매주 일요일", desc: "베네치아 현지인들이 줄 서서 먹는 최고 가성비 에스프레소 & 정통 이탈리안 베이커리 명가.", price: "☕ 예산: 에스프레소 €1.50 (약 ₩2,200) / 부솔라이 과자 €2.00" }
      ]
    },
    rome: {
      name: "로마 & 바티칸 (Rome & Vatican)",
      pillName: "🏛️ 로마 & 바티칸",
      subtitle: "세계 역사의 숨결이 느껴지는 영원의 도시",
      spots: [
        { title: "🏛️ 콜로세움 & 포로 로마노 (Colosseum)", rating: "⭐️ 4.8 / 5.0 (리뷰 340,000+)", hours: "⏰ 08:30 ~ 19:15", breakTime: "☕ 브레이크 타임: 없음", closedDays: "🚫 휴무일: 1/1, 12/25", desc: "세계 7대 불가사의 2,000년 고대 로마제국 원형 경기장. 공식 홈페이지 사전 예약 필수.", price: "🎟️ 입장료: 콜로세움+포로로마노 통합권 €18.00 (약 ₩26,600)" },
        { title: "💦 트레비 분수 (Trevi Fountain)", rating: "⭐️ 4.8 / 5.0 (리뷰 380,000+)", hours: "⏰ 24시간 오픈 (청소시 수요일 오전제한)", breakTime: "☕ 브레이크 타임: 없음", closedDays: "🚫 휴무일: 연중무휴", desc: "동전을 한 번 던지면 로마로 다시 돌아온다는 신화의 바로크 양식 최고 분수. 야경 강추!", price: "🎟️ 입장료: FREE" },
        { title: "🏛️ 판테온 (Pantheon)", rating: "⭐️ 4.8 / 5.0 (리뷰 210,000+)", hours: "⏰ 09:00 ~ 19:00", breakTime: "☕ 브레이크 타임: 없음", closedDays: "🚫 휴무일: 연중무휴 (주말 공식예약 필수)", desc: "2,000년 전 건설된 완벽한 구형 돔 고대 로마 신전. 천장 구멍으로 들어오는 햇살 스팟.", price: "🎟️ 입장료: 일반 €5.00 (약 ₩7,400)" },
        { title: "🇻🇦 바티칸 박물관 & 성 베드로 대성당", rating: "⭐️ 4.8 / 5.0 (리뷰 180,000+)", hours: "⏰ 08:00 ~ 19:00 (여권 필수 지참)", breakTime: "☕ 브레이크 타임: 없음", closedDays: "🚫 휴무일: 매주 일요일 (마지막주 일요일 무료오픈)", desc: "시스티나 소성당 미켈란젤로 '천장화'와 '최후의 심판' 및 성 베드로 광장 조망.", price: "🎟️ 입장료: 박물관 패스트트랙 €25.00 / 대성당 FREE" },
        { title: "⛲ 나보나 광장 & 스페인 계단", rating: "⭐️ 4.7 / 5.0 (리뷰 150,000+)", hours: "⏰ 24시간 오픈", breakTime: "☕ 브레이크 타임: 없음", closedDays: "🚫 휴무일: 연중무휴", desc: "베르니니의 피우미 분수가 위치한 나보나 광장과 낭만적인 스페인 계단 젤라또 산책.", price: "🎟️ 입장료: FREE" }
      ],
      foods: [
        { title: "🍝 Tonnarello (톤나렐로 - 트라스테베레)", rating: "⭐️ 4.7 / 5.0 (리뷰 48,000+ / 줄서는 1위)", hours: "⏰ 11:30 ~ 23:30", breakTime: "☕ 브레이크 타임: 없음", closedDays: "🚫 휴무일: 연중무휴", desc: "로마 정통 생면 카초 에 페페(Cacio e Pepe) 및 정통 까르보나라, 소꼬리찜 줄 서는 1위 맛집.", price: "💶 메뉴 예산: 카초 에 페페 €11.50 (약 ₩17,000) / 소꼬리찜 €16.00" },
        { title: "🍝 Ristorante Da Enzo al 29 (다 엔초)", rating: "⭐️ 4.7 / 5.0 (리뷰 12,000+ / 현지인 1위)", hours: "⏰ 12:15 ~ 15:00 / 19:30 ~ 23:00", breakTime: "☕ 15:00 ~ 19:30 (브레이크 필수)", closedDays: "🚫 휴무일: 매주 일요일", desc: "트라스테베레 골목길에 위치한 현지인 추천 1위 정통 까르보나라 & 아티초크 튀김 명가.", price: "💶 메뉴 예산: 정통 까르보나라 €12.50 (약 ₩18,500) / 아티초크 튀김 €7.00" },
        { title: "🍝 Osteria Nannarella (난나렐라)", rating: "⭐️ 4.7 / 5.0 (리뷰 35,000+)", hours: "⏰ 11:30 ~ 23:30", breakTime: "☕ 브레이크 타임: 없음", closedDays: "🚫 휴무일: 연중무휴", desc: "수만 개 리뷰에도 높은 평점 유지! 미트볼 소스 생면 파스타와 화덕 피자가 맛있는 곳.", price: "💶 메뉴 예산: 미트볼 파스타 €12.00 / 로마식 피자 €11.00" },
        { title: "☕ Sant'Eustachio il Caffè (산 에우스타키오)", rating: "⭐️ 4.6 / 5.0 (1938년 장작 로스팅)", hours: "⏰ 07:30 ~ 00:30", breakTime: "☕ 브레이크 타임: 없음", closedDays: "🚫 휴무일: 연중무휴", desc: "1938년 창업 장작 로스팅 기법 로마 3대 에스프레소 카페. 크리미한 설탕 폼 에스프레소.", price: "☕ 예산: Gran Caffè €3.00 (약 ₩4,400) / 에스프레소 €1.50" },
        { title: "🍦 Giolitti (지올리티 1900)", rating: "⭐️ 4.6 / 5.0 (120년 역사 로마 3대 젤라또)", hours: "⏰ 07:30 ~ 01:00", breakTime: "☕ 브레이크 타임: 없음", closedDays: "🚫 휴무일: 연중무휴", desc: "120년 역사의 로마 3대 젤라또 명가. 쌀(Riso)과 수박, 피스타치오 맛 시그니처.", price: "🍦 예산: 젤라또 미디엄(3가지 맛) €4.00 (약 ₩5,900)" }
      ]
    },
    positano: {
      name: "포시타노 (Positano)",
      pillName: "🌊 포시타노",
      subtitle: "지중해 수직 절벽 위 럭셔리 휴양 마을과 아말피 해안",
      spots: [
        { title: "🏖️ 포시타노 메인 비치 (Spiaggia Grande)", rating: "⭐️ 4.8 / 5.0 (리뷰 16,000+)", hours: "⏰ 24시간 오픈 (추천 10:00~16:00)", breakTime: "☕ 브레이크 타임: 없음", closedDays: "🚫 휴무일: 연중무휴", desc: "수직 절벽 파스텔톤 마을 배경으로 펼쳐지는 지중해 에메랄드빛 해변과 파라솔 포토존.", price: "🎟️ 입장료: 자유 해변 FREE / 파라솔&선베드 1일 €30.00~50.00" },
        { title: "🌅 신들의 길 (Sentiero degli Dei)", rating: "⭐️ 4.9 / 5.0 (리뷰 8,200+)", hours: "⏰ 24시간 트레킹 오픈", breakTime: "☕ 브레이크 타임: 없음", closedDays: "🚫 휴무일: 폭우 시 안전통제", desc: "아말피 해안을 하늘 위에서 내려다보며 걷는 세계 최고의 해안 산악 트레킹 코스.", price: "🎟️ 입장료: FREE (자연 트레킹 코스)" },
        { title: "🏛️ 라벨로 빌라 치임브로네 (Villa Cimbrone)", rating: "⭐️ 4.9 / 5.0 (리뷰 11,000+)", hours: "⏰ 09:00 ~ 일몰 30분 전", breakTime: "☕ 브레이크 타임: 없음", closedDays: "🚫 휴무일: 연중무휴", desc: "무한의 테라스 조각상과 지중해 수직 절벽 해안이 한눈에 보이는 인생 최고의 절경.", price: "🎟️ 입장료: 정원 및 무한의 테라스 €10.00 (약 ₩14,800)" },
        { title: "🛥️ 아말피 해안 페리 (Salerno - Positano)", rating: "⭐️ 4.8 / 5.0 (리뷰 9,500+)", hours: "⏰ 페리 운항 08:40 ~ 19:00", breakTime: "☕ 브레이크 타임: 없음", closedDays: "🚫 휴무일: 기상 악화 시 결항", desc: "지중해 바다 위에서 깎아지른 절벽 마을 전체 전경을 감상하며 이동하는 해상 루트.", price: "🎟️ 승선권: 1인 편도 €16.00 (약 ₩23,600)" },
        { title: "⛪ 산타 마리아 아순타 성당 (Church of Santa Maria)", rating: "⭐️ 4.7 / 5.0 (리뷰 6,500+)", hours: "⏰ 08:30 ~ 12:00 / 16:00 ~ 19:30", breakTime: "☕ 12:00 ~ 16:00 (브레이크)", closedDays: "🚫 휴무일: 연중무휴", desc: "포시타노 해변 입구의 알록달록 타일 돔 지붕이 인상적인 포시타노의 상징 성당.", price: "🎟️ 입장료: FREE" }
      ],
      foods: [
        { title: "🍋 Ristorante Chez Black (셰즈 블랙)", rating: "⭐️ 4.6 / 5.0 (리뷰 9,800+ / 해변 1위)", hours: "⏰ 12:00 ~ 23:00", breakTime: "☕ 브레이크 타임: 없음", closedDays: "🚫 휴무일: 연중무휴", desc: "포시타노 메인 해변 바로 앞 위치 명사들이 찾는 곳. 우니(성게알) 파스타와 해산물 피자.", price: "💶 메뉴 예산: 우니(성게알) 파스타 €28.00 (약 ₩41,400) / 화덕피자 €18.00" },
        { title: "🍷 Ristorante La Sponda (라 스폰다)", rating: "⭐️ 4.8 / 5.0 (400개 촛불 야경)", hours: "⏰ 19:30 ~ 22:30", breakTime: "☕ 디너 전용 영업", closedDays: "🚫 휴무일: 연중무휴 (사전예약 필수)", desc: "400개 촛불로 야경을 밝히는 감성 라이브 럭셔리 디너 레스토랑. 연인들을 위한 로맨틱 코스.", price: "💶 메뉴 예산: 지중해 테이스팅 코스 €140.00 (약 ₩207,200)" },
        { title: "🍸 Franco's Bar (프랑코스 바)", rating: "⭐️ 4.8 / 5.0 (지중해 석양 칵테일바)", hours: "⏰ 17:00 ~ 00:30", breakTime: "☕ 석양 타임 전용", closedDays: "🚫 휴무일: 연중무휴 (16:30 현장대기)", desc: "지중해 석양과 포시타노 절벽 야경을 조망하는 최고 럭셔리 야외 테라스 칵테일바.", price: "🍸 예산: 시그니처 칵테일 €22.00 (약 ₩32,500) / 아페롤 스프리츠 €18.00" },
        { title: "🍋 Collina Bakery (콜리나 베이커리)", rating: "⭐️ 4.6 / 5.0 (포시타노 입구 카페)", hours: "⏰ 07:00 ~ 22:00", breakTime: "☕ 브레이크 타임: 없음", closedDays: "🚫 휴무일: 연중무휴", desc: "포시타노 언덕길 입구 정통 아말피 레몬 젤라또 & 에스프레소 디저트 대표 카페.", price: "🍋 예산: 수제 레몬 젤라또 €4.00 (약 ₩5,900) / 카푸치노 €3.00" },
        { title: "🍕 Bruno (브루노)", rating: "⭐️ 4.5 / 5.0 (절벽 조망 가성비)", hours: "⏰ 12:00 ~ 23:00", breakTime: "☕ 브레이크 타임: 없음", closedDays: "🚫 휴무일: 매주 화요일", desc: "포시타노 중턱 위치 지중해 바다 전경을 바라보며 먹는 가성비 해산물 링귀니 맛집.", price: "💶 메뉴 예산: 해산물 링귀니 €20.00 / 봉골레 파스타 €18.00" }
      ]
    },
    napoli: {
      name: "나폴리 (Napoli)",
      pillName: "🍕 나폴리",
      subtitle: "정통 화덕 피자의 본고장과 미식의 도시",
      spots: [
        { title: "🍕 나폴리 역사지구 (Centro Storico)", rating: "⭐️ 4.7 / 5.0 (리뷰 55,000+)", hours: "⏰ 24시간 오픈 (피자 11:30~23:00)", breakTime: "☕ 브레이크 타임: 없음", closedDays: "🚫 휴무일: 연중무휴", desc: "유네스코 세계문화유산 정통 나폴리 골목길 탐방 및 세계 최고 화덕 피자 골목.", price: "🎟️ 입장료: FREE (골목 도보 관광)" },
        { title: "🏰 카스텔 델로보 (Castel dell'Ovo 달걀성)", rating: "⭐️ 4.7 / 5.0 (리뷰 32,000+)", hours: "⏰ 09:00 ~ 18:30", breakTime: "☕ 브레이크 타임: 없음", closedDays: "🚫 휴무일: 연중무휴", desc: "나폴리 항구 해안가 고성에서 바라보는 산타루치아 항구와 베수비오 산 석양 조망.", price: "🎟️ 입장료: 성 외관 및 해안 산책로 FREE" },
        { title: "🏛️ 나폴리 지하도시 (Napoli Sotterranea)", rating: "⭐️ 4.8 / 5.0 (리뷰 28,000+)", hours: "⏰ 10:00 ~ 18:00", breakTime: "☕ 브레이크 타임: 없음", closedDays: "🚫 휴무일: 연중무휴 (공식예약 권장)", desc: "지하 40m 아래 펼쳐지는 고대 로마 수로 및 촛불 동굴 탐방 한국인 만족도 1위.", price: "🎟️ 입장료: 영어가이드 투어 포함 €12.00 (약 ₩17,700)" },
        { title: "🏛️ 나폴리 국립 고고학 박물관", rating: "⭐️ 4.8 / 5.0 (리뷰 22,000+)", hours: "⏰ 09:00 ~ 19:30", breakTime: "☕ 브레이크 타임: 없음", closedDays: "🚫 휴무일: 매주 화요일", desc: "폼페이 유적지에서 발굴된 고대 로마 벽화, 모자이크 및 조각품 세계 최대 소장.", price: "🎟️ 입장료: 일반 €22.00" },
        { title: "🏰 카스텔 누오보 (Castel Nuovo)", rating: "⭐️ 4.6 / 5.0 (리뷰 19,000+)", hours: "⏰ 08:30 ~ 19:00", breakTime: "☕ 브레이크 타임: 없음", closedDays: "🚫 휴무일: 매주 일요일", desc: "나폴리 항구 입구 웅장한 5개 탑 중세 고성. 대리석 승전문 포토존 스팟.", price: "🎟️ 입장료: 일반 €6.00" }
      ],
      foods: [
        { title: "🍕 L'Antica Pizzeria da Michele (다 미켈레)", rating: "⭐️ 4.7 / 5.0 (리뷰 52,000+ / 세계1위 성지)", hours: "⏰ 11:00 ~ 23:00", breakTime: "☕ 브레이크 타임: 없음", closedDays: "🚫 휴무일: 연중무휴 (대기 40분)", desc: "1870년 오픈. 영화 '먹고 기도하고 사랑하라' 성지. 정통 마르게리따 & 마리나라 딱 2종류만 판매.", price: "💶 메뉴 예산: 마르게리따 피자 €5.50 (약 ₩8,100) / 마리나라 €5.00" },
        { title: "🍕 Gino e Toto Sorbillo (솔빌로)", rating: "⭐️ 4.6 / 5.0 (리뷰 38,000+ / 현지인 1위)", hours: "⏰ 12:00 ~ 15:30 / 19:00 ~ 23:30", breakTime: "☕ 15:30 ~ 19:00", closedDays: "🚫 휴무일: 매주 일요일", desc: "나폴리 현지인들이 번호표 뽑고 줄 서서 먹는 물소 모짜렐라(Bufala) 최고급 화덕 피자.", price: "💶 메뉴 예산: 물소 모짜렐라 피자 €7.50 (약 ₩11,100)" },
        { title: "🍕 Pizzeria Di Matteo (디 마테오)", rating: "⭐️ 4.6 / 5.0 (클린턴 대통령 방문)", hours: "⏰ 09:00 ~ 23:30", breakTime: "☕ 브레이크 타임: 없음", closedDays: "🚫 휴무일: 매주 일요일", desc: "미국 클린턴 대통령 방문 피자집. 튀김 피자(Pizza Fritta)와 마르게리따 대표 맛집.", price: "💶 메뉴 예산: 튀김 피자 €4.00 (약 ₩5,900) / 마르게리따 €5.00" },
        { title: "☕ Gran Caffè Gambrinus (감브리누스)", rating: "⭐️ 4.6 / 5.0 (1860년 나폴리 최고 카페)", hours: "⏰ 07:00 ~ 24:00", breakTime: "☕ 브레이크 타임: 없음", closedDays: "🚫 휴무일: 연중무휴", desc: "1860년 오픈 나폴리 왕가 및 문인들의 성지 카페. 에스프레소와 바바(Babà) 디저트.", price: "☕ 예산: 에스프레소(Bar) €1.50 (약 ₩2,200) / 바바(Babà) 디저트 €3.50" },
        { title: "🥐 Sfogliatella Mary (스폴리아텔라 메리)", rating: "⭐️ 4.7 / 5.0 (나폴리 1위 베이커리)", hours: "⏰ 08:00 ~ 20:00", breakTime: "☕ 브레이크 타임: 없음", closedDays: "🚫 휴무일: 연중무휴", desc: "나폴리 갤러리아 입구 줄 서서 사 먹는 갓 구운 바삭한 스폴리아텔라(Sfogliatella) 디저트 명가.", price: "🥐 예산: 갓 구운 스폴리아텔라 €2.00 (약 ₩3,000)" }
      ]
    }
  },
  cities: [
    { step: "CITY 01", name: "부다페스트 (Budapest)", period: "09/23 ~ 09/24 (1박)", hotel: "ibis Styles Budapest Airport", desc: "헝가리 수도. 야경이 아름다운 다뉴브 강변과 국회의사당, 세체니 온천.", badge: "관문 도시" },
    { step: "CITY 02", name: "돌로미티 (Dolomites)", period: "09/24 ~ 09/29 (5박)", hotel: "Best Western Nevada (2박) & Hotel Eda (3박)", desc: "알프스의 보석. 트레치메 라바레도, 세체다, 알페 디 시우시 고원 드라이빙.", badge: "알프스 자연휴양" },
    { step: "CITY 03", name: "베네치아 (Venice)", period: "09/29 ~ 10/01 (2박)", hotel: "Anda Venice Hostel (메스트레)", desc: "물 위의 도시. 바포레토 수상버스, 리알토 다리, 산마르코 광장, 부라노섬.", badge: "수상 도시" },
    { step: "CITY 04", name: "로마 & 바티칸 (Rome & Vatican)", period: "10/01 ~ 10/03 (2박)", hotel: "Bonavista inn", desc: "세계 역사의 중심. 콜로세움, 트레비 분수, 바티칸 박물관 패스트트랙 투어.", badge: "역사 & 문화" },
    { step: "CITY 05", name: "포시타노 (Positano)", period: "10/03 ~ 10/06 (3박)", hotel: "Relais Il Sogno (2박) & Villa Rosa (1박)", desc: "아말피 해안의 절경. 절벽 마을 오션뷰 테라스 휴식 및 지중해 해안 산책.", badge: "남부 지중해 휴양" },
    { step: "CITY 06", name: "나폴리 (Napoli)", period: "10/06 ~ 10/07 (1박)", hotel: "U259 B&B", desc: "세계 피자의 본고장. 나폴리 역사지구, 정통 화덕 피자 맛집 탐방.", badge: "미식 & 귀국 환승" }
  ]
};

var mapInstance = null;
var mapMarkersGroup = null;
var mapPolylineLayer = null;

document.addEventListener('DOMContentLoaded', () => {
  initDDayTimer();
  initNavTabs();
  initSearchAndFilter();
  initModalEvents();
  initCustomRouteModal();
  initCurrencyConverter();
  initChecklistState();

  // Load Data from SQLite DB Backend Server
  fetchDataFromDB();
});

// Fetch Data from SQLite REST API (`/api/all-data`) with Offline Storage Backup
function fetchDataFromDB() {
  fetch('/api/all-data')
    .then(res => {
      if (!res.ok) throw new Error("HTTP error " + res.status);
      return res.json();
    })
    .then(data => {
      // Hide offline banner if online
      const banner = document.getElementById('offlineIndicator');
      if (banner) banner.style.display = 'none';

      if (data.schedule && data.schedule.length > 0) {
        travelData.schedule = data.schedule;
      }
      if (data.bookings && data.bookings.length > 0) {
        travelData.bookings = data.bookings;
      }
      if (data.routes && data.routes.length > 0) {
        travelData.defaultRoutes = data.routes;
      }
      if (data.expenses) {
        travelData.expenses = data.expenses;
      }

      // Save to localStorage for instant offline access
      try {
        localStorage.setItem('europe_travel_offline_backup_v1', JSON.stringify({
          schedule: travelData.schedule,
          bookings: travelData.bookings,
          routes: travelData.defaultRoutes,
          expenses: travelData.expenses,
          timestamp: new Date().toISOString()
        }));
      } catch(e) { console.warn("LocalStorage save warning:", e); }

      // Render UI with fetched DB Data
      renderCombinedCalendar();
      renderTimeline();
      renderCities();
      renderBookings();
      renderSavedRoutes();
      renderExpenses();
      initCityGuide();
      populateMapDayDropdown();
      if (mapInstance) {
        const selVal = document.getElementById('mapDaySelect')?.value || 'all';
        filterMapByDay(selVal);
      }
    })
    .catch(err => {
      console.warn("DB API not reachable (Offline Mode), restoring from local offline backup:", err);
      
      // Show offline banner
      const banner = document.getElementById('offlineIndicator');
      if (banner) banner.style.display = 'block';

      // Restore from localStorage backup
      try {
        const savedBackup = localStorage.getItem('europe_travel_offline_backup_v1');
        if (savedBackup) {
          const backupData = JSON.parse(savedBackup);
          if (backupData.schedule) travelData.schedule = backupData.schedule;
          if (backupData.bookings) travelData.bookings = backupData.bookings;
          if (backupData.routes) travelData.defaultRoutes = backupData.routes;
          if (backupData.expenses) travelData.expenses = backupData.expenses;
          console.log("Successfully restored offline data from LocalStorage.");
        }
      } catch(e) { console.warn("LocalStorage restore warning:", e); }

      renderCombinedCalendar();
      renderTimeline();
      renderCities();
      renderBookings();
      renderSavedRoutes();
      renderExpenses();
      initCityGuide();
      populateMapDayDropdown();
      if (mapInstance) {
        const selVal = document.getElementById('mapDaySelect')?.value || 'all';
        filterMapByDay(selVal);
      }
    });
}

// Online / Offline Status Event Listeners
window.addEventListener('online', () => {
  console.log("Device is Online. Syncing with Server...");
  const banner = document.getElementById('offlineIndicator');
  if (banner) banner.style.display = 'none';
  fetchDataFromDB();
});

window.addEventListener('offline', () => {
  console.log("Device is Offline. Switching to Offline Cache Mode.");
  const banner = document.getElementById('offlineIndicator');
  if (banner) banner.style.display = 'block';
});


// D-Day Countdown Timer
function initDDayTimer() {
  const timerElem = document.getElementById('ddayTimer');
  const targetDate = new Date('2026-09-23T12:35:00').getTime();

  function updateTimer() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      timerElem.innerText = "여행 진행 중 / 완료!";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    timerElem.innerText = `D-${days}일 ${String(hours).padStart(2,'0')}:${String(minutes).padStart(2,'0')}:${String(seconds).padStart(2,'0')}`;
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

// Navigation Tabs
function initNavTabs() {
  const navBtns = document.querySelectorAll('.nav-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      navBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const tabId = btn.getAttribute('data-tab');
      document.getElementById(`tab-${tabId}`).classList.add('active');

      if (tabId === 'maps') {
        setTimeout(initInteractiveMap, 100);
      }
    });
  });
}

// City Guide Renderer
function initCityGuide() {
  const pillsContainer = document.getElementById('cityGuidePills');
  const contentContainer = document.getElementById('cityGuideContent');

  if (!pillsContainer || !contentContainer) return;

  const cityKeys = Object.keys(travelData.cityGuides);
  pillsContainer.innerHTML = '';

  cityKeys.forEach((key, index) => {
    const city = travelData.cityGuides[key];
    const pill = document.createElement('button');
    pill.className = `city-pill-btn ${index === 0 ? 'active' : ''}`;
    pill.innerHTML = city.pillName || city.name;
    pill.addEventListener('click', () => {
      document.querySelectorAll('.city-pill-btn').forEach(b => b.classList.remove('active'));
      pill.classList.add('active');
      renderCityGuideDetail(key);
    });
    pillsContainer.appendChild(pill);
  });

  renderCityGuideDetail(cityKeys[0]);
}

function getGoogleMapsSearchUrl(title, cityName) {
  const cleanTitle = title.replace(/^[^\w\s\uAC00-\uD7A3]+/, '').split('(')[0].trim();
  const cleanCity = cityName.split('(')[0].trim();
  const query = `${cleanCity} ${cleanTitle}`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

function renderCityGuideDetail(cityKey) {
  const container = document.getElementById('cityGuideContent');
  const city = travelData.cityGuides[cityKey];
  if (!container || !city) return;

  let spotsHTML = (city.spots || []).map((s, idx) => {
    const gmapsUrl = getGoogleMapsSearchUrl(s.title, city.name);
    return `
      <div class="spot-box" style="border-left:4px solid var(--navy-royal); word-break:keep-all; overflow-wrap:break-word;">
        <div style="width:100%;">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:8px;">
            <span style="background:var(--navy-royal); color:#fff; font-size:0.78rem; font-weight:700; padding:3px 10px; border-radius:4px;">명소 #${idx + 1}</span>
            <span class="badge-rating"><i class="fa-solid fa-star" style="color:#D4AF37;"></i> ${s.rating || '⭐️ 4.8 / 5.0 (구글 리뷰)'}</span>
          </div>
          <h4 style="font-size:1.18rem; color:var(--navy-royal); font-weight:700; line-height:1.45; word-break:keep-all; margin:8px 0 10px 0; display:block; clear:both;">
            <i class="fa-solid fa-camera" style="color:var(--navy-royal); margin-right:6px;"></i>${s.title}
          </h4>
          <p class="spot-desc" style="margin-top:6px; word-break:keep-all; line-height:1.6;">${s.desc}</p>
          
          <div class="spot-meta-row">
            <span class="badge-hours"><i class="fa-regular fa-clock"></i> ${s.hours || s.bestTime || '운영시간 안내'}</span>
            <span class="badge-break"><i class="fa-solid fa-mug-hot"></i> ${s.breakTime || '☕ 브레이크 타임: 없음'}</span>
            <span class="badge-closed"><i class="fa-solid fa-ban"></i> ${s.closedDays || '🚫 휴무일: 연중무휴'}</span>
            <span class="badge-price"><i class="fa-solid fa-ticket"></i> ${s.price || 'FREE'}</span>
          </div>
        </div>

        <div style="display:flex; justify-content:flex-end; align-items:center; margin-top:14px; border-top:1px dashed var(--border-color); padding-top:10px;">
          <a href="${gmapsUrl}" target="_blank" rel="noopener noreferrer" style="background:var(--navy-royal); color:#ffffff; text-decoration:none; padding:7px 16px; border-radius:6px; font-size:0.85rem; font-weight:700; display:inline-flex; align-items:center; gap:6px; box-shadow:0 2px 6px rgba(0,0,0,0.1);">
            <i class="fa-solid fa-map-location-dot" style="color:var(--gold-primary);"></i> 구글 맵 위치 및 한국인 리뷰 보기 ↗️
          </a>
        </div>
      </div>
    `;
  }).join('');

  let foodsHTML = (city.foods || []).map((f, idx) => {
    const gmapsUrl = getGoogleMapsSearchUrl(f.title, city.name);
    return `
      <div class="spot-box" style="border-left:4px solid var(--terracotta); word-break:keep-all; overflow-wrap:break-word;">
        <div style="width:100%;">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:8px;">
            <span style="background:var(--terracotta); color:#fff; font-size:0.78rem; font-weight:700; padding:3px 10px; border-radius:4px;">맛집 #${idx + 1}</span>
            <span class="badge-rating"><i class="fa-solid fa-star" style="color:#D4AF37;"></i> ${f.rating || '⭐️ 4.7 / 5.0 (구글 평점 최상위)'}</span>
          </div>
          <h4 style="font-size:1.18rem; color:var(--terracotta); font-weight:700; line-height:1.45; word-break:keep-all; margin:8px 0 10px 0; display:block; clear:both;">
            <i class="fa-solid fa-utensils" style="color:var(--terracotta); margin-right:6px;"></i>${f.title}
          </h4>
          <p class="spot-desc" style="margin-top:6px; word-break:keep-all; line-height:1.6;">${f.desc}</p>
          
          <div class="spot-meta-row">
            <span class="badge-hours"><i class="fa-regular fa-clock"></i> ${f.hours || f.bestTime || '영업시간'}</span>
            <span class="badge-break"><i class="fa-solid fa-mug-hot"></i> ${f.breakTime || '☕ 브레이크 타임: 없음'}</span>
            <span class="badge-closed"><i class="fa-solid fa-ban"></i> ${f.closedDays || '🚫 휴무일: 매주 일요일'}</span>
            <span class="badge-price"><i class="fa-solid fa-coins"></i> ${f.price || '💶 메뉴 예산 €15~25'}</span>
          </div>
        </div>

        <div style="display:flex; justify-content:flex-end; align-items:center; margin-top:14px; border-top:1px dashed var(--terracotta-border); padding-top:10px;">
          <a href="${gmapsUrl}" target="_blank" rel="noopener noreferrer" style="background:var(--terracotta); color:#ffffff; text-decoration:none; padding:7px 16px; border-radius:6px; font-size:0.85rem; font-weight:700; display:inline-flex; align-items:center; gap:6px; box-shadow:0 2px 6px rgba(0,0,0,0.1);">
            <i class="fa-solid fa-map-location-dot" style="color:#ffffff;"></i> 구글 맵 위치 및 예약하기 ↗️
          </a>
        </div>
      </div>
    `;
  }).join('');

  container.innerHTML = `
    <div class="city-guide-card">
      <div class="guide-section-header">
        <div>
          <h3 style="font-size:1.8rem; color:var(--navy-royal); font-family:'Playfair Display', serif; font-weight:700;">${city.name}</h3>
          <p style="color:var(--text-muted); font-size:0.95rem; margin-top:4px;">${city.subtitle}</p>
        </div>
        <div style="background:var(--bg-subtle); padding:8px 16px; border-radius:20px; font-size:0.85rem; font-weight:700; color:var(--navy-royal); border:1px solid var(--border-color);">
          <i class="fa-brands fa-google" style="color:var(--terracotta);"></i> 구글 평점 & 한국인 리뷰 검증 TOP 5
        </div>
      </div>

      <h4 style="font-size:1.25rem; color:var(--navy-royal); margin-bottom:16px; font-weight:700;"><i class="fa-solid fa-map-pin"></i> 🏆 구글 평점 TOP 5 필수 명소 (오픈시간/휴무일)</h4>
      <div class="guide-grid" style="margin-bottom:35px;">
        ${spotsHTML}
      </div>

      <h4 style="font-size:1.25rem; color:var(--terracotta); margin-bottom:16px; font-weight:700;"><i class="fa-solid fa-wine-glass"></i> 🏆 구글 평점 & 한국인 리뷰 TOP 5 정통 맛집 (브레이크타임/휴무일)</h4>
      <div class="guide-grid">
        ${foodsHTML}
      </div>
    </div>
  `;
}

// Currency Converter Engine
function initCurrencyConverter() {
  const inputEUR = document.getElementById('inputEUR');
  const inputHUF = document.getElementById('inputHUF');
  const resEUR = document.getElementById('resEUR');
  const resHUF = document.getElementById('resHUF');

  if (!inputEUR || !inputHUF) return;

  function updateCalc() {
    const eurVal = parseFloat(inputEUR.value) || 0;
    const hufVal = parseFloat(inputHUF.value) || 0;

    const krwFromEUR = Math.round(eurVal * 1480);
    const krwFromHUF = Math.round(hufVal * 3.8);

    resEUR.innerText = `약 ₩${krwFromEUR.toLocaleString()}`;
    resHUF.innerText = `약 ₩${krwFromHUF.toLocaleString()}`;
  }

  inputEUR.addEventListener('input', updateCalc);
  inputHUF.addEventListener('input', updateCalc);
  updateCalc();
}

// Get Daily Google Maps Directions Route URL for Schedule Cards
function getDayGoogleMapsRoute(item) {
  const cityRoutesMap = {
    "09/23": "https://www.google.com/maps/dir/?api=1&origin=Budapest+Airport&destination=ibis+Styles+Budapest+Airport",
    "09/24": "https://www.google.com/maps/dir/?api=1&origin=Budapest+Airport&destination=Hotel+Nevada,+San+Vito+di+Cadore,+Italy&waypoints=Treviso+Airport,+Italy",
    "09/25": "https://www.google.com/maps/dir/?api=1&origin=Hotel+Nevada,+San+Vito+di+Cadore,+Italy&destination=Rifugio+Auronzo,+Italy&waypoints=Lago+di+Misurina,+Italy",
    "09/26": "https://www.google.com/maps/dir/?api=1&origin=San+Vito+di+Cadore,+Italy&destination=Hotel+Eda,+Selva+di+Val+Gardena,+Italy&waypoints=Lago+di+Braies,+Italy",
    "09/27": "https://www.google.com/maps/dir/?api=1&origin=Hotel+Eda,+Selva+di+Val+Gardena,+Italy&destination=Ortisei+Seceda+Cableway,+Italy&waypoints=Alpe+di+Siusi+Cableway,+Ortisei,+Italy",
    "09/28": "https://www.google.com/maps/dir/?api=1&origin=Selva+di+Val+Gardena,+Italy&destination=Passo+Gardena,+Italy&waypoints=Passo+Sella,+Italy",
    "09/29": "https://www.google.com/maps/dir/?api=1&origin=Selva+di+Val+Gardena,+Italy&destination=Treviso+Airport,+Italy&waypoints=Anda+Venice+Hostel,+Mestre,+Italy",
    "09/30": "https://www.google.com/maps/dir/?api=1&origin=Mestre+Station,+Venice&destination=Burano,+Venice&waypoints=Piazza+San+Marco,+Venice",
    "10/01": "https://www.google.com/maps/dir/?api=1&origin=Venezia+Mestre+Station&destination=Roma+Termini+Station&waypoints=Trevi+Fountain,+Rome",
    "10/02": "https://www.google.com/maps/dir/?api=1&origin=Corso+d'Italia+97,+Rome&destination=Vatican+Museums&waypoints=Ottaviano+Station,+Rome",
    "10/03": "https://www.google.com/maps/dir/?api=1&origin=Roma+Termini+Station&destination=Positano+Port&waypoints=Salerno+Train+Station",
    "10/04": "https://www.google.com/maps/dir/?api=1&origin=Positano,+Italy&destination=Villa+Cimbrone,+Ravello,+Italy&waypoints=Amalfi,+Italy",
    "10/05": "https://www.google.com/maps/dir/?api=1&origin=Positano,+Italy&destination=Villa+Rosa,+Positano,+Italy&waypoints=Sentiero+degli+Dei,+Italy",
    "10/06": "https://www.google.com/maps/dir/?api=1&origin=Positano,+Italy&destination=U259+B%26B,+Naples&waypoints=L'Antica+Pizzeria+da+Michele,+Naples",
    "10/07": "https://www.google.com/maps/dir/?api=1&origin=U259+B%26B,+Naples&destination=Naples+International+Airport&waypoints=Budapest+Airport",
    "10/08": "https://www.google.com/maps/dir/?api=1&origin=Budapest+Airport&destination=Incheon+International+Airport+Terminal+2"
  };

  const key = item.month && item.day ? `${String(item.month).padStart(2,'0')}/${String(item.day).padStart(2,'0')}` : '';
  if (cityRoutesMap[key]) return cityRoutesMap[key];

  const cleanTitle = (item.title || '').replace(/^[^\w가-힣]+/, '').trim();
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.city + ' ' + cleanTitle)}`;
}

// Render Combined 15-Night 16-Day Single Page Calendar
function renderCombinedCalendar() {
  const calendarView = document.getElementById('calendarView');
  if (!calendarView) return;
  calendarView.innerHTML = '';

  const dayHeaders = ['일 (SUN)', '월 (MON)', '화 (TUE)', '수 (WED)', '목 (THU)', '금 (FRI)', '토 (SAT)'];
  
  const gridElem = document.createElement('div');
  gridElem.className = 'calendar-grid';

  dayHeaders.forEach((dh, idx) => {
    const headCell = document.createElement('div');
    headCell.className = `cal-day-header ${idx === 0 ? 'sun' : (idx === 6 ? 'sat' : '')}`;
    headCell.innerText = dh;
    gridElem.appendChild(headCell);
  });

  const startColIndex = 3;
  for (let i = 0; i < startColIndex; i++) {
    const emptyCell = document.createElement('div');
    emptyCell.className = 'cal-cell empty-cell';
    gridElem.appendChild(emptyCell);
  }

  travelData.schedule.forEach((item, index) => {
    const cell = document.createElement('div');
    cell.className = `cal-cell travel-day ${item.theme}`;
    const dayRouteUrl = getDayGoogleMapsRoute(item);
    
    cell.innerHTML = `
      <div class="cal-date-num">
        <span>${item.month}/${item.day}</span>
        <span class="day-badge">DAY ${index + 1} (${item.day_of_week || item.dayOfWeek})</span>
      </div>
      <div class="cal-event-title">${item.title}</div>
      <div class="cal-event-detail">${item.detail.replace(/\n/g, '<br>')}</div>
      <div style="margin-top:6px; margin-bottom:4px;">
        <a href="${dayRouteUrl}" target="_blank" class="cal-route-btn" onclick="event.stopPropagation()"><i class="fa-solid fa-map-location-dot"></i> 당일 구글 맵 경로 ↗️</a>
      </div>
      <div class="cal-hotel-tag"><i class="fa-solid fa-bed"></i> ${item.hotel}</div>
    `;

    cell.addEventListener('click', () => openScheduleModal(item));
    gridElem.appendChild(cell);
  });

  calendarView.appendChild(gridElem);
}

// Populate Day Dropdown for Map View
function populateMapDayDropdown() {
  const select = document.getElementById('mapDaySelect');
  if (!select) return;
  
  const currentVal = select.value || 'all';
  select.innerHTML = '<option value="all">📍 전체 16일 전일정 핀 & 경로 한눈에 보기</option>';

  (travelData.schedule || []).forEach((item, index) => {
    const dayNum = index + 1;
    const cleanTitle = (item.title || '').replace(/^[^\w가-힣]+/, '').trim();
    const opt = document.createElement('option');
    opt.value = dayNum.toString();
    opt.innerText = `DAY ${dayNum} (${item.month}/${item.day} - ${item.city}): ${cleanTitle.substring(0, 22)}`;
    select.appendChild(opt);
  });

  select.value = currentVal;
}

// Map Variables (Google Maps API + Leaflet Fallback)
var gMapInstance = null;
var gMapMarkers = [];
var gMapPolyline = null;
var currentInfoWindow = null;

// Callback when Google Maps API loads asynchronously
window.onGoogleMapsReady = function() {
  console.log("Google Maps API script loaded.");
  if (document.getElementById('tab-maps')?.classList.contains('active')) {
    initInteractiveMap();
  }
};
window.initGoogleMapsApi = window.onGoogleMapsReady;

// Change Google Map Type (Roadmap, Satellite, Hybrid, Terrain)
window.setGoogleMapType = function(typeStr) {
  if (!gMapInstance || !window.google || !window.google.maps) return;
  if (typeStr === 'roadmap') gMapInstance.setMapTypeId(google.maps.MapTypeId.ROADMAP);
  else if (typeStr === 'satellite') gMapInstance.setMapTypeId(google.maps.MapTypeId.SATELLITE);
  else if (typeStr === 'hybrid') gMapInstance.setMapTypeId(google.maps.MapTypeId.HYBRID);
  else if (typeStr === 'terrain') gMapInstance.setMapTypeId(google.maps.MapTypeId.TERRAIN);
};

// Initialize Interactive Map (Primary: Google Maps API, Secondary: Leaflet Fallback)
window.initInteractiveMap = function() {
  const mapContainer = document.getElementById('interactiveMap');
  if (!mapContainer) return;

  if (window.google && window.google.maps) {
    if (!gMapInstance) {
      gMapInstance = new google.maps.Map(mapContainer, {
        center: { lat: 45.4387, lng: 12.3271 },
        zoom: 6,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoomControl: true,
        mapTypeControl: true,
        scaleControl: true,
        streetViewControl: true,
        rotateControl: true,
        fullscreenControl: true
      });
    } else {
      google.maps.event.trigger(gMapInstance, 'resize');
    }
    populateMapDayDropdown();
    const currentVal = document.getElementById('mapDaySelect')?.value || 'all';
    filterGoogleMapByDay(currentVal);
  } else {
    // Leaflet Fallback if Google Maps API is offline/loading
    initLeafletMapFallback(mapContainer);
  }
}

function initLeafletMapFallback(mapContainer) {
  if (mapInstance) {
    mapInstance.invalidateSize();
    populateMapDayDropdown();
    const currentVal = document.getElementById('mapDaySelect')?.value || 'all';
    filterLeafletMapByDay(currentVal);
    return;
  }
  if (!window.L) return;

  mapInstance = L.map(mapContainer).setView([44.5, 12.5], 6);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; OpenStreetMap'
  }).addTo(mapInstance);
  mapMarkersGroup = L.layerGroup().addTo(mapInstance);

  populateMapDayDropdown();
  filterLeafletMapByDay('all');
}

// Master Dispatcher for Map Filtering
window.filterMapByDay = function(dayVal) {
  if (window.google && window.google.maps && gMapInstance) {
    filterGoogleMapByDay(dayVal);
  } else if (mapInstance) {
    filterLeafletMapByDay(dayVal);
  }
};

// Filter Google Maps API Markers and Polyline Route
window.filterGoogleMapByDay = function(dayVal) {
  if (!gMapInstance || !window.google || !window.google.maps) return;

  // Clear previous Google Maps markers
  gMapMarkers.forEach(m => m.setMap(null));
  gMapMarkers = [];

  // Clear previous polyline
  if (gMapPolyline) {
    gMapPolyline.setMap(null);
    gMapPolyline = null;
  }

  const infoElem = document.getElementById('mapSelectedDayInfo');
  let targetItems = [];

  if (!dayVal || dayVal === 'all') {
    targetItems = travelData.schedule || [];
  } else {
    const dayNum = parseInt(dayVal);
    targetItems = (travelData.schedule || []).filter((item, idx) => (idx + 1) === dayNum);
    if (targetItems.length === 0) {
      targetItems = (travelData.schedule || []).filter(item => item.id == dayVal);
    }
  }

  const pathCoords = [];
  let totalPinsCount = 0;
  const bounds = new google.maps.LatLngBounds();

  if (!dayVal || dayVal === 'all') {
    targetItems.forEach((item, idx) => {
      let waypoints = item.waypoints;
      if (typeof item.waypoints_json === 'string') {
        try { waypoints = JSON.parse(item.waypoints_json); } catch(e) {}
      }

      if (Array.isArray(waypoints) && waypoints.length > 0) {
        waypoints.forEach((wp, wpIdx) => {
          if (wp.lat && wp.lng) {
            const pos = { lat: parseFloat(wp.lat), lng: parseFloat(wp.lng) };
            pathCoords.push(pos);
            bounds.extend(pos);
            totalPinsCount++;

            const searchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.city + ' ' + wp.name.replace(/^[^\w가-힣]+/, ''))}`;

            const popupHTML = `
              <div style="font-family:sans-serif; min-width:220px; padding:4px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                  <span style="background:#1A2B4C; color:#ffffff; padding:2px 8px; border-radius:4px; font-size:0.75rem; font-weight:700;">DAY ${idx + 1} · ${item.city}</span>
                  <span style="font-size:0.78rem; font-weight:700; color:#A03C28;">PIN #${wpIdx + 1}</span>
                </div>
                <h4 style="margin:4px 0; color:#1A2B4C; font-size:0.98rem; font-weight:700;">${wp.name}</h4>
                <p style="font-size:0.82rem; color:#4A4A4A; margin:4px 0 8px 0; line-height:1.4;">${wp.desc || item.title}</p>
                <div style="margin-top:6px;"><a href="${searchUrl}" target="_blank" style="background:#B8860B; color:#fff; padding:4px 10px; border-radius:4px; font-size:0.75rem; font-weight:700; text-decoration:none; display:inline-flex; align-items:center; gap:4px;"><i class="fa-solid fa-map-location-dot"></i> 구글맵 장소 열기 ↗️</a></div>
              </div>
            `;

            const marker = new google.maps.Marker({
              position: pos,
              map: gMapInstance,
              title: wp.name,
              label: {
                text: (wpIdx + 1).toString(),
                color: '#ffffff',
                fontWeight: 'bold',
                fontSize: '11px'
              },
              icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 13,
                fillColor: '#B8860B',
                fillOpacity: 1,
                strokeColor: '#FFFFFF',
                strokeWeight: 2
              }
            });

            const infowindow = new google.maps.InfoWindow({ content: popupHTML });
            marker.addListener('click', () => {
              if (currentInfoWindow) currentInfoWindow.close();
              infowindow.open(gMapInstance, marker);
              currentInfoWindow = infowindow;
            });

            gMapMarkers.push(marker);
          }
        });
      } else if (item.lat && item.lng) {
        const pos = { lat: parseFloat(item.lat), lng: parseFloat(item.lng) };
        pathCoords.push(pos);
        bounds.extend(pos);
        totalPinsCount++;

        const marker = new google.maps.Marker({
          position: pos,
          map: gMapInstance,
          title: item.title,
          label: {
            text: (idx + 1).toString(),
            color: '#ffffff',
            fontWeight: 'bold',
            fontSize: '11px'
          },
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 13,
            fillColor: '#1A2B4C',
            fillOpacity: 1,
            strokeColor: '#FFFFFF',
            strokeWeight: 2
          }
        });

        const infowindow = new google.maps.InfoWindow({
          content: `<div style="padding:4px;"><b>DAY ${idx + 1} · ${item.city}</b><br>${item.title}</div>`
        });
        marker.addListener('click', () => {
          if (currentInfoWindow) currentInfoWindow.close();
          infowindow.open(gMapInstance, marker);
          currentInfoWindow = infowindow;
        });

        gMapMarkers.push(marker);
      }
    });

    if (infoElem) infoElem.innerText = `Google Maps API: 전체 16일 (${totalPinsCount}개 세부 장소 핀) 및 전일정 횡단 경로 연동 중`;

  } else {
    // Specific Day
    const dayNum = parseInt(dayVal);
    const item = targetItems[0];

    if (item) {
      let waypoints = item.waypoints;
      if (typeof item.waypoints_json === 'string') {
        try { waypoints = JSON.parse(item.waypoints_json); } catch(e) {}
      }

      if (!Array.isArray(waypoints) || waypoints.length === 0) {
        waypoints = [{ name: item.title, lat: item.lat, lng: item.lng, desc: item.detail }];
      }

      waypoints.forEach((wp, wpIdx) => {
        if (wp.lat && wp.lng) {
          const pos = { lat: parseFloat(wp.lat), lng: parseFloat(wp.lng) };
          pathCoords.push(pos);
          bounds.extend(pos);
          totalPinsCount++;

          const searchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.city + ' ' + wp.name.replace(/^[^\w가-힣]+/, ''))}`;

          const popupHTML = `
            <div style="font-family:sans-serif; min-width:230px; padding:4px;">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                <span style="background:#1A2B4C; color:#ffffff; padding:2px 8px; border-radius:4px; font-size:0.75rem; font-weight:700;">DAY ${dayNum} · ${item.city}</span>
                <span style="font-size:0.78rem; font-weight:700; color:#A03C28;">PIN #${wpIdx + 1}</span>
              </div>
              <h4 style="margin:4px 0; color:#1A2B4C; font-size:0.98rem; font-weight:700;">${wp.name}</h4>
              <div style="font-size:0.82rem; color:#666; margin-bottom:6px;">🏨 당일 숙소: ${item.hotel}</div>
              <p style="font-size:0.82rem; color:#333; margin:4px 0 8px 0; line-height:1.4;">${wp.desc || item.detail}</p>
              <div style="display:flex; gap:6px; flex-wrap:wrap; margin-top:8px; border-top:1px dashed #ccc; padding-top:6px;">
                <a href="${searchUrl}" target="_blank" style="background:#B8860B; color:#ffffff; text-decoration:none; padding:4px 8px; border-radius:4px; font-size:0.75rem; font-weight:700; display:inline-flex; align-items:center; gap:4px;"><i class="fa-solid fa-map-location-dot"></i> 구글맵 장소 열기 ↗️</a>
              </div>
            </div>
          `;

          const marker = new google.maps.Marker({
            position: pos,
            map: gMapInstance,
            title: wp.name,
            label: {
              text: (wpIdx + 1).toString(),
              color: '#ffffff',
              fontWeight: 'bold',
              fontSize: '12px'
            },
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 14,
              fillColor: '#A03C28',
              fillOpacity: 1,
              strokeColor: '#FFFFFF',
              strokeWeight: 2
            }
          });

          const infowindow = new google.maps.InfoWindow({ content: popupHTML });
          marker.addListener('click', () => {
            if (currentInfoWindow) currentInfoWindow.close();
            infowindow.open(gMapInstance, marker);
            currentInfoWindow = infowindow;
          });

          gMapMarkers.push(marker);
        }
      });

      if (infoElem) {
        infoElem.innerText = `Google Maps API: DAY ${dayNum} (${item.month}/${item.day} ${item.city}) - 총 ${totalPinsCount}개 세부 장소 핀 & 이동 경로 라이브 표시 중`;
      }
    }
  }

  if (pathCoords.length > 0) {
    gMapPolyline = new google.maps.Polyline({
      path: pathCoords,
      geodesic: true,
      strokeColor: dayVal === 'all' ? '#B8860B' : '#A03C28',
      strokeOpacity: 0.9,
      strokeWeight: dayVal === 'all' ? 4 : 5,
      map: gMapInstance
    });

    if (pathCoords.length === 1) {
      gMapInstance.setCenter(pathCoords[0]);
      gMapInstance.setZoom(13);
    } else {
      gMapInstance.fitBounds(bounds);
    }
  }
};

window.filterLeafletMapByDay = function(dayVal) {
  if (!mapInstance) return;
  if (!mapMarkersGroup) {
    mapMarkersGroup = L.layerGroup().addTo(mapInstance);
  } else {
    mapMarkersGroup.clearLayers();
  }

  if (mapPolylineLayer) {
    mapInstance.removeLayer(mapPolylineLayer);
    mapPolylineLayer = null;
  }

  const infoElem = document.getElementById('mapSelectedDayInfo');
  let targetItems = [];

  if (!dayVal || dayVal === 'all') {
    targetItems = travelData.schedule || [];
  } else {
    const dayNum = parseInt(dayVal);
    targetItems = (travelData.schedule || []).filter((item, idx) => (idx + 1) === dayNum);
    if (targetItems.length === 0) {
      targetItems = (travelData.schedule || []).filter(item => item.id == dayVal);
    }
  }

  const latLngs = [];
  let totalPinsCount = 0;

  if (!dayVal || dayVal === 'all') {
    targetItems.forEach((item, idx) => {
      let waypoints = item.waypoints;
      if (typeof item.waypoints_json === 'string') {
        try { waypoints = JSON.parse(item.waypoints_json); } catch(e) {}
      }

      if (Array.isArray(waypoints) && waypoints.length > 0) {
        waypoints.forEach((wp, wpIdx) => {
          if (wp.lat && wp.lng) {
            const pos = [parseFloat(wp.lat), parseFloat(wp.lng)];
            latLngs.push(pos);
            totalPinsCount++;

            const popupContent = `
              <div style="font-family:sans-serif; min-width:210px; padding:2px;">
                <span style="background:var(--navy-royal); color:#ffffff; padding:2px 8px; border-radius:4px; font-size:0.75rem; font-weight:700;">DAY ${idx + 1} · ${item.city}</span>
                <h4 style="margin:6px 0 4px 0; color:var(--text-dark); font-size:0.96rem; font-weight:700;">${wp.name}</h4>
                <p style="font-size:0.82rem; color:var(--text-body); margin:4px 0;">${wp.desc || item.title}</p>
                <div style="margin-top:6px;"><a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(wp.name)}" target="_blank" style="background:#B8860B; color:#fff; padding:4px 8px; border-radius:4px; font-size:0.75rem; font-weight:700; text-decoration:none;">구글맵 장소 보기 ↗️</a></div>
              </div>
            `;
            const marker = L.marker(pos).bindPopup(popupContent);
            mapMarkersGroup.addLayer(marker);
          }
        });
      } else if (item.lat && item.lng) {
        const pos = [parseFloat(item.lat), parseFloat(item.lng)];
        latLngs.push(pos);
        totalPinsCount++;
        const marker = L.marker(pos).bindPopup(`<b>DAY ${idx + 1} · ${item.city}</b><br>${item.title}`);
        mapMarkersGroup.addLayer(marker);
      }
    });

    if (infoElem) infoElem.innerText = `전체 16일 (${totalPinsCount}개 세부 장소 핀) 및 전일정 횡단 경로 표시 중`;

  } else {
    const dayNum = parseInt(dayVal);
    const item = targetItems[0];

    if (item) {
      let waypoints = item.waypoints;
      if (typeof item.waypoints_json === 'string') {
        try { waypoints = JSON.parse(item.waypoints_json); } catch(e) {}
      }

      if (!Array.isArray(waypoints) || waypoints.length === 0) {
        waypoints = [{ name: item.title, lat: item.lat, lng: item.lng, desc: item.detail }];
      }

      waypoints.forEach((wp, wpIdx) => {
        if (wp.lat && wp.lng) {
          const pos = [parseFloat(wp.lat), parseFloat(wp.lng)];
          latLngs.push(pos);
          totalPinsCount++;

          const searchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.city + ' ' + wp.name.replace(/^[^\w가-힣]+/, ''))}`;
          
          const popupContent = `
            <div style="font-family:sans-serif; min-width:220px; padding:2px;">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                <span style="background:var(--navy-royal); color:#ffffff; padding:2px 8px; border-radius:4px; font-size:0.75rem; font-weight:700;">DAY ${dayNum} · ${item.city}</span>
                <span style="font-size:0.78rem; font-weight:700; color:var(--terracotta);">PIN #${wpIdx + 1}</span>
              </div>
              <h4 style="margin:4px 0; color:var(--text-dark); font-size:0.98rem; font-weight:700;">${wp.name}</h4>
              <div style="font-size:0.82rem; color:var(--text-muted); margin-bottom:6px;">🏨 당일 숙소: ${item.hotel}</div>
              <p style="font-size:0.82rem; color:var(--text-body); margin:4px 0 8px 0; line-height:1.4;">${wp.desc || item.detail}</p>
              <div style="display:flex; gap:6px; flex-wrap:wrap; margin-top:8px; border-top:1px dashed #ccc; padding-top:6px;">
                <a href="${searchUrl}" target="_blank" style="background:#B8860B; color:#ffffff; text-decoration:none; padding:4px 8px; border-radius:4px; font-size:0.75rem; font-weight:700; display:inline-flex; align-items:center; gap:4px;"><i class="fa-solid fa-map-location-dot"></i> 구글맵 장소 ↗️</a>
              </div>
            </div>
          `;

          const customIcon = L.divIcon({
            className: 'custom-map-pin-badge',
            html: `<div style="background:#A03C28; color:#ffffff; width:30px; height:30px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:bold; font-size:13px; border:2px solid #ffffff; box-shadow:0 3px 8px rgba(0,0,0,0.3);">${wpIdx + 1}</div>`,
            iconSize: [30, 30],
            iconAnchor: [15, 15]
          });

          const marker = L.marker(pos, { icon: customIcon }).bindPopup(popupContent);
          mapMarkersGroup.addLayer(marker);
        }
      });

      if (infoElem) {
        infoElem.innerText = `📍 DAY ${dayNum} (${item.month}/${item.day} ${item.city}) : 총 ${totalPinsCount}개 세부 장소 핀 & 이동 경로 라이브 표시 중`;
      }
    }
  }

  if (latLngs.length > 0) {
    mapPolylineLayer = L.polyline(latLngs, {
      color: dayVal === 'all' ? '#B8860B' : '#d9534f',
      weight: dayVal === 'all' ? 4 : 5,
      opacity: 0.9,
      dashArray: dayVal === 'all' ? '8, 8' : null
    }).addTo(mapInstance);

    if (latLngs.length === 1) {
      mapInstance.setView(latLngs[0], 13);
    } else {
      mapInstance.fitBounds(mapPolylineLayer.getBounds(), { padding: [50, 50], maxZoom: 14 });
    }
  }
};

// Render Saved Routes Vault from DB
function renderSavedRoutes() {
  const container = document.getElementById('savedRoutesGrid');
  if (!container) return;
  container.innerHTML = '';

  const routes = travelData.defaultRoutes;

  routes.forEach(r => {
    const card = document.createElement('div');
    card.className = 'route-card';
    card.innerHTML = `
      <div>
        <span class="route-tag">${r.category}</span>
        <h4>${r.title}</h4>
        <p>${r.desc}</p>
      </div>
      <div class="route-actions">
        <a href="${r.url}" target="_blank" rel="noopener noreferrer" class="btn-gmaps">
          <i class="fa-map-marked-alt fa-solid"></i> 구글 맵으로 경로 열기 ↗️
        </a>
      </div>
    `;

    container.appendChild(card);
  });
}

// Custom Route Modal Events with DB Post
function initCustomRouteModal() {
  const modal = document.getElementById('addRouteModal');
  const btnOpen = document.getElementById('btnOpenAddRouteModal');
  const btnClose = document.getElementById('addRouteModalClose');
  const btnCancel = document.getElementById('btnAddRouteCancel');
  const btnSave = document.getElementById('btnSaveCustomRoute');

  if (!btnOpen) return;

  btnOpen.addEventListener('click', () => modal.classList.add('active'));

  function closeModal() { modal.classList.remove('active'); }
  if (btnClose) btnClose.addEventListener('click', closeModal);
  if (btnCancel) btnCancel.addEventListener('click', closeModal);

  if (btnSave) {
    btnSave.addEventListener('click', () => {
      const title = document.getElementById('inputRouteTitle').value.trim();
      const desc = document.getElementById('inputRouteDesc').value.trim();
      let url = document.getElementById('inputRouteUrl').value.trim();
      const category = document.getElementById('selectRouteCategory').value;

      if (!title) {
        alert('경로 명칭을 입력해 주세요.');
        return;
      }

      if (!url) {
        url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(title)}`;
      }

      const newRoute = {
        id: 'custom_' + Date.now(),
        category: category,
        title: title,
        desc: desc || '사용자 커스텀 저장 경로',
        url: url
      };

      // Save to SQLite DB API
      fetch('/api/routes/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRoute)
      })
      .then(res => res.json())
      .then(res => {
        travelData.defaultRoutes.unshift(newRoute);
        renderSavedRoutes();
        closeModal();
      })
      .catch(err => {
        travelData.defaultRoutes.unshift(newRoute);
        renderSavedRoutes();
        closeModal();
      });
    });
  }
}

// Render Timeline View
let activeTimelineDayIndex = 0;

// Render Master Timeline Overview Grid (Level 1)
function renderTimeline() {
  const container = document.getElementById('timelineDaysGrid');
  if (!container) return;
  container.innerHTML = '';

  (travelData.schedule || []).forEach((item, index) => {
    const card = document.createElement('div');
    card.className = `timeline-day-card ${item.theme}`;
    card.style.cssText = 'background:var(--bg-card); border:1px solid var(--border-color); border-radius:var(--radius-md); padding:18px; box-shadow:var(--shadow-sm); cursor:pointer; transition:all 0.25s ease; position:relative; overflow:hidden;';
    
    let waypoints = item.waypoints;
    if (typeof item.waypoints_json === 'string') {
      try { waypoints = JSON.parse(item.waypoints_json); } catch(e) {}
    }
    if (!Array.isArray(waypoints)) waypoints = [];

    const dayNum = index + 1;

    let waypointsPreviewHTML = '';
    if (waypoints.length > 0) {
      const previewStr = waypoints.slice(0, 3).map(wp => `<span style="font-size:0.78rem; font-weight:700; color:var(--navy-royal); background:var(--bg-subtle); padding:2px 6px; border-radius:4px;">${wp.name.substring(0, 18)}</span>`).join(' ➔ ');
      waypointsPreviewHTML = `
        <div style="margin-top:10px; font-size:0.8rem; color:var(--text-muted);">
          <i class="fa-solid fa-route" style="color:var(--terracotta);"></i> 세부 코스 (${waypoints.length}개 핀):<br>
          <div style="margin-top:4px; display:flex; flex-wrap:wrap; gap:4px; align-items:center;">
            ${previewStr} ${waypoints.length > 3 ? '<span style="font-weight:700; font-size:0.75rem;">...</span>' : ''}
          </div>
        </div>
      `;
    }

    card.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
        <span class="modal-badge" style="background:var(--navy-royal); font-weight:700;">DAY ${dayNum} · ${item.day_str || item.dayStr}</span>
        <span style="font-size:0.8rem; font-weight:700; color:var(--terracotta);">${item.city}</span>
      </div>
      <h3 style="font-size:1.1rem; color:var(--text-dark); margin-bottom:6px; font-family:'Playfair Display', serif; font-weight:700;">${item.title}</h3>
      <p style="font-size:0.86rem; color:var(--text-body); margin-bottom:8px; line-height:1.4;">${(item.detail || '').substring(0, 85)}...</p>
      <div style="font-size:0.8rem; color:var(--text-muted); margin-bottom:10px;"><i class="fa-solid fa-hotel"></i> ${item.hotel}</div>
      ${waypointsPreviewHTML}
      
      <div style="margin-top:14px; border-top:1px dashed var(--border-color); padding-top:10px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:6px;" onclick="event.stopPropagation()">
        <button type="button" onclick="openTimelineDayDetail(${index})" style="background:var(--navy-royal); color:#ffffff; border:none; padding:7px 14px; border-radius:6px; font-size:0.82rem; font-weight:700; cursor:pointer; display:inline-flex; align-items:center; gap:6px; box-shadow:0 2px 6px rgba(0,0,0,0.1);">
          👉 DAY ${dayNum} 세부 타임라인 (1-Depth 진입) ↗️
        </button>
        <button type="button" onclick="focusMapOnDay(${dayNum})" style="background:var(--gold-primary); color:var(--text-dark); border:none; padding:7px 12px; border-radius:6px; font-size:0.8rem; font-weight:700; cursor:pointer;">
          🗺️ 지도 핀
        </button>
      </div>
    `;

    card.addEventListener('click', () => openTimelineDayDetail(index));
    container.appendChild(card);
  });

  const detailElem = document.getElementById('timelineDetailView');
  if (detailElem && detailElem.style.display !== 'none' && activeTimelineDayIndex >= 0) {
    renderTimelineDayDetail(activeTimelineDayIndex);
  }
}

// 1-Depth Detailed Timeline View for Selected Day
window.openTimelineDayDetail = function(dayIndex) {
  activeTimelineDayIndex = dayIndex;
  document.getElementById('timelineOverview').style.display = 'none';
  document.getElementById('timelineDetailView').style.display = 'block';

  renderTimelineDayDetail(dayIndex);
  window.scrollTo({ top: 250, behavior: 'smooth' });
};

window.closeTimelineDayDetail = function() {
  document.getElementById('timelineDetailView').style.display = 'none';
  document.getElementById('timelineOverview').style.display = 'block';
};

window.focusMapOnCurrentActiveDay = function() {
  focusMapOnDay(activeTimelineDayIndex + 1);
};

let draggedWpIndex = null;

function renderTimelineDayDetail(dayIndex) {
  const item = (travelData.schedule || [])[dayIndex];
  const headerElem = document.getElementById('activeDayHeader');
  const container = document.getElementById('dayWaypointsTimeline');

  if (!item || !container) return;

  const dayNum = dayIndex + 1;
  const dayRouteUrl = getDayGoogleMapsRoute(item);

  let waypoints = item.waypoints;
  if (typeof item.waypoints_json === 'string') {
    try { waypoints = JSON.parse(item.waypoints_json); } catch(e) {}
  }
  if (!Array.isArray(waypoints) || waypoints.length === 0) {
    waypoints = [{ name: item.title, lat: item.lat, lng: item.lng, desc: item.detail }];
  }
  item.waypoints = waypoints;

  if (headerElem) {
    headerElem.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
        <div>
          <span class="modal-badge" style="background:var(--terracotta); font-weight:700;">DAY ${dayNum} · ${item.day_str || item.dayStr}</span>
          <h2 style="font-size:1.5rem; color:var(--navy-royal); margin:6px 0 2px 0; font-family:'Playfair Display', serif; font-weight:700;">${item.title}</h2>
          <p style="color:var(--text-muted); font-size:0.92rem;"><i class="fa-solid fa-location-dot" style="color:var(--terracotta);"></i> 도시: <strong>${item.city}</strong> | 🏨 숙소: <strong>${item.hotel}</strong> | 🎫 관련 예약: <code>${item.booking_ref || item.bookingRef || '-'}</code></p>
        </div>
        <div style="text-align:right;">
          <a href="${dayRouteUrl}" target="_blank" class="btn-gmaps" style="padding:8px 14px; font-size:0.85rem;"><i class="fa-solid fa-map-location-dot"></i> 당일 구글 맵 전체 경로 ↗️</a>
          <div style="font-size:0.8rem; color:var(--terracotta); font-weight:700; margin-top:6px;"><i class="fa-solid fa-route"></i> 등록된 세부 장소 핀: ${waypoints.length}개 (드래그 순서변경 가능)</div>
        </div>
      </div>
    `;
  }

  container.innerHTML = '';

  waypoints.forEach((wp, wpIdx) => {
    const card = document.createElement('div');
    card.className = `timeline-card draggable-item ${item.theme}`;
    card.setAttribute('draggable', 'true');
    card.setAttribute('data-wp-index', wpIdx);

    const searchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.city + ' ' + wp.name.replace(/^[^\w가-힣]+/, ''))}`;

    card.innerHTML = `
      <div class="timeline-node" style="background:var(--terracotta); color:#ffffff; font-size:0.8rem; font-weight:bold; display:flex; align-items:center; justify-content:center;">${wpIdx + 1}</div>
      <div class="tl-header" style="display:flex; justify-content:space-between; align-items:center;">
        <div style="display:flex; align-items:center; gap:8px;">
          <i class="fa-solid fa-grip-vertical drag-handle" title="드래그하여 방문 순서 변경"></i>
          <span class="tl-date" style="background:var(--terracotta); color:#ffffff; padding:2px 8px; border-radius:4px; font-size:0.82rem;">PIN #${wpIdx + 1}</span>
          <span class="tl-city">${item.city}</span>
        </div>
        <span style="font-size:0.78rem; font-weight:700; color:var(--text-muted);"><i class="fa-solid fa-arrows-up-down"></i> 드래그 순서변경 가능</span>
      </div>
      <div class="tl-body" style="margin-top:8px;">
        <h4 style="font-size:1.1rem; color:var(--navy-royal); font-weight:700; display:flex; align-items:center; gap:6px;">
          <i class="fa-solid fa-location-dot" style="color:var(--gold-primary); font-size:0.95rem;"></i> ${wp.name}
        </h4>
        <p style="font-size:0.92rem; color:var(--text-body); margin-top:6px; line-height:1.5;">${(wp.desc || item.detail).replace(/\n/g, '<br>')}</p>
        <div style="font-size:0.8rem; color:var(--text-muted); margin-top:8px;">
          📍 지도 핀 좌표: <code>${wp.lat || item.lat || '-'}, ${wp.lng || item.lng || '-'}</code>
        </div>
      </div>
      <div class="tl-actions" style="margin-top:14px; display:flex; gap:8px; flex-wrap:wrap; align-items:center; justify-content:space-between; border-top:1px dashed var(--border-color); padding-top:10px;">
        <div style="display:flex; gap:6px;">
          <a href="${searchUrl}" target="_blank" class="cal-route-btn" style="padding:5px 12px; font-size:0.8rem;"><i class="fa-solid fa-magnifying-glass-location"></i> 구글맵 장소 ↗️</a>
        </div>
        <div style="display:flex; gap:6px;">
          <button type="button" onclick="openEditWaypointModal(${wpIdx})" style="padding:5px 12px; font-size:0.8rem; background:var(--navy-royal); color:#ffffff; border:none; border-radius:6px; font-weight:700; cursor:pointer;"><i class="fa-solid fa-pen-to-square"></i> 수정</button>
          <button type="button" onclick="deleteWaypointItem(${wpIdx})" style="padding:5px 12px; font-size:0.8rem; background:var(--terracotta); color:#ffffff; border:none; border-radius:6px; font-weight:700; cursor:pointer;"><i class="fa-solid fa-trash-can"></i> 삭제</button>
        </div>
      </div>
    `;

    // Drag & Drop Event Handlers
    card.addEventListener('dragstart', (e) => {
      draggedWpIndex = wpIdx;
      card.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', wpIdx.toString());
    });

    card.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      if (draggedWpIndex !== null && draggedWpIndex !== wpIdx) {
        card.classList.add('drag-over');
      }
    });

    card.addEventListener('dragleave', () => {
      card.classList.remove('drag-over');
    });

    card.addEventListener('drop', (e) => {
      e.preventDefault();
      card.classList.remove('drag-over');
      const fromIdx = draggedWpIndex;
      const toIdx = wpIdx;

      if (fromIdx !== null && fromIdx !== toIdx) {
        const itemObj = (travelData.schedule || [])[activeTimelineDayIndex];
        if (itemObj && Array.isArray(itemObj.waypoints)) {
          const [movedItem] = itemObj.waypoints.splice(fromIdx, 1);
          itemObj.waypoints.splice(toIdx, 0, movedItem);
          itemObj.waypoints_json = JSON.stringify(itemObj.waypoints);

          saveReorderedWaypoints(itemObj);
        }
      }
    });

    card.addEventListener('dragend', () => {
      card.classList.remove('dragging');
      document.querySelectorAll('.timeline-card').forEach(c => c.classList.remove('drag-over'));
      draggedWpIndex = null;
    });

    container.appendChild(card);
  });
}

function saveReorderedWaypoints(item) {
  fetch('/api/schedule/edit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: item.id,
      waypoints_json: item.waypoints_json
    })
  })
  .then(res => res.json())
  .then(() => {
    renderTimelineDayDetail(activeTimelineDayIndex);
    renderTimeline();
    filterMapByDay((activeTimelineDayIndex + 1).toString());
  })
  .catch(err => {
    renderTimelineDayDetail(activeTimelineDayIndex);
    renderTimeline();
    filterMapByDay((activeTimelineDayIndex + 1).toString());
  });
}

window.openOfficialGoogleMapsRoute = function() {
  const currentVal = document.getElementById('mapDaySelect')?.value || 'all';
  let targetItems = [];

  if (!currentVal || currentVal === 'all') {
    targetItems = travelData.schedule || [];
  } else {
    const dayNum = parseInt(currentVal);
    targetItems = (travelData.schedule || []).filter((item, idx) => (idx + 1) === dayNum);
    if (targetItems.length === 0) {
      targetItems = (travelData.schedule || []).filter(item => item.id == currentVal);
    }
  }

  const allNames = [];
  targetItems.forEach(item => {
    let waypoints = item.waypoints;
    if (typeof item.waypoints_json === 'string') {
      try { waypoints = JSON.parse(item.waypoints_json); } catch(e) {}
    }
    if (Array.isArray(waypoints) && waypoints.length > 0) {
      waypoints.forEach(wp => {
        const clean = wp.name.replace(/^[^\w가-힣]+/, '').split('(')[0].trim();
        allNames.push(`${item.city} ${clean}`);
      });
    } else {
      const clean = item.title.replace(/^[^\w가-힣]+/, '').split('(')[0].trim();
      allNames.push(`${item.city} ${clean}`);
    }
  });

  if (allNames.length === 0) {
    window.open("https://www.google.com/maps", "_blank");
    return;
  }

  const origin = encodeURIComponent(allNames[0]);
  const destination = encodeURIComponent(allNames[allNames.length - 1]);
  let waypointsStr = '';
  if (allNames.length > 2) {
    const mid = allNames.slice(1, -1).slice(0, 8).map(n => encodeURIComponent(n)).join('|');
    waypointsStr = `&waypoints=${mid}`;
  }

  const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}${waypointsStr}&travelmode=driving`;
  window.open(url, '_blank');
};

// Render Cities & Route
function renderCities() {
  const container = document.getElementById('citiesView');
  if (!container) return;
  container.innerHTML = '';

  travelData.cities.forEach(c => {
    const card = document.createElement('div');
    card.className = 'city-card';
    card.innerHTML = `
      <div class="city-card-header">
        <span class="city-step">${c.step} · ${c.badge}</span>
        <h3>${c.name}</h3>
        <span class="city-duration"><i class="fa-regular fa-clock"></i> 체류 기간: ${c.period}</span>
      </div>
      <div class="city-card-body">
        <p style="font-size:0.92rem; color:var(--text-body); margin-bottom:12px;">${c.desc}</p>
        <div class="hotel-info-block">
          <div class="hotel-name"><i class="fa-solid fa-hotel"></i> ${c.hotel}</div>
          <div class="hotel-dates">예약 확정 및 체크인 지침 반영 완료</div>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

// Search & Multi-Category Filter
function initSearchAndFilter() {
  const searchInput = document.getElementById('searchInput');
  const filterPills = document.querySelectorAll('.filter-pill');

  let currentCategory = 'all';

  function applyFilter() {
    const query = searchInput.value.trim().toLowerCase();

    const tlCards = document.querySelectorAll('.timeline-card');
    travelData.schedule.forEach((item, idx) => {
      const card = tlCards[idx];
      if (!card) return;

      const categories = Array.isArray(item.category) ? item.category : [item.category];
      const matchesCat = (currentCategory === 'all') || categories.includes(currentCategory);
      
      const matchesSearch = !query || (
        item.title.toLowerCase().includes(query) ||
        item.city.toLowerCase().includes(query) ||
        item.hotel.toLowerCase().includes(query) ||
        item.detail.toLowerCase().includes(query)
      );

      if (matchesCat && matchesSearch) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }

  if (searchInput) searchInput.addEventListener('input', applyFilter);

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentCategory = pill.getAttribute('data-category');

      if (currentCategory !== 'all') {
        document.querySelector('[data-tab="timeline"]').click();
      }

      applyFilter();
    });
  });
}

// Schedule Modal Popup
function openScheduleModal(item) {
  const modal = document.getElementById('detailModal');
  const badge = document.getElementById('modalBadge');
  const title = document.getElementById('modalTitle');
  const subtitle = document.getElementById('modalSubtitle');
  const body = document.getElementById('modalBody');

  badge.innerText = item.city;
  title.innerText = item.title;
  subtitle.innerText = `${item.day_str || item.dayStr} | 숙소: ${item.hotel}`;

  // Find associated booking PDF if any
  let pdfSection = '';
  const refText = (item.booking_ref || item.bookingRef || '').toLowerCase();
  const itemTitle = (item.title || '').toLowerCase();
  const itemDetail = (item.detail || '').toLowerCase();

  const matchingBooking = (travelData.bookings || []).find(b => {
    if (!b.pdf_path && !b.pdfPath) return false;
    const bCode = (b.code || '').toLowerCase().replace('예약번호:', '').replace('예약코드:', '').replace('티켓코드:', '').trim();
    const bTitle = (b.title || '').toLowerCase();

    if (bCode && (refText.includes(bCode) || itemDetail.includes(bCode))) return true;
    if (bTitle && (itemTitle.includes(bTitle) || refText.includes(bTitle))) return true;
    
    // Flight specific matching
    if (itemTitle.includes('항공') || itemTitle.includes('출발') || itemTitle.includes('도착') || itemTitle.includes('귀국')) {
      if (b.type === 'flight') {
        if (itemTitle.includes('인천') && b.id === 'b1') return true;
        if ((itemTitle.includes('라이언에어') || itemTitle.includes('트레비소')) && b.id === 'b2') return true;
        if ((itemTitle.includes('위즈에어') || itemTitle.includes('나폴리')) && b.id === 'b3') return true;
      }
    }
    return false;
  });

  if (matchingBooking) {
    const pdfUrl = matchingBooking.pdf_path || matchingBooking.pdfPath;
    pdfSection = `
      <div style="margin-top:16px; border-top:1px dashed var(--gold-border); padding-top:16px;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:10px;">
          <span style="font-weight:700; color:var(--navy-royal); font-size:0.95rem;">
            <i class="fa-solid fa-plane" style="color:var(--navy-royal); margin-right:6px;"></i> ${matchingBooking.title || '항공권'} E-티켓 / PDF 실물 바우처 원본
          </span>
          <div style="display:flex; gap:8px;">
            <button type="button" onclick="window.togglePdfViewer('${pdfUrl}')" style="background:var(--navy-royal); color:#ffffff; border:none; padding:7px 14px; border-radius:6px; font-size:0.85rem; cursor:pointer; font-weight:700;">
              <i class="fa-solid fa-eye"></i> 화면 내 PDF 열기 / 닫기
            </button>
            <a href="${pdfUrl}" target="_blank" style="background:var(--gold-primary); color:var(--text-dark); text-decoration:none; padding:7px 14px; border-radius:6px; font-size:0.85rem; font-weight:700; display:inline-block;">
              <i class="fa-solid fa-arrow-up-right-from-square"></i> 새 창에서 열기
            </a>
          </div>
        </div>
        <div id="pdfViewerContainer" style="display:none; margin-top:10px; border:2px solid var(--gold-border); border-radius:8px; overflow:hidden; background:#525659; box-shadow:0 4px 12px rgba(0,0,0,0.15);"></div>
      </div>
    `;
  }

  const scheduleGmapsUrl = getDayGoogleMapsRoute(item);

  body.innerHTML = `
    <div style="background:var(--bg-subtle); padding:14px; border-radius:8px; margin-bottom:16px; font-weight:500;">
      <i class="fa-solid fa-circle-info" style="color:var(--gold-primary);"></i> ${item.notes}
    </div>
    <p><strong>상세 일자:</strong> ${item.date} (${item.day_of_week || item.dayOfWeek}요일)</p>
    <p style="margin-top:6px;"><strong>이동 및 일정 내용:</strong><br>${item.detail.replace(/\n/g, '<br>')}</p>
    <p style="margin-top:10px;"><strong>관련 예약/티켓 번호:</strong> <code>${item.booking_ref || item.bookingRef}</code></p>
    <div style="margin-top:14px; background:var(--navy-light); border:1px solid var(--navy-border); padding:12px 14px; border-radius:8px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
      <span style="font-size:0.9rem; font-weight:700; color:var(--navy-royal);"><i class="fa-solid fa-route"></i> 당일 이동 동선: ${item.city}</span>
      <a href="${scheduleGmapsUrl}" target="_blank" rel="noopener noreferrer" style="background:var(--navy-royal); color:#ffffff; text-decoration:none; padding:8px 14px; border-radius:6px; font-size:0.85rem; font-weight:700; display:inline-flex; align-items:center; gap:6px;">
        <i class="fa-solid fa-map-location-dot" style="color:var(--gold-accent);"></i> 🗺️ ${item.month}/${item.day} 당일 구글 맵 경로 보기 ↗️
      </a>
    </div>
    ${pdfSection}
  `;

  modal.classList.add('active');
}

// Render Bookings Vault
function renderBookings() {
  const container = document.getElementById('bookingsView');
  if (!container) return;
  container.innerHTML = '';

  travelData.bookings.forEach(b => {
    const card = document.createElement('div');
    card.className = `booking-ticket type-${b.type}`;
    card.style.cursor = 'pointer';
    const hasPdf = b.pdf_path || b.pdfPath;
    card.innerHTML = `
      <div class="ticket-type">
        ${b.type_name || b.typeName}
        ${hasPdf ? '<span style="float:right; font-size:0.75rem; background:var(--gold-light); border:1px solid var(--gold-primary); color:var(--text-dark); padding:2px 8px; border-radius:12px; font-weight:700;"><i class="fa-solid fa-file-pdf" style="color:#d9534f;"></i> PDF 바우처 보유</span>' : '<i class="fa-solid fa-arrow-up-right-from-square" style="float:right; opacity:0.6;"></i>'}
      </div>
      <div class="ticket-title">${b.title}</div>
      <div class="ticket-meta">${b.meta}</div>
      <div class="ticket-code">${b.code}</div>
      <div style="font-size:0.78rem; color:var(--text-muted); margin-top:10px; display:flex; justify-content:space-between; align-items:center;">
        <span>👉 클릭하여 상세 바우처 & 팁 보기</span>
        ${hasPdf ? '<span style="color:var(--navy-royal); font-weight:700;"><i class="fa-solid fa-eye"></i> PDF 열기</span>' : ''}
      </div>
    `;
    card.addEventListener('click', () => openBookingModal(b));
    container.appendChild(card);
  });
}

// Global PDF Viewer Toggle Function
window.togglePdfViewer = function(pdfUrl) {
  const container = document.getElementById('pdfViewerContainer');
  if (!container) return;

  if (container.style.display === 'none' || container.style.display === '') {
    container.style.display = 'block';
    container.innerHTML = `<iframe src="${pdfUrl}" style="width:100%; height:500px; border:none; border-radius:8px;"></iframe>`;
  } else {
    container.style.display = 'none';
    container.innerHTML = '';
  }
};

// Booking Voucher Modal Popup
function openBookingModal(b) {
  const modal = document.getElementById('detailModal');
  const badge = document.getElementById('modalBadge');
  const title = document.getElementById('modalTitle');
  const subtitle = document.getElementById('modalSubtitle');
  const body = document.getElementById('modalBody');

  badge.innerText = b.type_name || b.typeName;
  title.innerText = b.title;
  subtitle.innerText = b.meta;

  const pdfUrl = b.pdf_path || b.pdfPath;
  let pdfSection = '';

  if (pdfUrl) {
    pdfSection = `
      <div style="margin-top:16px; border-top:1px dashed var(--gold-border); padding-top:16px;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:10px;">
          <span style="font-weight:700; color:var(--navy-royal); font-size:0.95rem;">
            <i class="fa-solid fa-file-pdf" style="color:#d9534f; margin-right:6px;"></i> PDF 실물 바우처 원본
          </span>
          <div style="display:flex; gap:8px;">
            <button type="button" onclick="window.togglePdfViewer('${pdfUrl}')" style="background:var(--navy-royal); color:#ffffff; border:none; padding:7px 14px; border-radius:6px; font-size:0.85rem; cursor:pointer; font-weight:700;">
              <i class="fa-solid fa-eye"></i> 화면 내 PDF 열기 / 닫기
            </button>
            <a href="${pdfUrl}" target="_blank" style="background:var(--gold-primary); color:var(--text-dark); text-decoration:none; padding:7px 14px; border-radius:6px; font-size:0.85rem; font-weight:700; display:inline-block;">
              <i class="fa-solid fa-arrow-up-right-from-square"></i> 새 창에서 열기
            </a>
          </div>
        </div>
        <div id="pdfViewerContainer" style="display:none; margin-top:10px; border:2px solid var(--gold-border); border-radius:8px; overflow:hidden; background:#525659; box-shadow:0 4px 12px rgba(0,0,0,0.15);"></div>
      </div>
    `;
  }

  body.innerHTML = `
    <div style="background:var(--gold-light); border:1px solid var(--gold-primary); color:var(--text-dark); padding:14px; border-radius:8px; margin-bottom:16px;">
      <div style="font-size:0.82rem; font-weight:700; color:var(--gold-primary); text-transform:uppercase;">바우처 / 예약 식별 코드</div>
      <div style="font-family:monospace; font-size:1.2rem; font-weight:700; color:var(--navy-royal); margin-top:2px;">${b.code}</div>
    </div>
    <p><strong>예약자 / 승객 명의:</strong> ${b.passengers || '이영호 & 김다혜'}</p>
    <div style="margin-top:12px; font-size:0.92rem; line-height:1.7;">
      <strong>예약 세부 조건 및 포함사항:</strong><br>
      <div style="background:var(--bg-subtle); padding:12px; border-radius:6px; margin-top:4px;">
        ${(b.details || '예약 확정 완료').replace(/\n/g, '<br>')}
      </div>
    </div>
    <div style="margin-top:14px; background:var(--navy-light); border:1px solid var(--navy-border); padding:12px; border-radius:8px;">
      <i class="fa-solid fa-lightbulb" style="color:var(--navy-royal);"></i> <strong>현지 탑승 / 체크인 팁:</strong><br>
      <span style="font-size:0.88rem; color:var(--text-body);">${b.voucher_tip || b.voucherTip || '체크인 시 실물 여권과 이티켓 화면을 제시하세요.'}</span>
    </div>
    ${pdfSection}
  `;

  modal.classList.add('active');
}

function initModalEvents() {
  const modal = document.getElementById('detailModal');
  const closeX = document.getElementById('modalClose');
  const closeBtn = document.getElementById('modalCloseBtn');

  function closeModal() { modal.classList.remove('active'); }
  if (closeX) closeX.addEventListener('click', closeModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

  const schedModal = document.getElementById('scheduleModal');
  const schedCloseX = document.getElementById('scheduleModalClose');
  const schedCancelBtn = document.getElementById('scheduleModalCancel');

  function closeSchedModal() { if (schedModal) schedModal.classList.remove('active'); }
  if (schedCloseX) schedCloseX.addEventListener('click', closeSchedModal);
  if (schedCancelBtn) schedCancelBtn.addEventListener('click', closeSchedModal);
  if (schedModal) schedModal.addEventListener('click', (e) => { if (e.target === schedModal) closeSchedModal(); });

  const wpModal = document.getElementById('waypointModal');
  const wpCloseX = document.getElementById('waypointModalClose');
  const wpCancelBtn = document.getElementById('waypointModalCancel');

  function closeWpModal() { if (wpModal) wpModal.classList.remove('active'); }
  if (wpCloseX) wpCloseX.addEventListener('click', closeWpModal);
  if (wpCancelBtn) wpCancelBtn.addEventListener('click', closeWpModal);
  if (wpModal) wpModal.addEventListener('click', (e) => { if (e.target === wpModal) closeWpModal(); });
}

// Currency Preset Handler
function setCurrencyValue(currency, val) {
  if (currency === 'EUR') {
    const inputEUR = document.getElementById('inputEUR');
    if (inputEUR) {
      inputEUR.value = val;
      inputEUR.dispatchEvent(new Event('input'));
    }
  } else if (currency === 'HUF') {
    const inputHUF = document.getElementById('inputHUF');
    if (inputHUF) {
      inputHUF.value = val;
      inputHUF.dispatchEvent(new Event('input'));
    }
  }
}

// Text-to-Speech Audio Pronunciation
function speakText(text, lang) {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang || 'it-IT';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  } else {
    alert("현재 브라우저는 음성합성(TTS)을 지원하지 않습니다.");
  }
}

// Clipboard Copy
function copyText(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      alert(`📋 클립보드 복사 완료:\n"${text}"`);
    }).catch(() => {
      alert(`복사 완료: "${text}"`);
    });
  } else {
    alert(`📋 문구: "${text}"`);
  }
}

// Render Expenses Table & Category Summary Box
function renderExpenses() {
  const tbody = document.getElementById('expenseTableBody');
  const summaryBox = document.getElementById('expenseSummaryBox');
  if (!tbody || !summaryBox) return;

  const list = travelData.expenses || [];
  
  let totalKRW = 0;
  let catTotals = { "식비": 0, "교통": 0, "티켓/관광": 0, "숙소": 0, "쇼핑/기타": 0 };

  tbody.innerHTML = list.map(item => {
    const amount = parseFloat(item.amount) || 0;
    let krw = parseFloat(item.krw_amount) || 0;
    if (!krw) {
      if (item.currency === 'EUR') krw = Math.round(amount * 1480);
      else if (item.currency === 'HUF') krw = Math.round(amount * 3.8);
      else krw = Math.round(amount);
    }

    totalKRW += krw;
    const cat = item.category || "쇼핑/기타";
    if (catTotals[cat] !== undefined) catTotals[cat] += krw;
    else catTotals["쇼핑/기타"] += krw;

    const currSymbol = item.currency === 'EUR' ? '€' : (item.currency === 'HUF' ? 'Ft' : '₩');

    return `
      <tr>
        <td style="padding:10px;">${item.date}</td>
        <td style="padding:10px; font-weight:700; color:var(--navy-royal);">${item.item}</td>
        <td style="padding:10px; font-weight:600;">${amount.toLocaleString()} ${currSymbol}</td>
        <td style="padding:10px; font-weight:700; color:var(--terracotta);">₩${krw.toLocaleString()}</td>
        <td style="padding:10px;"><span class="tl-tag">${cat}</span></td>
        <td style="padding:10px; text-align:center;">
          <button type="button" class="btn-del-exp" onclick="deleteExpenseItem('${item.id}')">삭제</button>
        </td>
      </tr>
    `;
  }).join('');

  if (list.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="padding:20px; text-align:center; color:var(--text-muted);">등록된 현지 공동 지출이 없습니다. 위 폼에서 지출 내역을 추가해 보세요!</td></tr>`;
  }

  summaryBox.innerHTML = `
    <div>
      <div style="font-size:0.8rem; color:var(--text-muted); font-weight:700;">💳 총 현지 지출 합계</div>
      <div style="font-size:1.3rem; font-weight:700; color:var(--navy-royal);">₩${totalKRW.toLocaleString()}</div>
    </div>
    <div>
      <div style="font-size:0.8rem; color:var(--text-muted); font-weight:700;">🍝 식비 합계</div>
      <div style="font-size:1.1rem; font-weight:700; color:var(--terracotta);">₩${catTotals["식비"].toLocaleString()}</div>
    </div>
    <div>
      <div style="font-size:0.8rem; color:var(--text-muted); font-weight:700;">🚗 교통 & 주차/통행료</div>
      <div style="font-size:1.1rem; font-weight:700; color:var(--green-alpine);">₩${catTotals["교통"].toLocaleString()}</div>
    </div>
    <div>
      <div style="font-size:0.8rem; color:var(--text-muted); font-weight:700;">🎟️ 티켓 & 투어/관광</div>
      <div style="font-size:1.1rem; font-weight:700; color:var(--gold-accent);">₩${catTotals["티켓/관광"].toLocaleString()}</div>
    </div>
    <div>
      <div style="font-size:0.8rem; color:var(--text-muted); font-weight:700;">🛍️ 숙소 & 쇼핑/기타</div>
      <div style="font-size:1.1rem; font-weight:600; color:var(--text-dark);">₩${(catTotals["숙소"] + catTotals["쇼핑/기타"]).toLocaleString()}</div>
    </div>
  `;
}

// Add Expense Item Handler (DB POST API Integration)
function addExpenseItem() {
  const date = document.getElementById('expDate').value;
  const payer = "공동";
  const item = document.getElementById('expItem').value.trim();
  const currency = document.getElementById('expCurr').value;
  const amount = parseFloat(document.getElementById('expAmount').value);
  const category = document.getElementById('expCat').value;

  if (!item || isNaN(amount) || amount <= 0) {
    alert("항목 명칭과 올바른 금액을 입력해 주세요.");
    return;
  }

  let krw = 0;
  if (currency === 'EUR') krw = Math.round(amount * 1480);
  else if (currency === 'HUF') krw = Math.round(amount * 3.8);
  else krw = Math.round(amount);

  const newObj = {
    id: "exp-" + Date.now(),
    date,
    payer,
    item,
    amount,
    currency,
    krw_amount: krw,
    category
  };

  fetch('/api/expenses/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newObj)
  })
  .then(res => res.json())
  .then(() => {
    if (!travelData.expenses) travelData.expenses = [];
    travelData.expenses.unshift(newObj);
    renderExpenses();
    document.getElementById('expItem').value = '';
    document.getElementById('expAmount').value = '';
  })
  .catch(err => {
    console.warn("API add expense failed, adding to memory fallback:", err);
    if (!travelData.expenses) travelData.expenses = [];
    travelData.expenses.unshift(newObj);
    renderExpenses();
    document.getElementById('expItem').value = '';
    document.getElementById('expAmount').value = '';
  });
}

// Delete Expense Item Handler (DB POST API Integration)
function deleteExpenseItem(id) {
  if (!confirm("이 지출 내역을 삭제하시겠습니까?")) return;

  fetch('/api/expenses/delete', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id })
  })
  .then(res => res.json())
  .then(() => {
    travelData.expenses = (travelData.expenses || []).filter(e => e.id !== id);
    renderExpenses();
  })
  .catch(err => {
    console.warn("API delete expense failed, removing from memory:", err);
    travelData.expenses = (travelData.expenses || []).filter(e => e.id !== id);
    renderExpenses();
  });
}

// Schedule Item & Map Pin CRUD Handlers
window.focusMapOnDay = function(dayIndex) {
  const navBtn = document.querySelector('[data-tab="maps"]');
  if (navBtn) navBtn.click();

  setTimeout(() => {
    const select = document.getElementById('mapDaySelect');
    if (select) {
      select.value = dayIndex.toString();
      filterMapByDay(dayIndex.toString());
    }
  }, 200);
};

window.openAddScheduleModal = function() {
  document.getElementById('schedItemId').value = '';
  document.getElementById('scheduleModalTitle').innerText = '➕ 새 일정 / 장소 핀 추가 (DB 실시간 연동)';
  document.getElementById('schedDaySelect').value = '1';
  document.getElementById('schedCity').value = '';
  document.getElementById('schedTitle').value = '';
  document.getElementById('schedDate').value = '2026-09-23';
  document.getElementById('schedDayOfWeek').value = '수';
  document.getElementById('schedDetail').value = '';
  document.getElementById('schedHotel').value = '';
  document.getElementById('schedBookingRef').value = '';
  document.getElementById('schedNotes').value = '';
  document.getElementById('schedLat').value = '';
  document.getElementById('schedLng').value = '';
  document.getElementById('geocodeResultText').innerText = '';

  document.getElementById('scheduleModal').classList.add('active');
};

window.openEditScheduleModalById = function(id) {
  const item = (travelData.schedule || []).find(s => s.id == id);
  if (item) {
    openEditScheduleModal(item);
  }
};

window.openEditScheduleModal = function(item) {
  document.getElementById('schedItemId').value = item.id || '';
  document.getElementById('scheduleModalTitle').innerText = `✏️ 일정 및 지도 핀 수정 (ID: ${item.id || 'Custom'})`;
  
  const itemIndex = (travelData.schedule || []).findIndex(s => s.id == item.id);
  if (itemIndex !== -1) {
    document.getElementById('schedDaySelect').value = (itemIndex + 1).toString();
  }

  document.getElementById('schedCity').value = item.city || '';
  document.getElementById('schedTitle').value = item.title || '';
  document.getElementById('schedDate').value = item.date || '2026-09-23';
  document.getElementById('schedDayOfWeek').value = item.day_of_week || item.dayOfWeek || '수';
  document.getElementById('schedDetail').value = item.detail || '';
  document.getElementById('schedHotel').value = item.hotel || '';
  document.getElementById('schedBookingRef').value = item.booking_ref || item.bookingRef || '';
  document.getElementById('schedNotes').value = item.notes || '';
  document.getElementById('schedLat').value = item.lat || '';
  document.getElementById('schedLng').value = item.lng || '';
  document.getElementById('geocodeResultText').innerText = '';

  document.getElementById('scheduleModal').classList.add('active');
};

window.autoGeocodeLocation = function() {
  const city = document.getElementById('schedCity').value.trim();
  const title = document.getElementById('schedTitle').value.trim();
  const resText = document.getElementById('geocodeResultText');
  
  if (!city && !title) {
    alert("도시 또는 일정/장소 제목을 먼저 입력해 주세요.");
    return;
  }

  const cleanTitle = title.replace(/^[^\w가-힣]+/, '').split('(')[0].trim();
  const query = `${city} ${cleanTitle}`;

  if (resText) resText.innerText = `🔍 OpenStreetMap에서 '${query}' 위치 탐색 중...`;

  fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`)
    .then(res => res.json())
    .then(data => {
      if (data && data.length > 0) {
        const top = data[0];
        document.getElementById('schedLat').value = parseFloat(top.lat).toFixed(4);
        document.getElementById('schedLng').value = parseFloat(top.lon).toFixed(4);
        if (resText) resText.innerText = `✅ 위치 자동 검색 성공: ${top.display_name.substring(0, 45)}... (${parseFloat(top.lat).toFixed(4)}, ${parseFloat(top.lon).toFixed(4)})`;
      } else {
        if (resText) resText.innerText = `⚠️ 위치 자동 탐색 결과 없음. Google 맵에서 위경도를 참조하여 직접 입력해 주세요.`;
      }
    })
    .catch(err => {
      console.warn("Geocoding failed:", err);
      if (resText) resText.innerText = `⚠️ 위치 자동 탐색 오류. 위경도를 직접 입력해 주세요.`;
    });
};

window.saveScheduleItem = function() {
  const id = document.getElementById('schedItemId').value;
  const dayNum = parseInt(document.getElementById('schedDaySelect').value) || 1;
  const city = document.getElementById('schedCity').value.trim();
  const title = document.getElementById('schedTitle').value.trim();
  const dateStr = document.getElementById('schedDate').value;
  const dayOfWeek = document.getElementById('schedDayOfWeek').value;
  const detail = document.getElementById('schedDetail').value.trim();
  const hotel = document.getElementById('schedHotel').value.trim();
  const bookingRef = document.getElementById('schedBookingRef').value.trim();
  const notes = document.getElementById('schedNotes').value.trim();
  const lat = parseFloat(document.getElementById('schedLat').value) || 47.4979;
  const lng = parseFloat(document.getElementById('schedLng').value) || 19.0402;

  if (!title) {
    alert("일정 / 장소 제목을 입력해 주세요.");
    return;
  }

  const d = new Date(dateStr);
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const monthStr = String(month).padStart(2, '0');
  const dayStr = String(day).padStart(2, '0');
  const day_str = `${monthStr}/${dayStr} (${dayOfWeek})`;

  const obj = {
    date: dateStr,
    day_str: day_str,
    month: month,
    day: day,
    day_of_week: dayOfWeek,
    city: city || "유럽",
    title: title,
    detail: detail || title,
    hotel: hotel || "-",
    category: ["tour"],
    theme: "theme-rome",
    booking_ref: bookingRef || "-",
    notes: notes || "",
    lat: lat,
    lng: lng
  };

  const endpoint = id ? '/api/schedule/edit' : '/api/schedule/add';
  if (id) obj.id = parseInt(id);

  fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(obj)
  })
  .then(res => res.json())
  .then(() => {
    fetchDataFromDB();
    const schedModal = document.getElementById('scheduleModal');
    if (schedModal) schedModal.classList.remove('active');
  })
  .catch(err => {
    console.warn("Schedule save error:", err);
    if (!id) {
      obj.id = Date.now();
      travelData.schedule.push(obj);
    } else {
      const idx = travelData.schedule.findIndex(s => s.id == id);
      if (idx !== -1) travelData.schedule[idx] = obj;
    }
    renderCombinedCalendar();
    renderTimeline();
    populateMapDayDropdown();
    filterMapByDay('all');
    const schedModal = document.getElementById('scheduleModal');
    if (schedModal) schedModal.classList.remove('active');
  });
};

window.deleteScheduleItem = function(id) {
  if (!confirm("이 일정 항목 및 지도 핀을 삭제하시겠습니까?")) return;

  fetch('/api/schedule/delete', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: parseInt(id) })
  })
  .then(res => res.json())
  .then(() => {
    travelData.schedule = travelData.schedule.filter(s => s.id != id);
    renderCombinedCalendar();
    renderTimeline();
    populateMapDayDropdown();
    filterMapByDay('all');
  })
  .catch(err => {
    console.warn("Delete schedule error:", err);
    travelData.schedule = travelData.schedule.filter(s => s.id != id);
    renderCombinedCalendar();
    renderTimeline();
    populateMapDayDropdown();
    filterMapByDay('all');
  });
};

// Currency Converter Listener
function initCurrencyConverter() {
  const inputEUR = document.getElementById('inputEUR');
  const resEUR = document.getElementById('resEUR');
  const inputHUF = document.getElementById('inputHUF');
  const resHUF = document.getElementById('resHUF');

  if (inputEUR && resEUR) {
    inputEUR.addEventListener('input', () => {
      const val = parseFloat(inputEUR.value) || 0;
      const krw = Math.round(val * 1480);
      resEUR.innerText = `약 ₩${krw.toLocaleString()}`;
    });
  }

  if (inputHUF && resHUF) {
    inputHUF.addEventListener('input', () => {
      const val = parseFloat(inputHUF.value) || 0;
      const krw = Math.round(val * 3.8);
      resHUF.innerText = `약 ₩${krw.toLocaleString()}`;
    });
  }
}
window.initCurrencyConverter = initCurrencyConverter;

// 1-Depth Waypoint CRUD Handlers
window.openAddWaypointModal = function() {
  const editIdxInput = document.getElementById('wpEditIndex');
  if (editIdxInput) editIdxInput.value = '-1';
  
  const titleElem = document.getElementById('waypointModalTitle');
  if (titleElem) titleElem.innerText = '➕ 세부 장소 / 일정 핀 추가 (1-Depth DB 연동)';
  
  if (document.getElementById('wpName')) document.getElementById('wpName').value = '';
  if (document.getElementById('wpDesc')) document.getElementById('wpDesc').value = '';
  if (document.getElementById('wpLat')) document.getElementById('wpLat').value = '';
  if (document.getElementById('wpLng')) document.getElementById('wpLng').value = '';
  if (document.getElementById('wpGeocodeResultText')) document.getElementById('wpGeocodeResultText').innerText = '';

  const modal = document.getElementById('waypointModal');
  if (modal) modal.classList.add('active');
};

window.openEditWaypointModal = function(wpIdx) {
  const item = (travelData.schedule || [])[activeTimelineDayIndex];
  if (!item) return;

  let waypoints = item.waypoints;
  if (typeof item.waypoints_json === 'string') {
    try { waypoints = JSON.parse(item.waypoints_json); } catch(e) {}
  }
  if (!Array.isArray(waypoints) || !waypoints[wpIdx]) return;

  const wp = waypoints[wpIdx];
  const editIdxInput = document.getElementById('wpEditIndex');
  if (editIdxInput) editIdxInput.value = wpIdx.toString();

  const titleElem = document.getElementById('waypointModalTitle');
  if (titleElem) titleElem.innerText = `✏️ 세부 일정 핀 수정 (PIN #${wpIdx + 1})`;

  if (document.getElementById('wpName')) document.getElementById('wpName').value = wp.name || '';
  if (document.getElementById('wpDesc')) document.getElementById('wpDesc').value = wp.desc || '';
  if (document.getElementById('wpLat')) document.getElementById('wpLat').value = wp.lat || '';
  if (document.getElementById('wpLng')) document.getElementById('wpLng').value = wp.lng || '';
  if (document.getElementById('wpGeocodeResultText')) document.getElementById('wpGeocodeResultText').innerText = '';

  const modal = document.getElementById('waypointModal');
  if (modal) modal.classList.add('active');
};

window.autoGeocodeWaypointLocation = function() {
  const name = document.getElementById('wpName')?.value.trim();
  const item = (travelData.schedule || [])[activeTimelineDayIndex];
  const city = item ? item.city : '';
  const resText = document.getElementById('wpGeocodeResultText');

  if (!name) {
    alert("장소 / 일정 명칭을 먼저 입력해 주세요.");
    return;
  }

  const cleanName = name.replace(/^[^\w가-힣]+/, '').split('(')[0].trim();
  const query = `${city} ${cleanName}`;

  if (resText) resText.innerText = `🔍 OpenStreetMap에서 '${query}' 위치 탐색 중...`;

  fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`)
    .then(res => res.json())
    .then(data => {
      if (data && data.length > 0) {
        const top = data[0];
        if (document.getElementById('wpLat')) document.getElementById('wpLat').value = parseFloat(top.lat).toFixed(4);
        if (document.getElementById('wpLng')) document.getElementById('wpLng').value = parseFloat(top.lon).toFixed(4);
        if (resText) resText.innerText = `✅ 위치 탐색 성공: ${top.display_name.substring(0, 40)}...`;
      } else {
        if (resText) resText.innerText = `⚠️ 위치 결과 없음. 위경도를 직접 입력해 주세요.`;
      }
    })
    .catch(err => {
      if (resText) resText.innerText = `⚠️ 위치 탐색 오류. 위경도를 직접 입력해 주세요.`;
    });
};

window.saveWaypointItem = function() {
  const item = (travelData.schedule || [])[activeTimelineDayIndex];
  if (!item) return;

  const idxStr = document.getElementById('wpEditIndex')?.value || '-1';
  const name = document.getElementById('wpName')?.value.trim() || '';
  const desc = document.getElementById('wpDesc')?.value.trim() || '';
  const lat = parseFloat(document.getElementById('wpLat')?.value) || parseFloat(item.lat) || 47.4979;
  const lng = parseFloat(document.getElementById('wpLng')?.value) || parseFloat(item.lng) || 19.0402;

  if (!name) {
    alert("장소 / 일정 명칭을 입력해 주세요.");
    return;
  }

  let waypoints = item.waypoints;
  if (typeof item.waypoints_json === 'string') {
    try { waypoints = JSON.parse(item.waypoints_json); } catch(e) {}
  }
  if (!Array.isArray(waypoints)) waypoints = [];

  const wpObj = { name, desc, lat, lng };

  if (idxStr === '-1' || idxStr === '') {
    waypoints.push(wpObj);
  } else {
    const idx = parseInt(idxStr);
    if (idx >= 0 && idx < waypoints.length) {
      waypoints[idx] = wpObj;
    }
  }

  item.waypoints = waypoints;
  item.waypoints_json = JSON.stringify(waypoints);

  fetch('/api/schedule/edit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: item.id,
      waypoints_json: item.waypoints_json
    })
  })
  .then(res => res.json())
  .then(() => {
    renderTimelineDayDetail(activeTimelineDayIndex);
    renderTimeline();
    filterMapByDay((activeTimelineDayIndex + 1).toString());
    const modal = document.getElementById('waypointModal');
    if (modal) modal.classList.remove('active');
  })
  .catch(err => {
    renderTimelineDayDetail(activeTimelineDayIndex);
    renderTimeline();
    filterMapByDay((activeTimelineDayIndex + 1).toString());
    const modal = document.getElementById('waypointModal');
    if (modal) modal.classList.remove('active');
  });
};

window.deleteWaypointItem = function(wpIdx) {
  const item = (travelData.schedule || [])[activeTimelineDayIndex];
  if (!item) return;

  if (!confirm(`PIN #${wpIdx + 1} 항목을 삭제하시겠습니까?`)) return;

  let waypoints = item.waypoints;
  if (typeof item.waypoints_json === 'string') {
    try { waypoints = JSON.parse(item.waypoints_json); } catch(e) {}
  }
  if (!Array.isArray(waypoints)) return;

  waypoints.splice(wpIdx, 1);
  item.waypoints = waypoints;
  item.waypoints_json = JSON.stringify(waypoints);

  fetch('/api/schedule/edit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: item.id,
      waypoints_json: item.waypoints_json
    })
  })
  .then(res => res.json())
  .then(() => {
    renderTimelineDayDetail(activeTimelineDayIndex);
    renderTimeline();
    filterMapByDay((activeTimelineDayIndex + 1).toString());
  })
  .catch(err => {
    renderTimelineDayDetail(activeTimelineDayIndex);
    renderTimeline();
    filterMapByDay((activeTimelineDayIndex + 1).toString());
  });
};

// =========================================================
// Checklist Progress & LocalStorage Persistence Engine
// =========================================================
window.updateChecklistProgress = function() {
  const checkboxes = document.querySelectorAll('#tab-checklist .chk-item');
  if (!checkboxes || checkboxes.length === 0) return;

  const total = checkboxes.length;
  let checked = 0;
  const checkedStates = [];

  checkboxes.forEach((chk, index) => {
    if (chk.checked) {
      checked++;
      checkedStates.push(index);
    }
  });

  const pct = Math.round((checked / total) * 100);
  const textElem = document.getElementById('checklistProgressText');
  if (textElem) {
    textElem.innerText = `완료: ${checked} / ${total} 항목 (${pct}%)`;
  }

  try {
    localStorage.setItem('italy_checklist_checked_indices', JSON.stringify(checkedStates));
  } catch(e) {}
};

window.initChecklistState = function() {
  const checkboxes = document.querySelectorAll('#tab-checklist .chk-item');
  if (!checkboxes || checkboxes.length === 0) return;

  try {
    const saved = localStorage.getItem('italy_checklist_checked_indices');
    if (saved !== null) {
      const checkedIndices = JSON.parse(saved);
      checkboxes.forEach((chk, index) => {
        chk.checked = checkedIndices.includes(index);
      });
    }
  } catch(e) {}

  updateChecklistProgress();
};

