import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { ethers } from "ethers";
import Countdown from "react-countdown";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';

import ProgressBar from "./progress-bar";
import { eth } from "../state/eth";
import { SUPPORTED_CHAIN, SUPPORTED_CHAIN_LABEL, SUPPORTED_CHAIN_NAME, formatAddress } from "../state/common";
import { useCallback } from "react";


const UINT256_MAX = '115792089237316195423570985008687907853269984665640564039457584007913129639935';
const NETWORK_ID = Number(process.env.NEXT_PUBLIC_CHAINID)
const DEFAULT_PROVIDER = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPCURL, NETWORK_ID)

const Dashboard = () => {
  const {
    loading,
    currentChainId,
    signer,
    walletConnected,
    address,
    stage,
    price,
    priceETH,
    priceBNB,
    userETHBalance,
    userBNBBalance,
    userUSDCBalance,
    userUSDCIsApproved,
    userBUSDIsApproved,
    stageSupply,
    totalSupply,
    totalPresaleAmount,
    totalSoldAmount,
    totalSoldCost,
    totalRaised,
    totalSoldPercent,
    soldAmount,
    soldCost,
    soldPercent,
    nextStagePrice,
    saleActive,
    startTime,
    tierEndTime,
    addCommas,
    connectWallet,
    disConnectWallet,
    approveUSDT,
    approveBUSD,
    buyTokenWithUSDT,
    buyTokenWithETH,
    buyTokenWithBNB,
    buyTokenWithBUSD,
    stakingToken,
    switchNetwork
  } = eth.useContainer();

  const [selected, setSelected] = useState('ETH');
  
  const [isExchange, setIsExchange] = useState(false)
  const [isEth, setIsEth] = useState(true)
  const [selectedCoin, setSelectedCoin] = useState('USDT');
  const [payAmount, setPayAamount] = useState(0.0);
  const [codoAmount, setCodoAmount] = useState('');

  const changeChain = useCallback((chain) => {
    setSelected(chain);
  }, []);

  useEffect(()=>{
    switchNetwork(SUPPORTED_CHAIN[selected]);
    setPayAamount(0)
    setCodoAmount(0)
  }, [selected])

  const onChangePayAmount = useCallback((e) => {
  var _amount = parseFloat(e.target.value);
    if(_amount < 0) _amount = 0;
    if(selectedCoin === 'ETH') {
      if(Number(_amount) > Number(userETHBalance)) _amount = Number(userETHBalance);    
      setCodoAmount(priceETH > 0 ? Math.round((_amount / priceETH) ): 0);
    } else if (selectedCoin === 'BNB'){
      if(Number(_amount) > Number(userETHBalance)) _amount = Number(userETHBalance);    
      setCodoAmount(priceBNB > 0 ? Math.round((_amount / priceBNB) ): 0);
    } else{
      if(Number(_amount) > Number(userUSDCBalance)) _amount = Number(userUSDCBalance);    
      setCodoAmount(price > 0 ? Math.round((_amount / price) ): 0);
    }
    
    setPayAamount(_amount);
  }, [selectedCoin, payAmount])

  const onChangeCodoAmount = (e) => {
    console.log("onChangeCodoAmount");
    
    var _amount = Number(e.target.value);
    if(Number(e.target.value) > Number(stageSupply - soldAmount)) _amount = Number(stageSupply - soldAmount);
    setCodoAmount(_amount);

    if(selectedCoin === 'ETH') {
      setPayAamount(Number(_amount * priceETH).toFixed(6));
    } else if (selectedCoin === 'BNB'){
      setPayAamount(Number(_amount * priceBNB).toFixed(6));
    } else{
      setPayAamount(Number(_amount * price).toFixed(2));
    }
  }

  const onChangeSelect = (e) => {
    const _selectedCoin = e.target.value;
    setSelectedCoin(_selectedCoin);
    if(_selectedCoin === 'ETH') {
      setCodoAmount(priceETH > 0 ? Math.round((payAmount / priceETH) ): 0);
    } else if(_selectedCoin === 'BNB') {
      setCodoAmount(priceBNB > 0 ? Math.round((payAmount / priceBNB) ): 0);
    } else {
      setCodoAmount(price > 0 ? Math.round((payAmount / price) ): 0);
    }
  }

  const onBuyAndStake = () => {
    if(payAmount === 0 || payAmount === '' || codoAmount === 0 ||codoAmount === '') {
      toast.info(`Pleaase enter amount`)
      return;
    }
    if(Number(codoAmount) > Number(stageSupply - soldAmount)) {
      toast.info(`Token amount is insufficient`);
      return;
    }
    if(selected === 'ETH') {
      if(selectedCoin === 'ETH') {
        buyTokenWithETH(codoAmount, payAmount).then(res => {
          if(res) {
            stakingToken(codoAmount).then(ret => {
              if(ret) {
                toast.success("Purchased and staked successfully");
              } else {
                toast.error("Failed buying and staking token with " + selectedCoin);
              }
            })
          } else {
            toast.error("Failed buying and staking token with " + selectedCoin);
          }
        })
      }
      else {
        buyTokenWithUSDT(codoAmount).then(res => {
          if(res) {
            stakingToken(codoAmount).then(ret => {
              if(ret) {
                toast.success("Purchased and staked successfully");
              } else {
                toast.error("Failed buying and staking token with " + selectedCoin);
              }
            })
          } else {
            toast.error("Failed buying and staking token with " + selectedCoin);
          }
        })
      }
    } else {
      if(selectedCoin === 'BNB') {
        buyTokenWithBNB(payAmount).then(res => {
          if(res) {
            toast.success("Purchased successfully with BNB");
          } else {
            toast.error("Failed buying token with BNB");
          }
        })
      }
      else {
        buyTokenWithBUSD(payAmount).then(res => {
          if(res) {
            toast.success("Purchased successfully with BUSD");
          } else {
            toast.error("Failed buying token with BUSD");
          }
        })
      }
    }
  }

  const onBuy = () => {
    if(payAmount === 0 || payAmount === '' || codoAmount === 0 ||codoAmount === '') {
      toast.info(`Pleaase enter amount`)
      return;
    }
    if(Number(codoAmount) > Number(stageSupply - soldAmount)) {
      toast.info(`Token amount is insufficient`);
      return;
    }
    if(selected === 'ETH') {
      if(selectedCoin === 'ETH') {
        buyTokenWithETH(codoAmount, payAmount).then(res => {
          if(res) {
            toast.success("Purchased successfully with ETH");
          } else {
            toast.error("Failed buying token with " + selectedCoin);
          }
        })
      }
      else {
        buyTokenWithUSDT(codoAmount).then(res => {
          if(res) {
            toast.success("Purchased successfully with USDT");
          } else {
            toast.error("Failed buying token with " + selectedCoin);
          }
        })
      }
    } else {
      if(selectedCoin === 'BNB') {
        buyTokenWithBNB(payAmount).then(res => {
          if(res) {
            toast.success("Purchased successfully with BNB");
          } else {
            toast.error("Failed buying token with " + selectedCoin);
          }
        })
      }
      else {
        buyTokenWithBNB(payAmount).then(res => {
          if(res) {
            toast.success("Purchased successfully with BUSD");
          } else {
            toast.error("Failed buying token with " + selectedCoin);
          }
        })
      }
    }
  }

  const onApprove = () => {
    console.log(signer)
    if(selected === 'ETH') {
      approveUSDT().then(res => {
        if(res) toast.success("Approved successfully");
        else toast.error("Failed approving");
      })
    } if(selected === 'BSC') {
      approveBUSD().then(res => {
        if(res) toast.success("Approved successfully");
        else toast.error("Failed approving");
      })
    }
  }

  const onConnectWallet = () => {
    connectWallet();
  };

  const onDisConnectWallet = () => {
    disConnectWallet();
  }

  const Completionist = () => (
      <></>
  );

  const startPresaleRenderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <Completionist />;
    } else {
      return (
        <>
          {
            <div>
              <div className="center pb-3">
                <p
                  className="font-bold text-black text-uppercase"
                  style={{ fontFamily: "Lexend" }}
                >
                  Presale will start soon.
                </p>
              </div>
              <div className="countdown">
                <div className="countdown-item">
                  <SplitedItem data={("0" + days).substr(-2)} />
                </div>
                <div className=" text-2xl font-bold">:</div>
                <div className="countdown-item">
                  <SplitedItem data={("0" + hours).substr(-2)} />
                </div>
                <div className=" text-2xl font-bold">:</div>
                <div className="countdown-item">
                  <SplitedItem data={("0" + minutes).substr(-2)} />
                </div>
                <div className=" text-2xl font-bold">:</div>
                <div className="countdown-item">
                  <SplitedItem data={("0" + seconds).substr(-2)} />
                </div>
              </div>
            </div>
          }
        </>
      );
    }
  };
  const presaleRenderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <Completionist />;
    } else {
      return (
        <>
          {
            <div>
              <div className="center pb-3">
                <p
                  className="font-bold text-black text-uppercase"
                  style={{ fontFamily: "Lexend" }}
                >
                  buy in before price increases
                </p>
              </div>
              <div className="countdown">
                <div className="countdown-item">
                  <SplitedItem data={("0" + days).substr(-2)} />
                </div>
                <div className=" text-2xl font-bold">:</div>
                <div className="countdown-item">
                  <SplitedItem data={("0" + hours).substr(-2)} />
                </div>
                <div className=" text-2xl font-bold">:</div>
                <div className="countdown-item">
                  <SplitedItem data={("0" + minutes).substr(-2)} />
                </div>
                <div className=" text-2xl font-bold">:</div>
                <div className="countdown-item">
                  <SplitedItem data={("0" + seconds).substr(-2)} />
                </div>
              </div>
            </div>
          }
        </>
      );
    }
  };

  const SplitedItem = ({ data }) => (
    <div className="countdown-time">
      <span className="countdown-time-item">
        {data.split("").length > 1 ? data.split("")[0] : 0}
      </span>
      <span className="countdown-time-item">
        {data.split("").length > 1 ? data.split("")[1] : 0}
      </span>
    </div>
  );

  const PresaleCountDown = () => {
    return (
      <Countdown
        date={startTime >= new Date() ? startTime : new Date(startTime + tierEndTime).getTime()}
        renderer={startTime >= new Date() ? startPresaleRenderer : presaleRenderer}
      />
    );
  };

  const onlyNumbers = (e) => {
    // if ( /[^0-9]+/.test(e.target.value) ){
    //   e.target.value = e.target.value.replace(/[^0-9]*/g,"")
    // }
 }

  return (
    <section id="home">
      <div className="background"></div>
      <div className="container m-auto">
        <div className="flex lg:flex-row sm:flex-col flex-col justify-between gap-10">
          <div className="container-text">
            <h1 className="title">Invest Smarter with Codo Finance</h1>
            <p className="content">
              Your portal to premier crypto projects, powered by DeFi tools and
              AI insights. But before the price increase and stake to earn more
            </p>
            <div className="button-group flex flex-row justify-start gap-3">
              <Link href="#">
                <p className="btn">
                  Audit
                </p>
              </Link>
              <Link href="#">
                <p className="btn btn-bg-colored">
                  Whitepaper
                </p>
              </Link>
            </div>
           
            <div className="social-link-group flex flex-row gap-2 justify-start">
              <div>
                <img src="/assets/images/icons/twitter.png" alt="twitter" />
              </div>
              <div>
                <img src="/assets/images/icons/telegram.png"  alt="telegram"/>
              </div>
              <div>
                <img src="/assets/images/icons/discord.png"  alt="discord"/>
              </div>
            </div>
          </div>
          <div className="container-panel">
            <div className="">
              <div className="panel w-full relative">
                <div className="flex justify-center gap-10 panel-header">
                  <h2
                    className="md:text-3xl text-2xl font-bold"
                    style={{ fontFamily: "Lexend" }}
                  >
                    ${addCommas(totalSoldCost)}
                  </h2>
                </div>
                <div className="m-auto">
                  <PresaleCountDown />
                </div>
                <div className="switch-network">
                  <div
                    className={`network-item ${selected == "ETH" &&
                      "selected"}`}
                    onClick={() => changeChain('ETH')}
                  >
                    <img
                      src="/assets/images/icons/eth-icon.png"
                      className="pr-2"
                    />
                    ETH
                  </div>
                  <div
                    className={`network-item ${selected == "BSC" &&
                      "selected"}`}
                    onClick={() => changeChain("BSC")}
                  >
                    <img
                      src="/assets/images/icons/bsc-icon.png"
                      className="pr-2"
                    />
                    BSC
                  </div>
                </div>
                <div className="current-stage">
                  <div className="text-left text-sm text-box">
                    <p>CURRENT STAGE</p>
                    <h2 className="font-bold">STAGE {stage}</h2>
                  </div>
                  <div className="text-left text-sm text-box">
                    <p className="text-left">${addCommas(totalRaised)} RAISED</p>
                    <h2 className="font-bold text-ellipsis overflow-hidden">
                      ${addCommas(totalSoldCost)}
                    </h2>
                  </div>
                </div>
                <div className="sub-panel">
                  <div className="my-auto">
                    <h2 className="font-bold lg:text-xl text-lg text-white">
                      {totalSoldPercent} %{" "}
                      <span className=" text-orange-700">Sold</span>
                    </h2>
                  </div>
                  {/* <div className="text-left">
                      <p className="font-bold lg:text-lg text-md">{totalPresaleAmount > 0 ? parseFloat(100 - totalSoldPercent).toFixed(2) : 0} %</p>
                      <p className=" text-slate-500 font-bold lg:text-md text-sm">REMAINING</p>
                    </div> */}
                  <div className="progressbar">
                    <ProgressBar
                      bgcolor="#F5A11E"
                      completed={totalSoldPercent}
                      label={false}
                    />
                  </div>
                </div>
                <div className="next-stage">
                  <p className="text-left">
                    <span>{addCommas(price)} USDT</span> &nbsp;
                    <span>= 1 SCODO</span>
                  </p>
                  <p className="text-right">
                    <span>NEXT STAGE: &nbsp;</span>
                    <span>{nextStagePrice}</span>
                  </p>
                </div>
                <div className="sub-panel">
                  <h3 className="font-bold text-lg text-orange-700">
                    <span className="font-bold text-white">
                      {addCommas(totalSoldAmount)} Tokens
                    </span>{" "}
                    Sold
                  </h3>
                  <p className="text-white">
                    only
                    <span className="text-yellow-500 font-bold">
                      &nbsp;{addCommas(stageSupply - soldAmount)}&nbsp;
                    </span>
                    tokens remain
                  </p>
                </div>
                <div className="pt-3">
                  {walletConnected ? (
                    <>
                      <div className={`${!isExchange ? "buy-panel flex-col" : "buy-panel flex-col-reversed"}`}>
                        <div className="input-group">
                          <input type="number" step="0.01" inputMode="decimal" className="input-box" value={payAmount} onChange={(e)=>onChangePayAmount(e)} />
                          <div>
                          <select className="select-coin" onChange={(e)=>onChangeSelect(e)} defaultValue={selectedCoin}>
                          {selected === 'ETH' ? (<>
                            <option value="ETH">ETH</option>
                            <option value="USDT">USDT</option>
                          </>) : (
                            <>
                              <option value="BNB">BNB</option>
                              <option value="USDT">BUSD</option>
                            </>
                          )}
                            
                          </select>
                          </div>
                        </div>
                        <div className="m-auto">
                          <img src="/assets/images/exchange.png" alt="icon_exchange" width={25} height={25} onClick={()=>setIsExchange(!isExchange)}/>
                        </div>
                        <div className="input-group">
                          <input type="text" className="input-box" value={codoAmount} onChange={(e)=>onChangeCodoAmount(e)}></input>
                          <span className="select-coin">
                            <img src="/assets/images/icons/codo-icon.png" alt="icon_exchange" width={15} height={15}/>Codo Coin
                          </span>
                        </div>
                      </div>
                      <div className="py-3">
                        {selected==='ETH' ? (
                          (selectedCoin === 'USDT' && !userUSDCIsApproved) ? (
                            <button className="btn" onClick={()=>onApprove()} disabled={loading}>{loading ? 'Approving...':'Approve USDT'}</button>
                          ) : (
                            <>
                              <button className="btn" onClick={()=>onBuyAndStake()} disabled={loading}>{loading ? 'Processing...': selected === 'ETH' ? 'Buy & Stake for 300.00% APY' : 'Buy Now'}</button>
                              <div className="only-buying">Just want to buy without staking? Click <span className="cursor-pointer text-bold" style={{fontWeight:'bold'}} onClick={()=>onBuy()}>here</span></div>
                            </>
                          )
                        ) : (
                          (selectedCoin === 'USDT' && !userBUSDIsApproved) ? (
                            <button className="btn" onClick={()=>onApprove()} disabled={loading}>{loading ? 'Approving...':'Approve BUSD'}</button>
                          ) : (
                            <>
                              <button className="btn" onClick={()=>onBuyAndStake()} disabled={loading}>{loading ? 'Processing...': selected === 'ETH' ? 'Buy & Stake for 300.00% APY' : 'Buy Now'}</button>
                            </>
                          )
                        )}
                      </div>
                    </>
                  ) : (
                    startTime < new Date() && (
                      <button
                        onClick={onConnectWallet}
                        className="btn btn-bg-colored connect-wallet mb-3"
                      >
                        CONNECT WALLET
                      </button>
                    )
                  )}
                </div>
                {!walletConnected && (
                  <img
                    src="/assets/images/img-1.png"
                    className="badge absolute"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


export default Dashboard;
