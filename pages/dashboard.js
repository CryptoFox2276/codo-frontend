import BuyAndStake from "../components/dashboard/BuyAndStake";

export default function Dashboard() {
    return (
        <main id="user-dashboard">
            <div  className="container m-auto">
                <div className="flex">
                    <BuyAndStake />
                    <BuyAndStake />
                    <BuyAndStake />
                </div>
                <div className="flex"></div>
                <div className="flex"></div>
            </div>
        </main>
    )
}