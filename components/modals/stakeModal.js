import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { eth } from "../../state/eth";

const StakeModal = ({onClose, children, title}) => {
    const {
        walletConnected,
        loading,
        userUSDCBalance,
        userETHBalance,
        stageSupply,
        soldAmount,
        price,
        priceETH,
        buyTokenWithETH,
        buyTokenWithUSDT,
        stakingToken,
        isStakable,
        addCommas,
    } = eth.useContainer();

    const [warning, setWarning] = useState('');
    const [isExchange, setIsExchange] = useState(false);
    const [isEthActived, setIsEthActived] = useState(true);
    const [balance, setBalance] = useState('');
    const [coinAmount, setCoinAmount] = useState(0);
    const [tokenAmount, setTokenAmount] = useState(0);

    const handleCloseClick = (e) => {
        e.preventDefault();
        onClose();
    };

    const onBuyAndStake = useCallback(async () => {
        if(Number(tokenAmount) === 0 || Number(coinAmount) === 0) {
            setWarning("Pleaase enter amount");
            return;
        }
        if(Number(tokenAmount) > Number(stageSupply - soldAmount)) {
            setWarning("CODO Token amount is not available.");
            return;
        }
        if (await isStakable() === false) {
            toast.warn("Staking has been ended");
            return;
          }
        if(isEthActived) {
            if(Number(coinAmount) > Number(userETHBalance)) {
                setWarning("You do not have enough ETH to pay for this transaction.");
                return;
            } else {
                buyTokenWithETH(tokenAmount, coinAmount).then(res => {
                    if(res) {
                      stakingToken(tokenAmount).then(ret => {
                        if(ret) {
                          toast.success("Purchased and staked successfully");
                        } else {
                          toast.error("Failed buying and staking token with ETH");
                        }
                      })
                    } else {
                      toast.error("Failed buying and staking token with ETH");
                    }
                  })
            }
        } else {
            if(Number(coinAmount) > Number(userUSDCBalance)) {
                setWarning("You do not have enough USDT to pay for this transaction.");
                return;
            } else {
                buyTokenWithUSDT(tokenAmount).then(res => {
                    if(res) {
                      stakingToken(tokenAmount).then(ret => {
                        if(ret) {
                          toast.success("Purchased and staked successfully");
                        } else {
                          toast.error("Failed buying and staking token with USDT");
                        }
                      })
                    } else {
                      toast.error("Failed buying and staking token with USDT");
                    }
                  })
            }
        }

    }, [coinAmount, isEthActived, soldAmount, stageSupply, tokenAmount, userETHBalance, userUSDCBalance])

    const onChangeAmount = useCallback((e) => {
        var _amount = Number(e.target.value);
        var _tokenAmount = 0;

        if(_amount < 0) return setCoinAmount(0);

        if(isEthActived) {
            if(_amount > Number(userETHBalance)) {
                setWarning("You do not have enough ETH to pay for this transaction.");
                _amount = userETHBalance
            } else {
                setWarning("");
            }
            _tokenAmount = (priceETH > 0 ? Math.round((_amount / priceETH) ): 0);
        } else {
            if(Number(_amount) > Number(userUSDCBalance)) {
                setWarning("You do not have enough USDT to pay for this transaction.");
                _amount = userUSDCBalance
            } else {
                setWarning("");
            }
            _tokenAmount = (price > 0 ? Math.round((_amount / price) ): 0);
        }

        setCoinAmount(_amount);
        setTokenAmount(_tokenAmount);
    }, [isEthActived, price, priceETH, userETHBalance, userUSDCBalance])

    const onChangeTokenAmount = useCallback((e) => {
        var _amount = Number(e.target.value);
        if(_amount < 0) return setTokenAmount(0);

        if(_amount > Number(stageSupply - soldAmount)) {
            setWarning("CODO Token amount is not available.");
            _amount = Number(stageSupply - soldAmount);
        } else {
            setWarning("");
        }

        setTokenAmount(_amount);

        if(isEthActived) {
            setCoinAmount(Number(_amount * priceETH).toFixed(6));
        } else {
            setCoinAmount(Number(_amount * price).toFixed(2));
        }
    }, [isEthActived, price, priceETH, soldAmount, stageSupply])

    useEffect(() => {
        if(isEthActived) {
            setBalance(addCommas(parseFloat(userETHBalance).toFixed(4)))
        } else {
            setBalance(addCommas(userUSDCBalance));
        }
        setTokenAmount(0)
        setCoinAmount(0)
    }, [isEthActived]);

    // useEffect(() => {
    //     var _tokenAmount = 0;
    //     if(isEthActived) {
    //         _tokenAmount = (priceETH > 0 ? Math.round((coinAmount / priceETH) ): 0);
    //     } else {
    //         _tokenAmount = (price > 0 ? Math.round((coinAmount / price) ): 0);
    //     }
    //     setTokenAmount(_tokenAmount);
    // }, [coinAmount, price, priceETH]);

    // useEffect(() => {
    //     if(isEthActived) {
    //         setCoinAmount(Number(tokenAmount * priceETH).toFixed(4));
    //     } else {
    //         setCoinAmount(Number(tokenAmount * price).toFixed(2));
    //     }
    // }, [price, priceETH, tokenAmount]);

    return (
        <div className="stake-modal modal-overlay">
            <div className="modal-wrapper">
                <div className="modal">
                    <div className="modal-header">
                        <a href="#" onClick={handleCloseClick}>
                            x
                        </a>
                    </div>
                    <div className="modal-body">
                        <div className="content-title">
                            <h1>Buy & Stake</h1>
                        </div>
                        <div className="content-coin">
                            <div className={`coin-item ${isEthActived ? "active" : ""}`} onClick={()=>setIsEthActived(true)} ><img src="/assets/images/icons/eth-icon.png" height={20}/> ETH</div>
                            <div className={`coin-item ${!isEthActived ? "active" : ""}`} onClick={()=>setIsEthActived(false)} ><img src="/assets/images/icons/usdt-icon.png" height={20} /> USDT</div>
                        </div>
                        {warning !== '' && (<div className="content-warning"><img src="/assets/images/icons/info-icon.png"/>{warning}</div>)}
                        {
                            !isExchange ? (
                                <div className={`content-value`}>
                                    <div className="coin-amount">
                                    {isEthActived ? (
                                        <>
                                            <span><img src="/assets/images/icons/eth-icon.png" height={20}/> ETH:</span>
                                            <input type="number" onChange={onChangeAmount} value={coinAmount} readOnly={isExchange}/>
                                        </>
                                    ) : (
                                        <>
                                            <span><img src="/assets/images/icons/usdt-icon.png" height={20}/> USDT:</span>
                                            <input type="number" onChange={onChangeAmount} value={coinAmount} readOnly={isExchange}/>
                                        </>
                                    )}
                                        
                                    </div>
                                    <div className="m-auto" style={{width: '24px'}} onClick={()=>setIsExchange(!isExchange)}>
                                        <img src="/assets/images/icons/exchange-icon.png" height={24} style={{width: '20px'}} />
                                    </div>
                                    <div className="coin-amount">
                                        <span><img src="/assets/images/icons/codo-icon-1.png" height={20}/> CODO:</span>
                                        <input type="number" value={tokenAmount} onChange={onChangeTokenAmount} readOnly={!isExchange} />
                                    </div>
                                </div>
                            ) : (
                                <div className={`content-value`}> 
                                    <div className="coin-amount">
                                        <span><img src="/assets/images/icons/codo-icon-1.png" height={20}/> CODO:</span>
                                        <input type="number" value={tokenAmount} onChange={onChangeTokenAmount} readOnly={!isExchange} />
                                    </div>                                   
                                    <div className="m-auto" style={{width: '24px'}} onClick={()=>setIsExchange(!isExchange)}>
                                        <img src="/assets/images/icons/exchange-icon.png" height={24} style={{width: '20px'}} />
                                    </div>
                                    <div className="coin-amount">
                                    {isEthActived ? (
                                        <>
                                            <span><img src="/assets/images/icons/eth-icon.png" height={20}/> ETH:</span>
                                            <input type="number" onChange={onChangeAmount} value={coinAmount} readOnly={isExchange}/>
                                        </>
                                    ) : (
                                        <>
                                            <span><img src="/assets/images/icons/usdt-icon.png" height={20}/> USDT:</span>
                                            <input type="number" onChange={onChangeAmount} value={coinAmount} readOnly={isExchange}/>
                                        </>
                                    )}
                                        
                                    </div>
                                    
                                </div>
                            )
                        }
                    </div>
                    <div className="modal-footer">
                        <div className="btn-group">
                            <div className="balance-label" >{isEthActived ? "ETH" : "USDT"} Balance: {balance}</div>
                            <button className="btn" onClick={onBuyAndStake} disabled={loading}>{loading? 'Processing...' : 'Buy & Stake'}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StakeModal;