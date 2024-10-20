import React from 'react';
import '../styles/style.css'


export default function InfoCard(props) {

    const { reference, company, driver, registration, date, onClick, id } = props;

    const card = {
        height: '270px',
        width: '90%',

        borderRadius: '10px',
        padding: '20px',
        border: '0px solid black'
    }


    const outer = {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: '20px',
        marginTop: '20px',
    }

    const container = {
        width: '100%',
        display: 'flex',

        magin: '0px'
    }

    const label = {
        flex: '1',
        color: 'white',
        fontWeight: 'bold',
        textShadow: '2px 2px 4px grey',
        margin: '0px'

    }

    const content = {
        flex: '1',
        margin: '0px'

    }

    const btn = {
        width: '100%',
        borderRadius: '5px',
        height: '38px',
        backgroundColor: 'transparent',
        borderColor: 'white',
        borderWidth: '3px',
        borderStyle: 'solid',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '15px'
    }
    return (
        <>

            <div style={outer}>
                <div className='dataCard' style={card}>

                    <div style={container}>
                        <div style={label}>
                            <h3>Reference</h3>
                        </div>

                        <div style={content}>
                            <h3>{reference}</h3>
                        </div>
                    </div>

                    <div style={container}>
                        <div style={label}>
                            <p>Company Name</p>
                        </div>

                        <div style={content}>
                            <p>{company}</p>
                        </div>
                    </div>

                    <div style={container}>
                        <div style={label}>
                            <p>Driver Name</p>
                        </div>

                        <div style={content}>
                            <p>{driver}</p>
                        </div>
                    </div>


                    <div style={container}>
                        <div style={label}>
                            <p>Registration number</p>
                        </div>

                        <div style={content}>
                            <p>{registration}</p>
                        </div>
                    </div>

                    <div style={container}>
                        <div style={label}>
                            <p>Date</p>
                        </div>

                        <div style={content}>
                            <p>{date}</p>
                        </div>
                    </div>

                    <button onClick={onClick} style={btn}>Update Record</button>









                </div>
            </div>

        </>
    );
}