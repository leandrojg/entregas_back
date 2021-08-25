const controller = {};

const mensaje = 'INDEX DESDE EL SERVIDOR CON PUG Y DESDE UNA VARIABLE'

controller.index = (req, res) => {
    //res.send(`La conexión ha sido correcta desde index controller`);

  
}

module.exports = controller;



// let {min, nivel, max, titulo} = req.query;
// console.log(req.query)
// if(true){
//     //nivel = ((nivel-min) * 100) / (max - min)
//     res.render('index', {mensaje: titulo,min,max,nivel})
// }else
// res.send("Fuera de rango...")