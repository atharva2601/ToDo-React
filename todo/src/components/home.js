import React, {useEffect, useState} from 'react';
import { signInWithEmailAndPassword, onAuthStateChanged, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [creatingAccount, setCreatingAccount] = useState(false);
    const [accountInfo, setAccountInfo] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });

    const nav = useNavigate();

    useEffect (() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                nav('/main');
            }
        });
    }, []);

    const handleEmailChange = (mail) => {
        setEmail(mail.target.value);
    };
        
    const handlePasswordChange = (mail) => {
        setPassword(mail.target.value);
    };

    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, email, password).then(() => {
            nav('/main')
        }).catch((err) => alert(err.message));
    };

    const handleCreate = () => {
        if(accountInfo.password !== accountInfo.confirmPassword) {
            alert("Password Doesn't Match")
            return
        }
        createUserWithEmailAndPassword(auth, accountInfo.email, accountInfo.password)
        .then(() => {
            nav("/main");
        })
        .catch((err) => alert(err.message));
    };

    return (
        <div className='home'>
            <h1>ToDo</h1>
            <div className='auth'>
                {creatingAccount ?
                (
                    <>
                    <input type="email" placeholder='Email' value={accountInfo.email} onChange={(mail) => setAccountInfo({...accountInfo, email: mail.target.value})} />
                    <input type="password" placeholder='Password' value={accountInfo.password} onChange={(mail) => setAccountInfo({...accountInfo, password: mail.target.value})} />
                    <input type="password" placeholder='Confirm Password' value={accountInfo.confirmPassword} onChange={(mail) => setAccountInfo({...accountInfo, confirmPassword: mail.target.value})} />
                    <button onClick={handleCreate} >Sign Up</button>
                    <button onClick={() => setCreatingAccount(false)} >Go Back</button>
                    </>
                ) : 
                (   
                    <>
                        <input type="email" placeholder='Email' onChange={handleEmailChange} value={email} />
                        <input type="password" placeholder='Password' onChange={handlePasswordChange} value={password} />
                        <button onClick={handleSignIn} >Sign In</button>
                        <button onClick={() => setCreatingAccount(true)} >Sign Up</button>
                    </>
                )
                }
            </div>
        </div>
    );
};

export default Home;