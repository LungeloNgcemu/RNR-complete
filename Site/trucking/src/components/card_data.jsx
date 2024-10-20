import React from 'react';
import '../styles/style.css'
import InfoCard from './card_info';
import CircularProgress from '@mui/material/CircularProgress';




export default function CardData(props) {

    const { data, onClick, isLoading } = props;

    const bck = {

        height: '90%',
        width: '50%',
        borderRadius: '25px',
        margin: '50px',
        overflow: 'scroll',
        overflowX: 'hidden'
    }

    const circle = {
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }


    return (
        <>






            <div style={bck}>

                {isLoading ?
                    <div  style={circle}>
                        <CircularProgress disableShrink />
                    </div>
                    : data.map((item, index) => {
                        return (
                            <InfoCard
                                key={index}
                                reference={item.reference}
                                company={item.company}
                                driver={item.driver}
                                registration={item.registration}
                                date={item.date}
                                onClick={() => onClick(item.id)}
                            />
                        );
                    })}


            </div>
        </>
    );
}