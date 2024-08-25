//importamos funciones de gulp
const {src, dest, watch, parallel} = require ('gulp');

//CSS
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');

//Imagenes
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin'); //Para crear imagenes más ligeras
const webp = require('gulp-webp');
const avif = require('gulp-avif');

//JS
const terser = require('gulp-terser-js');

//Las funciones son tareas que realiza GULP
/* Compilar el código de SASS */
function css (done){
   
    src('src/scss/**/*.scss')  //Identificar **TODOS los archivos de SASS con un único formato .scss
        .pipe(sourcemaps.init())//Iniciliza y va guardando la referencia
        .pipe(plumber())
        .pipe(sass()) //Compilarlo
        .pipe(postcss( [autoprefixer(), cssnano() ] ))
        .pipe(sourcemaps.write('.'))//ubicacion donde se guardará en la misma hora de estilos de css
        .pipe(dest('build/css')); //Almacena en el disco duro en la nueva carpeta indicada

    done(); //Callback avisa a gulp cuando llegamos al final 
}

function imagenes(done){
    const opciones = {
        optimizationLevel: 3 //Ligera el peso de las imagenes
    }

    src('src/img/**/*.{jpg,JPG,PNG,png}')  //Identificar **TODOS las imagenes con los distintos formatos jpg, png...
        .pipe(cache(imagemin(opciones))) //Instalamos una dependencia 'gulp-cache'
        .pipe(dest('build/img'));

    done();
}

function versionWebp(done){

    const opciones = {
        quality: 50 //define la calidad de las imagaenes
    };

    src('src/img/**/*.{jpg,JPG,PNG,png}') //Identificar **TODOS las imagenes con los distintos formatos jpg, png...
        .pipe(webp(opciones)) //identifico el archivo y llamo la funcion WEBP y baja la calidad
        .pipe(dest('build/img')); //Almacena en el disco duro en la nueva carpeta indicada

    done(); //Callback avisa a gulp cuando llegamos al final 
}

function versionAvif(done){

    const opciones = {
        quality: 50 //define la calidad de las imagaenes
    };

    src('src/img/**/*.{jpg,JPG,PNG,png}') //Identificar **TODOS las imagenes con los distintos formatos jpg, png...
        .pipe(avif(opciones))
        .pipe(dest('build/img'));

    done();
}

function javascript(done){
    src('src/js/**/*.js')
        .pipe(sourcemaps.init()) 
        .pipe(terser()) //llamamos a la funcion terser para mejorar el código
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/js'));

    done();
}

/*Para escuchar los cambios en sass*/
function dev(done){
    watch('src/scss/**/*.scss', css); //llama a la funcion css
    watch('src/js/**/*.js', javascript);

    done();
}



/* Mandamos a llamar la función con Node.js*/
exports.css = css;
exports.js = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
//Para ejecutar distintas tareas. Series: diferentes tareas se ejecutan una tras otra de forma secuencial
//Parallel: todas las funciones/tareas se ejecutan al mismo tiempo
exports.dev = parallel(imagenes,versionWebp,versionAvif, javascript, dev);


/*Si genera algún error 
Correr en la terminal: npm i -D gulp-webp@4 gulp-imagemin@7.1.0
*/