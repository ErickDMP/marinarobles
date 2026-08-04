/*==========================================================
                    SCRIPT.JS
            Marina Robles Psicología
==========================================================*/

"use strict";

/*==========================================================
                ELEMENTOS DEL DOM
==========================================================*/

const navbar = document.querySelector(".navbar");


const navLinks = document.querySelectorAll(".nav-menu a");

const sections = document.querySelectorAll("section[id]");

const reserveButton = document.querySelector(".btn-reserva");

/*==========================================================
                SCROLL SUAVE
==========================================================*/

navLinks.forEach((link)=>{

    link.addEventListener("click",(event)=>{

        const href = link.getAttribute("href");

        if(!href.startsWith("#")){

            return;

        }

        event.preventDefault();

        const target = document.querySelector(href);

        if(target){

            target.scrollIntoView({

                behavior:"smooth",

                block:"start"

            });

        }

    });

});

/*==========================================================
                MENÚ ACTIVO AL HACER CLIC
==========================================================*/

function removeActive(){

    navLinks.forEach((link)=>{

        link.classList.remove("active");

    });

}

navLinks.forEach((link)=>{

    link.addEventListener("click",()=>{

        removeActive();

        link.classList.add("active");

    });

});

/*==========================================================
                BOTÓN RESERVAR
==========================================================*/

if(reserveButton){

    reserveButton.addEventListener("click",()=>{

        window.location.href="reserva.html";

    });

}
/*==========================================================
            MENÚ ACTIVO SEGÚN LA SECCIÓN
==========================================================*/

function updateActiveSection(){

    let currentSection = "";

    sections.forEach((section)=>{

        const sectionTop = section.offsetTop;

        const sectionHeight = section.offsetHeight;

        if(

            window.scrollY >= sectionTop - 180 &&
            window.scrollY < sectionTop + sectionHeight - 180

        ){

            currentSection = section.getAttribute("id");

        }

    });

    if(currentSection === ""){

        return;

    }

    navLinks.forEach((link)=>{

        link.classList.remove("active");

        const href = link.getAttribute("href");

        if(href === "#" + currentSection){

            link.classList.add("active");

        }

    });

}

/*==========================================================
            OBSERVAR EL SCROLL
==========================================================*/

window.addEventListener("scroll",()=>{

    updateActiveSection();

});

/*==========================================================
            ACTUALIZAR AL CARGAR
==========================================================*/

window.addEventListener("load",()=>{

    updateActiveSection();

});
/*==========================================================
                NAVBAR DINÁMICO
==========================================================*/

const header = document.querySelector("#header");

/*==========================================================
            ACTUALIZAR HEADER
==========================================================*/

function updateHeader(){

    if(window.scrollY > 80){

        header.classList.add("header-scrolled");

    }

    else{

        header.classList.remove("header-scrolled");

    }

}

/*==========================================================
            OBSERVAR EL SCROLL
==========================================================*/

window.addEventListener("scroll", updateHeader);

/*==========================================================
            INICIALIZAR
==========================================================*/

window.addEventListener("load",()=>{

    updateHeader();

});
/*==========================================================
            ANIMACIONES AL HACER SCROLL
==========================================================*/

const animatedElements = document.querySelectorAll(

    ".section-title, \
     .value-card, \
     .service-card, \
     .process-card, \
     .hero-text, \
     .hero-image, \
     .quote-content"

);

/*==========================================================
            OBSERVER
==========================================================*/

const animationObserver = new IntersectionObserver(

(entries)=>{

    entries.forEach((entry)=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

            animationObserver.unobserve(entry.target);

        }

    });

},

{

    threshold:0.15,

    rootMargin:"0px 0px -80px 0px"

}

);

/*==========================================================
            PREPARAR ELEMENTOS
==========================================================*/

animatedElements.forEach((element,index)=>{

    element.classList.add("fade-element");

    element.style.transitionDelay = `${index * 80}ms`;

    animationObserver.observe(element);

});
/*==========================================================
                MENÚ RESPONSIVE
==========================================================*/

const menuToggle = document.querySelector(".menu-toggle");

const navMenu = document.querySelector(".nav-menu");

/*==========================================================
            ABRIR / CERRAR MENÚ
==========================================================*/

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

        menuToggle.classList.toggle("active");
        navMenu.classList.toggle("menu-open");

        document.body.classList.toggle("menu-open");

    });

}

/*==========================================================
        CERRAR AL PULSAR UN ENLACE
==========================================================*/

navLinks.forEach((link) => {

    link.addEventListener("click", () => {

        if (window.innerWidth <= 1100) {

            menuToggle.classList.remove("active");
            navMenu.classList.remove("menu-open");

            document.body.classList.remove("menu-open");

        }

    });

});

/*==========================================================
        CERRAR AL HACER CLIC FUERA
==========================================================*/

document.addEventListener("click", (event) => {

    if (window.innerWidth > 1100) return;

    const clickInsideMenu = navMenu.contains(event.target);
    const clickOnButton = menuToggle.contains(event.target);

    if (!clickInsideMenu && !clickOnButton) {

        menuToggle.classList.remove("active");
        navMenu.classList.remove("menu-open");
        document.body.classList.remove("menu-open");

    }

});



/*==========================================================
                BOTÓN VOLVER ARRIBA
==========================================================*/

const backToTop = document.createElement("button");

backToTop.className = "back-to-top";

backToTop.setAttribute(

    "aria-label",

    "Volver arriba"

);

backToTop.innerHTML = `

<i class="fa-solid fa-arrow-up"></i>

`;

document.body.appendChild(backToTop);

/*==========================================================
            MOSTRAR / OCULTAR BOTÓN
==========================================================*/

function updateBackToTop(){

    if(window.scrollY > 500){

        backToTop.classList.add("show");

    }

    else{

        backToTop.classList.remove("show");

    }

}

window.addEventListener(

    "scroll",

    updateBackToTop

);

/*==========================================================
            VOLVER ARRIBA
==========================================================*/

backToTop.addEventListener("click",()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});

/*==========================================================
                OPTIMIZACIÓN
==========================================================*/

let resizeTimeout;

window.addEventListener("resize",()=>{

    clearTimeout(resizeTimeout);

    resizeTimeout = setTimeout(()=>{

        updateHeader();

        updateBackToTop();

    },100);

});

/*==========================================================
            INICIALIZACIÓN GENERAL
==========================================================*/

document.addEventListener("DOMContentLoaded",()=>{

    updateHeader();

    updateBackToTop();

    if(typeof updateActiveSection === "function"){

        updateActiveSection();

    }

});
/*==========================================================
        REINICIAR AL VOLVER A ESCRITORIO
==========================================================*/

window.addEventListener("resize", () => {

    if (window.innerWidth > 1100) {

        menuToggle.classList.remove("active");
        navMenu.classList.remove("menu-open");
        document.body.classList.remove("menu-open");
    }

});