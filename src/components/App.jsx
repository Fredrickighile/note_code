import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);

  
  useEffect(() => {
    fetchNotes();
}, []);

const fetchNotes = async () => {
    const response = await axios.get('http://localhost:5000/notes');
    setNotes(response.data);
};

const addNote = async (newNote) => {
    const response = await axios.post('http://localhost:5000/notes', newNote);
    setNotes(prevNotes => [...prevNotes, response.data]);
};

const deleteNote = async (id) => {
    await axios.delete(`http://localhost:5000/notes/${id}`);
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
};

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem) => {
    return (
        <Note
            key={noteItem.id} // Use the unique id from the database
            id={noteItem.id} // Pass the unique id to the Note component
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
        />
    );
})}
      <Footer />
    </div>
  );
}

export default App;
