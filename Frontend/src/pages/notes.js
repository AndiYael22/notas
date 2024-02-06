import React, { useState, useEffect } from 'react';
import '../css/notes.css';
import Snowfall from '../components/snow';
import { useNavigate } from 'react-router-dom';

const Notes = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [savedNotes, setSavedNotes] = useState([]);
  const [showNotes, setShowNotes] = useState(false);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editingNote, setEditingNote] = useState({ id: null, title: '', content: '' });
  const [archivedNotes, setArchivedNotes] = useState([]);
  const [showArchivePopup, setShowArchivePopup] = useState(false);

  const handleLogout = () => {
    navigate('/login');
  };

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch('http://localhost:3001/notes');
        if (response.ok) {
          const notes = await response.json();
          setSavedNotes(notes);
        } else {
          alert('Error al obtener las notas desde la base de datos');
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
    };

    fetchNotes();
  }, []);

  const toggleShowArchived = () => {
    setShowArchivePopup(!showArchivePopup);
  };
  

  const handleSave = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert('El título y el contenido no pueden estar vacíos');
      return;
    }

    const newNote = {
      title: title,
      content: content,
    };

    try {
      const response = await fetch('http://localhost:3001/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newNote),
      });

      if (response.ok) {
        const savedNote = await response.json();
        setSavedNotes([...savedNotes, savedNote]);
      } else {
        alert('Error al guardar la nota en la base de datos');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }

    setTitle('');
    setContent('');
  };

  const handleArchive = (note) => {
    setArchivedNotes([...archivedNotes, note]);
    const updatedNotes = savedNotes.filter((n) => n.id !== note.id);
    setSavedNotes(updatedNotes);
  };

  const handleDelete = async (noteId) => {
    try {
      const response = await fetch(`http://localhost:3001/notes/${noteId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const updatedNotes = savedNotes.filter((note) => note.id !== noteId);
        setSavedNotes(updatedNotes);
      } else {
        alert('Error al eliminar la nota desde la base de datos');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  const toggleShowNotes = () => {
    setShowNotes(!showNotes);
  };

  const startEditing = (note) => {
    setEditingNote({ id: note.id, title: note.title, content: note.content });
    setIsEditing(true);
  };

  const confirmEdit = async () => {
    try {
      const response = await fetch(`http://localhost:3001/notes/${editingNote.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingNote),
      });

      if (response.ok) {
        const updatedNotes = savedNotes.map((note) =>
          note.id === editingNote.id ? { ...note, title: editingNote.title, content: editingNote.content } : note
        );

        setSavedNotes(updatedNotes);
        setIsEditing(false);
      } else {
        alert('Error al actualizar la nota en la base de datos');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditingNote({ id: null, title: '', content: '' });
  };

  return (
    <div className="notes-container">
      <Snowfall />
      <div className="notes">
        <form>
          <label>Notas</label>
          <input
            className="title"
            type="text"
            placeholder="Ingrese el título de la nota"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Ingrese el contenido de la nota"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <button className="guardar" onClick={handleSave}>
            Guardar
          </button>
        </form>

        <div className="saved-notes">
          <button className="show-hide" onClick={toggleShowNotes}>
            {showNotes ? 'Ocultar Notas' : 'Mostrar Notas'}
          </button>

          {showNotes && (
            <>
              <h2 className="titlenotes">Notas Guardadas</h2>
              <div className="noteposition">
                {savedNotes.map((note, index) => (
                  <div key={index} className="note">
                    <h3 className="contentitle">{note.title}</h3>
                    <p className="notecontent">{note.content}</p>
                    <p className="note-date">{note.createdAt.toString()}</p>
                    <div className="buttonnotes">
                      <button className="editar" onClick={() => startEditing(note)}></button>
                      <button className="archivar" onClick={() => handleArchive(note)}></button>
                      <button className="eliminar" onClick={() => handleDelete(note.id)}></button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          <button className="logout" onClick={handleLogout}></button>
          <div className="logo"></div>
          <button className="archived-toggle" onClick={toggleShowArchived}>
            Mostrar Archivados
          </button>
        </div>
      </div>

      {showArchivePopup && (
  <div className="archive-popup">
    <h2 className="archive-title">Notas Archivadas</h2>
    <div className="archive-notes">
      {archivedNotes.map((note, index) => (
        <div key={index} className="archive-note">
          <h3 className="archive-contentitle">{note.title}</h3>
          <p className="archive-notecontent">{note.content}</p>
          <p className="archive-note-date">{note.createdAt.toString()}</p>
        </div>
      ))}
    </div>
  </div>
)}

      {isEditing && (
        <div className="edit-popup">
          <label>Editar</label>
          <input
            className="editname"
            type="text"
            value={editingNote.title}
            onChange={(e) => setEditingNote({ ...editingNote, title: e.target.value })}
          />

          <textarea
            className="editcontent"
            value={editingNote.content}
            onChange={(e) => setEditingNote({ ...editingNote, content: e.target.value })}
          ></textarea>
          <div className="buton2">
            <button className="acept" onClick={confirmEdit}></button>
            <button className="cancel" onClick={cancelEdit}></button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notes;
