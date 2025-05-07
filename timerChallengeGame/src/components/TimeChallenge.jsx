import React, { useState } from 'react';

export default function TimeChallenge({title, targetTime}) {

    const [timeExpired, setTimeExpired] = useState(false);
    const [timeStarted, setTimeStarted] = useState(false);
    function onStartButtonClick() {
        setTimeStarted(true);
        const milliseconds = targetTime * 1000;
        setTimeout(() => {
            setTimeExpired(true);
            // Post click and after some milliseconds, the time expired
        }
        , milliseconds);
    }


    return(
        <section className="challenge">
            <h2>{title}</h2>
            <p className="challenge-time">
                {targetTime} second{targetTime > 1 ? 's' : ''}
            </p>
            <button onClick={onStartButtonClick}>
                {timeStarted ? 'Stop' : 'Start'} Challenge
            </button>
            <p className={timeStarted ? 'active' : undefined}>
                {timeStarted ? 'Time is running' : 'Time inactive'}
            </p>
        </section>
    )
}