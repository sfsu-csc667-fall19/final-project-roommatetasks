import React from 'react';
import { connect } from 'react-redux';
import { listNotes,setID,setNewNote, updateNote, addNote, delNote } from '../redux/actions/notesActions';
import { nodeInternals } from 'stack-utils';
import axios from 'axios';


const options = {
  withCredentials: true
};

const username = () => {
  axios.get('/cookie/', options)
    .then((res) => {
      return res.email;
    })
};

const Notes = ({ dispatch, notes, _id, newNote }) => {
  React.useEffect(() => {
    dispatch(listNotes());
  }, []);

  return (
    <div>
      <h2>Notes</h2>
    <div>
        <div>
        _id:
      <input onChange={e => dispatch(setID(e.target.value))}
      value={_id}/>
      <hr />
      New Value:
      <input onChange={e => dispatch(setNewNote(e.target.value))}
      value={newNote}/>
      <button onClick={ () => dispatch(updateNote())}>Save</button>
        </div>
    
        <hr />
      <div>
      Add new Notes:
      <input onChange={e => dispatch(setNewNote(e.target.value))}
      value={newNote}/>
      <button onClick={ () => dispatch(addNote(newNote))}>Add</button>
      </div>
      
      <hr />
      <div>
      Set ID of the notes you want to delete:
      <input onChange={e => dispatch(setID(e.target.value))}
      value={_id}/>
      
      <button onClick={ () => dispatch(delNote())}>Delete Note</button>
      </div>
      
        <hr/>
        <p>
            Make sure that your MongoDB Compass is up and running. </p>
        <p>    You need to refresh the page if you want to see the change from add or remove</p>
    </div>



      {notes.map((note, i) => (
        <div key={i}>
          <p>
              ${username}
              {note._id}:  {note.notes}

          </p>
          </div>
      ))}
    </div>
  );
};

const mapStateToProps = state => ({
notes: state.notesReducer.notes,
_id: state.notesReducer_id,
newNote: state.notesReducer.newNote,

});

export default connect(mapStateToProps)(Notes);