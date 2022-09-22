// *** active nav link : start *** //
var navAnchors = document.querySelectorAll(".nav-menu a");
var currentLocation = location.href;

function activeAnchor() {
  navAnchors.forEach(function (anchor) {
    var anchorHref = anchor.href;

    if (anchorHref == currentLocation) {
      anchor.classList.add("active");
    } else {
      anchor.classList.remove("active");
    }
  });
}
// *** active nav link : end *** //

// *** menu hamburger : start *** //
var menuHamburger = document.querySelector(".nav-hamburger");
var nav = document.querySelector("nav");
var html = document.querySelector("html");

function navMenuHamburger() {
  var bars = menuHamburger.querySelectorAll(".bar");

  for (var i = 0; i < bars.length; i++) {
    bars[i].classList.toggle("active");
  }

  nav.classList.toggle("active");
  html.classList.toggle("overflow-hidden");
}
// *** menu hamburger : end *** //

// *** banner slider : start *** //
var bannerSlider = document.querySelector(".banner-slider");
var prevControl = document.querySelector(".banner-slider-control .prev");
var nextControl = document.querySelector(".banner-slider-control .next");
var initialLeft = 0;
var percent = 98.8;

function bannerCarousel(initialLeft, sliderLength) {
  bannerSlider.style.left = initialLeft * percent + "%";

  if (initialLeft == 0) {
    prevControl.classList.add("inactive");
  } else {
    prevControl.classList.remove("inactive");
  }

  if (initialLeft == -(sliderLength - 1)) {
    nextControl.classList.add("inactive");
  } else {
    nextControl.classList.remove("inactive");
  }
}
// *** banner slider : end *** //

// *** modal functionality : start *** //
var modal = document.querySelector(".modal");
var modalBox = document.querySelector(".modal-box");
var modalCloseBtn = document.querySelector(".modal-close-button");
var servicesCardImg = document.querySelectorAll(".services-card figure");

function modalFunction() {
  servicesCardImg.forEach(function (cardImg) {
    cardImg.addEventListener("click", function () {
      modal.classList.add("display-block");
      modalCloseBtn.classList.add("display-block");
      html.classList.add("overflow-hidden");
      modalBox.innerHTML = this.parentElement.innerHTML;
    });
  });

  modal.addEventListener("click", function () {
    this.classList.remove("display-block");
    modalCloseBtn.classList.remove("display-block");
    html.classList.remove("overflow-hidden");
    modalBox.innerHTML = "";
  });

  modalCloseBtn.addEventListener("click", function () {
    modal.classList.remove("display-block");
    this.classList.remove("display-block");
    html.classList.remove("overflow-hidden");
    modalBox.innerHTML = "";
  });

  modalBox.addEventListener("click", function (e) {
    e.stopPropagation();
  });
}
// *** modal functionality : end *** //

// *** number counter animation : start *** //
var counterNum = document.querySelectorAll(".counter-num");
var bsGrowthCounter = document.querySelector(".business-growth-counter");

function counterAnim(counter) {
  var a = 1;
  var startCount = 0;
  var finalCount = +counter.dataset.count;
  var incrementBy = finalCount / 100;

  var interval = setInterval(function () {
    startCount = incrementBy * a;
    counter.innerHTML = Math.ceil(startCount);
    if (a == 100) clearInterval(interval);
    a++;
  }, 5);
}
// *** number counter animation : end *** //

// *** back-to-top : start *** //
var backToTop = document.querySelector(".back-to-top");

function moveToTop() {
  if (this.window.scrollY > 5) {
    backToTop.classList.add("visibility");
  } else {
    backToTop.classList.remove("visibility");
  }

  backToTop.addEventListener("click", function () {
    window.scrollTo(0, 0);
  });
}
// *** back-to-top : end *** //

// *** tab functionality : start *** //
var bsAnalysisList = document.querySelectorAll(".business-analysis-list li");
var bsAnalysisDescList = document.querySelectorAll(".business-analysis-desc li");

function tabFunction() {
  bsAnalysisList[0].classList.add("active");
  bsAnalysisDescList[0].classList.add("active");

  bsAnalysisList.forEach(function (list, ind) {
    list.addEventListener("click", function () {
      for (var i = 0; i < bsAnalysisList.length; i++) {
        bsAnalysisList[i].classList.remove("active");
        bsAnalysisDescList[i].classList.remove("active");
      }

      list.classList.add("active");
      bsAnalysisDescList[ind].classList.add("active");
    });
  });
}
// *** tab functionality : end *** //

// *********************** indexPageJS() end ************************** //
function indexPageJS() {
  activeAnchor();

  modalFunction();

  menuHamburger.addEventListener("click", function () {
    navMenuHamburger();
  });

  // banner slider start
  var sliderLength = bannerSlider.children.length;

  bannerCarousel(initialLeft, sliderLength);

  setInterval(function () {
    initialLeft--;

    if (initialLeft == -sliderLength) {
      initialLeft = 0;
    }

    bannerCarousel(initialLeft, sliderLength);
  }, 2500);

  prevControl.addEventListener("click", function () {
    var x = -1;
    initialLeft -= x;
    bannerCarousel(initialLeft, sliderLength);
  });

  nextControl.addEventListener("click", function () {
    var x = 1;
    initialLeft -= x;
    bannerCarousel(initialLeft, sliderLength);
  });
  // banner slider end

  // number counter animation & back-to-top start
  var checked = false;

  window.addEventListener("scroll", function () {
    if (window.scrollY > bsGrowthCounter.offsetTop - 500) {
      if (!checked) {
        counterNum.forEach(function (counter) {
          counterAnim(counter);
        });
      }
      checked = true;
    } else {
      checked = false;
    }

    moveToTop();
  });
  // number counter animation & back-to-top end
}
// *********************** indexPageJS() end ************************** //

// *********************** servicesPageJS() end ************************** //
function servicesPageJS() {
  activeAnchor();

  tabFunction();

  menuHamburger.addEventListener("click", function () {
    navMenuHamburger();
  });

  window.addEventListener("scroll", function () {
    moveToTop();
  });
}
// *********************** servicesPageJS() end ************************** //

// *** condition to run JS code for active page only : start *** //
if (document.body.classList.contains("indexBody")) {
  indexPageJS();
} else if (document.body.classList.contains("servicesBody")) {
  servicesPageJS();
}
// *** condition to run JS code for active page only : end *** //