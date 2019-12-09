import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import { setIsLoggedIn } from "../redux/actions/userActions";
import { setTryNotes } from "../redux/actions/notesAction";
import { setNotes } from "../redux/actions/notesAction";
import { Redirect } from "react-router-dom";

const Dashboard = ({ dispatch, isLoggedIn, activeUsers, notes, tryNotes }) => {
  React.useEffect(() => {
    console.log("in useeffect of dashboard isLoggedin", isLoggedIn);
    if (!isLoggedIn) {
      console.log("in if of dashboard, useeffect, isLoggedIn", isLoggedIn);
      let cookieData = document.cookie.split(";");
      let eqPos1 = cookieData[0].indexOf("=") + 1;
      let email = cookieData[0].substr(eqPos1, cookieData[0].length);

      let eqPos2 = cookieData[1].indexOf("=") + 1;
      let password = cookieData[1].substr(eqPos2, cookieData[1].length);

      const loginData = {
        email,
        password
      };

      console.log("logindata in dashboard", loginData);

      axios
        .post("/redis", {
          loginData
        })
        .then(function(response) {
          console.log("back to dashboard", response);
          if (response.data.valid) {
            console.log("now try to redirect it to dashboard");
            dispatch(setIsLoggedIn(true));
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  });

  React.useEffect(() => {
    console.log("in dashboard's second useEffect");

    axios.get("/listnote").then(function(response) {
      console.log("list all the notes now");
      console.log(response.data.document);
      let arrayToAddToNotes = [];
      for (let i = 0; i < response.data.document.length; i++) {
        let temp = response.data.document[i].noteText;
        arrayToAddToNotes.push(temp);
        console.log(
          "in for loop of use effect and each pulled notes are:",
          temp
        );
      }
      dispatch(setNotes(arrayToAddToNotes));
    });
  }, []);

  const [text, setText] = React.useState("");

  const handleLogout = () => {
    document.cookie = "email=";
    document.cookie = "password=";
    dispatch(setIsLoggedIn(false));
    console.log("isLoggedin in logout", isLoggedIn);
  };

  const handleAddNote = () => {
    console.log("in handle add note");
    let arrayOfNotes = [];
    arrayOfNotes.push(text);
    const data = {
      type: "SEND_MESSAGE",
      newNote: text
    };
    window.ws.send(JSON.stringify(data));
    setText("");

    const noteData = {
      text,
      key: Date.now()
    };

    console.log("before axios post of add note, note data is", noteData);
    axios.post("/addnote", { noteData }).then(function(response) {
      console.log("back to dashboard after add note");
      if (response.data.valid) {
        console.log("note added");
      }
    });

    axios.get("/listnote").then(function(response) {
      console.log("list all the notes now");
      console.log(response.data.document);
      dispatch(setTryNotes(response.data.document));
    });
  };

  if (!isLoggedIn) {
    return <Redirect to="/login" />;
  }

  console.log("Active users are", activeUsers);
  console.log("Tasks are", notes);

  return (
    <div>
      <h2>This is Dashboard</h2>
      <div className="active-users">active users: {activeUsers}</div>
      <div>
        Add a task for your roommate
        <div>
          <input value={text} onChange={e => setText(e.target.value)} />
        </div>
        <div>
          <button onClick={handleAddNote}> Add Note </button>
          <div>
            {notes.map((note, i) => (
              <div key={i}>{note}</div>
            ))}
          </div>
        </div>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

const mapStateToProps = state => ({
  isLoggedIn: state.userReducer.isLoggedIn,
  activeUsers: state.userReducer.activeUsers,
  notes: state.notesReducer.notes,
  tryNotes: state.notesReducer.tryNotes
});

export default connect(mapStateToProps)(Dashboard);
