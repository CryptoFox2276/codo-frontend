import { useEffect, useState } from "react";
import ProgressBar from "../components/progress-bar";
import Modal from "../components/Modal";
import { eth } from "../state/eth";
import { ethers } from "ethers";
import abiCodoPresale from "/abi/CodoPresale.json";
import abiERC20 from "/abi/ERC20.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UINT256_MAX =  "115792089237316195423570985008687907853269984665640564039457584007913129639935";
const NETWORK_ID = Number(process.env.NEXT_PUBLIC_CHAINID);
const DEFAULT_PROVIDER = new ethers.providers.JsonRpcProvider(
  process.env.NEXT_PUBLIC_RPCURL,
  NETWORK_ID
);

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
    totalRaised,
    totalSoldPercent,
    soldAmount,
    soldCost,
    soldPercent,
    nextStagePrice,
    userBalance,
    userUSDCIsApproved,
    saleActive,
    startTime,
    userUSDCBalance,
    userETHBalance,
    setUserUSDCIsApproved,
    connectWallet,
    disConnectWallet,
    addCommas,
    loadBalance,
    loadCurrentBalance,
    loadUserBalance,
  } = eth.useContainer();

  const [show, setShow] = useState(false);
  const [modalTitle, setModalTitle] = useState("buy with eth");
  const [isEth, setIsEth] = useState(true);
  const [amount, setAmount] = useState();
  const [codo, setCodo] = useState();
  const [isExchange, setIsExchange] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const hideModal = () => {
    setShow(false);
  };

  const showModal = () => setShow(true);

  const init = () => {
    setCodo('');
    setAmount('');
    setIsExchange(false);
  };

  const onUpdate = () => {
    loadBalance();
    loadCurrentBalance();
    loadUserBalance();
  };

  const openEthModal = () => {
    init();
    setModalTitle("buy with eth");
    setIsEth(true);
    showModal();
  };

  const openUSDTModal = () => {
    init();
    setModalTitle("buy with usdt");
    setIsEth(false);
    showModal();
  };

  const onSetMaxAmount = () => {
    console.log(userETHBalance, userUSDCBalance)
    if(isEth) {
      setAmount(userETHBalance);
    } else {
      setAmount(userUSDCBalance)
    }
  }

  const onBuy = async () => {
    console.log("onbuy:", userETHBalance, userUSDCBalance);
    try {
      if(!address) {
        toast.info("First you must connect to the wallet!")
        return;
      }
      if(codo == 0 || !codo) {
        toast.info("Invalid amount!");
        return;
      }
      if(isEth && userETHBalance < amount) {
        toast.info("insufficient balance")
        return;
      }
      setLoading(true);

      const presaleContract = new ethers.Contract(
        process.env.NEXT_PUBLIC_CODO_PRESALE ?? "",
        abiCodoPresale,
        signer
      );

      if (isEth) {
        console.log("Buying with ETH...", codo, amount);

        // presaleContract.buyWithEth(ethers.utils.parseEther(codo.toString()), { value: ethers.utils.parseEther(amount), gasLimit: 500000}).then(res => {
        //   console.log("Bought with ETH Successfully!");
        //   setLoading(false)
        // }).catch(err=>{
        //   console.log(err)
        //   setLoading(false);
        // })

        try {
          let tx = await presaleContract.buyWithEth(
            ethers.utils.parseEther(codo.toString()),
            { value: ethers.utils.parseEther(amount), gasLimit: 500000 }
          );

          let res = await tx.wait();

          toast.success("Bought with ETH Successfully!");

          setLoading(false);

          hideModal();

          onUpdate();
        } catch (error) {
          console.log(error);

          toast.error("Failed buying with ETH");

          setLoading(false);
        }
      } else {
        console.log("Buying with USDT...", codo);

        // presaleContract.buyWithUSDT(ethers.utils.parseEther(codo.toString()), {gasLimit: 500000}).then(res => {
        //   console.log("Bought with USDT Successfully!");
        //   setLoading(false)
        //   onUpdate()
        // }).catch(err=>{

        //   console.log(err)
        //   setLoading(false);
        // })

        try {
          let tx = await presaleContract.buyWithUSDT(
            ethers.utils.parseEther(codo.toString()),
            { gasLimit: 500000 }
          );

          let res = await tx.wait();

          toast.success("Bought with USDT Successfully!");

          setLoading(false);

          hideModal();

          onUpdate();
        } catch (error) {
          console.log(error);

          toast.error("Failed buying with USDT");

          setLoading(false);
        }
      }
    } catch (err) {
      console.log(err);

      setLoading(false);
    }
  };

  const onApprove = async () => {
    const usdtContract = new ethers.Contract(
      process.env.NEXT_PUBLIC_USDC ?? "",
      abiERC20,
      signer
    );

    setLoading(true);

    // usdtContract.approve(process.env.NEXT_PUBLIC_CODO_PRESALE, UINT256_MAX).then(()=>{
    //   console.log("Approved Successfully!");
    //   setLoading(false);
    //   setUserUSDCIsApproved(true);
    // }).catch(err => {
    //   console.log(err);
    //   setLoading(false);
    // })

    try {
      let tx = await usdtContract.approve(
        process.env.NEXT_PUBLIC_CODO_PRESALE,
        UINT256_MAX
      );

      let res = await tx.wait();
      toast.success("Approved Successfully!");
      setLoading(false);
      hideModal();
      setUserUSDCIsApproved(true);
    } catch (error) {
      toast.error("Failed Approving!");

      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("amount, codo", typeof parseInt(codo, 10).toString);

    if (isExchange) {
      if (isEth) {
        setAmount(parseFloat(priceETH * codo, 10).toFixed(8));
      } else {
        setAmount(parseFloat(price * codo, 10).toFixed(4));
      }

      setCodo(parseInt(codo, 10));
    } else {
      if (isEth) {
        setCodo(parseInt(amount / priceETH, 10));
      } else {
        setCodo(parseInt(amount / price, 10));
      }
    }
  }, [amount, codo]);

  useEffect(() => {
    console.log("isExchange", parseInt(codo, 10));

    if (isExchange) {
      setCodo(parseInt(codo, 10));
    } else {
      setAmount(amount);
    }
  }, [isExchange]);

  return (
    <main id="presale" className="text-white w-full overflow-y-auto">
      <section id="home" className="p-5 pt-20">
        <div className="container m-auto">
          <div className="banner-items">
            <div className="row align-items-center">
              <div className="flex flex-col m-auto gap-10 sm:gap-5">
                <div className="m-auto xl:p-20 md:p-5 md:block lg:hidden">
                  <div
                    className="banner-thumb text-right wow fadeInUp "
                    data-wow-duration="1500ms"
                  >
                    <img src="/assets/images/presale/asa.png" alt="banner" />
                  </div>
                </div>

                <div className=" relative m-auto w-full lg:w-2/3 panel">
                  <div
                    id="connected"
                    className="d-block text-center lg:p-10 md:p-10 sm:p-10"
                  >
                    <h2 className="title title-50 pb-10">
                      Presale {stage} live {addCommas(price)} USDT
                    </h2>

                    <p className="text-2xl font-bold">Hurry and buy before</p>

                    <p className="text-2xl font-bold">
                      presale {stage} sells out
                    </p>

                    <div className="py-5">
                      <ProgressBar
                        bgcolor="#0764a6"
                        completed={totalSoldPercent}
                        label={true}
                      />

                      <p className="text-right text-lg">
                        ${addCommas(totalRaised)}
                      </p>
                    </div>

                    <div className="grid sm:grid-cols-2 xl:gap-15 md:gap-10 sm:gap-5 xs:gap-2 xl:pl-10 xl:pr-10 lg:pl-5 lg:pr-10 text-lg">
                      <div className="detail text-left mb-4">
                        <p>
                          Raised:{" "}
                          <span className=" text-ellipsis overflow-hidden w-auto">
                            {addCommas(totalSoldCost)}
                          </span>{" "}
                          USDT
                        </p>
                      </div>

                      <div className="detail text-left mb-4">
                        <p>
                          Remaining: {addCommas(stageSupply - soldAmount)} CODO
                        </p>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 xl:gap-15 lg:gap-10 md:gap-10 sm:gap-5 xl:pl-10 xl:pr-10 lg:pl-5 lg:pr-10 text-lg">
                      <div className="detail text-left mb-4">
                        <p>Sold: {addCommas(totalSoldAmount)} CODO</p>
                      </div>

                      <div className="detail text-left mb-4">
                        <p>Your purchased CODO = {addCommas(userBalance)}</p>
                      </div>
                    </div>

                    {saleActive && Date.now() - new Date(startTime) >= 0 && (
                      <div className="grid sm:grid-cols-1 xs:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 sm:mt-5 xs:mt-5 mt-10 ">
                        <div className="button-area mb-4">
                          <div
                            className="btn rounded text-uppercase md:text-lg text-sm font-bold m-auto"
                            onClick={openEthModal}
                          >
                            Buy With Eth
                          </div>
                        </div>

                        <div className="button-area mb-4">
                          <div
                            className="btn rounded text-uppercase md:text-lg text-sm font-bold m-auto"
                            onClick={openUSDTModal}
                          >
                            Buy With USDT
                          </div>
                        </div>
                      </div>
                    )}
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

                  <img
                    src="/assets/images/badge.png"
                    alt="badge"
                    className="badge  absolute -right-8 -top-8"
                  />
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

          <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 lg:gap-10 md:gap-8 sm:gap-5 sm:p-5">
            <div className="panel mb-10">
              <div className="sub-title text-center title-30 .text-capitalize">
                Set Up a Wallet
              </div>

              <div className=" text-left text-capitalize md:text-lg md:font-bold sm:text-md sm:font-semibold">
                To purchase CODO tokens during the token sale, start by setting
                up a wallet that is compatible with Ethereum (ETH) and Tether
                (USDT). Some popular options include MetaMask, Trust Wallet, and
                MyEtherWallet. When creating an account, ensure that you
                securely store your wallet's private key, as it is crucial for
                accessing and managing your funds.
              </div>
            </div>

            <div className="panel mb-10">
              <div className="sub-title text-center title-30 .text-capitalize">
                Fund Your Wallet
              </div>

              <div className="text-left text-capitalize md:text-lg md:font-bold sm:text-md sm:font-semibold">
                Before participating in the CODO token sale, you need to fund
                your wallet with Ethereum (ETH) or Tether (USDT). To do this,
                purchase the desired cryptocurrency from a reliable
                cryptocurrency exchange or fiat-to-crypto platform. After
                obtaining the cryptocurrency, transfer it to your wallet's
                Ethereum address. Remember that your wallet must have sufficient
                funds to cover both the token purchase and the associated gas
                fees.
              </div>
            </div>

            <div className="panel mb-10">
              <div className="sub-title text-center title-30 .text-capitalize">
                Access the Codo Finance Token Sale Page
              </div>

              <p className="text-left text-capitalize md:text-lg md:font-bold sm:text-md sm:font-semibold">
                Once your wallet is funded, navigate to the Codo Finance token
                sale page on our official website. To ensure your security,
                double-check that you are on the correct and secure website to
                avoid falling victim to potential scams or phishing attempts.
              </p>
            </div>

            <div className="panel mb-10">
              <div className="sub-title text-center title-30 .text-capitalize">
                Buy CODO Tokens
              </div>

              <div className="text-left text-capitalize md:text-lg md:font-bold sm:text-md sm:font-semibold">
                On the token sale page, input the amount of ETH or USDT you
                would like to invest in CODO tokens. Follow the on-screen
                instructions to initiate the transaction. Verify the transaction
                details, gas fees, and wallet addresses before confirming the
                transaction. Upon successful completion, the purchased CODO
                tokens will be displayed in the balance section of the sales
                panel on our website.
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
                <div className="md:text-2xl text-base item-percent presale">
                  % 50
                </div>
              </div>

              <div className="flex justify-between pb-3 px-3">
                <div className="md:text-2xl text-base">
                  Foundation & Development
                </div>{" "}
                &nbsp;
                <div className="md:text-2xl text-base item-percent fd">
                  % 10
                </div>
              </div>

              <div className="flex justify-between pb-3 px-3">
                <div className="md:text-2xl text-base">Team Allocation</div>{" "}
                &nbsp;
                <div className="md:text-2xl text-base item-percent airdrop">
                  % 10
                </div>
              </div>

              <div className="flex justify-between pb-3 px-3">
                <div className="md:text-2xl text-base">Liquidity</div> &nbsp;
                <div className="md:text-2xl text-base item-percent liquidity">
                  % 05
                </div>
              </div>

              <div className="flex justify-between pb-3 px-3">
                <div className="md:text-2xl text-base">
                  Promotion & Marketing
                </div>{" "}
                &nbsp;
                <div className="md:text-2xl text-base item-percent dex">
                  % 20
                </div>
              </div>

              <div className="flex justify-between pb-3 px-3">
                <div className="md:text-2xl text-base">Airdrop & Bounty</div>{" "}
                &nbsp;
                <div className="md:text-2xl text-base item-percent team">
                  % 05
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about">
        <div className="container m-auto">
          <div className="m-auto w-full lg:w-3/4 px-5">
            <div className="panel">
              <div className="flex flex-row flex-wrap mb-10 sm:mb-5">
                <div className="lg:w-1/2 w-full mb-10 sm:mb-5">
                  <div className="font-bold sub-title title-20 text-uppercase text-left">
                    token name
                  </div>

                  <div className="font-bold text-left title-30">
                    Codo Finance
                  </div>
                </div>

                <div className="lg:w-1/2 w-full mb-10 sm:mb-5">
                  <div className="font-bold sub-title title-20 text-uppercase text-left">
                    token type
                  </div>

                  <div className="font-bold text-left title-30">
                    ERC-20 (Ethereum)
                  </div>
                </div>
              </div>

              <div className="flex flex-row flex-wrap mb-10 sm:mb-5">
                <div className="lg:w-1/2 w-full mb-10 sm:mb-5">
                  <div className="font-bold sub-title title-20 text-uppercase text-left">
                    token symbol
                  </div>

                  <div className="font-bold text-left title-30">CODO</div>
                </div>

                <div className="lg:w-1/2 w-full mb-10 sm:mb-5">
                  <div className="font-bold sub-title title-20 text-uppercase text-left">
                    token decimal
                  </div>

                  <div className="font-bold text-left title-30">18</div>
                </div>
                <div className="lg:w-1/2 w-full mb-10 sm:mb-5">
                  <div className="font-bold sub-title title-20 text-uppercase text-left">
                    total supply
                  </div>

                  <div className="font-bold text-left title-30">
                    1,000,000,000
                  </div>
                </div>
              </div>

              <div className="mt-20">
                <div>
                  <p className="text-uppercase text-lg title-20 text-left font-bold mb-3">
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
                  <p className="text-uppercase text-lg text-left title-20 font-bold mb-3">
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

        <ToastContainer />
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
        onConfirm={() => onBuy()}
        onApprove={() => onApprove()}
        onSetMaxAmount={()=>onSetMaxAmount()}
      ></Modal>
    </main>
  );
}
