const DEFAULT_STATE = {
    notes: [],
    _id: '',
    newNote: '',
   };
   /*
   const INITIAL_STATE =
   {
     notes: [],
   };
   */
   
   const notesReducer = (state = DEFAULT_STATE, action) => {
     switch (action.type) {
       case 'NOTES_SET_ID':
         return {
           ...state,
           _id: action._id,
         };
         case 'NOTES_SET_NEW_NOTE':
           return {
             ...state,
             newNote: action.newNote,
           };
       case 'NOTES_SET_NOTES':
         return {
           ...state,
           notes: action.notes,
         };
        case 'DEL_NOTE':
         return {
           ...state,
           notes: state.notes.filter(note => 
            note._id !== action.payload)
         }
        case 'ADD_NOTES':
          return {
            ...state,
            notes: [action.payload, ...state.notes]
          }
       default:
         return state;
     }
   };
   
   export default notesReducer;
   