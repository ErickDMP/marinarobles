/*==========================================================
                    RESERVA.JS
        Marina Robles Psicología
==========================================================*/

"use strict";

/*==========================================================
                ELEMENTOS DEL DOM
==========================================================*/

const form = document.querySelector("#bookingForm");

const emergencyButton = document.querySelector("#emergencyButton");

const emergencyFormButton = document.querySelector(".btn-emergency");

const faqItems = document.querySelectorAll(".faq-item");

const faqQuestions = document.querySelectorAll(".faq-question");

const textarea = document.querySelector("#descripcion");

const submitButton = document.querySelector(".btn-submit");

/*==========================================================
            CAMPOS DEL FORMULARIO
==========================================================*/

const nombre = document.querySelector("#nombre");

const apellido = document.querySelector("#apellido");

const correo = document.querySelector("#correo");

const telefono = document.querySelector("#telefono");

const contacto = document.querySelector("#contacto");

const horario = document.querySelector("#horario");

const motivo = document.querySelector("#motivo");

const privacidad = document.querySelector("#privacidad");

/*==========================================================
                CONFIGURACIÓN
==========================================================*/

const MAX_DESCRIPTION = 1200;

const PHONE_REGEX = /^[6789]\d{8}$/;

const EMAIL_REGEX =
/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/*==========================================================
                FUNCIONES AUXILIARES
==========================================================*/

/*
    Comprueba si un campo está vacío
*/

function isEmpty(value){

    return value.trim() === "";

}

/*
    Elimina espacios al inicio y final
*/

function clean(value){

    return value.trim();

}

/*
    Valida un correo electrónico
*/

function validateEmail(email){

    return EMAIL_REGEX.test(clean(email));

}

/*
    Valida un teléfono español
*/

function validatePhone(phone){

    const number = clean(phone).replace(/\s+/g,"");

    return PHONE_REGEX.test(number);

}
/*==========================================================
                PREGUNTAS FRECUENTES
==========================================================*/

faqQuestions.forEach((question) => {

    question.addEventListener("click", () => {

        const currentItem = question.parentElement;

        const isActive = currentItem.classList.contains("active");

        /*==============================================
            CERRAR TODAS LAS PREGUNTAS
        ==============================================*/

        faqItems.forEach((item) => {

            item.classList.remove("active");

        });

        /*==============================================
            ABRIR LA SELECCIONADA
        ==============================================*/

        if(!isActive){

            currentItem.classList.add("active");

        }

    });

});

/*==========================================================
            ANIMACIÓN DE APARICIÓN
==========================================================*/

const fadeElements = document.querySelectorAll(

    ".info-card, .timeline-card, .faq-item, .contact-card"

);

const observer = new IntersectionObserver(

(entries)=>{

    entries.forEach((entry)=>{

        if(entry.isIntersecting){

            entry.target.classList.add("fade-up");

            entry.target.classList.add("show");

        }

    });

},

{

    threshold:0.15

}

);

/*==========================================================
        OBSERVAR TODOS LOS ELEMENTOS
==========================================================*/

fadeElements.forEach((element)=>{

    observer.observe(element);

});
/*==========================================================
            CONTADOR DE CARACTERES
==========================================================*/

const characterCounter = document.createElement("div");

characterCounter.classList.add("character-counter");

characterCounter.textContent = `0 / ${MAX_DESCRIPTION} caracteres`;

textarea.insertAdjacentElement("afterend", characterCounter);

/*==========================================================
        ACTUALIZAR CONTADOR
==========================================================*/

textarea.addEventListener("input", () => {

    const currentLength = textarea.value.length;

    characterCounter.textContent =
        `${currentLength} / ${MAX_DESCRIPTION} caracteres`;

    if(currentLength > MAX_DESCRIPTION * 0.90){

        characterCounter.style.color = "#D64545";

    }

    else{

        characterCounter.style.color = "#6B7280";

    }

});

/*==========================================================
            BARRA DE PROGRESO
==========================================================*/

const fields = [

    nombre,
    apellido,
    correo,
    telefono,
    contacto,
    horario,
    motivo,
    textarea,
    privacidad

];

const progressBar = document.createElement("div");

progressBar.classList.add("progress-bar");

const progressFill = document.createElement("div");

progressFill.classList.add("progress-fill");

progressBar.appendChild(progressFill);

form.insertAdjacentElement("afterbegin", progressBar);

