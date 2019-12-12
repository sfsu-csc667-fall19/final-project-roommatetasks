import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Header from './pages/Header';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; // THIS IS NEW!!
import rootReducer from './redux/reducers/rootReducer';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { setActiveUsers } from './redux/actions/userActions';
import { setNotes } from './redux/actions/notesAction';
import { setTryNotes } from './redux/actions/notesAction';

const ws = new WebSocket('ws://localhost:4000');
const store = createStore(rootReducer, applyMiddleware(thunk)); // MUST APPLY THUNK MIDDLEWARE!!

ws.onopen = () => {
  console.log('connection has opened!');
};

ws.onclose = () => {
  console.log('connection has closed!');
};

ws.onmessage = (message) => {
  const messageObject = JSON.parse(message.data);
  switch(messageObject.type){
    case 'UPDATE_USER_COUNT':
        store.dispatch(setActiveUsers(messageObject.count));
        break;
    case 'UPDATE_MESSAGE':
        console.log("in update message");
        console.log(messageObject);
        store.dispatch(setNotes(messageObject.notes));
        store.dispatch(setTryNotes(messageObject.notes));
        break;
    default:
      console.log("in deault case");
      break;
  }
  console.log("in index.js, inside was.onmessage", messageObject);
};

window.ws = ws;

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Header />
      <App />
    </Router>
  </Provider>
  ,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
