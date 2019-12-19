const DEFAULT_STATE = {
  notes: ['test'],
  tryNotes: [],
  doneNotes: []
};

const notesReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case 'SET_NOTES':
      return{
        ...state,
        notes:action.notes
      };
    case 'SET_TRY_NOTES':
      return{
        ...state,
        tryNotes: action.tryNotes
      };
    case 'SET_DONE_NOTES':
      return{
        ...state,
        doneNotes: action.doneNotes
      }
    default:
      return state;
  }
};

export default notesReducer;
