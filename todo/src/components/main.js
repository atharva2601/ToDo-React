import React, { useEffect, useState } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { set, ref, onValue, remove, update } from "firebase/database";
import {uid} from 'uid';


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
    };

    return (
        <div>
            <input type="text" placeholder="Add Task to Perform" value={task} onChange= {(t) => setTask(t.target.value)} />
            {tasks.map((task) => (
                <div>
                    <h5>{task.task}</h5>
                    <button onClick={() => handleEdit(task)} >Edit</button>
                    <button onClick={() => handleDelete(task.uidd) } >Delete</button>
                </div>
            ))}
            {/* <button onClick={write} >Add</button> */}

            {edit ? (
                <div>
                    <button onClick={handleEditConf} >Confirm</button>
                </div>
            ) : ( 
                <div>
                    <button onClick={write} >Add</button>
                </div>
            )}
            <button onClick={handleSignOut} >Sign Out</button>
        </div>
    );
};

export default Main;