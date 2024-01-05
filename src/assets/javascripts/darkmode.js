const htmlEle = document.documentElement;
const weatherApp = document.getElementById("weatherApp");
const switchModebtn = weatherApp.querySelector(".changeMode .checkbox");

export default function darkModeEvent() {
  switchModebtn.addEventListener("click", () => {
    htmlEle.classList.toggle("dark-mode");
  });
}
