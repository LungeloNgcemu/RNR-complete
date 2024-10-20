import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CircularProgress from '@mui/material/CircularProgress';



export default function Update(props) {




    const {
        startDate, setStartDate,
        reference, setReference,
        company, setCompany,
        driver, setDriver,
        registration, setRegistration,
        onPressed,
        isLoading,
    } = props;

    const bck = {


        width: '100%',


    }

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '10px'
    }

    const inputStyle = {

        height: '35px',
        width: '98%',
        borderRadius: '8px',
        borderColor: 'grey',
        paddingLeft: '20px'


    }

    const labelStyle = {
        color: 'black',
        fontWeight: 'bold',
        fontSize: '25px',
        textAlign: 'start',
        width: '100%',


    }

    const btn = {
        width: '100%',
        backgroundColor: 'black',
        borderColor: 'black',
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
        borderColor: 'black',   // Color of the border
        borderRadius: '8px',    // Rounded corners
        borderWidth: '3px',     // Smaller border width (80px is too large)
        borderStyle: 'solid',   // Border needs a style like 'solid' or 'dashed'
    }

    const circle = {
       
        display : "flex",
        justifyContent : "center",
        alignItems: "center",
        height: "600px"
    }
    return (



        <>
            <div style={bck} >



                {isLoading ? 
                <div style={circle}>
                    <CircularProgress disableShrink />
                </div> :

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

                            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                        </div>

                        <button type='submit' style={btn} onClick={onPressed}> Update Record</button>


                    </form>

                }



            </div>
        </>
    );
}


// Breakdown Reference – Unique String
// Company Name - String
// Driver Name - String
// Registration Number – String
// Breakdown Date – DateTime