const express = require('express');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');
const notesRouter = require('./routes/notes');

const app = express();
const PORT = process.env.PORT || 3001;


app.use(cors());
app.use(express.json());


const sequelize = new Sequelize({
  dialect: 'mysql',
  username: 'root',
  password: '1234',
  database: 'notas',
  host: '127.0.0.1',
});

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

const Note = sequelize.define('Note', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

User.hasMany(Note);
Note.belongsTo(User);

sequelize.sync();

app.use('/notes', notesRouter);

app.post('/user/register', async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const newUser = await User.create({ username, password, email });
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor al crear usuario' });
  }
});

app.post('/user/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username, password } });
    if (user) {
      res.status(200).json({ message: 'Inicio de sesión exitoso' });
    } else {
      res.status(401).json({ message: 'Credenciales incorrectas' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el servidor');
  }
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message }); 
});


app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});