export default function Rewards() {
    return (
        <div className="dashboard-card">
            <div className="card-header">
                <div className="header-icon">
                    <img src="/assets/images/icons/solar_rewards.png" alt="solar-rewards" height={24} />
                </div>
                <div className="header-title">
                    Rewards
                </div>
            </div>
            <div className="card-body">
                <div className="card-body-content">
                    <div className="content-value">300 apy</div>
                    <div className="content-label text-uppercase">Estimated Rewards</div>
                </div>
                <div className="card-body-content">
                    <div className="content-value">300 <span>per ETH Block</span></div>
                    <div className="content-label text-uppercase">Current Rewards</div>
                </div>
            </div>
        </div>
    )
}