const express = require('express');
const { Note } = require('../models'); 

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const notes = await Note.findAll();
    res.json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las notas desde la base de datos' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, content } = req.body;


const UserId = req.user ? req.user.id : null; 
const newNote = await Note.create({ title, content, userId: UserId });


    res.status(201).json(newNote);
  } catch (error) {
    console.error(error.message); 
    res.status(500).json({ error: 'Error al guardar la nota en la base de datos' });
  }
});

router.delete('/:noteId', async (req, res) => {
  try {
    const noteId = req.params.noteId;
    const deletedNote = await Note.destroy({ where: { id: noteId } });
    if (deletedNote) {
      res.status(200).json({ message: 'Nota eliminada exitosamente' });
    } else {
      res.status(404).json({ error: 'Nota no encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar la nota' });
  }
});
router.put('/:noteId', async (req, res) => {
  try {
    const noteId = req.params.noteId;
    const { title, content } = req.body;
    
    const updatedNote = await Note.update(
      { title, content },
      { where: { id: noteId }, returning: true, plain: true }
    );

    if (updatedNote) {
      res.status(200).json(updatedNote[1]); 
    } else {
      res.status(404).json({ error: 'Nota no encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar la nota' });
  }
});

module.exports = router;