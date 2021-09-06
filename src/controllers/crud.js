let productos = [];

exports.productos = productos;

exports.saveData = (req, res, next) => {
  let { title, price, thumbnail } = req.body;

  const producto = req.body;
  const id = productos.length + 1;

  const newProduct = {
    id: id,
    title: producto.title,
    price: producto.price,
    thumbnail: producto.thumbnail,
  };

  productos = [...productos, newProduct];
  console.log(productos);

  res.send(title + " " + price + " " + thumbnail);
};


exports.showData = (req, res, next) => {
  console.log("🚀 ~ file: crud.js ~ line 39 ~ productos", productos)
  res.send(productos);
};


exports.showForID = (req, res, next) => {
  if (!isNaN(req.params.id)) {
  
    let id = parseInt(req.params.id, 10);
    if (id > 0 && id <= productos.length) {
      const producto = productos.find((producto) => producto.id === id);
      res.send(producto);
    } else {
      res.send("Fuera de rango...");
    }
  } else res.send("Esto no es un numero");
};

exports.deleteId = (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  productos = productos.filter((produ) => produ.id !== id);
  res.json(productos);
};

exports.upDateId = (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  const { title, price, thumbnail } = req.body;

  if (title && price && thumbnail) {
    productos.forEach((producto, i) => {
      if (producto.id === id) {
        producto.title = title;
        producto.price = price;
        producto.thumbnail = thumbnail;
      }
    });
    res.json(productos);
  } else {
    res.status(500).json({ error: "Todos los campos son requeridos..." });
  }
};