/*==========================================================
        ACTUALIZAR PROGRESO
==========================================================*/

function updateProgress(){

    let completed = 0;

    fields.forEach((field)=>{

        if(field.type === "checkbox"){

            if(field.checked){

                completed++;

            }

        }

        else{

            if(clean(field.value) !== ""){

                completed++;

            }

        }

    });

    const percentage = (completed / fields.length) * 100;

    progressFill.style.width = percentage + "%";

}

fields.forEach((field)=>{

    field.addEventListener("input", updateProgress);

    field.addEventListener("change", updateProgress);

});

/*==========================================================
        VALIDACIÓN VISUAL
==========================================================*/

function updateFieldState(field){

    if(field.type === "checkbox"){

        return;

    }

    if(clean(field.value) === ""){

        field.style.borderColor = "#E5E7EB";

        field.style.boxShadow = "none";

        return;

    }

    field.style.borderColor = "#2E7D6B";

    field.style.boxShadow =
        "0 0 0 4px rgba(46,125,107,.08)";

}

fields.forEach((field)=>{

    if(field.type !== "checkbox"){

        field.addEventListener("input", ()=>{

            updateFieldState(field);

        });

    }

});

/*==========================================================
        INICIALIZAR
==========================================================*/

updateProgress();
/*==========================================================
            VALIDACIÓN DEL FORMULARIO
==========================================================*/

form.addEventListener("submit", function(event){

    event.preventDefault();

    let valid = true;

    /*==============================================
                NOMBRE
    ==============================================*/

    if(isEmpty(nombre.value)){

        alert("Por favor, introduce tu nombre.");

        nombre.focus();

        return;

    }

    /*==============================================
                APELLIDOS
    ==============================================*/

    if(isEmpty(apellido.value)){

        alert("Por favor, introduce tus apellidos.");

        apellido.focus();

        return;

    }

    /*==============================================
                CORREO
    ==============================================*/

    if(!validateEmail(correo.value)){

        alert("Introduce un correo electrónico válido.");

        correo.focus();

        return;

    }

    /*==============================================
                TELÉFONO
    ==============================================*/

    if(!validatePhone(telefono.value)){

        alert("Introduce un teléfono español válido.");

        telefono.focus();

        return;

    }

    /*==============================================
                MÉTODO DE CONTACTO
    ==============================================*/

    if(isEmpty(contacto.value)){

        alert("Selecciona un método de contacto.");

        contacto.focus();

        return;

    }

    /*==============================================
                HORARIO
    ==============================================*/

    if(isEmpty(horario.value)){

        alert("Selecciona un horario preferido.");

        horario.focus();

        return;

    }

    /*==============================================
                MOTIVO
    ==============================================*/

    if(isEmpty(motivo.value)){

        alert("Selecciona el motivo de la consulta.");

        motivo.focus();

        return;

    }

    /*==============================================
                DESCRIPCIÓN
    ==============================================*/

    if(isEmpty(textarea.value)){

        alert("Describe brevemente tu situación.");

        textarea.focus();

        return;

    }

    if(textarea.value.length < 20){

        alert("La descripción es demasiado corta.");

        textarea.focus();

        return;

    }

    /*==============================================
                PRIVACIDAD
    ==============================================*/

    if(!privacidad.checked){

        alert("Debes aceptar la Política de Privacidad.");

        privacidad.focus();

        return;

    }

    /*==============================================
            FORMULARIO CORRECTO
    ==============================================*/

    submitButton.disabled = true;

    submitButton.innerHTML = `

        <i class="fa-solid fa-spinner fa-spin"></i>

        Enviando solicitud...

    `;

    setTimeout(()=>{

        alert(

`✅ Solicitud enviada correctamente.

En breve nos pondremos en contacto contigo.

Gracias por confiar en Marina Robles Psicología.`

        );

        form.reset();

        updateProgress();

        submitButton.disabled = false;

        submitButton.innerHTML = `

            <i class="fa-solid fa-paper-plane"></i>

            Solicitar cita

        `;

    },1800);

});
/*==========================================================
                MODAL PERSONALIZADO
==========================================================*/

