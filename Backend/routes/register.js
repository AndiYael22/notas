
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(express.json());

app.post('/user/register', (req, res) => {
  const { username, password, email } = req.body;

  res.json({ message: 'Registro exitoso', username, email });
});

app.get('/user/register', (req, res) => {
  res.send('Acceso GET a /user/register');
});

app.get('/', (req, res) => {
  res.send('¡Servidor en funcionamiento!');
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
