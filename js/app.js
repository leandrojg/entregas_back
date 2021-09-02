const express = require('express');
const app = express();
const path = require('path');  //modulo para normalizar rutas. (las barras funcionan distintas en windows que en mac)
const PORT = 3000;
const morgan = require('morgan');

//Middlewares
app.use(morgan('dev'));  //puede ser tmb "combined" da mas info
app.use(express.json()); //recibir y enternder formato json
app.set('json spaces', 2) //para ordenar el json 
app.use(express.urlencoded({extended:false})); //Para entender los datos que vienen desde un formulario


//RENDERIZADO 
app.get('/', (req, res) => {
    res.render("index")
})

//ROUTES
const routers = require('../rutas/productos.route');  //Localizamos la ruta... 
app.use('/api/productos',routers)  //Le decimos a expres que lo utilize

//STATIC FILES
app.use(express.static(path.join(__dirname, './public')))
app.use((req,res) => {
    res.sendFile(path.join(__dirname, './../public/404.html'));
});

//app.set asignamos funciones al servidor.
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './../views')); //Localizamos la carpeta vistas, el 1er parametro es si o si. es

app.listen(PORT, ()=>{
    console.log(`Trabajando en el puerto: ${PORT}`)
})


//1:26:21
