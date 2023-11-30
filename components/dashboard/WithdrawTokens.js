export default function WithdrawTokens() {
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
          <div className="content-value">85.5</div>
          <div className="content-label">Staked Balance</div>
        </div>
      </div>
      <div className="card-action">
        <button className="btn">Withdraw Staked Tokens</button>
      </div>
    </div>
  );
}
