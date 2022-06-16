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
import DoneSharpIcon from '@mui/icons-material/DoneSharp';


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
                    console.log(data);
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
            status: 'pending',
            createdTime: Date.now()
        });

        setTask("");
    };

    const handleEdit = (task) => {
        setEdit(true)
        setTask=(task.task);
        setTemUidd(task.uidd)
    };

    const handleEditConf = (uid) => {
        update(ref(db, `/${auth.currentUser.uid}/${uid}`), {
            task: task,
        });

        console.log(uid);

        setTask("");
        setEdit(false);
    };

    const handleStatus = (id, status) => {
        // setTextDec('line-through');
        
        if (status=='completed') {
            update(ref(db, `/${auth.currentUser.uid}/${id}`), {
                status: 'pending',
            });
          } else if(status=='pending') {
            update(ref(db, `/${auth.currentUser.uid}/${id}`), {
                status: 'completed',
            });
          }
          else{
            update(ref(db, `/${auth.currentUser.uid}/${id}`), {
                status: 'deleted',
            });
          }
      };

    return (
        <div className="main" >
            <input className="input" type="text" placeholder="Add Task to Perform" value={task} onChange= {(t) => setTask(t.target.value)} />
            {tasks.map((task) => (
            <div>
                {task.status!='deleted' && <div className="task">
                    <h5 style={{textDecoration: task.status=='completed'? "line-through":"none" }}>{task.task}</h5>
                    <EditIcon onClick={() => handleEdit(task)} className="edit" />
                    <DeleteIcon onClick={() => handleStatus(task.uidd, 'deleted')} className="delete" />
                    <DoneSharpIcon onClick={() => handleStatus(task.uidd, task.status) } className="complete" />
                </div>}
                
                {edit && (
                    <div style={{marginLeft: '720px'}} >
                        <button onClick={() => handleEditConf(task.uidd)} className="confirm" >Confirm</button>
                    </div>
                ) }
            </div>
            ))}
                   {!edit && ( <div> 
                        <AddIcon onClick={write} className="add" />
                    </div>)}

                
            <button className="signout" onClick={handleSignOut} >Sign Out</button>
        </div>
    );
};

export default Main;