import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import { setIsLoggedIn } from "../redux/actions/userActions";
import { setDoneNotes } from "../redux/actions/notesAction";
import { setNotes } from "../redux/actions/notesAction";
import { Redirect } from "react-router-dom";
import "../dboard.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Dashboard = ({ dispatch, isLoggedIn, activeUsers, notes, doneNotes }) => {
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

    axios.get("/listnewnote").then(function(response) {
      console.log("list all the notes now");
      console.log(response.data.document);
      let arrayToAddToNotes = [];
      //might not need the for loop
      for (let i = 0; i < response.data.document.length; i++) {
        let temp = response.data.document[i].noteText;
        arrayToAddToNotes.push(temp);
        console.log(
          "in for loop of use effect and each pulled notes are:",
          temp
        );
      }
      // dispatch(setNotes(arrayToAddToNotes));
      dispatch(setNotes(response.data.document));
    });

    axios.get("/listdonenote").then(function(response) {
      console.log("list all the node notes");
      console.log(response.data.document);
      dispatch(setDoneNotes(response.data.document));
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
    const data = {
      type: "SEND_MESSAGE",
      noteText: text
    };
    console.log("what we are sending to websocket", data)
    window.ws.send(JSON.stringify(data));
    setText("");

    const noteData = {
      text,
      key: Date.now(),
      tag: "newNote"
    };

    console.log("before axios post of add note, note data is", noteData);
    axios.post("/addnote", { noteData }).then(function(response) {
      console.log("back to dashboard after add note");
      if (response.data.valid) {
        console.log("note added");
      }
    });

    axios.get("/listnewnote").then(function(response) {
      console.log("list all the notes now");
      console.log(response.data.document);
      let arrayToAddToNotes = [];
      //might not need the for loop
      for (let i = 0; i < response.data.document.length; i++) {
        let temp = response.data.document[i].noteText;
        arrayToAddToNotes.push(temp);
        console.log(
          "in for loop of use effect and each pulled notes are:",
          temp
        );
      }
      // dispatch(setNotes(arrayToAddToNotes));
      dispatch(setNotes(response.data.document));
    });
  };

  // function to change the status of the task
  const changeStatus = (validate, id, newnote) => {
    const newNoteData = {
      _id: id,
      note: newnote
    };
    // some axios call to chage status to done or not done
    if (validate === true) {
      axios
        .post("/updatenote", newNoteData)
        .then(res => {
          console.log(res);
        })
        .catch(console.log);
      console.log("set status to done");

      axios.get("/listnewnote").then(function(response) {
        console.log("list all the notes now");
        console.log(response.data.document);
        let arrayToAddToNotes = [];
        //might not need the for loop
        for (let i = 0; i < response.data.document.length; i++) {
          let temp = response.data.document[i].noteText;
          arrayToAddToNotes.push(temp);
          console.log(
            "in for loop of use effect and each pulled notes are:",
            temp
          );
        }
        // dispatch(setNotes(arrayToAddToNotes));
        dispatch(setNotes(response.data.document.noteText));
      });
  
      axios.get("/listdonenote").then(function(response) {
        console.log("list all the node notes");
        console.log(response.data.document);
        dispatch(setDoneNotes(response.data.document));
      });
    } else {
      console.log("set status to not done");
    }
  };

  //function to delete task
  const deleteTask = noteID => {
    console.log(noteID + " will be deleted");
    const data = {
      id: noteID
    };
    console.log(noteID);
    axios
      .post("/deletenote", {data})
      .then(res => {
        console.log(res);
      })
      .catch(console.log);
  };

  if (!isLoggedIn) {
    return <Redirect to="/login" />;
  }

  console.log("Active users are", activeUsers);
  console.log("Tasks are", notes);

  return (
    <div>
      <h2>This is Dashboard</h2>
      <div className="active-users">{activeUsers} people are watching this right now !</div>
      <div>
        Add a task for your roommate
        {/* this of new notes */}
        <div className="outterBox">
          <h3>Tasks</h3>
          <div className="innerBox">
            {console.log(notes)}
            {notes.map((note, i) => (
              <div key={note._id}>
                <div className="noteBox">
                  <div className="row">
                    <div className="col-1">
                      <input
                        className="check"
                        type="checkbox"
                        onChange={e => {
                          changeStatus(
                            e.target.checked,
                            note.noteKey,
                            note.noteText
                          );
                        }}
                      ></input>
                    </div>
                    <div className="col-8">
                      {" "}
                      <p>{note.noteText}</p>{" "}
                    </div>
                    <div className="col-1">
                      {/* <button
                        className="deleteBot"
                        onClick={() => {
                          deleteTask(note.noteKey);
                        }}
                      >
                        x
                      </button> */}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="marginBot">
            <input
              className="inputsz"
              value={text}
              onChange={e => setText(e.target.value)}
            />
            <button className="inputsz" onClick={handleAddNote}>
              Add Task
            </button>
          </div>
        </div>
        <br />
        {/* list of done notes */}
        <div className="outterBox">
          <h3>Done Tasks</h3>

          <div className="innerBox2">
            {console.log(doneNotes)}
            {doneNotes.map((note, i) => (
              <div key={note._id}>
                <div className="nnoteBoxDone">
                  <div className="row">
                    {/* <div className="col-1"><input className="check" type="checkbox"
                      onChange={e => { changeStatus(e.target.checked, note.noteKey, note.noteText) }}></input></div> */}
                    <div className="col">
                      {" "}
                      <div className="centerText"><p >{note.noteText}</p>{" "}</div>
                    </div>
                    {/* <div className="col-1"><button className="deleteBot" onClick={() => { deleteTask(note.noteKey) }}>x</button></div> */}
                  </div>
                </div>
              </div>
            ))}

          </div>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  isLoggedIn: state.userReducer.isLoggedIn,
  activeUsers: state.userReducer.activeUsers,
  notes: state.notesReducer.notes,
  tryNotes: state.notesReducer.tryNotes,
  doneNotes: state.notesReducer.doneNotes
});

export default connect(mapStateToProps)(Dashboard);
