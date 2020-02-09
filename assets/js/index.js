const NAVIGATION = document.querySelector('.navigation');
const MENULINKS = document.querySelectorAll('.menu a');
const LASTMENULINK = MENULINKS[MENULINKS.length - 1];
const NAVIGATONLOGO = document.querySelector('navigation__logo__link');
const RESUMEBTN = document.querySelector('menu__item__button');
const ABOUTSECTION = document.getElementById('about');
const ABOUTCONTENT = document.querySelector('.about');



window.addEventListener('scroll', () => {
  if (window.pageYOffset > 90) {
    NAVIGATION.classList.add('navigation--scroll')
  } else {
    NAVIGATION.classList.remove('navigation--scroll')
  }
})

LASTMENULINK.addEventListener('animationend', () => {
  MENULINKS.forEach(item => item.classList.remove('slideFromTop'))
})

let isScrolling = false;

window.addEventListener('scroll', throttleScroll, false);

function throttleScroll(e) {
  if (isScrolling === false) {
    window.requestAnimationFrame(() => {
      animateElements(e);
      isScrolling = false
    });
  }
  isScrolling = true;
}

function animateElements(e) {
  if (isElementVisible(ABOUTSECTION)) {
    ABOUTCONTENT.classList.add("slideBottom");

  }
}

function isElementVisible(el) {
  const elementBoundary = el.getBoundingClientRect();
  const top = elementBoundary.top;
  return ((top <= 250));
}