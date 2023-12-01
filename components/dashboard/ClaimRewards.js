import { useCallback } from "react";
import { eth } from "../../state/eth"
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function ClaimRewards() {
    const {harvestRewards} = eth.useContainer();

    const onClaim = useCallback(()=>{
        harvestRewards().then(res => {
            if(res) {
                toast.success("Successfully claimed reward token");
            } else {
                toast.error("Failed claiming");
            }
        })
    }, [harvestRewards])
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
                <button className="btn" onClick={onClaim}>Claim Rewards</button>
            </div>
        </div>
    )
}