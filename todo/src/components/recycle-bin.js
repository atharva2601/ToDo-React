import React, { useEffect, useState } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../utils/firebase";
import { NavLink,Link ,useHistory} from 'react-router-dom';
import { set, ref, onValue, update } from "firebase/database";

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
            {tasks.map((task) => (
            <div>
                {
                    task.status=='deleted' && 
                        <div className="task">
                            <h5 style={{textDecoration: task.status === 'completed'? "line-through":"none" }}>{task.task}</h5>
                        </div>
                }
            
            

        </div>
            )
        
             )}
             <NavLink  to={`/main`} replace="true" style={{ textDecoration: 'none',cursor:'pointer'}} activeClassName="selected">
                <div>
                    Go back
                </div>
            </NavLink>
             </div>
           
             )
};

 

export default Recycle;