const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const ejs = require('ejs');
const mysql2 = require('mysql2');
const util = require('util');
const nodemailer = require('nodemailer/lib/mailer');
const mysqlConfig=require('./config/config')

//const indexRouter = require('./routes/index.js'); // VER
//const usersRouter = require('./routes/users.js'); // VER
//app.use('/', indexRouter);// VER
//app.use('/users', usersRouter);// VER

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded());
app.set('views', __dirname + '/public');
app.engine('html', require('ejs').renderFile);

/** ESTABLECIENDO LA CONEXION A LA BASE DE DATOS **/
var coneccion = mysql2.createConnection(mysqlConfig);

coneccion.connect((error) => {
  if (error) {
      throw error;
  }

  console.log('Conexion con base de datos mysql establecida');
});


const consulta = util.promisify(coneccion.query).bind(coneccion);


/**      ARRANCANDO EL SERVIDOR      **/
app.use('/', express.static(__dirname + '/public/'));
const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`El servidor arranco en el puerto ${port}`)
});

app.get('/', function (req, res) {
  res.sendFile('index.html', {
    root: __dirname + "/public"
  });
});

/** RUTAS **/
/** CORREO
*/
app.post('/contacto', (req, res) => {
  //res.status(200).send(`recibi el formulario ${req.body.asuntoForm}, ${req.body.emailForm}, ${req.body.mensajeForm}`);
  console.log(req.body.asuntoForm);
  console.log(req.body.emailForm);
  console.log(req.body.mensajeForm);

  async function main() {
    var transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 645,
      secure: true, // upgrade later with STARTTLS
      auth: {
        user: "komargustavo@gmail.com",
        pass: "hbtivdrkmiyzjske"
      }
    });
    let info = await transporter.sendMail({
      from: `${req.body.asuntoForm} <${req.body.emailForm}>`,
      to: "komargustavo@hotmail.com",
      subject: "Prueba de envío de correo ",
      html: `Nombre: ${req.body.asuntoForm} <br> Email: ${req.body.emailForm} <br> ${req.body.mensajeForm}`
    });

  }
  main().catch(console.error);

});

/**            ARTICULOS              **/
app.get('/articulos', async (req, res) => {
  try {
    const query = 'select * from articulos';

    let respuesta = await consulta(query);
    res.send({ "respuesta": respuesta });
  }
  catch {
    console.log(e.message);
    res.status(413).send({ "Error": e.message });
  }
});

/**            CLIENTES              **/
// GET cliente
app.get('/cliente', async (req, res) => {
  try {
      const query = 'SELECT * FROM cliente';

      const respuesta = await consulta(query);

      res.status(200).send({ "respuesta": respuesta });
  }

  catch (e) {
      console.error(e.message);
      res.status(413).send({ "mensaje": e.message })
  }
});
// GET un solo cliente
app.get('/cliente/:id', async (req, res) => {
  try {
      const query = 'SELECT * FROM cliente WHERE id = ?';

      const respuesta = await consulta(query, [req.params.id]);

      // verifica si el cliente existe
      if (respuesta.length === 0) {
          throw new Error("No se encuentra ese cliente");
      }

      res.status(200).send({ "respuesta": respuesta });
  }

  catch (e) {
      console.error(e.message);
      res.status(413).send({ "mensaje": e.message })
  }
});
// POST cliente
app.post('/cliente', async (req, res) => {

  try {

      // valida que el email sea unico
      let query = 'SELECT mailCliente FROM cliente WHERE mailCliente = ?';

      let respuesta = await consulta(query, [req.body.email]);

      if (respuesta.length > 0) {
          throw new Error("El email ya se encuentra registrado");
      }


      // strings toUpperCase
      // Inserta registro de cliente en la BD  -- nombreCliente, domicilioCliente, telefonoCliente, mailCliente
      query = 'INSERT INTO cliente (nombreCliente, domicilioCliente, telefonoCliente, mailCliente) VALUES (?, ?, ?, ?)';
      respuesta = await consulta(query, [req.body.nombre, req.body.direccion, req.body.telefono, req.body.email]);

  }

  catch (e) {
      // el if convierte el mensaje de error del sistema en uno reconocible para el usuario
      if (e.code === 'ER_DUP_ENTRY') {
          console.error(e.message);
          res.status(413).send("El email ya se encuentra registrado");
      } else {
          console.error(e.message);
          res.status(413).send({ "mensaje": e.message })
      }
  }
});
// PUT cliente
app.put('/cliente/:id', async (req, res) => {
  try {
      // valida que el id corresponda a un cliente existente
      let query = 'SELECT id FROM cliente WHERE id = ?';

      let respuesta = await consulta(query, [req.params.id]);

      if (respuesta == 0) {
          throw new Error("No existe esa cliente");
      }

      // valida que el email sea unico
      query = 'SELECT email FROM cliente WHERE email = ?';

      respuesta = await consulta(query, [req.body.email]);

      if (respuesta > 0) {
          throw new Error("El email ya se encuentra registrado");
      }

      // strings toUpperCase
      const nombre = req.body.nombre.toUpperCase();
      const direccion = req.body.direccion.toUpperCase();
      const email = req.body.email.toUpperCase();


      // update de la BD -- nombreCliente, domicilioCliente, telefonoCliente, mailCliente
      query = 'UPDATE cliente SET nombreCliente = ?, domicilioCliente = ?, telefonoCliente = ?, mailCliente = ? WHERE id = ?';

      respuesta = await consulta(query, [nombre, direccion, telefono, email, req.params.id]);

  }

  catch (e) {
      // el if convierte el mensaje de error del sistema en uno reconocible para el usuario
      if (e.code === 'ER_DUP_ENTRY') {
          console.error(e.message);
          res.status(413).send("El email ya se encuentra registrado");
      } else {
          console.error(e.message);
          res.status(413).send({ "mensaje": e.message })
      }
  }
});
// DELETE cliente
app.delete('/cliente/:id', async (req, res) => {
  try {
      //Valida que el cliente este registrado
      let query = 'SELECT * FROM cliente WHERE id = ?';

      let respuesta = await consulta(query, [req.params.id]);

      if (respuesta.length == 0) {
          throw new Error("Este cliente no existe");
      }

      // borrar el registro del cliente de la BD
      query = 'DELETE FROM cliente WHERE id = ?';

      respuesta = await consulta(query, [req.params.id]);

      res.status(200).send("El registro se borro correctamente");
  }
  catch (e) {
      console.error(e.message);
      res.status(413).send({ "mensaje": e.message })
  }
});


module.exports = coneccion;