// services/RealmService.js
import Realm from "realm";

// Define your schema
const NoteSchema = {
  name: "Note",
  primaryKey: "id",
  properties: {
    id: "int", // Primary key
    content: "string",
    createdAt: "date",
  },
};

// Initialize Realm
const realm = new Realm({ schema: [NoteSchema] });

const RealmService = {
  // Fetch all notes
  getAllNotes: () => {
    const notes = realm.objects("Note").sorted("createdAt", true);
    return Array.from(notes); // Convert Realm objects to a plain array
  },

  // Add a new note
  addNote: (content) => {
    realm.write(() => {
      realm.create("Note", {
        id: new Date().getTime(), // Unique ID
        content: content,
        createdAt: new Date(),
      });
    });
  },

  // Remove a note by ID
  removeNote: (id) => {
    realm.write(() => {
      const note = realm.objectForPrimaryKey("Note", id);
      if (note) {
        realm.delete(note);
      }
    });
  },
};

export default RealmService;
