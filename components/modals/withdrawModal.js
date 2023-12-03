import { eth } from "../../state/eth";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const WithdrawModal = ({onClose}) => {

    const {
        loading,
        userStakedTokenBalance,
        withdrawStakedToken
    } = eth.useContainer();

    const handleCloseClick = (e) => {
        e.preventDefault();
        onClose();
    };

    const handleWidthdraw = () => {
        withdrawStakedToken().then(res => {
            if(res) {
                toast.success("Successfully withdrawed");
            } else {
                toast.error("Failed withdrawing");
            }
        })
    } 

    return (
        <div className="withdraw-modal modal-overlay">
            <div className="modal-wrapper">
                <div className="modal">
                    <div className="modal-body">
                        <div className="content-title">
                            <h1>Withdraw Staked Tokens</h1>
                        </div>
                        <div className="content-body">
                            <div className="pb-3">
                                <p>Staked Balance</p>
                            </div>
                            <div>
                                {userStakedTokenBalance} <span style={{color:'black'}}>CODO</span>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <div className="btn-group">
                            <button className="btn btn-cancel" onClick={handleCloseClick} disabled={loading}>Cancel</button>
                            <button className="btn btn-bg-colored" onClick={handleWidthdraw} disabled={loading}>{loading?"Processing...":'Withdraw'}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WithdrawModal;