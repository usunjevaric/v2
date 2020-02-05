const NAVIGATION = document.querySelector('.navigation');


window.addEventListener('scroll', () => {
  if (window.pageYOffset > 200) {
    NAVIGATION.classList.add('navigation--black')
  } else {
    NAVIGATION.classList.remove('navigation--black')
  }
})