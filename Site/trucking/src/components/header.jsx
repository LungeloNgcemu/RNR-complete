import React from 'react';
import logo from '../assets/logotruck.png'


export default function Head() {
    const image = {
        height: '70px',
        flx: '1'

    }

    const outer = {
        display: 'flex',
        flexDirection: 'row',
        height: '80px',
        borderBottom: '3px solid white',
        marginLeft : '10px',
        marginRight : '10px'
    }

    const title = {
        color: 'white',
        marginLeft: "60px",
        marginRight: "20px",
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: '30px',
        textShadow: '4px 4px 8px grey'
    }


    return (
        <>
            <div style={outer} >

                <h1 style={title}>Tracking Trucking</h1>
                <img style={image} src={logo} />
            </div>
        </>
    );
}