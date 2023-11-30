import BuyAndStake from "../components/dashboard/BuyAndStake";
import Pool from "../components/dashboard/Pool";

export default function Dashboard() {
    return (
        <main id="user-dashboard">
            <div  className="container m-auto">
                <div className="flex gap-10">
                    <BuyAndStake />
                    <Pool />
                    <BuyAndStake />
                </div>
                <div className="flex"></div>
                <div className="flex"></div>
            </div>
        </main>
    )
}