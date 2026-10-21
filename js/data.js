/**
 * 남양주시 산업 구조 및 기업 현황 분석 데이터셋
 * 출처: 경기도 민간데이터 공동구매(NICE 기업DB 41개월) 및 한국산업단지공단(공장등록 6개 반기)
 * 기준 시점: 2023년 1월 ~ 2026년 5월
 */

const NYJ_DATA = {
  // 1. 메인 헤드라인 및 총괄 지표
  overview: {
    title: "남양주시 산업 구조 및 기업 현황 분석",
    subtitle: "기업·고용 41개월(2023.01~2026.05) · 공장등록 6개 반기(2023.06~2025.12)",
    reportDate: "2026.08",
    keyMetrics: [
      {
        id: "active_biz",
        label: "활동기업 수",
        value: 33559,
        unit: "개",
        change: "+36.6%",
        changeText: "41개월간 9,164개 증가",
        subtext: "경기 5개 시군 중 2위",
        trend: "up",
        color: "emerald"
      },
      {
        id: "employees",
        label: "국민연금 가입 종사자",
        value: 51877,
        unit: "명",
        change: "+2.9%",
        changeText: "동기간 1,443명 증가",
        subtext: "기업 증가 대비 고용 완만",
        trend: "neutral",
        color: "blue"
      },
      {
        id: "factories",
        label: "등록공장 수",
        value: 2711,
        unit: "개",
        change: "-4.8%",
        changeText: "6개 반기 동안 130개 감소",
        subtext: "2024년 상반기 급감 후 정체",
        trend: "down",
        color: "amber"
      },
      {
        id: "sci_tech",
        label: "전문·과학·기술 기업",
        value: 2183,
        unit: "개",
        change: "1위",
        changeText: "비교 5개 시군 중 최다",
        subtext: "지식서비스업 유입 가속",
        trend: "up",
        color: "cyan"
      },
      {
        id: "food_mfg",
        label: "제조업 내 식료품 비중",
        value: 11.2,
        unit: "%",
        change: "1위",
        changeText: "비교 5개 시군 중 최고",
        subtext: "기업·공장·고용 4대 지표 트리플 상승",
        trend: "up",
        color: "teal"
      },
      {
        id: "startup_ratio",
        label: "신설/휴폐업 배수",
        value: 4.4,
        unit: "배",
        change: "+40.6%",
        changeText: "2026 1~5월 신설 724건 반등",
        subtext: "창업 활력 4년 중 최고",
        trend: "up",
        color: "purple"
      }
    ]
  },

  // 2. 고용 변동 데이터
  employment: {
    summary: {
      title: "성장의 실체는 기업 수 증가이며, 고용 확대로는 아직 이어지지 않음",
      points: [
        "고용 정보 확인 기업이 6,224개에서 7,135개로 15% 늘어나는 동안 종사자는 3% 증가에 그침",
        "기업당 고용 인원은 8.1명에서 7.3명으로 -10.2% 감소 (5개 시군 공통)",
        "줄어드는 구간은 5~29인 중간 규모로, 기업 -195개 및 종사자 -1,736명 감소",
        "고용 증가는 다산2동(+1,131명), 화도읍(+984명), 별내동(+914명) 등 신도시권에 집중"
      ]
    },
    yearlyTrends: {
      years: ["2023", "2024", "2025", "2026(1~5월)"],
      companies: [28014, 30814, 33287, 34219],
      companyGrowth: [11.8, 10.0, 8.0, 2.8],
      employees: [50518, 50031, 49777, 51877],
      employeeGrowth: [0.2, -1.0, -0.5, 4.2]
    },
    sizeDistribution: [
      { size: "1~4인", companyDiff: 6, employeeDiff: 12 },
      { size: "5~9인", companyDiff: -117, employeeDiff: -784 },
      { size: "10~29인", companyDiff: -78, employeeDiff: -952 },
      { size: "30인 이상", companyDiff: 30, employeeDiff: 3167 }
    ],
    regionEmployees: [
      { name: "다산2동", empDiff: 1131, bizDiff: 800 },
      { name: "화도읍", empDiff: 984, bizDiff: 710 },
      { name: "별내동", empDiff: 914, bizDiff: 3768 },
      { name: "다산1동", empDiff: 475, bizDiff: 994 },
      { name: "진접읍", empDiff: 285, bizDiff: 662 },
      { name: "와부읍", empDiff: 148, bizDiff: 433 },
      { name: "평내동", empDiff: 18, bizDiff: 158 },
      { name: "조안면", empDiff: 0, bizDiff: 35 },
      { name: "수동면", empDiff: -23, bizDiff: 180 },
      { name: "퇴계원읍", empDiff: -47, bizDiff: 137 },
      { name: "양정동", empDiff: -66, bizDiff: -79 },
      { name: "호평동", empDiff: -89, bizDiff: 124 },
      { name: "오남읍", empDiff: -107, bizDiff: 253 },
      { name: "금곡동", empDiff: -110, bizDiff: 606 },
      { name: "별내면", empDiff: -125, bizDiff: 71 },
      { name: "진건읍", empDiff: -283, bizDiff: 367 }
    ],
    industryEmployees: {
      top: [
        { name: "금융업", diff: 1000 },
        { name: "식료품 제조업", diff: 549 },
        { name: "건축기술·엔지니어링", diff: 505 },
        { name: "소매업", diff: 391 },
        { name: "육상운송 및 파이프라인", diff: 299 },
        { name: "교육 서비스업", diff: 156 },
        { name: "폐기물 수집·처리·원료재생", diff: 148 }
      ],
      bottom: [
        { name: "임대업", diff: -50 },
        { name: "도매 및 상품 중개업", diff: -65 },
        { name: "가구 제조업", diff: -74 },
        { name: "고무 및 플라스틱 제조업", diff: -76 },
        { name: "전문직별 공사업", diff: -237 }
      ]
    }
  },

  // 3. 업력 구조 데이터
  companyAge: {
    summary: {
      title: "자리 잡는 도시로 이동 중이나, 업종과 지역에 따라 속도 차이가 큼",
      points: [
        "10년 이상 법인이 2,653개에서 5,064개로 1.9배 대폭 증가",
        "설립 5년 미만 비중은 54.5%에서 46.3%로 하락했으나 법인 수는 8,341개에서 9,614개로 여전히 증가",
        "신규 유입이 안정적으로 유지되는 가운데 살아남은 기업이 축적되는 정착 단계로 진입",
        "별내동은 10개 중 7개(67.0%)가 5년 미만으로 창업이 초집중됨 (양정동 22.7%와 3배 격차)"
      ]
    },
    ageBreakdownByPeriod: [
      { period: "2023.01", under5: 54.5, mid5to10: 24.0, over10: 17.3, unknown: 4.2 },
      { period: "2023.12", under5: 53.1, mid5to10: 24.7, over10: 18.3, unknown: 3.9 },
      { period: "2024.12", under5: 51.6, mid5to10: 24.8, over10: 19.9, unknown: 3.7 },
      { period: "2025.12", under5: 47.6, mid5to10: 27.0, over10: 23.7, unknown: 1.7 },
      { period: "2026.05", under5: 46.3, mid5to10: 27.7, over10: 24.4, unknown: 1.6 }
    ],
    ageCounts: [
      { period: "2023.01", under5Count: 8341, mid5to10Count: 3678, over10Count: 2653 },
      { period: "2023.12", under5Count: 8940, mid5to10Count: 4160, over10Count: 3080 },
      { period: "2024.12", under5Count: 9780, mid5to10Count: 4700, over10Count: 3770 },
      { period: "2025.12", under5Count: 9580, mid5to10Count: 5440, over10Count: 4770 },
      { period: "2026.05", under5Count: 9614, mid5to10Count: 5744, over10Count: 5064 }
    ],
    cityUnder5Ratio: [
      { name: "김포시", ratio: 47.9 },
      { name: "남양주시", ratio: 46.3 },
      { name: "파주시", ratio: 41.6 },
      { name: "양주시", ratio: 41.3 },
      { name: "의정부시", ratio: 35.2 }
    ],
    industryAgeRatios: {
      youngest: [
        { name: "영상·오디오 기록물 제작 및 배급", ratio: 75.5 },
        { name: "전문 서비스업", ratio: 69.7 },
        { name: "금융업", ratio: 61.7 },
        { name: "출판업", ratio: 61.5 },
        { name: "기타 전문·과학 및 기술 서비스업", ratio: 58.4 }
      ],
      oldest: [
        { name: "전문직별 공사업", ratio: 30.9 },
        { name: "전기장비 제조업", ratio: 29.0 },
        { name: "기타 기계 및 장비 제조업", ratio: 28.3 },
        { name: "섬유제품 제조업", ratio: 24.1 },
        { name: "금속가공제품 제조업", ratio: 23.2 }
      ]
    },
    townUnder5Ratio: [
      { name: "별내동", ratio: 67.0 },
      { name: "퇴계원읍", ratio: 59.0 },
      { name: "다산1동", ratio: 48.0 },
      { name: "다산2동", ratio: 48.0 },
      { name: "남양주시 평균", ratio: 46.3 },
      { name: "진건읍", ratio: 41.0 },
      { name: "호평동", ratio: 41.0 },
      { name: "화도읍", ratio: 40.0 },
      { name: "평내동", ratio: 36.0 },
      { name: "와부읍", ratio: 36.0 },
      { name: "진접읍", ratio: 36.0 },
      { name: "수동면", ratio: 35.0 },
      { name: "오남읍", ratio: 35.0 },
      { name: "별내면", ratio: 30.0 },
      { name: "조안면", ratio: 30.0 },
      { name: "금곡동", ratio: 23.0 },
      { name: "양정동", ratio: 22.7 }
    ]
  },

  // 4. 핵심 5대 업종 데이터
  topIndustries: {
    summary: {
      title: "핵심 5개 업종은 모두 생활밀착·내수형이며, 제조업은 식료품 하나뿐임",
      points: [
        "도매 및 상품중개업이 기업 수(6,485개) 및 종사자(9,265명) 모두 압도적 1위",
        "부동산업은 기업 수 3위(3,416개)이나 종사자는 24위(588명)로 대표적인 1인/소규모 업종",
        "식료품 제조업은 최근 1년간 기업(+63개), 종사자(+549명), 등록공장(+26개) 모두 증가한 유일한 업종",
        "소·도매 및 부동산업은 별내동에 극도로 밀집, 식료품 제조업은 진접(189개)·화도(136개)에 포진"
      ]
    },
    list: [
      {
        name: "도매 및 상품 중개업",
        companies: 6485,
        companyRank: 1,
        employees: 9265,
        employeeRank: 1,
        companyChange1Y: 357,
        employeeChange1Y: -65,
        topTown: "별내동 (1,273개)",
        badge: "규모 1위"
      },
      {
        name: "소매업 (자동차 제외)",
        companies: 5948,
        companyRank: 2,
        employees: 2101,
        employeeRank: 4,
        companyChange1Y: 413,
        employeeChange1Y: 391,
        topTown: "별내동 (1,869개)",
        badge: "창업 최다"
      },
      {
        name: "부동산업",
        companies: 3416,
        companyRank: 3,
        employees: 588,
        employeeRank: 24,
        companyChange1Y: 256,
        employeeChange1Y: 76,
        topTown: "별내동 (1,190개)",
        badge: "소규모 집중"
      },
      {
        name: "전문직별 공사업",
        companies: 1655,
        companyRank: 4,
        employees: 5714,
        employeeRank: 2,
        companyChange1Y: 121,
        employeeChange1Y: -237,
        topTown: "별내동 (273개)",
        badge: "고용 감소세"
      },
      {
        name: "식료품 제조업",
        companies: 798,
        companyRank: 7,
        employees: 5085,
        employeeRank: 3,
        companyChange1Y: 63,
        employeeChange1Y: 549,
        factoryChange: 26,
        mfgShare: 11.2,
        topTown: "진접읍 (189개) · 화도읍 (136개)",
        badge: "전방위 성장"
      }
    ],
    foodIndustrySpotlight: {
      companyDiff: 175,
      factoryDiff: 26,
      employeeDiff: 549,
      mfgShare: 11.2,
      townDistribution: [
        { name: "진접읍", f2023: 68, f2025: 80, diff: 12 },
        { name: "오남읍", f2023: 14, f2025: 21, diff: 7 },
        { name: "다산동", f2023: 4, f2025: 9, diff: 5 },
        { name: "수동면", f2023: 21, f2025: 25, diff: 4 },
        { name: "화도읍", f2023: 48, f2025: 50, diff: 2 }
      ]
    }
  },

  // 5. 신설 및 휴폐업 데이터
  dynamics: {
    summary: {
      title: "신설이 휴폐업을 4.4배 앞서고, 2026년 창업은 4년 중 최고로 반등함",
      points: [
        "2025년 기준 신설 법인 1,549개 대 휴폐업 354개로 4.4배의 견고한 생태계 유지",
        "2026년 1~5월 신설 724건으로 전년 동기(515건) 대비 40.6% 급증하며 역대 최고치 경신",
        "창업 집중도는 별내동이 1.48로 최상위, 양정동은 0.36으로 4.1배 격차 발생",
        "지식서비스(기타전문과학 1.58배, 전문서비스 1.45배)의 유입이 두드러지나 여전히 42%는 도소매·부동산"
      ]
    },
    janMayTrends: [
      { year: "2023", newBiz: 676, closedBiz: 109, net: 567, newRate: 4.33, closeRate: 0.70 },
      { year: "2024", newBiz: 622, closedBiz: 96, net: 526, newRate: 3.59, closeRate: 0.55 },
      { year: "2025", newBiz: 515, closedBiz: 124, net: 391, newRate: 2.73, closeRate: 0.66 },
      { year: "2026", newBiz: 724, closedBiz: 184, net: 540, newRate: 3.53, closeRate: 0.90 }
    ],
    townCreationIndex: [
      { name: "별내동", index: 1.48 },
      { name: "와부읍", index: 1.31 },
      { name: "다산2동", index: 1.15 },
      { name: "다산1동", index: 1.10 },
      { name: "퇴계원읍", index: 1.09 },
      { name: "조안면", index: 0.96 },
      { name: "호평동", index: 0.88 },
      { name: "수동면", index: 0.74 },
      { name: "진접읍", index: 0.64 },
      { name: "별내면", index: 0.64 },
      { name: "화도읍", index: 0.58 },
      { name: "평내동", index: 0.55 },
      { name: "오남읍", index: 0.52 },
      { name: "금곡동", index: 0.41 },
      { name: "양정동", index: 0.36 }
    ],
    industryInflowMultiplier: [
      { name: "기타 전문·과학·기술", mult: 1.58 },
      { name: "음식점 및 주점업", mult: 1.55 },
      { name: "소매업", mult: 1.52 },
      { name: "전문 서비스업", mult: 1.45 },
      { name: "출판업", mult: 1.44 },
      { name: "영상·오디오", mult: 1.14 },
      { name: "식료품 제조업", mult: 1.10 },
      { name: "도매 및 상품 중개업", mult: 1.03 },
      { name: "교육 서비스업", mult: 0.89 },
      { name: "부동산업", mult: 0.83 },
      { name: "종합 건설업", mult: 0.77 },
      { name: "전문직별 공사업", mult: 0.62 }
    ]
  },

  // 6. 경기 5개 시군 비교 데이터
  cityComparison: {
    summary: {
      title: "규모는 2위이나 전문·과학·기술 서비스 기업은 5개 시군 중 가장 많음",
      points: [
        "활동기업 규모 34,219개로 김포시(40,410개)에 이은 2위 (성장률 +36.6%)",
        "전문·과학 및 기술 서비스업 기업 수는 2,183개로 5개 시군 중 단연 1위",
        "제조업 비중은 20.7%로 김포(29.3%), 양주(27.6%), 파주(25.7%)보다 낮은 서비스 중심형 구조",
        "제조업 내부 1위 특화업종은 식료품(11.2%)으로, 기계(김포·파주)나 섬유(양주·의정부)와 뚜렷이 구별"
      ]
    },
    cities: [
      {
        name: "남양주시",
        companies: 34219,
        growthRate: 36.6,
        sizeRank: 2,
        growthRank: 3,
        mfgRatio: 20.7,
        topMfgIndustry: "식료품 (11.2%)",
        sciTechCompanies: 2183,
        empPerBizStart: 8.1,
        empPerBizEnd: 7.3,
        empChangeRate: -10.2,
        newBizRate: 8.0,
        closeBizRate: 1.8
      },
      {
        name: "김포시",
        companies: 40410,
        growthRate: 51.5,
        sizeRank: 1,
        growthRank: 1,
        mfgRatio: 29.3,
        topMfgIndustry: "기타 기계 (18.8%)",
        sciTechCompanies: 1893,
        empPerBizStart: 8.6,
        empPerBizEnd: 7.8,
        empChangeRate: -9.3,
        newBizRate: 13.1,
        closeBizRate: 1.8
      },
      {
        name: "파주시",
        companies: 28973,
        growthRate: 33.5,
        sizeRank: 3,
        growthRank: 4,
        mfgRatio: 25.7,
        topMfgIndustry: "기타 기계 (9.1%)",
        sciTechCompanies: 1568,
        empPerBizStart: 10.9,
        empPerBizEnd: 9.7,
        empChangeRate: -11.5,
        newBizRate: 7.1,
        closeBizRate: 1.7
      },
      {
        name: "양주시",
        companies: 15316,
        growthRate: 50.3,
        sizeRank: 4,
        growthRank: 2,
        mfgRatio: 27.6,
        topMfgIndustry: "섬유 (23.0%)",
        sciTechCompanies: 467,
        empPerBizStart: 8.9,
        empPerBizEnd: 7.7,
        empChangeRate: -13.6,
        newBizRate: 7.3,
        closeBizRate: 2.4
      },
      {
        name: "의정부시",
        companies: 10712,
        growthRate: 20.7,
        sizeRank: 5,
        growthRank: 5,
        mfgRatio: 15.4,
        topMfgIndustry: "섬유 (14.6%)",
        sciTechCompanies: 692,
        empPerBizStart: 10.7,
        empPerBizEnd: 9.9,
        empChangeRate: -7.6,
        newBizRate: 6.2,
        closeBizRate: 2.1
      }
    ],
    timelineCounts: [
      { period: "2023.01", 김포: 26673, 남양주: 25055, 파주: 21696, 양주: 10190, 의정부: 8876 },
      { period: "2023.12", 김포: 29500, 남양주: 28014, 파주: 24100, 양주: 11400, 의정부: 9600 },
      { period: "2024.12", 김포: 32800, 남양주: 30814, 파주: 26200, 양주: 12200, 의정부: 10000 },
      { period: "2025.12", 김포: 38800, 남양주: 33287, 파주: 27900, 양주: 14700, 의정부: 10600 },
      { period: "2026.05", 김포: 40410, 남양주: 34219, 파주: 28973, 양주: 15316, 의정부: 10712 }
    ]
  },

  // 7. 공장 등록 및 제조 기반 데이터
  factory: {
    summary: {
      title: "제조업의 위축이 아니라 개별입지 소규모 공장의 유출",
      points: [
        "등록공장 -130개(-4.8%), 종업원 -1,080명(-4.2%) 감소",
        "감소는 화도(-93개, -811명), 진건(-50개), 와부(-42개), 수동(-38개) 4개 읍면에 집중",
        "반면 다산(+37개), 진접(+34개), 별내(+14개)는 공장이 증가하여 지역 내 분화 발생",
        "사라진 공장 130개는 100% 소기업이며, 2024년 상반기 한 반기에만 -129개가 몰려 발생"
      ]
    },
    periods: [
      { period: "2023.12", closed: 81, registered: 60, net: -21 },
      { period: "2024.06", closed: 204, registered: 75, net: -129 },
      { period: "2024.12", closed: 30, registered: 67, net: 37 },
      { period: "2025.06", closed: 107, registered: 79, net: -28 },
      { period: "2025.12", closed: 63, registered: 74, net: 11 }
    ],
    townFactoryChanges: [
      { name: "화도읍", f2023: 654, f2025: 561, fDiff: -93, empDiff: -811 },
      { name: "진건읍", f2023: 317, f2025: 267, fDiff: -50, empDiff: -209 },
      { name: "와부읍", f2023: 147, f2025: 105, fDiff: -42, empDiff: -380 },
      { name: "수동면", f2023: 344, f2025: 306, fDiff: -38, empDiff: -226 },
      { name: "오남읍", f2023: 267, f2025: 276, fDiff: 9, empDiff: 71 },
      { name: "별내동", f2023: 64, f2025: 78, fDiff: 14, empDiff: 70 },
      { name: "진접읍", f2023: 779, f2025: 813, fDiff: 34, empDiff: 339 },
      { name: "다산동", f2023: 61, f2025: 98, fDiff: 37, empDiff: 175 }
    ],
    factorySizeShift: [
      { type: "소기업", f2023: 2639, f2025: 2501, diff: -138 },
      { type: "중기업", f2023: 54, f2025: 60, diff: 6 },
      { type: "중견·대기업", f2023: 4, f2025: 6, diff: 2 }
    ],
    factoryInflowOutflow: {
      out: { count: 485, avgAge: 13.7, avgEmp: 7.3, label: "명단에서 사라진 공장" },
      in: { count: 354, avgAge: 0.8, avgEmp: 6.0, label: "새로 등록된 공장" },
      stay: { count: 2894, avgEmp: 9.8, label: "존속 공장" }
    },
    industryFactoryChanges: [
      { name: "식료품", factoryDiff: 26, bizDiff: 175, highlight: true },
      { name: "화학물질", factoryDiff: 2, bizDiff: 70 },
      { name: "금속가공", factoryDiff: -17, bizDiff: -15 },
      { name: "기타 기계", factoryDiff: -19, bizDiff: 25 },
      { name: "전기장비", factoryDiff: -19, bizDiff: -5 },
      { name: "가구 제조업", factoryDiff: -35, bizDiff: 35 }
    ]
  },

  // 8. 기업 이전 동향 데이터
  relocation: {
    summary: {
      title: "경기도 안에서는 순유출이며, 방향은 남쪽에서 받아 북쪽으로 내보내는 형태",
      points: [
        "경기도 전체 이전에서 전입 855건 대 전출 996건으로 -141건 순유출 발생",
        "연도별 순유출 폭은 2023년 -57건에서 2025년 -27건으로 점차 축소되는 안정화 추세",
        "남쪽 하남시에서 +117건을 순유입 받고, 북쪽 포천시로 -163건을 순유출하는 뚜렷한 남북 이동 축",
        "전체 기업 이전 2,171건 중 54%(1,175건)는 남양주시 관내에서 이동하여 높은 내부 정착성 입증"
      ]
    },
    overallMovement: {
      inflow: 855,
      outflow: 996,
      net: -141,
      internalMoves: 1175,
      totalMoves: 2171,
      internalRatio: 54.1
    },
    yearlyNetLoss: [
      { year: "2023", net: -57 },
      { year: "2024", net: -33 },
      { year: "2025", net: -27 },
      { year: "2026(1~5월)", net: -24 }
    ],
    internalMoveByYear: [
      { year: "2023", moves: 306 },
      { year: "2024", moves: 297 },
      { year: "2025", moves: 354 },
      { year: "2026(1~5월)", moves: 218 }
    ],
    keyCityCorridors: [
      { city: "하남시", inflow: 193, outflow: 76, net: 117, role: "남쪽 대규모 유입", color: "#10b981" },
      { city: "성남시", inflow: 52, outflow: 28, net: 24, role: "판교·분당권 유입", color: "#34d399" },
      { city: "구리시", inflow: 188, outflow: 211, net: -23, role: "생활권 밀접 양방향 교류 (총 399건 최다)", color: "#94a3b8" },
      { city: "의정부시", inflow: 38, outflow: 62, net: -24, role: "북부 인접지 소폭 유출", color: "#f87171" },
      { city: "양주시", inflow: 25, outflow: 63, net: -38, role: "북부 제조지 유출", color: "#ef4444" },
      { city: "포천시", inflow: 47, outflow: 210, net: -163, role: "북쪽 대규모 공장 유출", color: "#dc2626" }
    ]
  },

  // 9. 종합 진단 및 4대 정책 제언
  policy: {
    diagnostics: [
      { domain: "고용", fact: "기업 15% 증가, 종사자는 3% 증가", meaning: "기업당 8.1명 → 7.3명 감소", status: "경고" },
      { domain: "업력", fact: "10년 이상 기업 1.9배 증가, 5년 미만 46.3%", meaning: "기업 기반의 정착 단계 진입", status: "양호" },
      { domain: "업종", fact: "핵심 5개 중 식료품·소매만 고용 증가", meaning: "생활밀착형·내수형 중심 성장", status: "주의" },
      { domain: "생태계", fact: "신설이 휴폐업의 4.4배, 별내동 38.9% 쏠림", meaning: "창업 활력 높으나 지역 편중", status: "주의" },
      { domain: "비교", fact: "규모 2위, 전문서비스 기업 5시군 중 1위", meaning: "1위 김포와는 다른 지식기반 경로", status: "우수" },
      { domain: "공장", fact: "공장 -130개 중 화도·진건·와부·수동 네 곳 -223개", meaning: "시 전체가 아닌 4개 읍면의 국지적 문제", status: "경고" },
      { domain: "이전", fact: "하남(+117) 유입, 포천(-163) 유출, 시내 54%", meaning: "남양주 관내 이동 정착성 유지", status: "양호" }
    ],
    fourDirections: [
      {
        num: "01",
        title: "고용 사다리 복원 지원",
        target: "5~29인 규모 성장 병목 기업",
        basis: "5~29인 기업 -195개, 종사자 -1,736명 감소",
        action: "소기업에서 중기업으로 도약하는 스케일업(Scale-up) 패키지 바우처 및 청년 채용 연계 인센티브 집중 지원"
      },
      {
        num: "02",
        title: "스마트 계획입지 추가 공급 논의",
        target: "개별입지 영세 소기업 공장",
        basis: "개별입지 비중 95.5%, 사라진 공장 개별입지 97.5%",
        action: "무분별한 개별입지 공장의 포천 유출을 차단할 친환경·지식산업형 계획입지(산단/지식산업센터) 공급 및 집적화"
      },
      {
        num: "03",
        title: "지역별 맞춤형 이원화 대응",
        target: "신도시(별내·다산) vs 전통제조지(화도·진건·와부·수동)",
        basis: "별내 창업집중도 1.48 vs 화도 공장감소 -93개",
        action: "별내·다산은 ICT·전문과학 창업 밸리로 고도화하고, 화도·진건 등은 공장 이탈 사유 정밀 실태조사 및 업종 고도화 지원"
      },
      {
        num: "04",
        title: "식료품 제조업을 독보적 전략 성장축 육성",
        target: "식료품 제조 가치사슬 전반",
        basis: "기업 +175개, 공장 +26개, 종사자 +549명, 비중 11.2%로 전 지표 1위",
        action: "푸드테크(FoodTech), 친환경 바이오 포장, 스마트 HACCP 물류 연계 남양주 로컬 푸드 밸리 조성"
      }
    ]
  }
};

// 브라우저 글로벌 등록
if (typeof window !== "undefined") {
  window.NYJ_DATA = NYJ_DATA;
}
