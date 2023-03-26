const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4009;

app.use(cors()); // Permitir todas las solicitudes CORS
app.use(bodyParser.json());

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Leer el archivo users.json
  const users = JSON.parse(fs.readFileSync('users.json'));

  // Verificar si el usuario y la contraseña coinciden con alguno de los usuarios en el archivo
  const user = users.users.find(u => u.username === username && u.password === password);

  if (user) {
    res.status(200).json({ message: 'Inicio de sesión exitoso' });
  } else {
    res.status(401).json({ message: 'Nombre de usuario o contraseña incorrectos' });
  }
});

// Redirigir al usuario al componente del dashboard luego de un inicio de sesión exitoso
app.get('/dashboard', (req, res) => {
  res.sendFile(__dirname + '/dist/app/index.html');
});

app.use(express.static(__dirname + '/dist/app'));

app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