function showModal(title, message, type = "success"){

    const oldModal = document.querySelector(".custom-modal");

    if(oldModal){

        oldModal.remove();

    }

    const overlay = document.createElement("div");

    overlay.className = "custom-modal";

    overlay.innerHTML = `

        <div class="modal-window">

            <div class="modal-icon ${type}">

                <i class="fa-solid ${
                    type === "success"
                    ? "fa-circle-check"
                    : type === "warning"
                    ? "fa-triangle-exclamation"
                    : "fa-circle-xmark"
                }"></i>

            </div>

            <h2>${title}</h2>

            <p>${message}</p>

            <button class="modal-close">

                Entendido

            </button>

        </div>

    `;

    document.body.appendChild(overlay);

    document.body.style.overflow = "hidden";

    const closeButton = overlay.querySelector(".modal-close");

    closeButton.addEventListener("click", ()=>{

        overlay.remove();

        document.body.style.overflow = "";

    });

    overlay.addEventListener("click",(event)=>{

        if(event.target === overlay){

            overlay.remove();

            document.body.style.overflow = "";

        }

    });

}

/*==========================================================
                BOTÓN EMERGENCIA
==========================================================*/

function emergencyMessage(){

    showModal(

        "Atención",

`Si consideras que existe una situación de riesgo inmediato para ti
o para otra persona, llama al 112 o acude al servicio de urgencias
más cercano.

Si necesitas apoyo psicológico pero no existe una emergencia vital,
puedes contactar con Marina Robles Psicología mediante teléfono o
WhatsApp.`,

        "warning"

    );

}

if(emergencyButton){

    emergencyButton.addEventListener(

        "click",

        emergencyMessage

    );

}

if(emergencyFormButton){

    emergencyFormButton.addEventListener(

        "click",

        emergencyMessage

    );

}
/*==========================================================
                SCROLL SUAVE
==========================================================*/

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

    anchor.addEventListener("click",function(e){

        e.preventDefault();

        const target=document.querySelector(

            this.getAttribute("href")

        );

        if(target){

            target.scrollIntoView({

                behavior:"smooth",

                block:"start"

            });

        }

    });

});

/*==========================================================
            CTRL + ENTER PARA ENVIAR
==========================================================*/

textarea.addEventListener("keydown",(event)=>{

    if(event.ctrlKey && event.key==="Enter"){

        form.requestSubmit();

    }

});

/*==========================================================
            BOTÓN VOLVER ARRIBA
==========================================================*/

const backToTop=document.createElement("button");

backToTop.innerHTML=`

<i class="fa-solid fa-arrow-up"></i>

`;

backToTop.className="back-to-top";

document.body.appendChild(backToTop);

window.addEventListener("scroll",()=>{

    if(window.scrollY>600){

        backToTop.classList.add("show");

    }

    else{

        backToTop.classList.remove("show");

    }

});

backToTop.addEventListener("click",()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});

/*==========================================================
                EFECTO EN INPUTS
==========================================================*/

const inputs=document.querySelectorAll(

    "input, select, textarea"

);

inputs.forEach((input)=>{

    input.addEventListener("focus",()=>{

        input.parentElement.classList.add("focused");

    });

    input.addEventListener("blur",()=>{

        input.parentElement.classList.remove("focused");

    });

});

/*==========================================================
                INICIALIZACIÓN
==========================================================*/

window.addEventListener("load",()=>{

    updateProgress();

    textarea.dispatchEvent(

        new Event("input")

    );

});
/* ==========================================================
                MODO OSCURO
========================================================== */

const themeToggle = document.querySelector(".theme-toggle");
const themeIcon = themeToggle?.querySelector("i");


/* ==========================================================
                RECUPERAR TEMA GUARDADO
========================================================== */

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {

    document.body.classList.add("dark-mode");

    if (themeIcon) {

        themeIcon.classList.remove("fa-moon");
        themeIcon.classList.add("fa-sun");

    }

    if (themeToggle) {

        themeToggle.setAttribute(
            "aria-label",
            "Activar modo claro"
        );

    }

}


/* ==========================================================
                CAMBIAR TEMA
========================================================== */

if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        const isDark =
            document.body.classList.toggle("dark-mode");


        /* Guardar preferencia */

        localStorage.setItem(
            "theme",
            isDark ? "dark" : "light"
        );


        /* Cambiar icono */

        if (themeIcon) {

            themeIcon.classList.toggle(
                "fa-moon",
                !isDark
            );

            themeIcon.classList.toggle(
                "fa-sun",
                isDark
            );

        }


        /* Actualizar accesibilidad */

        themeToggle.setAttribute(
            "aria-label",
            isDark
                ? "Activar modo claro"
                : "Activar modo oscuro"
        );

    });

}