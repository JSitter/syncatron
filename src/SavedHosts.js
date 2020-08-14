import React, { useState, useEffect } from 'react';
import './AddHost.js';
import './SavedHosts.css';
import AddHost from './AddHost';
const { ipcRenderer } = window.require('electron');

function Host(hostname) {
    return (
        <div>
            <p>{hostname}</p>
        </div>
    );
}

function displayHosts(hosts) {
    let hostComponents = [];
    for( let i = 0; i < hosts.length; i++) {
        hostComponents.push(Host(hosts[i].account));
    }
    return hostComponents;
}

export default function SavedHosts() {
    const [ hosts, setHosts ] = useState([]);
    const [ addHost, setAddHost ] = useState(false);

    function cancelSubmission() {
        setAddHost(false);
    }

function addNewHost(hostname, username, password) {
    let hostBundle = {hostname, username, password}

    ipcRenderer.send('save-host', hostBundle);

    ipcRenderer.on('host-save-complete', ()=>{
        ipcRenderer.send('get-hosts')
        setAddHost(false);
    });
}

    useEffect(()=>{
        ipcRenderer.send('get-hosts')
    }, []);
    
    ipcRenderer.on('host-list', (event, serverList) => {
        setHosts(serverList);
    });

    return (
        <section>
            <h1>Hosts</h1>
            { addHost ? <AddHost 
                            cancel={cancelSubmission}
                            addNewHost={addNewHost}
                        /> : <p onClick={()=>{setAddHost(true)}}>
                                + Add New Host
                            </p> }
            { displayHosts(hosts) }
        </section>
    );
}
