export default function ClaimRewards() {
    return (
        <div className="dashboard-card">
            <div className="card-header">
                <div className="header-icon">
                    <img src="/assets/images/icons/solar_pool.png" alt="solar-user" height={33} />
                </div>
                <div className="header-title text-uppercase">
                    Claim Rewards
                </div>
            </div>
            <div className="card-action">
                <button className="btn">Claim Rewards</button>
            </div>
        </div>
    )
}