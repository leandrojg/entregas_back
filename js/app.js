const express = require('express');
const app = express();
const path = require('path');  //modulo para normalizar rutas. (las barras funcionan distintas en windows que en mac)
const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Funcionando...');
});
  
//ROUTES
const routers = require('../rutas/productos.route');  //Localizamos la ruta... 
app.use('/productos',routers)  //Le decimos a expres que lo utilize

//STATIC FILES
app.use(express.static(path.join(__dirname, './../public')))
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
