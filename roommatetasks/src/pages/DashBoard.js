import React from 'react';
import axios from 'axios';
import '../dboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';




const DashBoard = () => {

    const [task, setTask] = React.useState('');
    

    const createTask = () => {
        const body = {
            note:task,
            user:"maybe add user"
        }
        axios.post('/endpoint', body)
            .then((res) => {
                console.log(res);
            })
            .catch(console.log);
    }

    return (
        <div>
            <h2>Welcome</h2>
            <div className="outterBox">
                <div className="innerBox">

                    <div className="noteBox">
                        <div className="row">
                            <div className="col"> static sanoke notes
                            <input className="check" type="checkbox"></input>
                            </div>
                        </div>
                    </div>
                    <div className="noteBox">
                        <div className="row">
                            <div className="col"> static sanoke notes
                            <input className="check" type="checkbox"></input>
                            </div>
                        </div>
                    </div>
                    <div className="noteBox">
                        <div className="row">
                            <div className="col"> static sanoke notes
                            <input className="check" type="checkbox"></input>
                            </div>
                        </div>
                    </div>
                    <div className="noteBox">
                        <div className="row">
                            <div className="col"> static sanoke notes
                            <input className="check" type="checkbox"></input>
                            </div>
                        </div>
                    </div>
                    <div className="noteBox">
                        <div className="row">
                            <div className="col"> static sanoke notes
                            <input className="check" type="checkbox"></input>
                            </div>
                        </div>
                    </div>
                    <div className="noteBox">
                        <div className="row">
                            <div className="col"> static sanoke notes
                            <input className="check" type="checkbox"></input>
                            </div>
                        </div>
                    </div>
                    <div className="noteBox">
                        <div className="row">
                            <div className="col"> static sanoke notes 
                            <input className="check" type="checkbox"></input>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="marginBot" >
                    <input className="inputsz" value={task} onChange={e=>{setTask(e.target.value)}}/>
                    <button className="inputsz" onClick={createTask}>Add Task</button>
                </div>
            </div>
        </div>
    );
};

export default DashBoard;