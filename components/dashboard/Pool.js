export default function Pool() {
    return (
        <div className="dashboard-card">
            <div className="card-header">
                <div className="header-icon">
                    <img src="/assets/images/icons/solar_pool.png" alt="solar-user" height={33} />
                </div>
                <div className="header-title">
                    Pool
                </div>
            </div>
            <div className="card-body">
                <div className="card-body-content">
                    <div className="content-value">0</div>
                    <div className="content-label">% OF POOL</div>
                </div>
                <div className="card-body-content">
                    <div className="content-value">17,391,426</div>
                    <div className="content-label">TOTAL STAKED(codo)</div>
                </div>
            </div>
        </div>
    )
}