import BuyAndStake from "../components/dashboard/BuyAndStake";
import Pool from "../components/dashboard/Pool";
import Rewards from "../components/dashboard/Rewards";

export default function Dashboard() {
    return (
        <main id="user-dashboard">
            <div  className="container m-auto">
                <div className="flex gap-10">
                    <BuyAndStake />
                    <Pool />
                    <Rewards />
                </div>
                <div className="flex"></div>
                <div className="flex"></div>
            </div>
        </main>
    )
}