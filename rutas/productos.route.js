const express = require('express');
const router = express.Router();
const controller = require('./../controllers/index.controller');


let productos = [
  {
    "id":0,
    "title": "papa", 
    "price": 90000, 
    "thumbnail": "https://st.depositphotos.com/1784849/1417/i/600/depositphotos_14170591-stock-photo"
  },
  {
    "id":1,
    "title": "choclo", 
    "price": 90000, 
    "thumbnail": "https://st.depositphotos.com/1784849/1417/i/600/depositphotos_14170591-stock-photo"
  }, 
  {
    "id":0,
    "title": "papa", 
    "price": 90000, 
    "thumbnail": "https://st.depositphotos.com/1784849/1417/i/600/depositphotos_14170591-stock-photo"
  },
  {
    "id":1,
    "title": "choclo", 
    "price": 90000, 
    "thumbnail": "https://st.depositphotos.com/1784849/1417/i/600/depositphotos_14170591-stock-photo"
  }

];

//Probando controller
router.get('/controller', controller.index)

//CHECK
router.get("/", (req, res) => {
        res.send("Esta funcionando la ruta de productos...");
      });

//probando EJS
router.get("/ejs", (req, res) =>{
  res.render("index",
  {   
      lista: productos,
      mensaje: "Hello ejs",
      min: 5,
      max: 20,
      status: true,

  });
})      

//GET TODOS
router.get("/listar", (req, res) => {
    res.send(productos);
  });


//GET POR ID
router.get("/listar/:id", (req, res) => {
   
    if(!isNaN(req.params.id)){
        let id = parseInt(req.params.id,10);
        if(id >= 0 && id <= productos.length-1){
        const producto = productos.find(producto => producto.id === id);
        res.send(producto);
        }else{
        res.send('Fuera de rango...')
        }
        }else
        res.send('Esto no es un numero')
});

//GUARDAR PRODUCTO
router.post("/guardar", (req, res) => {

    const producto = req.body
    const id = productos.length + 1
    
    const newProduct = {
      id: id,
      title: producto.title,
      price: producto.price,
      thumbnail: producto.thumbnail,
    }

    productos = [...productos, newProduct]
    res.json(newProduct)
});


//BORRAR PRODUCTO
router.delete('/borrar/:id', (req, res) => {


    const id = parseInt(req.params.id,10);
    productos = productos.filter(produ => produ.id !== id);
    res.json(productos) 
  })

//ACTUALIZAR PRODUCTO
router.put('/actualizar/:id', (req, res) => {

    const id = parseInt(req.params.id,10);
    const {title,price, thumbnail} = req.body

    if (title && price && thumbnail) {
        productos.forEach((producto, i) => {
            if(producto.id === id) {
                producto.title = title;
                producto.price = price;
                producto.thumbnail = thumbnail;
            }
        }) ;
        res.json(productos);
    }else{
        res.status(500).json({error: 'Todos los campos son requeridos...'})
    }
  });


module.exports = router;