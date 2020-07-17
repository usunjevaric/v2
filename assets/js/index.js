window.addEventListener("scroll", openScrollMenu);

//remove class slideFrom top from elements after animaton finished
LASTMENULINK.addEventListener("animationend", () => {
  MENULINKS.forEach((item) => item.classList.remove("slideFromTop"));
});

//fade animation on section on scroll
let isScrolling = false;
window.addEventListener("scroll", throttleScroll, false);

function throttleScroll(e) {
  if (isScrolling === false) {
    window.requestAnimationFrame(() => {
      animateElements(e);
      isScrolling = false;
    });
  }
  isScrolling = true;
}

function animateElements() {
  if (isElementVisible(ABOUTSECTION)) {
    ABOUTCONTENT.classList.add("slideBottom");
  }
  if (isElementVisible(EXPIRIENCESECTION)) {
    EXPIRIENCECONTENT.classList.add("slideBottom");
  }
  if (isElementVisible(WORKSECTION)) {
    WORKCONTENT.classList.add("slideBottom");
    WORKCONTENT.addEventListener("animationend", () => {
      PORTFOLIOCARD.forEach((card) => {
        card.classList.add("slideInCard");
      });
    });
  }
  if (isElementVisible(CONTACTSECTION)) {
    CONTACTCONTENT.classList.add("slideBottom");
  }
}

function isElementVisible(el) {
  const elementBoundary = el.getBoundingClientRect();
  const top = elementBoundary.top;
  return top <= 250;
}

HAMBURGER.addEventListener("click", togglePhoneMenu);

function togglePhoneMenu() {
  PHONEBACKDROP.classList.toggle("showMenu");
  PHONENAVIGATION.classList.toggle("showMenu");
  HAMBURGER.classList.toggle("hamburger__close");
  BODY.classList.toggle("blur");
}

PHONEMENUITEMS.forEach((item) => item.addEventListener("click", togglePhoneMenu));
PHONENAVLOGO.addEventListener("click", togglePhoneMenu);

function openScrollMenu() {
  if (window.pageYOffset > 90) {
    NAVIGATION.classList.add("navigation--scroll");
  } else {
    NAVIGATION.classList.remove("navigation--scroll");
  }
}

//fetch number of my public repos
(() => {
  const svg = document.querySelector(".repos");

  fetch("https://api.github.com/users/usunjevaric")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      const repos = data.public_repos;
      const span = document.createElement("span");
      span.textContent = repos;
      svg.append(span);
    });
})();

function toggleModal() {
  MODALBG.classList.toggle("modal-bg--active");
  BODY.classList.toggle("blur");
}
function fillModal(card) {
  const { title, text, codeLink, liveLink, image, tech, contact } = projects[card];
  console.log(codeLink);
  MODALTITLE.textContent = title;
  MODALTEXT.textContent = text;

  if (codeLink !== "") {
    CODELINK.style.display = "block";
    CODELINK.setAttribute("href", `${codeLink}`);
  } else {
    CODELINK.style.display = "none";
  }
  if (codeLink !== "") {
    LIVELINK.style.display = "block";
    LIVELINK.setAttribute("href", `${liveLink}`);
  } else {
    LIVELINK.style.display = "none";
  }
  if (contact == false) {
    CODECONTACT.style.display = "none";
  } else {
    CODECONTACT.style.display = "block";
  }

  MODALIMAGE.setAttribute("src", image);
  let list = "";
  tech.forEach((el) => {
    list += `<li class='modal__list__item'>${el}</li>`;
  });
  TECHLIST.innerHTML = list;
}

CODECONTACT.addEventListener("click", (e) => {
  window.location.hash = "#work";
  e.preventDefault();
  toggleModal();
  console.log(window.location);
  window.location.hash = "#contact";
});
//open modal
PORTFOLIOCARD.forEach((card) => {
  card.addEventListener("click", (e) => {
    if (
      !e.target.classList.contains("card__link") &&
      e.target.tagName !== "path" &&
      e.target.tagName !== "svg" &&
      !e.target.classList.contains("card__header")
    ) {
      toggleModal();
      fillModal(parseInt(e.target.dataset.card) - 1);
    }
  });
});

MODALBG.addEventListener("click", (e) => {
  //check to close modal just after click outside of modal content
  if (e.target.classList.contains("modal-bg")) {
    toggleModal();
  }
});

MODALCLOSE.addEventListener("click", toggleModal);
