import axios from 'axios';


const setNotes = notes => ({
  type: 'NOTES_SET_NOTES',
  notes,
});
export const listNotes = () => (dispatch, getState) => {
  axios.get('/app/list')
    .then((res) => dispatch(setNotes(res.data)))
    .catch(console.log);
};

export const setID = _id => ({
  type: 'NOTES_SET_ID',
  _id,
});

export const setNewNote = newNote => ({
  type: 'NOTES_SET_NEW_NOTE',
  newNote,
});

export const addNote = newNote => (dispatch , getState) => {
  //const {_id, newNote} = getState().notesReducer;
  const newData = newNote;
    //post request to routes
    axios.post(`/app/list?notes=${newData}`)
        .then(res => dispatch((res.data)))
        .catch(console.log);
};

export const delNote = () => (dispatch , getState) => {
    const {_id, newNote} = getState().notesReducer;
      //post request to routes
      axios.delete(`/app/list?noteID=${_id}`)
          .then(res => dispatch((res.data)))
          .catch(console.log);
  };


export const updateNote = () => (dispatch,getState) => {
const {_id, newNote} = getState().notesReducer;
// const _id = getState().notesReducer.id;
//const newNote = getState().newNote;

axios.get(`/app/update?_id=${_id}&notes=${newNote}`)
.then(() => {
  dispatch(setNewNote(''));
  dispatch(setID(''));
  dispatch(listNotes());
})
.catch(console.log);
}