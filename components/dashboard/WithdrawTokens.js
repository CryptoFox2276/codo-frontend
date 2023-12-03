/* eslint-disable @next/next/no-img-element */
import { useCallback, useState } from "react";
import { eth } from "../../state/eth";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import WithdrawModal from "../modals/withdrawModal";

export default function WithdrawTokens() {

  const {walletConnected, totalStaked, withdrawStakedToken, connectWallet, addCommas} = eth.useContainer()
  const [showModal, setShowModal] = useState(false);

  const onWithdraw = useCallback(()=>{
    setShowModal(true)
    // withdrawStakedToken().then(res => {
    //   if(res) {
    //     toast.success("Successfully withdrawed");
    //   } else {
    //     toast.error("Failed withdrawing");
    //   }
    // })
  }, [])

  const onConnectWallet = useCallback(()=>{
    connectWallet();
  },[connectWallet])

  return (
    <div className="dashboard-card">
      <div className="card-header">
        <div className="header-icon">
          <img
            src="/assets/images/icons/solar_rewards.png"
            alt="solar-user"
            height={33}
          />
        </div>
        <div className="header-title">Withdraw Staked Tokens</div>
      </div>
      <div className="card-body">
        <div className="card-body-content">
          <div className="content-value">{addCommas(totalStaked)}</div>
          <div className="content-label">Staked Balance</div>
        </div>
      </div>
      <div className="card-action">
      {
        walletConnected ? (
          <button className="btn" onClick={onWithdraw}>Withdraw Staked Tokens</button>
        ) : (
          <button className="btn" onClick={onConnectWallet}>Connect Wallet</button>
        )
      }
      </div>
      {
        showModal && (
          <WithdrawModal 
            onClose={()=>setShowModal(false)}
          />
        )
      }
    </div>
  );
}
