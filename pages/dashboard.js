import BuyAndStake from "../components/dashboard/BuyAndStake";
import Pool from "../components/dashboard/Pool";
import Rewards from "../components/dashboard/Rewards";

export default function Dashboard() {
    return (
        <main id="user-dashboard">
            <div  className="container m-auto">
                <div className="flex flex-col lg:flex-row gap-10 px-5 xs:pm-5 sm:px-5 md:px-3 lg:px-0 ">
                    <BuyAndStake />
                    <Pool />
                    <Rewards />
                </div>
                <div className="flex flex-col lg:flex-row gap-10 px-5 xs:pm-5 sm:px-5 md:px-3 lg:px-0 ">
                    
                </div>
                <div className="flex"></div>
            </div>
        </main>
    )
}