"use client";

import { useState, useEffect } from "react";
import NoteItem from "./components/NoteItem";

type Note = {
  id: number;
  title: string;
  description: string;
};

export default function Home() {
const [notes, setNotes] = useState<Note[]>([]);
const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [editingId, setEditingId] = useState<number | null>(null);
const [isLoaded, setIsLoaded] = useState(false);

useEffect(() => {
  const savedNotes = localStorage.getItem("notes");

  if (savedNotes) {
    setNotes(JSON.parse(savedNotes));
  }

  setIsLoaded(true);
}, []); 

useEffect(() => {
  if (isLoaded) {
    localStorage.setItem("notes", JSON.stringify(notes));
  }
}, [notes, isLoaded]);

  function addNote() {
    if (title.trim() === "" || description.trim() === "") {
      alert("Please enter a title and description.");
      return;
    }

    const newNote: Note = {
      id: Date.now(),
      title,
      description,
    };

    setNotes([...notes, newNote]);
    setTitle("");
    setDescription("");
  }

  function deleteNote(id: number) {
    setNotes(notes.filter((note) => note.id !== id));
  }

  function editNote(note: Note) {
    setEditingId(note.id);
    setTitle(note.title);
    setDescription(note.description);
  }

  function updateNote() {
    setNotes(
      notes.map((note) =>
        note.id === editingId
          ? { ...note, title, description }
          : note
      )
    );

    setEditingId(null);
    setTitle("");
    setDescription("");
  }

  return (
    <main className="container">
      <h1>My Notes</h1>

      <div className="form">
        <input
          type="text"
          placeholder="Note title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Note description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {editingId === null ? (
          <button onClick={addNote}>Add Note</button>
        ) : (
          <button onClick={updateNote}>Update Note</button>
        )}
      </div>

      <h2>Your Notes</h2>

        <div className="notes">
          {notes.length === 0 ? (
            <p>No notes yet.</p>
          ) : (
            notes.map((note) => (
              <NoteItem
               key={note.id}
                note={note}
                  onEdit={editNote}
                    onDelete={deleteNote}
/>
          ))
        )}
      </div>
    </main>
  );
}