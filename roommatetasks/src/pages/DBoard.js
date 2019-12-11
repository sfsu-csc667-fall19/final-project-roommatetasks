import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../dboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';




const DBoard = () => {

    const [task, setTask] = React.useState('');
    const [taskList, setTaskList] = React.useState([]);

    // function to get all task.
    const fetchData = async () => {
        const response = await axios.get(`/listnote`);
        console.log(response.data);
        const tempList = response.data.document.map((allTasks) =>
                <div className="noteBox">
                    <div className="row">
                        <div className="col-1"><input className="check" type="checkbox"></input></div>
                        <div className="col-8">  notesstatic sanoke notes </div>
                        <div className="col-1"><button className="deleteBot" onClick={() => deleteTask('some id')}>x</button></div>
                    </div>
                </div>
            );
            setTaskList(tempList);
            console.log(tempList);
    }

    // function to create create a task. 
    const createTask = () => {
        const body = {
            note: task,
            user: 'maybe add user',
            status: 'false',
        }
        axios.post('/endpoint', body)
            .then((res) => {
                console.log(res);
            })
            .catch(console.log);
    }

    // function to change the status of the task
    const changeStatus = (validate) => {
        // some axios call to chage status to done or not done
        if (validate === true) {
            console.log('set status to done');
        } else {
            console.log('set status to not done');
        }
    }

    //function to delete task
    const deleteTask = (noteID) => {
        console.log(noteID + " will be deleted");
        const data = {
            id: noteID,
        }
        console.log(noteID);
        axios.post('/delete', data)
            .then((res) => {
                console.log(res)
            })
            .catch(console.log);

    }

    useEffect(() => { fetchData(taskList) }, [taskList]);

    return (
        <div>
            <h2>Welcome</h2>
            <div className="outterBox">
                <h3>Notes</h3>
                <div className="innerBox">

                    <div className="noteBox">
                        <div className="row">
                            <div className="col-1"><input className="check" type="checkbox"></input></div>
                            <div className="col-8">  notesstatic sanoke notes
                            </div>
                            <div className="col-1"><button className="deleteBot" onClick={() => deleteTask('some id')}>x</button></div>
                        </div>
                    </div>
                    <div className="noteBox">
                        <div className="row">
                            <div className="col-1"><input className="check" type="checkbox"></input></div>
                            <div className="col-8">  notesstatic sanoke notes
                            </div>
                            <div className="col-1"><button className="deleteBot" onClick={() => deleteTask('some id')}>x</button></div>
                        </div>
                    </div>
                    <div className="noteBox">
                        <div className="row">
                            <div className="col-1"><input className="check" type="checkbox"></input></div>
                            <div className="col-8">  notesstatic sanoke notes
                            </div>
                            <div className="col-1"><button className="deleteBot" onClick={() => deleteTask('some id')}>x</button></div>
                        </div>
                    </div>
                    <div className="noteBox">
                        <div className="row">
                            <div className="col-1"><input className="check" type="checkbox"></input></div>
                            <div className="col-8">  notesstatic sanoke notes
                            </div>
                            <div className="col-1"><button className="deleteBot" onClick={() => deleteTask('some id')}>x</button></div>
                        </div>
                    </div>
                    <div className="noteBox">
                        <div className="row">
                            <div className="col-1"><input className="check" type="checkbox"></input></div>
                            <div className="col-8"> static sanoke notesstatic sanoke notesstatic sanoke notesstatic sanoke notesstatic sanoke notesstatic sanoke notes
                            </div>
                            <div className="col-1"><button className="deleteBot" onClick={() => deleteTask('some id')}>x</button></div>
                        </div>
                    </div>

                    <div className="noteBox">
                        <div className="row">
                            <div className="col-1"><input className="check" type="checkbox"></input></div>
                            <div className="col-8"> static sanoke notesstatic sanoke notesstatic sanoke notesstatic sanoke notesstatic sanoke notesstatic sanoke notes
                            </div>
                            <div className="col-1"><button className="deleteBot" onClick={() => deleteTask('some id')}>x</button></div>
                        </div>
                    </div>

                    <div className="noteBoxDone">
                        <div className="row">
                            <div className="col-1"><input className="check" type="checkbox" onChange={e => { changeStatus(e.target.checked) }}></input></div>
                            <div className="col-8"> static sanoke notes
                            </div>
                            <div className="col-1"><button className="deleteBot" onClick={() => deleteTask('some id')}>x</button></div>
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

export default DBoard;