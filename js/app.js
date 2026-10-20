/**
 * 남양주시 대시보드 UI 인터랙션 및 상태 관리 스크립트
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. 차트 초기화 실행
  if (typeof window.initDashboardCharts === "function") {
    window.initDashboardCharts();
  }

  // 2. 숫자 카운트업 애니메이션 (KPI 숫자)
  initCountUpAnimation();

  // 3. 네비게이션 스크롤 스파이 (현재 섹션 감지)
  initScrollSpy();

  // 4. 모바일 사이드바 토글
  initMobileSidebar();

  // 5. 모달 팝업 제어
  initModal();

  // 6. 데이터 테이블 렌더링
  renderDynamicTables();

  // 7. Framer Motion 기반 스크롤 진입 애니메이션
  initFramerMotionScrollAnimation();

  // 8. 플로팅 탑(Top) 버튼 & 스크롤 진행률 링 제어
  initFloatingTopButton();
});

/**
 * KPI 카운트업 효과
 */
function initCountUpAnimation() {
  const countElements = document.querySelectorAll(".counter-val");

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseFloat(el.getAttribute("data-target"));
          const isFloat = el.getAttribute("data-float") === "true";
          const duration = 1600; // ms
          const startTime = performance.now();

          function updateNumber(currentTime) {
            const progress = Math.min((currentTime - startTime) / duration, 1);
            // easeOutExpo
            const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            const currentVal = target * easeProgress;

            if (isFloat) {
              el.textContent = currentVal.toFixed(1);
            } else {
              el.textContent = Math.floor(currentVal).toLocaleString();
            }

            if (progress < 1) {
              requestAnimationFrame(updateNumber);
            } else {
              if (isFloat) {
                el.textContent = target.toFixed(1);
              } else {
                el.textContent = target.toLocaleString();
              }
            }
          }

          requestAnimationFrame(updateNumber);
          obs.unobserve(el);
        }
      });
    },
    { threshold: 0.2 }
  );

  countElements.forEach((el) => observer.observe(el));
}

/**
 * 스크롤 스파이 & 부드러운 앵커 이동
 */
