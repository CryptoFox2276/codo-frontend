import { useEffect, useState } from "react";
import ProgressBar from "../components/progress-bar";
import Modal from "../components/Modal";
import { eth } from "../state/eth";
import { ethers } from "ethers";
import abiCodoPresale from '/abi/CodoPresale.json';
import abiERC20 from '/abi/ERC20.json';

const UINT256_MAX = '115792089237316195423570985008687907853269984665640564039457584007913129639935';
const NETWORK_ID = Number(process.env.NEXT_PUBLIC_CHAINID)
const DEFAULT_PROVIDER = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPCURL, NETWORK_ID)

export default function Presale() {
  const {
    walletConnected,
    address,
    signer,
    stage,
    price,
    priceETH,
    stageSupply,
    totalSupply,
    totalPresaleAmount,
    totalSoldAmount,
    totalSoldCost,
    totalSoldPercent,
    soldAmount,
    soldCost,
    soldPercent,
    nextStagePrice,
    userBalance,
    userUSDCIsApproved,
    setUserUSDCIsApproved,
    userUSDCBalance,
    userETHBalance,
    connectWallet,
    disConnectWallet,
    addCommas,
    loadBalance,
    loadCurrentBalance,
    loadUserBalance
  } = eth.useContainer();

  

  const [show, setShow] = useState(false);
  const [modalTitle, setModalTitle] = useState('buy with eth')
  const [isEth, setIsEth] = useState(true);
  const [amount, setAmount] = useState(0);
  const [codo, setCodo] = useState(0);
  const [isExchange, setIsExchange] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const hideModal = () => {setShow(false)}
  const showModal = () => setShow(true);

  const init = () => {
    setCodo(0);
    setAmount(0);
    setIsExchange(false)
  }

  const onUpdate = () => {
    loadBalance()
    loadCurrentBalance()
    loadUserBalance()
  }
  const openEthModal = ()=>{
    init();
    setModalTitle('buy with eth');
    setIsEth(true)
    showModal()
  }

  const openUSDTModal = ()=>{
    init();
    setModalTitle('buy with usdt');
    setIsEth(false)
    showModal()
  }

  const onBuy = () => {
    try {
      setLoading(true);
      const presaleContract = new ethers.Contract(process.env.NEXT_PUBLIC_CODO_PRESALE ?? "", abiCodoPresale, signer);
      if(isEth) {
        console.log("Buying with ETH...", codo);
        presaleContract.buyWithEth(ethers.utils.parseEther(codo.toString()), { value: ethers.utils.parseEther(amount)}).then(res => {
          console.log("Bought with ETH Successfully!");
          setLoading(false)
        }).catch(err=>{
          console.log(err)
          setLoading(false);
        })
      } else {
        console.log("Buying with USDT...", codo);
        presaleContract.buyWithUSDT(ethers.utils.parseEther(codo.toString())).then(res => {
          console.log("Bought with USDT Successfully!");
          setLoading(false)
          onUpdate()
        }).catch(err=>{
          console.log(err)
          setLoading(false);
        })
      }
    } catch(err) {
      console.log(err)
      setLoading(false);
    }
  }

  const onApprove = () => {
    const usdtContract = new ethers.Contract(process.env.NEXT_PUBLIC_USDC ?? "", abiERC20, signer);
    setLoading(true);
    usdtContract.approve(process.env.NEXT_PUBLIC_CODO_PRESALE, UINT256_MAX).then(()=>{
      console.log("Approved Successfully!");
      setLoading(false);
      setUserUSDCIsApproved(true);
    }).catch(err => {
      console.log(err);
      setLoading(false);
    })
  }

  useEffect(()=>{
    console.log("amount, codo", typeof parseInt(codo, 10).toString);
    if(isExchange) {
      if(isEth) {
        setAmount(parseFloat(priceETH * codo, 10).toFixed(8))
      } else {
        setAmount(parseFloat(price * codo, 10).toFixed(4))
      }
      setCodo(parseInt(codo, 10));
    } else {
      if(isEth) {
        setCodo(parseInt(amount/priceETH, 10))
      } else {
        setCodo(parseInt(amount/price, 10))
      }
    }
  }, [amount, codo]);
  useEffect(()=>{
    console.log("isExchange", parseInt(codo, 10));
    if(isExchange) {setCodo(parseInt(codo, 10))}
    else {setAmount(amount)}
  },[isExchange]);

  return (
    <main
      id="presale"
      className="bg-gray-900 text-white w-full overflow-y-auto"
    >
      <section id="home" className="p-5">
        <div className="container m-auto">
          <div className="banner-items">
            <div className="row align-items-center">
              <div className="grid lg:grid-cols-2 sm:grid-cols-1 flex-col-reverse gap-10 sm:gap-5">
                <div>
                  <div
                    id="connected"
                    className="d-block text-center lg:p-10 md:p-10 sm:p-10"
                  >
                    <h2 className="title title-40 pb-10">
                      Presale {stage} live {addCommas(price)} USDT
                    </h2>
                    <p className="text-lg font-bold">Hurry and buy before</p>
                    <p className="text-lg font-bold">presale {stage} sells out</p>
                    <div className="py-5">
                      <ProgressBar bgcolor="#0764a6" completed={soldPercent} label={true}/>
                      <p className="text-right">${addCommas(price * stageSupply)}</p>
                    </div>
                    <div className="grid sm:grid-cols-2 xl:gap-15 md:gap-10 sm:gap-5 xs:gap-2 xl:pl-10 xl:pr-10 lg:pl-5 lg:pr-10">
                      <div className="detail text-left mb-4">
                        <p>Raised: {addCommas(price * soldAmount)} USDT</p>
                      </div>
                      <div className="detail text-left mb-4">
                        <p>Remaining: {addCommas(stageSupply - soldAmount)} CODO</p>
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 xl:gap-15 lg:gap-10 md:gap-10 sm:gap-5 xl:pl-10 xl:pr-10 lg:pl-5 lg:pr-10">
                      <div className="detail text-left mb-4">
                        <p>Sold: {addCommas(soldAmount)} CODO</p>
                      </div>
                      <div className="detail text-left mb-4">
                        <p>Your purchased CODO = {addCommas(userBalance)}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:mt-10 sm:mt-5">
                      <div className="button-area mb-4">
                        <div className="btn rounded text-uppercase md:text-lg text-sm font-bold m-auto" onClick={openEthModal}>
                          Buy With Eth
                        </div>
                      </div>
                      <div className="button-area mb-4">
                        <div className="btn rounded text-uppercase md:text-lg text-sm font-bold m-auto" onClick={openUSDTModal}>
                          Buy With USDT
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    id="nonconnect"
                    className="hidden md:p-20 sm:p-10 m-auto"
                  >
                    <h2 className="title text-center">Please Connect Wallet</h2>
                    <p className="mt-5 text-center text-stone-400">
                      Please connect to your wallet
                    </p>
                    <div className="button-area mb-4 md:mt-10 sm:mt-5">
                      <div
                        id="btn-connect"
                        className="btn rounded text-uppercase md:text-lg sm:text-base font-bold"
                      >
                        Connect Wallet
                      </div>
                    </div>
                  </div>
                </div>
                <div className="m-auto xl:p-20 lmd:p-5">
                  <div
                    className="banner-thumb text-right wow fadeInUp "
                    data-wow-duration="1500ms"
                  >
                    <img src="/assets/images/presale/GD.webp" alt="banner" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="howtobuy">
        <div className="container m-auto p-5">
          <div>
            <div className="title title-50 text-uppercase text-center mb-20">
              how to buy
            </div>
          </div>
          <div className="grid xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 lg:gap-10 md:gap-8 sm:gap-5 sm:p-5">
            <div className="panel mb-10">
              <div className="sub-title text-center title-30 .text-capitalize">
                Get an ERC-20 supported wallet
              </div>
              <div className=" text-left text-capitalize md:text-lg md:font-bold sm:text-md sm:font-semibold">
                The first step to participating in the Codo Finance token sale
                is to have an ERC-20 supported wallet. We recommend using
                MetaMask or Trust Wallet, both of which are available for both
                desktop and mobile devices. If you don't have a wallet yet, you
                can download one of these wallets from their official websites.
              </div>
            </div>
            <div className="panel mb-10">
              <div className="sub-title text-center title-30 .text-capitalize">
                Purchase CODO Tokens
              </div>
              <div className="text-left text-capitalize md:text-lg md:font-bold sm:text-md sm:font-semibold">
                With your wallet connected, you can now purchase Codo tokens on
                our website. You'll need to have Ethereum (ETH) in your wallet
                to complete the transaction. You can specify the amount of ETH
                you'd like to purchase, and the website will automatically
                calculate the equivalent amount in CODO tokens. Please make sure
                to double check the details of the transaction before
                proceeding.
              </div>
            </div>
            <div className="panel mb-10">
              <div className="sub-title text-center title-30 .text-capitalize">
                Wait for the sale to end
              </div>
              <p className="text-left text-capitalize md:text-lg md:font-bold sm:text-md sm:font-semibold">
                Once you've completed your purchase, you will be able to see
                your token balance in the sales panel. However, the tokens will
                not be available for transfer or use until the end of the token
                sale. Keep an eye on our social channels for updates on the sale
                progress and for instructions on claiming your tokens once the
                sale has ended. Additionally, you can track sales progress on
                the website.
              </p>
            </div>
            <div className="panel mb-10">
              <div className="sub-title text-center title-30 .text-capitalize">
                Get an ERC-20 supported wallet
              </div>
              <div className="text-left text-capitalize md:text-lg md:font-bold sm:text-md sm:font-semibold">
                The first step to participating in the Codo Finance token sale
                is to have an ERC-20 supported wallet. We recommend using
                MetaMask or Trust Wallet, both of which are available for both
                desktop and mobile devices. If you don't have a wallet yet, you
                can download one of these wallets from their official websites.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="tokenomics">
        <div className="container m-auto">
          <div className="title title-50 text-uppercase text-center mb-20">
            Tokenomics
          </div>
          <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1">
            <div>
              <img
                src="/assets/images/graffik.png"
                alt="tokenomics"
                className="m-auto md:p-10 sm:p-10 p-5"
              />
            </div>
            <div className="flex flex-col justify-center md:gap-4 sm:gap-2 md:p-10 sm:px-10 p-5">
              <div className="flex justify-between pb-3 px-3">
                <div className="md:text-2xl text-base">Presale</div> &nbsp;
                <div className="md:text-2xl text-base item-percent presale">% 50</div>
              </div>
              <div className="flex justify-between pb-3 px-3">
                <div className="md:text-2xl text-base">Foundation & Development</div> &nbsp;
                <div className="md:text-2xl text-base item-percent fd">% 10</div>
              </div>
              <div className="flex justify-between pb-3 px-3">
                <div className="md:text-2xl text-base">Airdrop & Bounty</div> &nbsp;
                <div className="md:text-2xl text-base item-percent airdrop">% 10</div>
              </div>
              <div className="flex justify-between pb-3 px-3">
                <div className="md:text-2xl text-base">Liquidity</div> &nbsp;
                <div className="md:text-2xl text-base item-percent liquidity">% 05</div>
              </div>
              <div className="flex justify-between pb-3 px-3">
                <div className="md:text-2xl text-base">Cex & Dex pool</div> &nbsp;
                <div className="md:text-2xl text-base item-percent dex">% 20</div>
              </div>
              <div className="flex justify-between pb-3 px-3">
                <div className="md:text-2xl text-base">TeamAllocation</div> &nbsp;
                <div className="md:text-2xl text-base item-percent team">% 05</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about">
        <div className="container m-auto">
          <div className="m-auto w-full lg:w-2/3 md:w-4/5 px-5">
            <div className="panel">
              <div className="flex flex-row flex-wrap mb-10 sm:mb-5">
                <div className="lg:w-1/2 w-full mb-10 sm:mb-5">
                  <div className="font-bold sub-title title-20 text-uppercase text-left">
                    token name
                  </div>
                  <div className="font-bold text-left">Codo Finance</div>
                </div>
                <div className="lg:w-1/2 w-full mb-10 sm:mb-5">
                  <div className="font-bold sub-title title-20 text-uppercase text-left">
                    token type
                  </div>
                  <div className="font-bold text-left">ERC-20 (Ethereum)</div>
                </div>
              </div>
              <div className="flex flex-row flex-wrap mb-10 sm:mb-5">
                <div className="lg:w-1/2 w-full mb-10 sm:mb-5">
                  <div className="font-bold sub-title title-20 text-uppercase text-left">
                    token symbol
                  </div>
                  <div className="font-bold text-left">CODO</div>
                </div>
                <div className="lg:w-1/2 w-full mb-10 sm:mb-5">
                  <div className="font-bold sub-title title-20 text-uppercase text-left">
                    token decimal
                  </div>
                  <div className="font-bold text-left">18</div>
                </div>
              </div>
              <div className="mt-20">
                <div>
                  <p className="text-uppercase text-lg text-left font-bold mb-3">
                    Presale contract address
                  </p>
                  <div className="content-address">
                    <div className="flex flex-row justify-between">
                      <div id="presale_addresst" className="show-more">
                        0x1d58a8AC10F96A79C09c06bd1435Fdb69eDa47Cd
                      </div>
                      <div className=" pl-3 border-l-2 border-black">
                        <img
                          src="/assets/images/copy.png"
                          alt="copy"
                          width={22}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-10">
                <div>
                  <p className="text-uppercase text-lg text-left font-bold mb-3">
                    token contract address
                  </p>
                  <div className="content-address">
                    <div className="flex flex-row justify-between">
                      <div id="presale_addresst" className="show-more">
                        0x1d58a8AC10F96A79C09c06bd1435Fdb69eDa47Cd
                      </div>
                      <div className=" pl-3 border-l-2 border-black">
                        <img
                          src="/assets/images/copy.png"
                          alt="copy"
                          width={22}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Modal 
        show={show}
        handleClose={hideModal}
        title={modalTitle}
        isEth={isEth}
        price={price}
        priceETH={priceETH}
        amount={amount}
        setAmount={setAmount}
        codo={codo}
        setCodo={setCodo}
        isLoading={isLoading}
        isApproved={userUSDCIsApproved}
        isExchange={isExchange}
        setIsExchange={setIsExchange}
        onConfirm={()=>onBuy()}
        onApprove={()=>onApprove()}
      >        
      </Modal>
    </main>
  );
}
