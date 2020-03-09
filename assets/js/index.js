window.addEventListener('scroll', openScrollMenu)

//remove class slideFrom top from elements after animaton finished
LASTMENULINK.addEventListener('animationend', () => {
  MENULINKS.forEach(item => item.classList.remove('slideFromTop'))
})

//fade animation on section on scroll
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

function animateElements() {
  if (isElementVisible(ABOUTSECTION)) {
    ABOUTCONTENT.classList.add("slideBottom");
  }
  if (isElementVisible(EXPIRIENCESECTION)) {
    EXPIRIENCECONTENT.classList.add('slideBottom');
  }
  if (isElementVisible(WORKSECTION)) {
    WORKCONTENT.classList.add('slideBottom');
    WORKCONTENT.addEventListener('animationend', () => {
      PORTFOLIOCARD.forEach(card => {
        card.classList.add('slideInCard')
      })
    });
  }
  if (isElementVisible(CONTACTSECTION)) {
    CONTACTCONTENT.classList.add('slideBottom')
  }
}

function isElementVisible(el) {
  const elementBoundary = el.getBoundingClientRect();
  const top = elementBoundary.top;
  return ((top <= 250));
}

HAMBURGER.addEventListener('click', togglePhoneMenu)

function togglePhoneMenu() {
  PHONEBACKDROP.classList.toggle('showMenu');
  PHONENAVIGATION.classList.toggle('showMenu');
  HAMBURGER.classList.toggle('hamburger__close');
  BODY.classList.toggle('blur');
}

PHONEMENUITEMS.forEach(item => item.addEventListener('click', togglePhoneMenu));
PHONENAVLOGO.addEventListener('click', togglePhoneMenu);



function openScrollMenu() {
  if (window.pageYOffset > 90) {
    NAVIGATION.classList.add('navigation--scroll')
  } else {
    NAVIGATION.classList.remove('navigation--scroll')
  }
}

//fetch number of my public repos
(() => {
  const svg = document.querySelector('.repos');

  fetch('https://api.github.com/users/usunjevaric')
    .then(res => {
      return res.json()
    })
    .then(data => {
      const repos = data.public_repos;
      const span = document.createElement('span')
      span.textContent = repos
      svg.append(span);
    })
})();

function toggleModal() {
  MODALBG.classList.toggle('modal-bg--active');
  BODY.classList.toggle('blur');
}
function fillModal(card) {
  const { title, text, codeLink, liveLink, image, tech } = projects[card]
  MODALTITLE.textContent = title;
  MODALTEXT.textContent = text;
  CODELINK.setAttribute('href', `${codeLink}`);
  LIVELINK.setAttribute('href', `${liveLink}`);

  MODALIMAGE.setAttribute('src', image);
  let list = '';
  tech.forEach(el => {
    list += `<li class='modal__list__item'>${el}</li>`;
  })
  TECHLIST.innerHTML = list;
}
//open modal
PORTFOLIOCARD.forEach(card => {
  card.addEventListener('click', (e) => {
    if (!e.target.classList.contains('card__link') && e.target.tagName !== 'path' && e.target.tagName !== 'svg' && !e.target.classList.contains('card__header')) {
      toggleModal();
      fillModal(parseInt(e.target.dataset.card) - 1)
    }

  })
})

MODALBG.addEventListener('click', (e) => {
  //check to close modal just after click outside of modal content
  if (e.target.classList.contains('modal-bg')) {
    toggleModal()
  }
})

MODALCLOSE.addEventListener('click', toggleModal)



