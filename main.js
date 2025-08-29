let currentPage = 1;
const totalPages = 25;
const pageCache = {};

const viewer = document.getElementById("svgViewer");

// 페이지 미리 로딩
function preloadPage(pageNum) {
  if (pageNum < 1 || pageNum > totalPages) return;
  if (!pageCache[pageNum]) {
    const img = new Image();
    img.src = `svg/replica(24)-${String(pageNum).padStart(2, "0")}.svg`;
    pageCache[pageNum] = img;
  }
}

// 페이지 표시
function showPage() {
  const img = pageCache[currentPage];
  if (!img) return;
  viewer.src = img.src; // CSS가 자동으로 크기 맞춤
}

// 다음 페이지
function showNextPage() {
  if (currentPage < totalPages) {
    currentPage++;
    showPage();
    preloadPage(currentPage + 1);
  }
}

// 이전 페이지
function showPreviousPage() {
  if (currentPage > 1) {
    currentPage--;
    showPage();
    preloadPage(currentPage - 1);
  }
}

// 키보드 단축키
document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowRight":
    case "d":
    case "D":
    case " ":
      showNextPage();
      e.preventDefault();
      break;
    case "ArrowLeft":
    case "a":
    case "A":
    case "Backspace":
      showPreviousPage();
      e.preventDefault();
      break;
  }
});

// 초기 로딩
window.onload = () => {
  for (let i = 1; i <= totalPages; i++) preloadPage(i);
  showPage(); // 첫 페이지 표시
};