function initScrollSpy() {
  const sections = document.querySelectorAll(".dashboard-section, .hero-section");
  const navLinks = document.querySelectorAll(".nav-link");
  const currBreadcrumb = document.querySelector(".breadcrumb-curr");

  window.addEventListener("scroll", () => {
    let currentId = "";
    const scrollPos = window.scrollY + 160;

    sections.forEach((sec) => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = sec.getAttribute("id");
      }
    });

    if (currentId) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${currentId}`) {
          link.classList.add("active");
          const sectionName = link.querySelector(".nav-text")?.textContent || "개요";
          if (currBreadcrumb) {
            currBreadcrumb.textContent = sectionName;
          }
        }
      });
    }
  });

  // 부드러운 스크롤 이동 이벤트 핸들러
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (targetId.startsWith("#")) {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: "smooth" });

          // 모바일일 경우 사이드바 닫기
          const sidebar = document.querySelector(".sidebar");
          if (sidebar && sidebar.classList.contains("open")) {
            sidebar.classList.remove("open");
          }
        }
      }
    });
  });
}

/**
 * 모바일 사이드바 열림/닫힘
 */
function initMobileSidebar() {
  const toggleBtn = document.querySelector(".mobile-toggle");
  const sidebar = document.querySelector(".sidebar");

  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener("click", () => {
      sidebar.classList.toggle("open");
    });

    // 바깥 클릭 시 닫기
    document.addEventListener("click", (e) => {
      if (
        sidebar.classList.contains("open") &&
        !sidebar.contains(e.target) &&
        !toggleBtn.contains(e.target)
      ) {
        sidebar.classList.remove("open");
      }
    });
  }
}

/**
 * 보고서 요약 모달 제어
 */
function initModal() {
  const modalBackdrop = document.getElementById("report-modal");
  const openBtns = document.querySelectorAll(".btn-open-modal");
  const closeBtn = document.querySelector(".modal-close-btn");

  if (!modalBackdrop) return;

  openBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      modalBackdrop.classList.add("active");
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      modalBackdrop.classList.remove("active");
    });
  }

  modalBackdrop.addEventListener("click", (e) => {
    if (e.target === modalBackdrop) {
      modalBackdrop.classList.remove("active");
    }
  });
}

/**
 * 동적 테이블 렌더링 (7대 영역 진단표 & 5개 시군 비교표)
 */
function renderDynamicTables() {
  const data = window.NYJ_DATA;
  if (!data) return;

  // 1. 7대 영역 진단 요약표
  const diagTableBody = document.getElementById("table-diagnostics-body");
  if (diagTableBody) {
    diagTableBody.innerHTML = data.policy.diagnostics
      .map((d, idx) => {
        let badgeClass = "status-good";
        if (d.status === "경고") badgeClass = "status-alert";
        else if (d.status === "주의") badgeClass = "status-warning";

        return `
        <tr>
          <td><span class="rank-pill rank-etc">${idx + 1}</span> <strong>${d.domain}</strong></td>
          <td>${d.fact}</td>
          <td><span class="text-muted">${d.meaning}</span></td>
          <td><span class="status-tag ${badgeClass}">${d.status}</span></td>
        </tr>
      `;
      })
      .join("");
  }

  // 2. 5개 시군 종합 비교표
  const cityTableBody = document.getElementById("table-city-body");
  if (cityTableBody) {
    cityTableBody.innerHTML = data.cityComparison.cities
      .map((c) => {
        const isNyj = c.name === "남양주시";
        const rowStyle = isNyj ? 'style="background: rgba(16, 185, 129, 0.08); font-weight: 600;"' : "";
        return `
        <tr ${rowStyle}>
          <td>${isNyj ? "⭐ " : ""}${c.name}</td>
          <td>${c.companies.toLocaleString()}개</td>
          <td><span class="text-highlight">+${c.growthRate}%</span> (${c.growthRank}위)</td>
          <td>${c.mfgRatio}%</td>
          <td>${c.topMfgIndustry}</td>
          <td><strong style="color: ${isNyj ? 'var(--primary-emerald)' : 'inherit'}">${c.sciTechCompanies.toLocaleString()}개</strong></td>
          <td>${c.empPerBizStart} → ${c.empPerBizEnd}명 (${c.empChangeRate}%)</td>
          <td>${c.newBizRate}% / ${c.closeBizRate}%</td>
        </tr>
      `;
      })
      .join("");
  }

  // 3. 핵심 5개 업종 상세표
  const indTableBody = document.getElementById("table-top5-body");
  if (indTableBody) {
    indTableBody.innerHTML = data.topIndustries.list
      .map((item, idx) => {
        return `
        <tr>
          <td><span class="rank-pill ${idx === 0 ? "rank-1" : idx === 1 ? "rank-2" : "rank-etc"}">${idx + 1}</span> <strong>${item.name}</strong></td>
          <td>${item.companies.toLocaleString()}개 (전체 ${item.companyRank}위)</td>
          <td>${item.employees.toLocaleString()}명 (전체 ${item.employeeRank}위)</td>
          <td>${item.companyChange1Y > 0 ? "+" : ""}${item.companyChange1Y}개</td>
          <td><span style="color: ${item.employeeChange1Y > 0 ? "var(--primary-emerald)" : "#f87171"}">${item.employeeChange1Y > 0 ? "+" : ""}${item.employeeChange1Y}명</span></td>
          <td>${item.topTown}</td>
          <td><span class="status-tag status-good">${item.badge}</span></td>
        </tr>
      `;
      })
      .join("");
  }
}

/**
 * Framer Motion (Motion One) 기반 섹션 및 컴포넌트 스크롤 진입 애니메이션
 * 섹션 간 이동 시 전체 섹션이 슬라이드업 및 페이드인되며,
 * 내부 카드와 차트 컴포넌트들이 부드러운 Stagger 효과와 함께 나타납니다.
 */
function initFramerMotionScrollAnimation() {
  const sections = document.querySelectorAll(".dashboard-section");

  // 첫 번째 섹션은 페이지 로드 시 즉시 노출
  if (sections.length > 0) {
    sections[0].classList.add("section-visible");
  }

  sections.forEach((section) => {
    // 섹션 내 애니메이션 대상 카드 및 배너 수집
    const animTargets = section.querySelectorAll(
      ".kpi-card, .dash-card, .insight-banner, .policy-card"
    );

    // 내부 카드 초기 상태 세팅
    animTargets.forEach((el) => {
      el.classList.add("motion-init");
    });

    // 섹션 진입 옵저버 (스크롤 시 부드러운 페이드인 & 슬라이드업)
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 1. 섹션 전체 슬라이드업 & 페이드인 활성화
            entry.target.classList.add("section-visible");

            // 2. 내부 컴포넌트 순차적 Stagger 애니메이션
            if (window.Motion && typeof window.Motion.animate === "function") {
              animTargets.forEach((el, idx) => {
                window.Motion.animate(
                  el,
                  {
                    opacity: [0, 1],
                    transform: ["translateY(36px)", "translateY(0px)"],
                  },
                  {
                    duration: 0.75,
                    delay: idx * 0.07,
                    easing: [0.16, 1, 0.3, 1],
                  }
                );
              });
            } else {
              animTargets.forEach((el, idx) => {
                setTimeout(() => {
                  el.classList.add("motion-in-view");
                }, idx * 70);
              });
            }
          }
        });
      },
      { threshold: 0.12 }
    );

    sectionObserver.observe(section);
  });

  // 사이드바 네비게이션 클릭 시 인터랙션 연동
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const href = link.getAttribute("href");
      if (href && href.startsWith("#sec-")) {
        const targetSection = document.querySelector(href);
        if (targetSection) {
          // 대상 섹션 즉시 가시화 및 포커스 펄스 효과
          targetSection.classList.add("section-visible");
          targetSection.classList.add("section-focus-pulse");
          setTimeout(() => {
            targetSection.classList.remove("section-focus-pulse");
          }, 1200);

          // 내부 카드 컴포넌트 부드러운 슬라이드업 재실행
          const cards = targetSection.querySelectorAll(
            ".kpi-card, .dash-card, .insight-banner, .policy-card"
          );
          if (window.Motion && typeof window.Motion.animate === "function") {
            cards.forEach((el, idx) => {
              window.Motion.animate(
                el,
                {
                  opacity: [0.2, 1],
                  transform: ["translateY(24px)", "translateY(0px)"],
                },
                {
                  duration: 0.65,
                  delay: idx * 0.06,
                  easing: [0.16, 1, 0.3, 1],
                }
              );
            });
          }
        }
      }
    });
  });
}

/**
 * 8. 플로팅 탑(Top) 버튼 & 스크롤 진행률(Progress) 링 제어
 */
function initFloatingTopButton() {
  const topBtn = document.getElementById("floatingTopBtn");
  if (!topBtn) return;

  const circle = topBtn.querySelector(".progress-ring-circle");
  if (!circle) return;

  // 원 둘레(Circumference) 계산: 2 * PI * r
  const radius = circle.r.baseVal.value;
  const circumference = 2 * Math.PI * radius;

  // SVG dasharray 및 초기 dashoffset 설정 (진행률 0% 상태)
  circle.style.strokeDasharray = `${circumference} ${circumference}`;
  circle.style.strokeDashoffset = `${circumference}`;

  // 스크롤 위치 및 진행률 업데이트 함수
  function updateScrollProgress() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    // 1. 250px 초과 시 자동 표시, 250px 이하일 때 숨김
    if (scrollTop > 250) {
      topBtn.classList.add("visible");
    } else {
      topBtn.classList.remove("visible");
    }

    // 2. 스크롤 진행률 (0 ~ 1)에 따른 원형 프로그레스 링 갱신
    if (scrollHeight > 0) {
      const progress = Math.min(Math.max(scrollTop / scrollHeight, 0), 1);
      const offset = circumference - progress * circumference;
      circle.style.strokeDashoffset = offset;
    }
  }

  // 스크롤 이벤트 리스너 (성능 최적화: passive true)
  window.addEventListener("scroll", updateScrollProgress, { passive: true });
  window.addEventListener("resize", updateScrollProgress, { passive: true });

  // 초기 1회 실행
  updateScrollProgress();

  // 버튼 클릭 시 최상단으로 부드러운 스크롤 이동
  topBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

