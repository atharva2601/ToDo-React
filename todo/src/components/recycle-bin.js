import React, { useEffect, useState } from "react";
import { auth, db } from "../utils/firebase";
import { NavLink} from 'react-router-dom';
import {ref, onValue} from "firebase/database";
import './recycle-bin.css';
import RestorePageIcon from '@mui/icons-material/RestorePage';

const Recycle = () => {
    const [tasks, setTasks ] = useState([]);
    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if(user){
                onValue(ref(db, `/${auth.currentUser.uid}`), snapshot => {
                    setTasks([]);

                    const data = snapshot.val();
                    if (data !== null) {
                        Object.values(data).map((task) => {
                            setTasks((oldArray) => [...oldArray, task]);
                        });
                    console.log(data);
                    }
                })
            }
        });
    }, []);


    return (
        <div className="main" >
            <h1 className="head">Deleted Tasks</h1>
            {tasks.map((task) => (
            <div>
                {
                    task.status === 'deleted' && 
                        <div className="task">
                            <h5 style={{textDecoration: task.status === 'completed'? "line-through":"none" }}>{task.task}</h5>
                            <RestorePageIcon />
                        </div>
                }
            </div>
            ))}
             
            <NavLink  to={`/main`} replace="true" style={{ textDecoration: 'none',cursor:'pointer'}} activeClassName="selected">
                <div>
                    Go back
                </div>
            </NavLink>
        </div>       
    )
};
export default Recycle;