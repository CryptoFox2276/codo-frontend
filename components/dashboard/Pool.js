import { useEffect } from "react";
import { eth } from "../../state/eth";


export default function Pool() {

    const {
        userStakedTokenBalance,
        totalStaked,
        addCommas,
      } = eth.useContainer();
    
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
                    <div className="content-value">{parseFloat(100 * userStakedTokenBalance / totalStaked).toFixed(2)}</div>
                    <div className="content-label">% OF POOL</div>
                </div>
                <div className="card-body-content">
                    <div className="content-value">{addCommas(totalStaked)}</div>
                    <div className="content-label">TOTAL STAKED(codo)</div>
                </div>
            </div>
        </div>
    )
}