/* eslint-disable @next/next/no-img-element */
import { useCallback } from "react";
import { eth } from "../../state/eth";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function WithdrawTokens() {

  const {totalStaked, withdrawStakedToken, addCommas} = eth.useContainer()

  const onWithdraw = useCallback(()=>{
    withdrawStakedToken().then(res => {
      if(res) {
        toast.success("Successfully withdrawed");
      } else {
        toast.error("Failed withdrawing");
      }
    })
  }, [withdrawStakedToken])

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
        <button className="btn" onClick={onWithdraw}>Withdraw Staked Tokens</button>
      </div>
    </div>
  );
}
