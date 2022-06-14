import React, {useEffect, useState} from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const nav = useNavigate();
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

    return (
        <div className='home'>
            <h1>ToDo</h1>
            <div className='auth'>
                <input type="email" onChange={handleEmailChange} value={email} />
                <input type="password" onChange={handlePasswordChange} value={password} />
                <button onClick={handleSignIn} >Sign In</button>
                <a href="">Sign Up</a>
            </div>
        </div>
    );
};

export default Home;