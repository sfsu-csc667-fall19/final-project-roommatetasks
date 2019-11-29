import React from 'react';
import axios from 'axios';
import '../dboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';




const DashBoard = () => {

    const [task, setTask] = React.useState('');


    const createTask = () => {
        const body = {
            note: task,
            user: "maybe add user"
        }
        axios.post('/endpoint', body)
            .then((res) => {
                console.log(res);
            })
            .catch(console.log);
    }
    const changeStatus = (validate) => {
        // some axios call to chage status to done or not done
        if (validate === true) {
            console.log('set status to done');
        } else {
            console.log('set status to not done');
        }
    }

    const deleteNote=(noteID)=>{
        console.log(noteID+" will be deleted")

    }

    return (
        <div>
            <h2>Welcome</h2>
            <div className="outterBox">
                <div className="innerBox">

                <div className="noteBox">
                        <div className="row">
                            <div className="col-1"><input className="check" type="checkbox"></input></div>
                            <div className="col-8">  notesstatic sanoke notes
                            </div>
                            <div className="col-1"><button className="deleteBot" onClick={() =>deleteNote('some id')}>x</button></div>
                        </div>
                    </div>
                    <div className="noteBox">
                        <div className="row">
                            <div className="col-1"><input className="check" type="checkbox"></input></div>
                            <div className="col-8">  notesstatic sanoke notes
                            </div>
                            <div className="col-1"><button className="deleteBot" onClick={() =>deleteNote('some id')}>x</button></div>
                        </div>
                    </div>
                    <div className="noteBox">
                        <div className="row">
                            <div className="col-1"><input className="check" type="checkbox"></input></div>
                            <div className="col-8">  notesstatic sanoke notes
                            </div>
                            <div className="col-1"><button className="deleteBot" onClick={() =>deleteNote('some id')}>x</button></div>
                        </div>
                    </div>
                    <div className="noteBox">
                        <div className="row">
                            <div className="col-1"><input className="check" type="checkbox"></input></div>
                            <div className="col-8">  notesstatic sanoke notes
                            </div>
                            <div className="col-1"><button className="deleteBot" onClick={() =>deleteNote('some id')}>x</button></div>
                        </div>
                    </div>
                    <div className="noteBox">
                        <div className="row">
                            <div className="col-1"><input className="check" type="checkbox"></input></div>
                            <div className="col-8"> static sanoke notesstatic sanoke notesstatic sanoke notesstatic sanoke notesstatic sanoke notesstatic sanoke notes
                            </div>
                            <div className="col-1"><button className="deleteBot" onClick={() =>deleteNote('some id')}>x</button></div>
                        </div>
                    </div>

                    <div className="noteBox">
                        <div className="row">
                            <div className="col-1"><input className="check" type="checkbox"></input></div>
                            <div className="col-8"> static sanoke notesstatic sanoke notesstatic sanoke notesstatic sanoke notesstatic sanoke notesstatic sanoke notes
                            </div>
                            <div className="col-1"><button className="deleteBot" onClick={() =>deleteNote('some id')}>x</button></div>
                        </div>
                    </div>

                    <div className="noteBoxDone">
                        <div className="row">
                            <div className="col-1"><input className="check" type="checkbox" onChange={e => { changeStatus(e.target.checked) }}></input></div>
                            <div className="col-8"> static sanoke notes
                            </div>
                            <div className="col-1"><button className="deleteBot" onClick={() =>deleteNote('some id')}>x</button></div>
                        </div>
                    </div>

                </div>
                <div className="marginBot" >
                    <input className="inputsz" value={task} onChange={e => { setTask(e.target.value) }} />
                    <button className="inputsz" onClick={createTask}>Add Task</button>
                </div>
            </div>
        </div>
    );
};

export default DashBoard;