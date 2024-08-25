'use strict'
document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
});

function iniciarApp(){
    fixedNavigation();
    crearGaleria();
    scrollNav();
}

//Para la barra de navegación fija
function fixedNavigation(){
    const nav = document.querySelector('.header');
    const sobreFestival = document.querySelector('.sobre-festival');
    const body = document.querySelector('body');

    window.addEventListener('scroll', function() {
        
        //Con el metodo conseguimos detectar la posicion de la sección y activamos el nav
        //Se activa cuando sobre pasa la parte de abajo de la sección
        if(sobreFestival.getBoundingClientRect().bottom < 0){
            nav.classList.add('fixed');
            body.classList.add('no-scroll');
        }else{
            nav.classList.remove('fixed');
            body.classList.remove('no-scroll');
        }

    });//Método para saber la posición de la sección
}

//scroll smooth para la navegación
function scrollNav(){
    const navLinks = document.querySelectorAll('.navegacion-principal a');

    navLinks.forEach( links  =>{
        links.addEventListener('click', function(e){
            e.preventDefault(); //para prevenir la acción por defecto del scroll

            //configuramos un nuevo comportamiento del scroll
            const sectionScroll = e.target.attributes.href.value;
            const section = document.querySelector(sectionScroll);

            section.scrollIntoView({ behavior: 'smooth' });
        });
    });
}

function crearGaleria(){
    const galeriaImg = document.querySelector('.galeria-imagenes');
    
    //creamos la galería de forma dinámica
    for(let i = 1; i <= 12; i++){
        const imagen = document.createElement('picture');
        imagen.innerHTML = `
            <source srcset="./build/img/thumb/${i}.avif" type="image/avif">
            <source srcset="./build/img/thumb/${i}.webp" type="image/webp">
            <img  loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg" alt="Imagen galería"> 
        `;

        imagen.onclick = function(){
            mostrarImagen(i); //callback
        }
        
        galeriaImg.appendChild(imagen);
    }
}

function mostrarImagen(index){
    const imagen = document.createElement('picture');
    imagen.innerHTML = `
        <source srcset="./build/img/grande/${index}.avif" type="image/avif">
        <source srcset="./build/img/grande/${index}.webp" type="image/webp">
        <img  loading="lazy" width="200" height="300" src="build/img/grande/${index}.jpg" alt="Imagen galería"> 
    `;


    //Se crea el overlay para mostrar la imagen
    const overlay = document.createElement('div');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');
    overlay.onclick = function(){
        const body = document.querySelector('body');
        body.classList.remove('block-body');
        overlay.remove();
    }

    //Botón para cerrar el modal
    const cerrarModal = document.createElement('P');
    cerrarModal.innerHTML = 'X';
    cerrarModal.setAttribute('title', 'Cerrar');
    cerrarModal.classList.add('btn-cerrar');
    cerrarModal.onclick = function(){
        const body = document.querySelector('body');
        body.classList.remove('block-body');
        overlay.remove();
    }
    overlay.appendChild(cerrarModal); //entra en el mismo div

    //Se agrega al body
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('block-body');

}

