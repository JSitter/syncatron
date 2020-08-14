import React, { useState } from 'react';
import './AddHost.css';

export default function AddHost(props) {
    const [ hostName, setHostName ] = useState('');
    const [ userName, setUserName ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ showPassword, setShowPassword ] = useState('password')

    function toggleShowPassword() {
        if( showPassword === 'password'){
            setShowPassword('text');
        }else{
            setShowPassword('password');
        }
    }

    function formSubmission(e) {
        e.preventDefault()
        props.addNewHost(hostName, userName, password);
    }

    return (
        <form className="add-host-form">
            <label htmlFor='hostname'>Host Name
                <input 
                    type='text' 
                    name='hostname' 
                    id='hostname' 
                    onChange={(e)=>setHostName(e.target.value)} 
                    value={hostName}>
                </input>
            </label>
            <label htmlFor='username'>User Name
                <input 
                    type='text' 
                    name='username' 
                    id='username' 
                    onChange={(e)=>setUserName(e.target.value)} 
                    value={userName}>
                </input>
            </label>
            <label htmlFor='password'>Password
                <input 
                    type={showPassword} 
                    name='password' 
                    id='password' 
                    onChange={(e) => setPassword(e.target.value)} 
                    value={password}>
                </input>
            </label>
            <p className="interactive" onClick={toggleShowPassword}>{showPassword === "password"? "Show" : "Hide"} Password</p>
            <button type='submit' onClick={formSubmission}>Save Host</button>
            <button type='button' onClick={props.cancel}>Cancel</button>
        </form>

    )
};
