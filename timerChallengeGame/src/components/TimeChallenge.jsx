import React, { useRef, useState } from 'react';

export default function TimeChallenge({title, targetTime}) {

    const [timeExpired, setTimeExpired] = useState(false);
    const [timeStarted, setTimeStarted] = useState(false);
    const timer=useRef();

    function onStartButtonClick() {
        setTimeStarted(true);
        const milliseconds = targetTime * 1000;
        timer.current=setTimeout(() => {
            setTimeExpired(true);
            // Post click and after some milliseconds, the time expired
        }
        , milliseconds);
    }

    function onStopButtonClick() {
        // Clear the timer
        clearTimeout(timer.current);
    }


    return(
        <section className="challenge">
            <h2>{title}</h2>
            {timeExpired && <p>You lost!</p>}
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
    )
}