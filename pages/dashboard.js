import BuyAndStake from "../components/dashboard/BuyAndStake";
import ClaimRewards from "../components/dashboard/ClaimRewards";
import Pool from "../components/dashboard/Pool";
import Rewards from "../components/dashboard/Rewards";
import TotalSupply from "../components/dashboard/TotalSupply";
import WithdrawTokens from "../components/dashboard/WithdrawTokens";

export default function Dashboard() {
    return (
        <main id="user-dashboard">
            <div  className="container m-auto">
                <div className="container-header pb-5">
                    <div className="container-header-title pb-2">User</div>
                    <div className="container-header-menu flex gap-3">Dashboard <img src="/assets/images/dot.png" alt="dot" style={{marginTop:'auto', marginBottom: 'auto'}} /> <span className="container-header-submenu">User</span></div>
                </div>
                <div className="flex flex-col lg:flex-row gap-5 px-5 xs:pm-5 sm:px-5 md:px-3 lg:px-0 pb-5">
                    <BuyAndStake />
                    <Pool />
                    <Rewards />
                </div>
                <div className="flex flex-col lg:flex-row gap-10 px-5 xs:pm-5 sm:px-5 md:px-3 lg:px-0 pb-5">
                    <ClaimRewards />
                    <WithdrawTokens />
                </div>
                <div className="flex gap-10">
                    <TotalSupply />
                    <div className="m-auto">
                        <img src="/assets/images/img-4.png" alt="codo" />
                    </div>
                </div>
            </div>
        </main>
    )
}