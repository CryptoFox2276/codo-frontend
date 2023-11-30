export default function BuyAndStake() {
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
                    <div className="content-value">0</div>
                    <div className="content-label">CODO</div>
                </div>
                <div className="card-body-content">
                    <div className="content-value">0</div>
                    <div className="content-label">Your staked balance</div>
                </div>
            </div>
            <div className="card-action">
                <button className="btn">Buy And Stake</button>
            </div>
        </div>
    )
}