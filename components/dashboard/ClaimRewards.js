import { useCallback, useState } from "react";
import { eth } from "../../state/eth"
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ClaimModal from "../modals/claimModal";

export default function ClaimRewards() {
    const {
        walletConnected,
        harvestRewards,
        connectWallet,
    } = eth.useContainer();

    const [showModal, setShowModal] = useState(false);

    const onClaim = useCallback(()=>{
        setShowModal(true);
        return;
        harvestRewards().then(res => {
            if(res) {
                toast.success("Successfully claimed reward token");
            } else {
                toast.error("Failed claiming");
            }
        })
    }, [harvestRewards])

    const onConnectWallet = useCallback(()=>{
        connectWallet()
    }, []);
    
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
                {walletConnected ? (
                    <button className="btn" onClick={onClaim}>Claim Rewards</button>
                ) : (
                    <button className="btn" onClick={onConnectWallet}>Connect Wallet</button>
                )}
            </div>
            {
                showModal && <ClaimModal onClose={()=>setShowModal(false)}>
                </ClaimModal>
            }
        </div>
    )
}