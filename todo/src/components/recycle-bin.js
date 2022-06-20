import React, { useEffect, useState } from "react";
import { auth, db } from "../utils/firebase";
import { NavLink} from 'react-router-dom';
import { ref, onValue, update} from "firebase/database";
import './recycle-bin.css';
import RestorePageIcon from '@mui/icons-material/RestorePage';

const Recycle = () => {
    const [setTask] = useState("");
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
                    }
                })
            }
        });
    }, []);

    const handleRestore = (task) => {
        // console.log(id,status);
        if (task.status==='deleted') {
            
            update(ref(db, `/${auth.currentUser.uid}/${task.uidd}`), {
                status: 'pending',
            });
        }

        setTask("");
    };

    return (
        <div className="main" >
            <h1 className="head">Deleted Tasks</h1>
            {tasks.map((task) => (
            <div>
                {
                    task.status === 'deleted' && 
                        <div className="task">
                            <h5 style={{textDecoration: task.status === 'completed'? "line-through":"none" }}>{task.task}</h5>
                            <RestorePageIcon onClick={() => handleRestore(task)} />
                        </div>
                }
            </div>
            ))}
             
            <NavLink  to={`/main`} replace="true" style={{ textDecoration: 'none',cursor:'pointer'}} activeClassName="selected">
                <button>Go Back</button>
            </NavLink>
        </div>       
    )
};
export default Recycle;