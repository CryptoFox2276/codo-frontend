/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { eth } from "../../state/eth";

export default function Rewards() {
    const {
        totalSupply,
        rewardTokenPerBlock,
        endBlockNumber,
        addCommas,
      } = eth.useContainer();

    const [estimatedApy, setEstimatedApy] = useState(0)

    useEffect(()=>{
        setEstimatedApy(parseFloat(100 * Number(rewardTokenPerBlock) * Number(endBlockNumber) / totalSupply).toFixed(2));
    }, [endBlockNumber, rewardTokenPerBlock, totalSupply]);

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
                    <div className="content-value">{addCommas(estimatedApy)} apy</div>
                    <div className="content-label text-uppercase">Estimated Rewards</div>
                </div>
                <div className="card-body-content">
                    <div className="content-value">{addCommas(rewardTokenPerBlock)} <span>per ETH Block</span></div>
                    <div className="content-label text-uppercase">Current Rewards</div>
                </div>
            </div>
        </div>
    )
}