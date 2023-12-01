import Link from "next/link";
import { eth } from "../../state/eth";

export default function BuyAndStake() {

    const {
        totalSoldAmount,
        userBalance,
        userStakedTokenBalance,
        addCommas,
      } = eth.useContainer();

    return (
        <div className="dashboard-card">
            <div className="card-header">
                <div className="header-icon">
                    <img src="/assets/images/icons/solar_wallet-linear.png" alt="solar-wallet" width={40} />
                </div>
                <div className="header-title">
                    Amount Of Codo Stake:
                </div>
            </div>
            <div className="card-body">
                <div className="card-body-content">
                    <div className="content-value">{addCommas(totalSoldAmount)}</div>
                    <div className="content-label">CODO</div>
                </div>
                <div className="card-body-content">
                    <div className="content-value">{addCommas(userStakedTokenBalance)}</div>
                    <div className="content-label">Your staked balance</div>
                </div>
            </div>
            <div className="card-action">
                <Link href="/">
                <p className="btn">
                    Buy And Stake
                </p>
                </Link>
            </div>
        </div>
    )
}