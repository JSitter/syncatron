import React, { useState } from 'react';

export default function HostData(props) {
    let [ hostName, setHostName ] = useState('');
    let [ userName, setUserName] = useState('');
    let [ port, setPort ] = useState('');
    let [ syncDirectorys, setSyncDirectories ] = useState({});
    let [ defaultDirectory, setDefaultDirectory ] = useState('');

    return (
        <section>
            <p>{hostName}</p>
            <p>{userName}</p>
            <p>{port}</p>
            <p>{syncDirectorys}</p>
            <p>{defaultDirectory}</p>
        </section>
    )
}
