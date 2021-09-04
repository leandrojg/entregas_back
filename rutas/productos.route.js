
const express = require('express');
const router = express.Router();
const crud = require('./../controllers/crud')

//CHECK
router.get("/", (req, res) => {
        res.send("Esta funcionando la ruta de productos papa...");
      });
 

//PROBANDO archivo Crud showData
router.get("/listar", crud.showData)

//PROBANDO archivo Crud showForID
router.get("/listar/:id", crud.showForID)

//PROBANDO archivo Crud saveData
router.post("/guardar", crud.saveData)

//PROBANDO archivo Crud showForID
router.get("/borrar/:id", crud.deleteId)

//PROBANDO archivo Crud showForID
router.get("/actualizar/:id", crud.upDateId)


module.exports = router;

// //En caso de volver a usar archivos
// const fs = require('fs');
// const data = JSON.parse(
//   fs.readFileSync('./productos.json', (encoding = 'utf8')),
// );


/*
DONDE DEBERIA PONER LOS ALERTS?? DE QUE MANERA?

Express validator
const {body, validationResult} = require('express-validator');


router.post('/registrar',[
  body('title', 'Ingrese el nombre del producto')
      .exists()
      .isLength({min:3}),
  body('price', 'Ingrese un precio valido')
      .exists()
      .isNumeric({min:2}),
  body('thumbnail', 'Ingrese una URL de imagen')
      .exists(),
], (req, res) => {

  const error = validationResult(req)
  if (!error.isEmpty()) {
    console.log(req.body)
    const valores = req.body
    const validaciones = error.array()
    res.render('index', {validaciones: validaciones, valores: valores})
  }else{
    crud.saveData()
    res.send('Validación Exitosa LLEGO!')
  }

})


*/