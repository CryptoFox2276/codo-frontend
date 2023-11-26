import { useEffect, useState } from "react";
import Countdown from "react-countdown";

const renderer = ({days, hours, minutes, seconds, completed}) => {
    if(completed) {
        return (<></>)
    } else {
        return <>
            {
                <div className="next-presale-countdown">
                    <div className="center pb-3">
                        <p className="title">Next Price Increase In</p>
                    </div>
                    <div className="countdown">
                        <div className="countdown-item">
                            {('0'+days).substr(-2)}
                        </div>
                        <div className=" text-4xl font-bold ">:</div>
                        <div className="countdown-item">
                            {('0'+hours).substr(-2)}
                        </div>
                        <div className=" text-4xl font-bold">:</div>
                        <div className="countdown-item">
                            {('0'+minutes).substr(-2)}
                        </div>
                        <div className=" text-4xl font-bold">:</div>
                        <div className="countdown-item">
                            {('0'+seconds).substr(-2)}
                        </div>
                    </div>
                    <div className="countdown-label">
                        <div className="countdown-item-label">Days</div><div className=" text-4xl font-bold two-dot">:</div>
                        <div className="countdown-item-label">Hours</div><div className=" text-4xl font-bold two-dot ">:</div>
                        <div className="countdown-item-label">Mins</div><div className=" text-4xl font-bold two-dot">:</div>
                        <div className="countdown-item-label">Secs</div>
                    </div>
                </div>
            }
        </>
    }
}

const Nextpresale = () => {
    const [startTime, setStartTime] = useState(new Date());
    
    const NextPresaleCountDown = () => {
        return <Countdown date={startTime > 0 ? (new Date(startTime)).getTime() : 0} renderer={renderer} />
    }

    useEffect(()=>{
        setStartTime(new Date("2023-12-01"))
    },[])

    return (
        <section id="next-presale">
            <div className="container m-auto">
                <div className="container-body">
                    <NextPresaleCountDown />
                </div>
                <div>
                    <img src="/assets/images/img-2.png" width={450} />
                </div>
            </div>
        </section>
    )
}


export default Nextpresale;