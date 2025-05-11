import React, { useRef, useState } from 'react';
import Result from './Result';
export default function TimeChallenge({title, targetTime}) {

    const timer=useRef();
    const dailogRef=useRef();
    
    const [timeExpired, setTimeExpired] = useState(null);
    const [timeStarted, setTimeStarted] = useState(null);


    function onStartButtonClick() {
        setTimeStarted(true);
        setTimeExpired(null); // Reset for new challenge
        const milliseconds = targetTime * 1000;
        timer.current=setTimeout(() => {
            setTimeExpired(true); // Timer ran out before stop
            dailogRef.current.open();
            setTimeStarted(null)
            // Post click and after some milliseconds, the time expired
        }
        , milliseconds);
    }

    function onStopButtonClick() {
        // Clear the timer
        clearTimeout(timer.current);
        // If timeExpired is false, user stopped before timeout
        dailogRef.current.open();
        setTimeStarted(false);
    }


    return(
        <>
        <Result ref={dailogRef} targetTime={targetTime} result={timeExpired ? "Lost": "Win"}  message={timeExpired ? "did not stop": "clicked"}/>
        <section className="challenge">
            <h2>{title}</h2>
            {timeExpired && <p>You lost!</p>}
            {timeExpired!=null && timeStarted!=null && !timeExpired && !timeStarted && <p>You won!</p>}
            <p className="challenge-time">
                {targetTime} second{targetTime > 1 ? 's' : ''}
            </p>
            <button onClick={timeStarted ? onStopButtonClick : onStartButtonClick}>
                {timeStarted ? 'Stop' : 'Start'} Challenge
            </button>
            <p className={timeStarted ? 'active' : undefined}>
                {timeStarted ? 'Time is running' : 'Time inactive'}
            </p>
        </section>
        </>
    )
}