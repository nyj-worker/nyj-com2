/**
 * 남양주시 산업 구조 및 기업 현황 분석 수정 보고서의 집계 데이터
 * NICE 기업DB · 국민연금공단 근로자 이동현황 · 한국산업단지공단 전국공장등록현황
 * 기업·고용: 2023.01~2026.05 / 공장: 2023.06~2025.12
 */

const NYJ_DATA = {
  // 보고서 본문 시군 비교표의 등록공장 총계를 사용합니다(읍면동 붙임과 1개 차이).
  overview: {
    keyMetrics: [
      { id: "active_biz", value: 34219 },
      { id: "employees", value: 107843 },
      { id: "factories", value: 2567 },
      { id: "sci_tech", value: 2183 },
      { id: "food_mfg", value: 11.2 },
      { id: "startup_ratio", value: 4.4 }
    ],
  },

  employment: {
    yearlyTrends: {
      years: ["2023.01", "2023.12", "2024.12", "2025.12", "2026.05"],
      companies: [25055, 28014, 30814, 33287, 34219],
      employees: [108709, 108217, 107900, 107334, 107843]
    },
    sizeDistribution: [
      { size: "1~4인", companyDiff: 6 },
      { size: "5~9인", companyDiff: -117 },
      { size: "10~29인", companyDiff: -78 },
      { size: "30인 이상", companyDiff: 30 }
    ],
    regionEmployees: [
      { name: "다산1동", empDiff: 1088 },
      { name: "별내동", empDiff: 830 },
      { name: "다산2동", empDiff: 569 },
      { name: "진접읍", empDiff: 166 },
      { name: "평내동", empDiff: 73 },
      { name: "화도읍", empDiff: 57 },
      { name: "퇴계원읍", empDiff: 28 },
      { name: "와부읍", empDiff: 25 },
      { name: "조안면", empDiff: 7 },
      { name: "오남읍", empDiff: -52 },
      { name: "수동면", empDiff: -55 },
      { name: "호평동", empDiff: -89 },
      { name: "별내면", empDiff: -115 },
      { name: "양정동", empDiff: -295 },
      { name: "진건읍", empDiff: -516 },
      { name: "금곡동", empDiff: -644 }
    ],
  },

  companyAge: {
    ageBreakdownByPeriod: [
      { period: "2023.01", under5: 54.5, mid5to10: 24, over10: 17.3, unknown: 4.2 },
      { period: "2023.12", under5: 53.1, mid5to10: 24.7, over10: 18.3, unknown: 3.9 },
      { period: "2024.12", under5: 51.6, mid5to10: 24.8, over10: 19.9, unknown: 3.7 },
      { period: "2025.12", under5: 47.6, mid5to10: 27, over10: 23.7, unknown: 1.7 },
      { period: "2026.05", under5: 46.3, mid5to10: 27.7, over10: 24.4, unknown: 1.7 }
    ],
    ageCounts: [
      { period: "2023.01", under5Count: 8341, mid5to10Count: 3682, over10Count: 2653 },
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
        { name: "전기장비 제조업", ratio: 29 },
        { name: "기타 기계 및 장비 제조업", ratio: 28.3 },
        { name: "섬유제품 제조업", ratio: 24.1 },
        { name: "금속가공제품 제조업", ratio: 23.2 }
      ]
    },
    townUnder5Ratio: [
      { name: "별내동", ratio: 67 },
      { name: "퇴계원읍", ratio: 59 },
      { name: "다산1동", ratio: 48 },
      { name: "다산2동", ratio: 48 },
      { name: "남양주시 평균", ratio: 46.3 },
      { name: "진건읍", ratio: 41 },
      { name: "호평동", ratio: 41 },
      { name: "화도읍", ratio: 40 },
      { name: "평내동", ratio: 36 },
      { name: "와부읍", ratio: 36 },
      { name: "진접읍", ratio: 36 },
      { name: "수동면", ratio: 35 },
      { name: "오남읍", ratio: 35 },
      { name: "별내면", ratio: 30 },
      { name: "조안면", ratio: 30 },
      { name: "금곡동", ratio: 23 },
      { name: "양정동", ratio: 22.7 }
    ],
  },

  topIndustries: {
    list: [
      {
        name: "도매 및 상품 중개업",
        companies: 6485,
        companyRank: 1,
        employees: 15083,
        employeeRank: 1,
        companyChange1Y: 357,
        employeeChange1Y: -491,
        topTown: "별내동 (1,273개)",
        badge: "기업·종사자 수 1위"
      },
      {
        name: "소매업 (자동차 제외)",
        companies: 5948,
        companyRank: 2,
        employees: 6812,
        employeeRank: 4,
        companyChange1Y: 413,
        employeeChange1Y: 264,
        topTown: "별내동 (1,869개)",
        badge: "기업 수 증가 1위"
      },
      {
        name: "부동산업",
        companies: 3416,
        companyRank: 3,
        employees: 4514,
        employeeRank: 7,
        companyChange1Y: 256,
        employeeChange1Y: 104,
        topTown: "별내동 (1,190개)",
        badge: "기업·종사자 동반 증가"
      },
      {
        name: "전문직별 공사업",
        companies: 1655,
        companyRank: 4,
        employees: 7813,
        employeeRank: 3,
        companyChange1Y: 121,
        employeeChange1Y: 797,
        topTown: "별내동 (273개)",
        badge: "종사자 증가 1위"
      },
      {
        name: "식료품 제조업",
        companies: 798,
        companyRank: 7,
        employees: 5003,
        employeeRank: 6,
        companyChange1Y: 63,
        employeeChange1Y: 203,
        factoryChange: 26,
        mfgShare: 11.2,
        topTown: "진접읍 (189개) · 화도읍 (136개)",
        badge: "기업·종사자·공장 동반 증가"
      }
    ],
    foodIndustrySpotlight: {
      companyDiff: 175,
      factoryDiff: 26,
      employeeDiff: 382,
      mfgShare: 11.2,
      townDistribution: [
        { name: "진접읍", f2023: 67, f2025: 79, diff: 12 },
        { name: "오남읍", f2023: 14, f2025: 21, diff: 7 },
        { name: "다산동", f2023: 4, f2025: 8, diff: 4 },
        { name: "수동면", f2023: 20, f2025: 24, diff: 4 },
        { name: "별내동", f2023: 3, f2025: 5, diff: 2 },
        { name: "화도읍", f2023: 46, f2025: 47, diff: 1 }
      ]
    },
  },

  dynamics: {
    janMayTrends: [
      { year: "2023", newBiz: 676, closedBiz: 109, net: 567, newRate: 4.33, closeRate: 0.7 },
      { year: "2024", newBiz: 622, closedBiz: 96, net: 526, newRate: 3.59, closeRate: 0.55 },
      { year: "2025", newBiz: 515, closedBiz: 124, net: 391, newRate: 2.73, closeRate: 0.66 },
      { year: "2026", newBiz: 724, closedBiz: 184, net: 540, newRate: 3.53, closeRate: 0.9 }
    ],
    townCreationIndex: [
      { name: "별내동", index: 1.48 },
      { name: "와부읍", index: 1.31 },
      { name: "다산2동", index: 1.15 },
      { name: "다산1동", index: 1.1 },
      { name: "퇴계원읍", index: 1.09 },
      { name: "진건읍", index: 0.99 },
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
      { name: "식료품 제조업", mult: 1.1 },
      { name: "도매 및 상품 중개업", mult: 1.03 },
      { name: "교육 서비스업", mult: 0.89 },
      { name: "부동산업", mult: 0.83 },
      { name: "종합 건설업", mult: 0.77 },
      { name: "전문직별 공사업", mult: 0.62 }
    ],
  },

  cityComparison: {
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
        newBizRate: 8,
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
  },

  factory: {
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
      { name: "평내동", f2023: 14, f2025: 11, fDiff: -3, empDiff: -93 },
      { name: "퇴계원읍", f2023: 9, f2025: 7, fDiff: -2, empDiff: -13 },
      { name: "별내면", f2023: 16, f2025: 16, fDiff: 0, empDiff: -11 },
      { name: "조안면", f2023: 2, f2025: 2, fDiff: 0, empDiff: -13 },
      { name: "호평동", f2023: 2, f2025: 2, fDiff: 0, empDiff: 0 },
      { name: "금곡동", f2023: 20, f2025: 24, fDiff: 4, empDiff: 21 },
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
      in: { count: 354, avgAge: 0.8, avgEmp: 6, label: "새로 등록된 공장" }
    },
    industryFactoryChanges: [
      { name: "식료품", factoryDiff: 26, bizDiff: 175, highlight: true },
      { name: "기타 기계", factoryDiff: -19, bizDiff: 25 },
      { name: "가구 제조업", factoryDiff: -35, bizDiff: 35 }
    ],
  },

  relocation: {
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
      { city: "하남시", net: 117, color: "#10b981" },
      { city: "성남시", net: 24, color: "#34d399" },
      { city: "구리시", net: -23, color: "#94a3b8" },
      { city: "의정부시", net: -24, color: "#f87171" },
      { city: "양주시", net: -38, color: "#ef4444" },
      { city: "포천시", net: -163, color: "#dc2626" }
    ],
  },

  policy: {
    diagnostics: [
      { domain: "고용 변동", fact: "근무지 기준 종사자 0.8% 감소(108,709 → 107,843명)", meaning: "남양주 거주 근로자의 67.1%는 타 시군에서 근무" },
      { domain: "업력 구조", fact: "5년 미만 비중 54.5% → 46.3%, 10년 이상 법인 1.9배", meaning: "법인 업력 구성에서 중·장기 업력 비중 확대" },
      { domain: "핵심 업종", fact: "핵심 5개 업종 중 4개에서 종사자 증가, 도매업 491명 감소", meaning: "전문직별 공사업의 종사자 증가가 가장 큼(+797명)" },
      { domain: "신설·휴폐업", fact: "2025년 신설은 휴폐업의 4.4배, 별내동 신설 비중 38.9%", meaning: "신설은 유지되며 지역 편중이 나타남" },
      { domain: "시군 비교", fact: "기업 규모·신설률 2위, 성장률 3위, 전문·과학·기술 서비스 기업 수 1위", meaning: "비교 5개 시군 기준" },
      { domain: "공장 등록", fact: "시 전체 공장 -130개·종업원 -1,080명, 4개 읍면 공장 -223개", meaning: "화도·진건·와부·수동에 감소 집중" },
      { domain: "기업 이전", fact: "경기도 내 순유출 141건, 포천 방향 순유출 163건", meaning: "공장 감소와 기업 이전에 같은 기업이 포함됐는지는 미확인" }
    ],
  },
};

if (typeof window !== "undefined") {
  window.NYJ_DATA = NYJ_DATA;
}
