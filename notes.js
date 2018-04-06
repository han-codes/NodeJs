const fs = require('fs');

var fetchNotes = () => {
  try {
    var notesString = fs.readFileSync('notes-data.json');
    return notes = JSON.parse(notesString);
  } catch(e) {
    return [];
  }
};

var saveNotes = (notes) => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

var addNote = (title, body) => {
  var notes = fetchNotes();
  var note = {
    title,
    body
  };

  var duplicateNotes = notes.filter((note) => note.title === title);

  if (duplicateNotes.length === 0) {
    notes.push(note);
    saveNotes(notes);
    return note;
  }
};

var getAll = () => {
  return fetchNotes();
};

var getNote = (title) => {
  console.log('Read', title);
  var notes = fetchNotes();
  var filteredNotes = notes.filter((note) => note.title === title);
  // return notes.length === filteredNotes.length;
  return filteredNotes[0];
};

var removeNote = (title) => {
  console.log('Remove Notes', title);
  // fetch notes
  var notes = fetchNotes();
  // filter notes, removing the one with title of argument
  // will only include the note titles that wasn't passed in
  var filteredNotes = notes.filter((note) => note.title !== title);
  // save new notes array
  saveNotes(filteredNotes);

  // if true, means the note has been removed. Since filteredNotes array should be less than notes.length
  return notes.length !== filteredNotes.length;
};

var logNote = (note) => {
  debugger;
  console.log('---');
  console.log('Title: ', note.title);
  console.log('Body: ', note.body);
};

module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote,
  logNote
};
