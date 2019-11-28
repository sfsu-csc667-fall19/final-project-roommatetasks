import React from 'react';
import axios from 'axios';
import '../dboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';




const DashBoard = () => {

    const createTask = () => {
        const body = {

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
                    <div className="noteBox row">
                        <div className="row">
                            <div className="col"> static sanoke notes 
                            <input className="check" type="checkbox"></input>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="marginBot" >
                    <input className="inputsz"></input>
                    <button className="inputsz">Add Task</button>
                </div>
            </div>
        </div>
    );
};

export default DashBoard;