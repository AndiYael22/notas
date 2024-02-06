
const { User } = require('../models');

const createUser = async (req, res) => {
    try {
      const { username, password, email } = req.body;
      const newUser = await User.create({ username, password, email });
      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error en el servidor al crear usuario' });
    }
  };
  
  module.exports = {
    createUser,
  };