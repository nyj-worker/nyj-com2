/**
 * 남양주시 대시보드 인터랙티브 시각화 차트 스크립트 (Chart.js 기반)
 * 고해상도 반응형, 다크 테마 커스텀 팔레트 및 애니메이션 적용
 */

(function () {
  // Chart.js 전역 기본 옵션 설정
  Chart.defaults.color = "#94a3b8";
  Chart.defaults.borderColor = "rgba(255, 255, 255, 0.06)";
  Chart.defaults.font.family = "'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif";
  Chart.defaults.font.size = 12;
  Chart.defaults.plugins.tooltip.backgroundColor = "rgba(15, 23, 42, 0.95)";
  Chart.defaults.plugins.tooltip.titleColor = "#f8fafc";
  Chart.defaults.plugins.tooltip.bodyColor = "#cbd5e1";
  Chart.defaults.plugins.tooltip.borderColor = "rgba(255, 255, 255, 0.15)";
  Chart.defaults.plugins.tooltip.borderWidth = 1;
  Chart.defaults.plugins.tooltip.padding = 12;
  Chart.defaults.plugins.tooltip.cornerRadius = 8;

  // 차트 인스턴스 저장소
  const chartInstances = {};

  function initDashboardCharts() {
    const data = window.NYJ_DATA;
    if (!data) {
      console.error("NYJ_DATA is not loaded!");
      return;
    }

    // 1. 고용 변동 차트들
    initEmploymentCharts(data.employment);

    // 2. 업력 구조 차트들
    initAgeCharts(data.companyAge);

    // 3. 핵심 5개 업종 차트들
    initIndustryCharts(data.topIndustries);

    // 4. 신설 및 휴폐업 차트들
    initDynamicsCharts(data.dynamics);

    // 5. 시군 비교 차트들
    initCityComparisonCharts(data.cityComparison);

    // 6. 공장 등록 차트들
    initFactoryCharts(data.factory);

    // 7. 기업 이전 동향 차트들
    initRelocationCharts(data.relocation);
  }

  /* ----------------------------------------------------
     1. 고용 변동 시각화
     ---------------------------------------------------- */
  function initEmploymentCharts(empData) {
    // 1-1. 연도별 기업 vs 종사자 추이 복합 차트
    const ctxTrend = document.getElementById("chart-employment-trend");
    if (ctxTrend) {
      chartInstances.empTrend = new Chart(ctxTrend, {
        type: "bar",
        data: {
          labels: empData.yearlyTrends.years,
          datasets: [
            {
              label: "활동기업 수 (개)",
              data: empData.yearlyTrends.companies,
              backgroundColor: "rgba(16, 185, 129, 0.65)",
              borderColor: "#10b981",
              borderWidth: 1.5,
              borderRadius: 6,
              yAxisID: "yBiz",
              order: 2,
            },
            {
              label: "종사자 수 (명)",
              data: empData.yearlyTrends.employees,
              type: "line",
              borderColor: "#38bdf8",
              backgroundColor: "rgba(56, 189, 248, 0.15)",
              borderWidth: 3,
              pointBackgroundColor: "#0284c7",
              pointBorderColor: "#fff",
              pointHoverRadius: 6,
              fill: false,
              tension: 0.3,
              yAxisID: "yEmp",
              order: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: { mode: "index", intersect: false },
          scales: {
            yBiz: {
              type: "linear",
              position: "left",
              title: { display: true, text: "활동기업 수 (개)", color: "#10b981" },
              min: 24000,
              max: 36000,
            },
            yEmp: {
              type: "linear",
              position: "right",
              title: { display: true, text: "종사자 수 (명)", color: "#38bdf8" },
              min: 48000,
              max: 53000,
              grid: { drawOnChartArea: false },
            },
          },
        },
      });
    }

    // 1-2. 규모 구간별 기업 vs 종사자 증감 수평 바 차트
    const ctxSize = document.getElementById("chart-employment-size");
    if (ctxSize) {
      chartInstances.empSize = new Chart(ctxSize, {
        type: "bar",
        data: {
          labels: empData.sizeDistribution.map((d) => d.size),
          datasets: [
            {
              label: "기업 수 증감 (개)",
              data: empData.sizeDistribution.map((d) => d.companyDiff),
              backgroundColor: empData.sizeDistribution.map((d) =>
                d.companyDiff >= 0 ? "rgba(16, 185, 129, 0.8)" : "rgba(244, 63, 94, 0.8)"
              ),
              borderRadius: 5,
            },
            {
              label: "종사자 증감 (명)",
              data: empData.sizeDistribution.map((d) => d.employeeDiff),
              backgroundColor: empData.sizeDistribution.map((d) =>
                d.employeeDiff >= 0 ? "rgba(56, 189, 248, 0.8)" : "rgba(251, 146, 60, 0.8)"
              ),
              borderRadius: 5,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          indexAxis: "y",
          plugins: {
            legend: { position: "top" },
          },
        },
      });
    }

    // 1-3. 읍면동별 고용 증감 순위 바 차트
    const ctxRegion = document.getElementById("chart-employment-town");
    if (ctxRegion) {
      const topBottomTowns = empData.regionEmployees;
      chartInstances.empTown = new Chart(ctxRegion, {
        type: "bar",
        data: {
          labels: topBottomTowns.map((t) => t.name),
          datasets: [
            {
              label: "종사자 증감 (명, 최근 1년)",
              data: topBottomTowns.map((t) => t.empDiff),
              backgroundColor: topBottomTowns.map((t) =>
                t.empDiff > 0 ? "rgba(52, 211, 153, 0.75)" : "rgba(244, 63, 94, 0.75)"
              ),
              borderRadius: 4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
          },
          scales: {
            x: { ticks: { autoSkip: false, maxRotation: 45, minRotation: 45 } },
          },
        },
      });
    }
  }

  /* ----------------------------------------------------
     2. 업력 구조 시각화
     ---------------------------------------------------- */
  function initAgeCharts(ageData) {
    // 2-1. 업력 구간 구성비 추이
    const ctxAgeRatio = document.getElementById("chart-age-ratio");
    if (ctxAgeRatio) {
      chartInstances.ageRatio = new Chart(ctxAgeRatio, {
        type: "bar",
        data: {
          labels: ageData.ageBreakdownByPeriod.map((p) => p.period),
          datasets: [
            {
              label: "5년 미만",
              data: ageData.ageBreakdownByPeriod.map((p) => p.under5),
              backgroundColor: "#38bdf8",
            },
            {
              label: "5~10년",
              data: ageData.ageBreakdownByPeriod.map((p) => p.mid5to10),
              backgroundColor: "#818cf8",
            },
            {
              label: "10년 이상",
              data: ageData.ageBreakdownByPeriod.map((p) => p.over10),
              backgroundColor: "#10b981",
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: { stacked: true },
            y: { stacked: true, max: 100, title: { display: true, text: "비중 (%)" } },
          },
        },
      });
    }

    // 2-2. 10년 이상 vs 5년 미만 기업 수 추이
    const ctxAgeCounts = document.getElementById("chart-age-counts");
    if (ctxAgeCounts) {
      chartInstances.ageCounts = new Chart(ctxAgeCounts, {
        type: "line",
        data: {
          labels: ageData.ageCounts.map((p) => p.period),
          datasets: [
            {
              label: "10년 이상 법인 (1.9배 증가)",
              data: ageData.ageCounts.map((p) => p.over10Count),
              borderColor: "#10b981",
              backgroundColor: "rgba(16, 185, 129, 0.15)",
              borderWidth: 3,
              fill: true,
              tension: 0.3,
            },
            {
              label: "5년 미만 법인 (신규 유입 지속)",
              data: ageData.ageCounts.map((p) => p.under5Count),
              borderColor: "#38bdf8",
              backgroundColor: "transparent",
              borderWidth: 2,
              borderDash: [5, 5],
              tension: 0.3,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: { mode: "index", intersect: false },
        },
      });
    }

    // 2-3. 주요 읍면동 5년 미만 젊은 기업 비중
    const ctxTownAge = document.getElementById("chart-town-age");
    if (ctxTownAge) {
      chartInstances.townAge = new Chart(ctxTownAge, {
        type: "bar",
        data: {
          labels: ageData.townUnder5Ratio.map((t) => t.name),
          datasets: [
            {
              label: "설립 5년 미만 비중 (%)",
              data: ageData.townUnder5Ratio.map((t) => t.ratio),
              backgroundColor: ageData.townUnder5Ratio.map((t) =>
                t.name === "별내동" ? "#06b6d4" : t.name === "남양주시 평균" ? "#10b981" : "rgba(148, 163, 184, 0.6)"
              ),
              borderRadius: 4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { ticks: { autoSkip: false, maxRotation: 45, minRotation: 45 } },
            y: { max: 80, title: { display: true, text: "비중 (%)" } },
          },
        },
      });
    }
  }

  /* ----------------------------------------------------
     3. 핵심 5개 업종 시각화
     ---------------------------------------------------- */
  function initIndustryCharts(indData) {
    const ctxCompare = document.getElementById("chart-top5-compare");
    if (ctxCompare) {
      chartInstances.top5Compare = new Chart(ctxCompare, {
        type: "bar",
        data: {
          labels: indData.list.map((i) => i.name),
          datasets: [
            {
              label: "활동기업 수 (개)",
              data: indData.list.map((i) => i.companies),
              backgroundColor: "rgba(59, 130, 246, 0.75)",
              borderRadius: 5,
              yAxisID: "y1",
            },
            {
              label: "종사자 수 (명)",
              data: indData.list.map((i) => i.employees),
              backgroundColor: "rgba(16, 185, 129, 0.75)",
              borderRadius: 5,
              yAxisID: "y1",
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: { ticks: { autoSkip: false, maxRotation: 20, minRotation: 0 } },
            y1: {
              type: "linear",
              position: "left",
              title: { display: true, text: "규모 (개 / 명)" },
            },
          },
        },
      });
    }

    // 식료품 공장 증가 지역 차트
    const ctxFood = document.getElementById("chart-food-factories");
    if (ctxFood) {
      const foodData = indData.foodIndustrySpotlight.townDistribution;
      chartInstances.foodChart = new Chart(ctxFood, {
        type: "bar",
        data: {
          labels: foodData.map((f) => f.name),
          datasets: [
            {
              label: "2023.06 공장 수",
              data: foodData.map((f) => f.f2023),
              backgroundColor: "rgba(100, 116, 139, 0.6)",
              borderRadius: 4,
            },
            {
              label: "2025.12 공장 수",
              data: foodData.map((f) => f.f2025),
              backgroundColor: "rgba(16, 185, 129, 0.8)",
              borderRadius: 4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    }
  }

  /* ----------------------------------------------------
     4. 신설 및 휴폐업 동향 시각화
     ---------------------------------------------------- */
  function initDynamicsCharts(dynData) {
    const ctxNet = document.getElementById("chart-dynamics-net");
    if (ctxNet) {
      chartInstances.dynamicsNet = new Chart(ctxNet, {
        type: "bar",
        data: {
          labels: dynData.janMayTrends.map((t) => t.year + "년 (1~5월)"),
          datasets: [
            {
              label: "신설 (건)",
              data: dynData.janMayTrends.map((t) => t.newBiz),
              backgroundColor: "rgba(16, 185, 129, 0.8)",
              borderRadius: 4,
            },
            {
              label: "휴폐업 (건)",
              data: dynData.janMayTrends.map((t) => t.closedBiz),
              backgroundColor: "rgba(244, 63, 94, 0.8)",
              borderRadius: 4,
            },
            {
              type: "line",
              label: "순증 건수 (건)",
              data: dynData.janMayTrends.map((t) => t.net),
              borderColor: "#f59e0b",
              borderWidth: 2.5,
              pointBackgroundColor: "#f59e0b",
              tension: 0.2,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: { title: { display: true, text: "법인 건수 (건)" } },
          },
        },
      });
    }

    // 업종별 신규 유입 배율
    const ctxMultiplier = document.getElementById("chart-dynamics-multiplier");
    if (ctxMultiplier) {
      chartInstances.multiplier = new Chart(ctxMultiplier, {
        type: "bar",
        data: {
          labels: dynData.industryInflowMultiplier.map((m) => m.name),
          datasets: [
            {
              label: "신설 유입 배율 (1.0 = 평균)",
              data: dynData.industryInflowMultiplier.map((m) => m.mult),
              backgroundColor: dynData.industryInflowMultiplier.map((m) =>
                m.mult >= 1.0 ? "rgba(6, 182, 212, 0.8)" : "rgba(251, 146, 60, 0.8)"
              ),
              borderRadius: 4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          indexAxis: "y",
          plugins: {
            legend: { display: false },
          },
          scales: {
            x: { min: 0.4, max: 1.8, title: { display: true, text: "유입 배율" } },
          },
        },
      });
    }
  }

  /* ----------------------------------------------------
     5. 경기 5개 시군 비교 시각화
     ---------------------------------------------------- */
  function initCityComparisonCharts(cityData) {
    // 5-1. 활동기업 수 및 전 기간 성장률
    const ctxGrowth = document.getElementById("chart-city-growth");
    if (ctxGrowth) {
      chartInstances.cityGrowth = new Chart(ctxGrowth, {
        type: "bar",
        data: {
          labels: cityData.cities.map((c) => c.name),
          datasets: [
            {
              label: "활동기업 수 (개, 2026.05)",
              data: cityData.cities.map((c) => c.companies),
              backgroundColor: cityData.cities.map((c) =>
                c.name === "남양주시" ? "#10b981" : "rgba(100, 116, 139, 0.6)"
              ),
              borderRadius: 5,
              yAxisID: "yCount",
            },
            {
              label: "성장률 (%)",
              data: cityData.cities.map((c) => c.growthRate),
              type: "line",
              borderColor: "#f59e0b",
              pointBackgroundColor: "#f59e0b",
              borderWidth: 2,
              yAxisID: "yRate",
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            yCount: {
              type: "linear",
              position: "left",
              title: { display: true, text: "활동기업 수 (개)" },
            },
            yRate: {
              type: "linear",
              position: "right",
              title: { display: true, text: "성장률 (%)" },
              grid: { drawOnChartArea: false },
            },
          },
        },
      });
    }

    // 5-2. 전문·과학·기술 서비스 기업 수 비교 (남양주 1위 부각)
    const ctxSciTech = document.getElementById("chart-city-scitech");
    if (ctxSciTech) {
      chartInstances.citySciTech = new Chart(ctxSciTech, {
        type: "bar",
        data: {
          labels: cityData.cities.map((c) => c.name),
          datasets: [
            {
              label: "전문·과학·기술 기업 수 (개)",
              data: cityData.cities.map((c) => c.sciTechCompanies),
              backgroundColor: cityData.cities.map((c) =>
                c.name === "남양주시" ? "#06b6d4" : "rgba(71, 85, 105, 0.6)"
              ),
              borderRadius: 6,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            y: { title: { display: true, text: "기업 수 (개)" } },
          },
        },
      });
    }
  }

  /* ----------------------------------------------------
     6. 공장 등록 및 제조 기반 시각화
     ---------------------------------------------------- */
  function initFactoryCharts(facData) {
    // 6-1. 읍면동별 등록공장 수 증감
    const ctxTownFac = document.getElementById("chart-factory-town");
    if (ctxTownFac) {
      chartInstances.townFac = new Chart(ctxTownFac, {
        type: "bar",
        data: {
          labels: facData.townFactoryChanges.map((t) => t.name),
          datasets: [
            {
              label: "등록공장 수 증감 (개, 2023.06 → 2025.12)",
              data: facData.townFactoryChanges.map((t) => t.fDiff),
              backgroundColor: facData.townFactoryChanges.map((t) =>
                t.fDiff >= 0 ? "rgba(16, 185, 129, 0.8)" : "rgba(244, 63, 94, 0.8)"
              ),
              borderRadius: 4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
        },
      });
    }

    // 6-2. 기업 증감 × 공장 증감 사분면 분산 차트
    const ctxScatter = document.getElementById("chart-factory-quadrant");
    if (ctxScatter) {
      const scatterPoints = facData.industryFactoryChanges.map((ind) => ({
        x: ind.bizDiff,
        y: ind.factoryDiff,
        label: ind.name,
        highlight: ind.highlight,
      }));

      chartInstances.quadrant = new Chart(ctxScatter, {
        type: "scatter",
        data: {
          datasets: [
            {
              label: "제조 업종",
              data: scatterPoints,
              backgroundColor: (context) => {
                const pt = context.raw;
                return pt && pt.highlight ? "#10b981" : "rgba(148, 163, 184, 0.7)";
              },
              pointRadius: (context) => {
                const pt = context.raw;
                return pt && pt.highlight ? 12 : 8;
              },
              pointHoverRadius: 14,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            tooltip: {
              callbacks: {
                label: function (context) {
                  const pt = context.raw;
                  return `${pt.label}: 기업증감 ${pt.x > 0 ? "+" : ""}${pt.x}개, 공장증감 ${pt.y > 0 ? "+" : ""}${pt.y}개`;
                },
              },
            },
          },
          scales: {
            x: {
              title: { display: true, text: "기업 수 증감 (개)" },
              grid: { color: (c) => (c.tick.value === 0 ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.06)") },
            },
            y: {
              title: { display: true, text: "공장 수 증감 (개)" },
              grid: { color: (c) => (c.tick.value === 0 ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.06)") },
            },
          },
        },
      });
    }
  }

  /* ----------------------------------------------------
     7. 기업 이전 동향 시각화
     ---------------------------------------------------- */
  function initRelocationCharts(reloData) {
    // 7-1. 연계 시군별 순이동 바 차트
    const ctxRelo = document.getElementById("chart-relocation-corridor");
    if (ctxRelo) {
      chartInstances.reloCorridor = new Chart(ctxRelo, {
        type: "bar",
        data: {
          labels: reloData.keyCityCorridors.map((c) => c.city),
          datasets: [
            {
              label: "순이동 건수 (전입 - 전출, 건)",
              data: reloData.keyCityCorridors.map((c) => c.net),
              backgroundColor: reloData.keyCityCorridors.map((c) => c.color),
              borderRadius: 5,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                afterLabel: function (context) {
                  const item = reloData.keyCityCorridors[context.dataIndex];
                  return `전입: ${item.inflow}건 / 전출: ${item.outflow}건\n특징: ${item.role}`;
                },
              },
            },
          },
        },
      });
    }

    // 7-2. 관내 시내 이동 비중 도넛 차트
    const ctxDonut = document.getElementById("chart-relocation-donut");
    if (ctxDonut) {
      chartInstances.reloDonut = new Chart(ctxDonut, {
        type: "doughnut",
        data: {
          labels: ["남양주 관내 이동 (54.1%)", "경기도 타 시군 이전 (45.9%)"],
          datasets: [
            {
              data: [reloData.overallMovement.internalMoves, reloData.overallMovement.totalMoves - reloData.overallMovement.internalMoves],
              backgroundColor: ["#10b981", "#334155"],
              borderColor: "transparent",
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: "bottom" },
          },
        },
      });
    }
  }

  // 외부에 초기화 함수 노출
  window.initDashboardCharts = initDashboardCharts;
})();
