import React, { useState } from 'react';
import background from '../assets/truck2.jpg'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns';



export default function Card(props) {


    const {
        startDate, setStartDate,
        reference, setReference,
        company, setCompany,
        driver, setDriver,
        registration, setRegistration,
        onPressed
    } = props;

    const bck = {
        width: '50%',
    }

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '40px'
    }

    const inputStyle = {
        height: '35px',
        width: '95%',
        borderRadius: '8px',
        borderColor: 'grey',
        paddingLeft: '20px'
    }

    const labelStyle = {
        color: 'white',
        fontWeight: 'bold',
        fontSize: '25px',
        textAlign: 'start',
        width: '100%',
        textShadow: '2px 2px 4px grey',

    }

    const btn = {
        width: '100%',
        backgroundColor: 'transparent',
        borderColor: 'white',
        borderRadius: '8px',
        borderWidth: '4px',
        height: '50px',
        fontWeight: 'bold',
        fontSize: '20px',
        marginTop: '10px',
        color: 'white',
    }

    const picker = {
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '40px',
        marginBottom: '20px',
        width: '100%',
        borderColor: 'black',
        borderRadius: '8px',
        borderWidth: '3px',
        borderStyle: 'solid',
    }
    return (



        <>
            <div style={bck} >

                <form style={formStyle}>
                    <label style={labelStyle}>Reference</label>

                    <input
                        style={inputStyle}
                        type="text"
                        value={reference}
                        onChange={(e) => setReference(e.target.value)}
                        placeholder="Enter reference"
                    />
                    <br></br>
                    <br></br>

                    <label style={labelStyle}>Company Name</label>
                    <input
                        style={inputStyle}
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Enter company"
                    />
                    <br></br>
                    <br></br>

                    <label style={labelStyle}>Driver Name</label>
                    <input
                        style={inputStyle}
                        type="text"
                        value={driver}
                        onChange={(e) => setDriver(e.target.value)}
                        placeholder="Enter driver"

                    />
                    <br></br>
                    <br></br>

                    <label style={labelStyle}>Registration Number</label>
                    <input
                        style={inputStyle}
                        type="text"
                        value={registration}
                        onChange={(e) => setRegistration(e.target.value)}
                        placeholder="Enter registration"

                    />
                    <br></br>
                    <br></br>


                    <label style={labelStyle}>Date</label>
                    <div style={picker} >
                        <DatePicker
                            selected={startDate}
                            dateFormat="yyyy/MM/dd"
                            onChange={(date) => {

                                const formattedDate = format(date, 'yyyy-MM-dd');
                                setStartDate(formattedDate);

                            }}
                        />
                    </div>

                    <button type='submit' style={btn} onClick={onPressed}> Create Record</button>


                </form>

            </div>
        </>
    );
}


// Breakdown Reference – Unique String
// Company Name - String
// Driver Name - String
// Registration Number – String
// Breakdown Date – DateTime