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
    )
}

function displayHosts(hosts) {
    let hostComponents = [];
    for( let i = 0; i < hosts.length; i++) {
        hostComponents.push(Host(hosts[i]));
    }
    if(hostComponents.length === 0){
        return (<p>No Saved Hosts</p>)
    }
    return hostComponents;
}

function addNewHost(hostname, username, password) {
    console.log(hostname, username, password);
}



export default function SavedHosts() {
    const [ hosts, setHosts ] = useState([]);
    const [ addHost, setAddHost ] = useState(false);

    function cancelSubmission() {
        setAddHost(false);
    }

    useEffect(()=>{
        ipcRenderer.send('get-hosts')
    }, [hosts]);
    ipcRenderer.on('host-list', (event, serverList) => {
        console.log(serverList);
    })
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
    )
}
