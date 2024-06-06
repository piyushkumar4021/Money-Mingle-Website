const btnCta = document.querySelectorAll(".btn--cta");
const btnScrollTo = document.querySelector(".btn--text");
const btnClose = document.querySelector(".btn-close");
const btnSignup = document.querySelector(".btn-signup");

const popupWindow = document.querySelector(".popup__window");
const popupBlur = document.querySelector(".popup__blur");

const sectionFeatures = document.querySelector(".section-features");

function hidePopup() {
  popupWindow.classList.add("hidden");
  popupBlur.classList.add("hidden");
}

function showPopup() {
  popupWindow.classList.remove("hidden");
  popupBlur.classList.remove("hidden");
}

// Modal Window Event

btnCta.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    showPopup();
  });
});

btnClose.addEventListener("click", (e) => {
  e.preventDefault();
  hidePopup();
});

btnSignup.addEventListener("click", (e) => {
  hidePopup();
});

document.addEventListener("keydown", (e) => {
  if (e.key == "Escape") hidePopup();
});

// Operation Event
const tabBtnContainer = document.querySelector(".operation__btns");
const tabBtns = document.querySelectorAll(".operation__btn");

const operations = document.querySelectorAll(".operation");

tabBtnContainer.addEventListener("click", (e) => {
  const clicked = e.target;
  if (!clicked.classList.contains("operation__btn")) return;

  // Remove active classes
  tabBtns.forEach((tab) => tab.classList.remove("operation__btn--active"));
  operations.forEach((o) => o.classList.remove("operation--active"));

  // Adding active classes
  clicked.classList.add("operation__btn--active");
  document
    .querySelector(`.operation--${clicked.dataset.tab}`)
    .classList.add("operation--active");
});

// Scrolling Behaviour
btnScrollTo.addEventListener("click", (e) => {
  e.preventDefault();
  // Old Way
  // window.scrollTo({
  //   left: 0,
  //   top: window.scrollY + sectionFeatures.getBoundingClientRect().top,
  //   behavior: "smooth",
  // });

  // console.log(window.scrollb);

  // Modern Way
  sectionFeatures.scrollIntoView({ behavior: "smooth" });
});

//////////////////////////////////////////
// Nav
// Event Delegation
document.querySelector(".nav__links").addEventListener("click", (e) => {
  e.preventDefault();

  if (e.target.classList.contains("nav__link")) {
    const scrollTo = e.target.getAttribute("href");

    document.querySelector(scrollTo).scrollIntoView({ behavior: "smooth" });
  }
});

//
