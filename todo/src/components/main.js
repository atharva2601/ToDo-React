import React, { useEffect, useState } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { set, ref, onValue, remove, update } from "firebase/database";
import {uid} from 'uid';
import './main.css';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


const Main = () => {
    const [task, setTask] = useState("");
    const [tasks, setTasks ] = useState([]);
    const [edit, setEdit] = useState(false);
    const [temUidd, setTemUidd] = useState("");

    const nav = useNavigate();

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
            else if(!user) {
                nav("/");
            }
        });
    }, []);

    const handleSignOut = () => {
        signOut(auth).then(() => {
            nav("/");
        })
            .catch((err) => {alert(err.message);
            });
    };

    const write = () => {
        const uidd = uid(); 
        set(ref(db, `/${auth.currentUser.uid}/${uidd}`), {
            task: task,
            uidd: uidd,
        });

        setTask("");
    };

    const handleDelete = (uid) => {
        remove(ref(db, `/${auth.currentUser.uid}/${uid}`));
    };

    const handleEdit = (task) => {
        setEdit(true)
        setTask=(task.task);
        setTemUidd(task.uidd)
    };

    const handleEditConf = () => {
        update(ref(db, `/${auth.currentUser.uid}/${temUidd}`), {
            task: task,
            temUidd: temUidd
        });

        setTask("");
        setEdit(false);
    };

    return (
        <div className="main" >
            <input className="input" type="text" placeholder="Add Task to Perform" value={task} onChange= {(t) => setTask(t.target.value)} />
            {tasks.map((task) => (
                <div className="task">
                    <h5>{task.task}</h5>
                    <EditIcon onClick={() => handleEdit(task)} className="edit" />
                    <DeleteIcon onClick={() => handleDelete(task.uidd)} className="delete" />
                </div>
            ))}
            {/* <button onClick={write} >Add</button> */}

            {edit ? (
                <div>
                    <button onClick={handleEditConf} className="add" >Confirm</button>
                </div>
            ) : ( 
                <div>
                    <AddIcon onClick={write} className="add" />
                </div>
            )}
            <button className="signout" onClick={handleSignOut} >Sign Out</button>
        </div>
    );
};

export default Main;