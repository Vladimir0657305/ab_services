// Подключение функционала "Чертогов Фрилансера"
import { isMobile } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";

// Burger Button animation =========================================================================
const buttons = document.querySelectorAll('button');
buttons.forEach(btn => {
    btn.addEventListener('click', function (e) {

        let x = e.clientX - e.target.offsetLeft;
        let y = e.clientY - e.target.offsetTop;

        let ripples = document.createElement('span');
        ripples.style.left = x + 'px';
        ripples.style.top = y + 'px';
        this.appendChild(ripples);

        setTimeout(() => {
            ripples.remove()
        }, 1000);
    });
});

// Burger ========================================================================================
const burg = document.querySelector('.toggle-menu');
burg.onclick = (() => {
    burg.classList.toggle('active');
    document.querySelector('.header-nav').classList.toggle('open');
    // document.body.classList.toggle('._lock');
})

//parallax effect for banner =====================================================================
window.onscroll = function () { paralax() };
let posY;
let image = document.getElementById('parallax');
let parallaxSpan = document.getElementById('parallaxSpan');
function paralax() {
    posY = window.pageYOffset;
    image.style.top = posY * .5 + 'px';
    parallaxSpan.style.top = posY * .2 + 'px';
}