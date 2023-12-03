import { useCallback, useState } from "react";
import Link from "next/link";
import { eth } from "../../state/eth";
import StakeModal from "../modals/stakeModal";

export default function BuyAndStake() {

    const [showModal, setShowModal] = useState(false);

    const {
        walletConnected,
        totalSoldAmount,
        userBalance,
        userStakedTokenBalance,
        connectWallet,
        addCommas,
      } = eth.useContainer();

    const onConnectWallet = useCallback(() => {
        connectWallet();
    }, [])

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
            {
                walletConnected ? (
                    <button className="btn" onClick={()=>setShowModal(true)}>
                            Buy And Stake
                    </button>
                ) : (
                    <button className="btn" onClick={onConnectWallet}>
                        Connect Wallet
                    </button>
                )
            }
            </div>

            {
                showModal && <StakeModal onClose={()=>setShowModal(false)}>
                    Hello World
                </StakeModal>
            }
        </div>
    )
}