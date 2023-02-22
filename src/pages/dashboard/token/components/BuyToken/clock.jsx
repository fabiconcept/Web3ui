import React, { useEffect, useRef, useState } from 'react';

const Clock = () => {
    const secRef = useRef();
    const minRef = useRef();
    const hrRef =  useRef();
    const dayRef = useRef();

    const futureDate = new Date("30 july 2023");
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    const secondsFlip = () =>{
        const mainDiv = secRef.current;
        const childDiv = document.createElement("div");
        const divId = Math.random().toString(25);
        childDiv.classList.add("nm");
        childDiv.classList.add("flip");
        childDiv.id = divId;
        childDiv.innerHTML = `${timeLeft.seconds + 1 > 9 ? timeLeft.seconds + 1 : `0${timeLeft.seconds + 1}`}`;

        mainDiv.appendChild(childDiv);

        childDiv.addEventListener('animationend', ()=>{
            childDiv.remove()
        });

    }

    const minutesFlip = () =>{
        const mainDiv = minRef.current;
        const childDiv = document.createElement("div");
        const divId = Math.random().toString(25);
        childDiv.classList.add("nm");
        childDiv.classList.add("flip");
        childDiv.id = divId;
        childDiv.innerHTML = `${timeLeft.minutes + 1 > 9 ? timeLeft.minutes + 1 : `0${timeLeft.minutes + 1}`}`;

        mainDiv.appendChild(childDiv);

        childDiv.addEventListener('animationend', ()=>{
            childDiv.remove()
        });

    }

    const hoursFlip = () =>{
        const mainDiv = hrRef.current;
        const childDiv = document.createElement("div");
        const divId = Math.random().toString(25);
        childDiv.classList.add("nm");
        childDiv.classList.add("flip");
        childDiv.id = divId;
        childDiv.innerHTML = `${timeLeft.hours + 1 > 9 ? timeLeft.hours + 1 : `0${timeLeft.hours + 1}`}`;

        mainDiv.appendChild(childDiv);

        childDiv.addEventListener('animationend', ()=>{
            childDiv.remove()
        });

    }

    const daysFlip = () =>{
        const mainDiv = dayRef.current;
        const childDiv = document.createElement("div");
        const divId = Math.random().toString(25);
        childDiv.classList.add("nm");
        childDiv.classList.add("flip");
        childDiv.id = divId;
        childDiv.innerHTML = `${timeLeft.days + 1 > 9 ? timeLeft.days + 1 : `0${timeLeft.days + 1}`}`;

        mainDiv.appendChild(childDiv);

        childDiv.addEventListener('animationend', ()=>{
            childDiv.remove()
        });

    }

    useEffect(()=>{
        secondsFlip();
    }, [timeLeft.seconds]);

    useEffect(()=>{
        minutesFlip();
    }, [timeLeft.minutes]);

    useEffect(()=>{
        hoursFlip();
    }, [timeLeft.hours]);

    useEffect(()=>{
        daysFlip();
    }, [timeLeft.days]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            const currentDate = new Date();
            const difference = futureDate - currentDate;

            if (difference <= 0) {
                clearInterval(intervalId);
                return;
            }

            setTimeLeft({
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            });
        }, 1000);

        return () => clearInterval(intervalId);
    }, [futureDate]);

    return (
        <div className="sec">
            <div className="clock">
                <div className="cd">
                    <div className="nm" ref={dayRef}>{`${timeLeft.days > 9 ? timeLeft.days : `0${timeLeft.days}`}`}</div>
                    <div className="d">days</div>
                </div>
                <div className="cd">
                    <div className="nm" ref={hrRef}>{`${timeLeft.hours > 9 ? timeLeft.hours : `0${timeLeft.hours}`}`}</div>
                    <div className="d">hours</div>
                </div>
                <div className="cd">
                    <div className="nm" ref={minRef}>{`${timeLeft.minutes > 9 ? timeLeft.minutes : `0${timeLeft.minutes}`}`}</div>
                    <div className="d">mins</div>
                </div>
                <div className="cd" ref={secRef}>
                    <div className="nm">{`${timeLeft.seconds > 9 ? timeLeft.seconds : `0${timeLeft.seconds}`}`}</div>
                    <div className="d">secs</div>
                </div>
            </div>
        </div>
    )
}

export default Clock;