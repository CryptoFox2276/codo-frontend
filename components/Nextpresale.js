import { useEffect, useState } from "react";
import Countdown from "react-countdown";
import Link from "next/link";
import { eth } from "../state/eth";

const renderer = ({days, hours, minutes, seconds, completed}) => {    
    if(completed) {
        return (<>
            <div className="next-presale-countdown">
                <div className="center pb-3">
                    <p className="title">Next Price Increase In</p>
                </div>
                <div className="countdown">
                    <div className="countdown-item">
                        {"00"}
                    </div>
                    <div className=" text-4xl font-bold ">:</div>
                    <div className="countdown-item">
                    {"00"}
                    </div>
                    <div className=" text-4xl font-bold">:</div>
                    <div className="countdown-item">
                    {"00"}
                    </div>
                    <div className=" text-4xl font-bold">:</div>
                    <div className="countdown-item">
                    {"00"}
                    </div>
                </div>
                <div className="countdown-label">
                    <div className="countdown-item-label">Days</div>
                    <div className="countdown-item-label">Hours</div>
                    <div className="countdown-item-label">Mins</div>
                    <div className="countdown-item-label">Secs</div>
                </div>
            </div>
        </>)
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
                        <div className="countdown-item-label">Days</div>
                        <div className="countdown-item-label">Hours</div>
                        <div className="countdown-item-label">Mins</div>
                        <div className="countdown-item-label">Secs</div>
                    </div>
                </div>
            }
        </>
    }
}

const Nextpresale = () => {
    const {startTime, tierEndTime} = eth.useContainer();
    
    const NextPresaleCountDown = () => {
        return <Countdown date={startTime >= new Date() ? startTime : new Date(startTime + tierEndTime).getTime()} renderer={renderer} />
    }

    return (
        <section id="next-presale">
            <div className="background"></div>
            <div className="container">
                <div className="container-body m-auto">
                    <NextPresaleCountDown />
                    <div className="mt-10">
                        <Link href="#">
                            <p className="btn m-auto">
                                Buy Now <img src="/assets/images/icons/ArrowRight.png" />
                            </p>
                    </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}


export default Nextpresale;