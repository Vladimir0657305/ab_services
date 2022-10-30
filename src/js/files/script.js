// Подключение функционала "Чертогов Фрилансера"
import { isMobile } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";

import { jarallax } from "jarallax";
jarallax(document.querySelectorAll('.jarallax-span'), {
    speed: 0.2,
});
jarallax(document.querySelectorAll('.jarallax'), {
    speed: .5,
});


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

// Parallax Effect Satrt ===============================================================================
var containerQuery = document.querySelector('.parallax-container');

// Get all the elements than use the animation of Parallax
var elements = document.querySelectorAll("[data-type=parallax]");
/**
 * Constructor
 * 
 * @param  {[type]} imageUrl [Your image]
 * @param  {[type]} minHeight [Minimum of height of the view]
 * @param  {[type]} minWidth [Minimum of width of the view]
 * @param  {[type]} animation [Activate animation Parallax]
 */
function Parallax(operator, imageUrl, minHeight, minWidth, animation, division) {

    /**
     * See if the variable imageUrl value is empty
     * 
     * @param  {[type]} imageUrl [description]
     */
    if (imageUrl != "") {
        /**
         * To create and initiate the properties of Parallax
         * 
         * @type {[object]} create [description]
         */
        this.create(operator, imageUrl, minHeight, minWidth);
    }
    else {
        console.error("Parallax: Vous ne pouvez pas créer un parallax sans image." + "Si cette erreur persiste, il se pourrait que l’emplacement de votre image ne sois pas trouvée en raison d’un chemin d’accès erroné." + "Ou que l’attribut {@data-src} soit vide ou non inscrit dans votre fichier HTML");
    }

    /**
     * To see if the animation is requested
     * 
     * @param {[type]} animation [description]
     */
    if (animation == "true") {
        window.addEventListener("scroll", () => {
            elements[operator].style.backgroundPositionY = -window.scrollY / division + "px";
            // elements[operator].style.backgroundPositionY = -window.scrollY  / division + offset(elements[operator]).top  + "px";
        });
    }
}

Parallax.prototype =
{
    /**
     * Create a default Values
     * 
     * @param {[type]} attributes [description]
     */
    attributes:
    {
        src: "",
        minHeight: 100,
        minWidth: 100,
        animation: false,
        division: 4
    },

    /**
     * Attaching multiple properties to customize the @Parallax view
     * 
     * @param  {[type]} imageUrl [descrption]
     * @param  {[type]} minHeight [descrption]
     * @param  {[type]} minWidth [descrption]
     */
    create: function (operator, imageUrl, minHeight, minWidth) {
        var backgroundFixed = "background-attachment:fixed;";
        var backgroundPositionX = "background-position-x:center;";
        var backgroundNoRepeat = "background-repeat:no-repeat;";
        // var backgroundInHerit = "background-size: 100% auto;";
        var backgroundInHerit = "background-size: cover;";
        var appendsSrcFirst = "background-image:url(\"";
        var appendsSrcLast = "\");";

        var defaultValues = backgroundFixed + backgroundPositionX + backgroundNoRepeat + backgroundInHerit;

        elements[operator].setAttribute("style", defaultValues + minHeight + minWidth + appendsSrcFirst + imageUrl + appendsSrcLast);
    }
};

/**
 * Search the all elements than use the data Parallax
 * Looping all the elements, for get each values of each element
 */

for (var i = 0; i < elements.length; i++) {
    if (elements[i].getAttribute("data-type") == "parallax") {
        var attributes = {};

        var dataSrc = "data-src";
        var dataMinHeight = "data-min-height";
        var dataMinWidth = "data-min-width";
        var dataAnimation = "data-animation";
        var dataDivision = "data-division";
        var dataObjFit = "data-object-fit";

        if (elements[i].getAttribute(dataSrc) != "") {
            attributes.src = elements[i].getAttribute(dataSrc);
        }
        else {
            console.error("Parallax: Vous ne pouvez pas créer un parallax sans image." + "Si cette erreur persiste, il se pourrait que l’emplacement de votre image ne sois pas trouvée en raison d’un chemin d’accès erroné." + "Ou que l’attribut {@data-src} soit vide ou non inscrit dans votre fichier HTML");
        }

        if (elements[i].getAttribute(dataMinHeight) != null) {
            attributes.minHeight = "height:" + elements[i].getAttribute(dataMinHeight) + ";";
        }
        else {
            // Default value
            attributes.minHeight = "height:200px;";
        }

        if (elements[i].getAttribute(dataMinWidth) != null) {
            attributes.minWidth = "width:" + elements[i].getAttribute(dataMinWidth) + ";";
        }
        else {
            // Default value
            attributes.minWidth = "width:100%;";
        }

        if (elements[i].getAttribute(dataAnimation) == "true") {
            attributes.animation = elements[i].getAttribute(dataAnimation);
        }

        if (elements[i].getAttribute(dataDivision) != null) {
            attributes.division = elements[i].getAttribute(dataDivision);
        }
        else {
            // Default value
            attributes.division = 4;
        }
        if (elements[i].getAttribute(dataObjFit) != null) {
            attributes.dataObjFit = "object-fit:" + elements[i].getAttribute(dataObjFit) + ";";
        }
        else {
            // Default value
            attributes.dataObjFit = "object-fit: cover;"
        }

        // console.log(attributes.division);

        /**
         * Create instance
         * 
         * @param  {[type]} attributes.src [description]
         * @param  {[type]} attributes.minHeight [description]
         * @param  {[type]} attributes.minWidth [description]
         * @param  {[type]} attributes.animation [description]
         */
        new Parallax(i, attributes.src, attributes.minHeight, attributes.minWidth, attributes.animation, attributes.division, attributes.dataObjFit);
    }
}
// Parallax Effect End ==================================================================================


// Contacts Start =======================================================================================

// Map creation
// https://maplibre.org/maplibre-gl-js-docs/api/

var map = new maplibregl.Map({
    container: "map",
    style:
        "https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL", // stylesheet location
    center: [-123.1173295, 49.2856636], // starting position [lng, lat]
    zoom: 11 // starting zoom
});
// Set a popup with your gps coordinates in setLngLat() and in setHTML() you put the text you want.
// var popup = new maplibregl.Popup({ closeOnClick: false })
// .setLngLat([4.8125028, 45.7169385])
// .setHTML('<span>Café Charmant, Rue de la République, 69600 Oullins, France</span><br><img width="100px" src="https://uploads.lebonbon.fr/source/2017/lyon/decembre/Bonnes-adresses-Lyon-CafeI-Charmant-13-1024x768.png" alt="popup-image">')
// .addTo(map);

var nav = new maplibregl.NavigationControl();
map.addControl(nav, "top-right");

// Contacts End ========================================================================================

