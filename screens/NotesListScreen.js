import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity, Button } from "react-native";
import RealmService from "../services/RealmService";

export default function NotesListScreen() {
  const [notes, setNotes] = useState([]);
  const [newNoteContent, setNewNoteContent] = useState("");

  // Fetch notes when the component mounts
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = () => {
    const fetchedNotes = RealmService.getAllNotes();
    setNotes(fetchedNotes);
  };

  // Add a new note
  const handleAddNote = () => {
    if (newNoteContent.trim()) {
      RealmService.addNote(newNoteContent);
      setNewNoteContent(""); // Clear the input
      fetchNotes(); // Refresh notes
    }
  };

  // Remove a note
  const handleRemoveNote = (id) => {
    RealmService.removeNote(id);
    fetchNotes(); // Refresh notes
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter new note content"
        value={newNoteContent}
        onChangeText={setNewNoteContent}
      />
      <Button title="Add Note" onPress={handleAddNote} />
      {notes.length === 0 ? (
        <Text>No notes available.</Text>
      ) : (
        <FlatList
          data={notes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.noteItem}>
              <Text>{item.content}</Text>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleRemoveNote(item.id)}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
  noteItem: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#f1f1f1",
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  deleteButton: {
    backgroundColor: "#ff4d4d",
    padding: 5,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 12,
  },
});
