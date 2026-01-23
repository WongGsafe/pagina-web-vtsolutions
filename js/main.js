const toggle = document.querySelector(".nav__toggle");
const links = document.querySelector(".nav__links");

toggle?.addEventListener("click", () => {
  links.classList.toggle("is-open");
});
