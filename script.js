const btnCta = document.querySelectorAll(".btn--cta");
const btnScrollTo = document.querySelector(".btn--text");
const btnClose = document.querySelector(".btn-close");
const btnSignup = document.querySelector(".btn-signup");

const popupWindow = document.querySelector(".popup__window");
const popupBlur = document.querySelector(".popup__blur");

const sectionFeatures = document.querySelector(".section-features");

const nav = document.querySelector(".nav");

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

////////// Header footer nav hover effect

// header and footer nav links
const headerFooterNavLinks = document.querySelectorAll(".nav__links");

const navHover = function (e) {
  if (!e.target.classList.contains("nav__link")) return;

  headerFooterNavLinks.forEach((navLinks) => {
    navLinks.querySelectorAll(".nav__link").forEach((link) => {
      if (link !== e.target) link.style.opacity = this;
    });
  });
};

headerFooterNavLinks.forEach((l) =>
  l.addEventListener("mouseover", navHover.bind("0.5"))
);

headerFooterNavLinks.forEach((l) =>
  l.addEventListener("mouseout", navHover.bind("1"))
);

//

// Sticky nav bar
const stickyNav = function (entries) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) nav.classList.add("sticky");
    else nav.classList.remove("sticky");
  });
};

const navObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${getComputedStyle(nav).height}`,
});

navObserver.observe(document.querySelector(".header"));

// Scrolling sections effect
const sections = document.querySelectorAll("section");

const sectionAnimate = (entries, observer) => {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("hide-section");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(sectionAnimate, {
  root: null,
  threshold: 0.15,
});

sections.forEach((section) => {
  sectionObserver.observe(section);
  // section.classList.add("hide-section");
});

// Images lazy loading
const featureImgs = document.querySelectorAll(".feature__img");

const removeLazyLoading = (entries, observer) => {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener("load", () => {
    entry.target.classList.remove("lazy-loading");
  });

  observer.unobserve(entry.target);
};

const lazyLoading = new IntersectionObserver(removeLazyLoading, {
  root: null,
  threshold: 0,
  rootMargin: "-100px",
});

featureImgs.forEach((img) => {
  lazyLoading.observe(img);
  img.classList.add("lazy-loading");
});

// Testimonial slider
const slider = () => {
  const testimonials = document.querySelectorAll(".testimonial");
  const btnNext = document.querySelector(".btn-next");
  const btnPrev = document.querySelector(".btn-prev");
  const dots = document.querySelector(".dots");

  const maxTestimonial = testimonials.length;
  let currTestimonial = 0;

  const goToTestimonial = (goTo) => {
    testimonials.forEach((t, i) => {
      t.style.transform = `translateX(${100 * (i - goTo)}%)`;
    });
  };

  const createDots = () => {
    testimonials.forEach((_, i) => {
      // dots.innerHTML += `<div class="dots__dot" data-testimonial="${i}"></div>`;

      dots.insertAdjacentHTML(
        "beforeend",
        `<div class="dots__dot" data-testimonial="${i}"></div>`
      );
    });
  };

  const activeDot = (t) => {
    document.querySelectorAll(".dots__dot").forEach((dot) => {
      dot.classList.remove("dots__dot--active");
    });
    document
      .querySelector(`.dots__dot[data-testimonial="${t}"]`)
      .classList.add("dots__dot--active");
  };

  const initSlider = () => {
    goToTestimonial(0);
    createDots();
    activeDot(0);
  };

  initSlider();

  const nextTestimonial = () => {
    if (currTestimonial === maxTestimonial - 1) {
      currTestimonial = 0;
    } else {
      currTestimonial++;
    }

    goToTestimonial(currTestimonial);
    activeDot(currTestimonial);
  };

  const prevTestimonial = () => {
    if (currTestimonial === 0) {
      currTestimonial = maxTestimonial - 1;
    } else {
      currTestimonial--;
    }

    activeDot(currTestimonial);
    goToTestimonial(currTestimonial);
  };

  btnNext.addEventListener("click", nextTestimonial);
  btnPrev.addEventListener("click", prevTestimonial);

  dots.addEventListener("click", (e) => {
    if (e.target.classList.contains("dots__dot")) {
      currTestimonial = +e.target.dataset.testimonial;

      goToTestimonial(currTestimonial);
      activeDot(currTestimonial);
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") nextTestimonial();
    if (e.key === "ArrowLeft") prevTestimonial();
  });
};

slider();
