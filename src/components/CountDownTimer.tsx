'use client';
import { useEffect, useState } from 'react';

export default function Countdown({ endTime }: { endTime: string }) {
    const calculateTimeLeft = () => {
        const difference = new Date(endTime).getTime() - new Date().getTime();

        const timeLeft = {
            days: Math.max(Math.floor(difference / (1000 * 60 * 60 * 24)), 0),
            hours: Math.max(Math.floor((difference / (1000 * 60 * 60)) % 24), 0),
            minutes: Math.max(Math.floor((difference / 1000 / 60) % 60), 0),
            seconds: Math.max(Math.floor((difference / 1000) % 60), 0),
        };

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearInterval(timer);
    }, [endTime]);

    return (
        <div className="grid-countdown" data-time={endTime} style={{ opacity: 1 }}>
            <div>{timeLeft.days}<span>days</span></div>
            <div>{timeLeft.hours}<span>hr</span></div>
            <div>{timeLeft.minutes}<span>min</span></div>
            <div>{timeLeft.seconds}<span>sec</span></div>
        </div>
    )
}
