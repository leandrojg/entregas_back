const express = require("express");
const app = express();
const path = require("path"); //modulo para normalizar rutas. (las barras funcionan distintas en windows que en mac)
const PORT = 3000;
const morgan = require("morgan");

//Middlewares
app.use(morgan("dev")); //puede ser tmb "combined" da mas info
app.use(express.json()); //recibir y enternder formato json
app.set("json spaces", 2); //para ordenar el json
app.use(express.urlencoded({ extended: false })); //Para entender los datos que vienen desde un formulario

//ESTE ES EL SERVIDOR

// const http = require("http").createServer(app);
const http = require("http").Server(app); //Probando coder
const io = require("socket.io")(http);
const v4f = require("uuid");

//SOCKETS
let notes = [];

//app.set asignamos funciones al servidor.
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views")); //Localizamos la carpeta vistas, el 1er parametro es si o si. es

app.get("/", (req, res) => {
  res.render("index"); //RENDERIZADO original
});


app.use(express.static(__dirname + "/public")); //indicamos la carpeta donde están los archivos estaticos

//ROUTES
const routers = require("./rutas/productos.route.cjs"); //Localizamos la ruta...
app.use("/api/productos", routers); //Le decimos a expres que lo utilize

//STATIC FILES
app.use(express.static(path.join(__dirname, "./public")));
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "./public/404.html"));
});


//SOCKETS SERVER

io.on("connection", (socket) => {
  console.log("Nueva conexion: ", socket.id);

  socket.emit("server:loadnotes", notes); //para renderizar el array de notas cuando se conecta

  socket.on("client:newnote", (newNote) => {
    const note = { ...newNote, id: v4f() };
    notes.push(note);
    io.emit("server:newnote", note); //enviamos la nota que guardamos
  });

  socket.on("client:deletenote", (noteId) => {
    notes = notes.filter((note) => note.id !== noteId);
    io.emit("server:loadnotes", notes); //para volver a pintar todo
  });

  socket.on("client:getnote", (noteId) => {
    //VERIFICAR
    const note = notes.find((note) => note.id === noteId);
    socket.emit("server:selectednote", note);
  }); //este socket

  socket.on("client:updatenote", (updateNote) => {
    notes = notes.map((note) => {
      if (note.id === updateNote.id) {
        (note.title = updateNote.title),
          (note.description = updateNote.description);
      }
      return note;
    });
    io.emit("server:loadnotes", notes);
  });
});

app.listen(PORT, () => {
  console.log(`Trabajando en el puerto: ${PORT}`);
});

//1:26:21
