// Firebase Firestore Demo App
// This is a standalone demo showing Firebase integration
// Your main App.js remains unchanged for your restaurant app

import React, { useState, useEffect } from 'react';
import './App.css';

// Firebase imports
import {
  addDocument,
  getDocuments,
  getDocById,
  updateDocById,
  deleteDocById,
  init,
} from './lib/firestoreService';
import useCollection from './hooks/useCollection';

function FirebaseDemo() {
  // State for notes
  const [noteText, setNoteText] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [selectedNote, setSelectedNote] = useState(null);
  const [manualNotes, setManualNotes] = useState([]);

  // Use the custom hook for real-time updates
  const { items: realtimeNotes, loading, error } = useCollection('notes');

  // Initialize Firebase on mount
  useEffect(() => {
    init();
    console.log('Firebase initialized successfully');
    
    // Check if Firebase config is set
    if (!process.env.REACT_APP_FIREBASE_API_KEY) {
      console.warn('Firebase environment variables not set. Please configure .env file.');
    }
  }, []);

  // Add a new note
  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!noteText.trim()) return;

    try {
      const docId = await addDocument('notes', {
        text: noteText,
        completed: false,
      });
      console.log('Note added with ID:', docId);
      setNoteText('');
    } catch (error) {
      console.error('Failed to add note:', error);
      alert('Failed to add note. Check console for details.');
    }
  };

  // Update a note
  const handleUpdateNote = async (id) => {
    if (!editText.trim()) return;

    try {
      await updateDocById('notes', id, {
        text: editText,
      });
      console.log('Note updated:', id);
      setEditingId(null);
      setEditText('');
    } catch (error) {
      console.error('Failed to update note:', error);
      alert('Failed to update note. Check console for details.');
    }
  };

  // Toggle note completion
  const handleToggleComplete = async (note) => {
    try {
      await updateDocById('notes', note.id, {
        completed: !note.completed,
      });
      console.log('Note completion toggled:', note.id);
    } catch (error) {
      console.error('Failed to toggle note:', error);
    }
  };

  // Delete a note
  const handleDeleteNote = async (id) => {
    if (!window.confirm('Are you sure you want to delete this note?')) return;

    try {
      await deleteDocById('notes', id);
      console.log('Note deleted:', id);
    } catch (error) {
      console.error('Failed to delete note:', error);
      alert('Failed to delete note. Check console for details.');
    }
  };

  // Get single note by ID (manual fetch demo)
  const handleGetNoteById = async (id) => {
    try {
      const note = await getDocById('notes', id);
      setSelectedNote(note);
      console.log('Fetched note:', note);
    } catch (error) {
      console.error('Failed to get note:', error);
    }
  };

  // Manual fetch all notes (non-realtime)
  const handleManualFetch = async () => {
    try {
      const notes = await getDocuments('notes');
      setManualNotes(notes);
      console.log('Manually fetched notes:', notes);
    } catch (error) {
      console.error('Failed to fetch notes:', error);
    }
  };

  // Start editing
  const startEdit = (note) => {
    setEditingId(note.id);
    setEditText(note.text);
  };

  return (
    <div className="App" style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>🔥 Firebase Firestore Demo</h1>
      
      {/* Firebase Status */}
      <div style={{ 
        padding: '15px', 
        marginBottom: '20px', 
        backgroundColor: process.env.REACT_APP_FIREBASE_API_KEY ? '#d4edda' : '#f8d7da',
        border: '1px solid',
        borderColor: process.env.REACT_APP_FIREBASE_API_KEY ? '#c3e6cb' : '#f5c6cb',
        borderRadius: '5px'
      }}>
        <strong>Firebase Status:</strong> {
          process.env.REACT_APP_FIREBASE_API_KEY 
            ? '✅ Configured' 
            : '❌ Not Configured - Please set environment variables'
        }
      </div>

      {/* Add Note Form */}
      <div style={{ marginBottom: '30px' }}>
        <h2>Add New Note</h2>
        <form onSubmit={handleAddNote} style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Enter note text..."
            style={{ 
              flex: 1, 
              padding: '10px', 
              fontSize: '16px',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
          />
          <button 
            type="submit"
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Add Note
          </button>
        </form>
      </div>

      {/* Real-time Notes (using useCollection hook) */}
      <div style={{ marginBottom: '30px' }}>
        <h2>📝 Notes (Real-time with Hook)</h2>
        {loading && <p>Loading notes...</p>}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        
        {!loading && realtimeNotes.length === 0 && (
          <p style={{ color: '#666' }}>No notes yet. Add one above!</p>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {realtimeNotes.map((note) => (
            <div 
              key={note.id} 
              style={{
                padding: '15px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                backgroundColor: note.completed ? '#f0f0f0' : 'white'
              }}
            >
              {editingId === note.id ? (
                // Edit mode
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    style={{ 
                      flex: 1, 
                      padding: '8px',
                      border: '1px solid #ddd',
                      borderRadius: '4px'
                    }}
                  />
                  <button 
                    onClick={() => handleUpdateNote(note.id)}
                    style={{
                      padding: '8px 15px',
                      backgroundColor: '#28a745',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Save
                  </button>
                  <button 
                    onClick={() => setEditingId(null)}
                    style={{
                      padding: '8px 15px',
                      backgroundColor: '#6c757d',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                // View mode
                <div>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginBottom: '10px'
                  }}>
                    <span style={{ 
                      textDecoration: note.completed ? 'line-through' : 'none',
                      fontSize: '16px'
                    }}>
                      {note.text}
                    </span>
                    <span style={{ fontSize: '12px', color: '#666' }}>
                      ID: {note.id.substring(0, 8)}...
                    </span>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button 
                      onClick={() => handleToggleComplete(note)}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: note.completed ? '#ffc107' : '#28a745',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '14px'
                      }}
                    >
                      {note.completed ? 'Undo' : 'Complete'}
                    </button>
                    <button 
                      onClick={() => startEdit(note)}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '14px'
                      }}
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleGetNoteById(note.id)}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: '#17a2b8',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '14px'
                      }}
                    >
                      Get by ID
                    </button>
                    <button 
                      onClick={() => handleDeleteNote(note.id)}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: '#dc3545',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '14px'
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Manual Fetch Demo */}
      <div style={{ marginBottom: '30px' }}>
        <h2>🔄 Manual Fetch (Non-realtime)</h2>
        <button 
          onClick={handleManualFetch}
          style={{
            padding: '10px 20px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginBottom: '15px'
          }}
        >
          Fetch All Notes Manually
        </button>
        
        {manualNotes.length > 0 && (
          <div style={{ 
            padding: '15px', 
            backgroundColor: '#f8f9fa',
            border: '1px solid #ddd',
            borderRadius: '5px'
          }}>
            <strong>Manually fetched {manualNotes.length} notes:</strong>
            <ul style={{ marginTop: '10px' }}>
              {manualNotes.map(note => (
                <li key={note.id}>{note.text}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Selected Note Display */}
      {selectedNote && (
        <div style={{ 
          padding: '15px', 
          backgroundColor: '#e7f3ff',
          border: '1px solid #b3d9ff',
          borderRadius: '5px',
          marginBottom: '20px'
        }}>
          <h3>Selected Note (getDocById):</h3>
          <p><strong>ID:</strong> {selectedNote.id}</p>
          <p><strong>Text:</strong> {selectedNote.text}</p>
          <p><strong>Completed:</strong> {selectedNote.completed ? 'Yes' : 'No'}</p>
          <button 
            onClick={() => setSelectedNote(null)}
            style={{
              padding: '6px 12px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginTop: '10px'
            }}
          >
            Clear
          </button>
        </div>
      )}

      {/* Instructions */}
      <div style={{ 
        marginTop: '40px', 
        padding: '20px', 
        backgroundColor: '#fff3cd',
        border: '1px solid #ffc107',
        borderRadius: '5px'
      }}>
        <h3>📚 Instructions:</h3>
        <ol style={{ textAlign: 'left' }}>
          <li>Configure Firebase environment variables in .env file</li>
          <li>Add notes using the form above</li>
          <li>Notes update in real-time (no refresh needed)</li>
          <li>Try editing, completing, and deleting notes</li>
          <li>Use "Get by ID" to fetch a single note</li>
          <li>Use "Manual Fetch" to see non-realtime fetching</li>
        </ol>
      </div>
    </div>
  );
}

export default FirebaseDemo;
