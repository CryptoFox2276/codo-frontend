import Web3Modal from "web3modal";
import { BigNumber, ethers } from "ethers";
import { useRef, useState, useEffect } from "react";
import { createContainer } from "unstated-next";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { Multicall } from 'ethereum-multicall';
import abiCodoPresale from '/abi/CodoPresale.json';
import abiERC20 from '/abi/ERC20.json';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const INFURA_ID = "460f40a260564ac4a4f4b3fffb032dad";
const NETWORK_ID = Number(process.env.NEXT_PUBLIC_CHAINID)
const DEFAULT_PROVIDER = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPCURL, NETWORK_ID)

export const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: INFURA_ID,
    },
  },
};

function useEth() {
  const presaleContract = new ethers.Contract(process.env.NEXT_PUBLIC_CODO_PRESALE ?? "", abiCodoPresale, DEFAULT_PROVIDER);
  const usdcContract = new ethers.Contract(process.env.NEXT_PUBLIC_USDC ?? "", abiERC20, DEFAULT_PROVIDER);
  const multicall = new Multicall({ethersProvider: DEFAULT_PROVIDER, tryAggregate: true});

  const [address, setAddress] = useState();
  const [signer, setSigner] = useState();
  const [walletConnected, setWalletConnected] = useState(false);
  const [web3Provider, setWeb3Provider] = useState();
  const [provider, setProvider] = useState();
  const web3ModalRef = useRef();

  const [stage, setStage] = useState(0) // current state
  const [price, setPrice] = useState(0) // presale price(USDT) of token in current stage
  const [priceETH, setPriceETH] = useState(0) // presale price(ETH) of token in current stage
  const [stageSupply, setStageSupply] = useState(0) // Supply of current stage
  const [soldAmount, setSoldAmount] = useState(0) // Amount of tokens sold on the current stage
  const [soldCost, setSoldCost] = useState(0)
  const [soldPercent, setSoldPercent] = useState(0) // Percent of tokens sold on the current stage
  const [nextStagePrice, setNextStagePrice] = useState(0)
  const [saleActive, setSaleActive] = useState(false)
  const [startTime, setStartTime] = useState(0)

  const [totalSupply, setTotalSupply] = useState(0)
  const [totalPresaleAmount, setTotalPresaleAmount] = useState(0)
  const [totalSoldAmount, setTotalSoldAmount] = useState(0)
  const [totalSoldCost, setTotalSoldCost] = useState(0)
  const [totalRaised, setTotalRaised] = useState(0)
  const [totalSoldPercent, setTotalSoldPercent] = useState(0);

  const [userBalance, setUserBalance] = useState(0);
  const [userUSDCIsApproved, setUserUSDCIsApproved] = useState(false);
  const [userUSDCBalance, setUserUSDCBalance] = useState(0);
  const [userETHBalance, setUserETHBalance] = useState(0);

  const connectWallet = async () => {
    try {
      if (!walletConnected) {
        
        const _provider = await web3ModalRef.current.connect();
        const _web3Provider = new ethers.providers.Web3Provider(_provider);
        const _signer = _web3Provider.getSigner();
        const _address = await _signer.getAddress();
        const { chainId } = await _web3Provider.getNetwork();
  
        console.log(_address, chainId, typeof chainId, typeof process.env.NEXT_PUBLIC_CHAINID);
        if(chainId !== Number(process.env.NEXT_PUBLIC_CHAINID)) {
          console.log("Please switch your network");
          toast.info(`Please switch your metamask network to "${process.env.NEXT_PUBLIC_NETWORK_NAME}"`)
          return;
        }
        setWalletConnected(true);
        setProvider(_provider);
        setWeb3Provider(_web3Provider);
        setAddress(_address);
        setSigner(_signer);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const disConnectWallet = async () => {
    await web3ModalRef.current.clearCachedProvider();
    if (provider?.disconnect && typeof provider.disconnect === "function") {
      await provider.disconnect();
    }
    setWalletConnected(false);
    setProvider(null);
    setAddress(null);
  };
  
  const loadBalance = async () => {
    const calls = [];
    calls.push({
      reference: 'CODO',
      contractAddress: process.env.NEXT_PUBLIC_CODO_PRESALE ?? "",
      abi: abiCodoPresale,
      calls: [
        { reference: 'currentTier', methodName: 'getCurrentTier', methodParameters:[] },
        { reference: 'currentPrice', methodName: 'getCurrentPrice', methodParameters:[] },
        { reference: 'totalSupply', methodName: 'getTotalSupply', methodParameters:[] },
        { reference: 'totalPresaleAmount', methodName: 'getTotalPresaleAmount', methodParameters:[] },
        { reference: 'totalSoldAmount', methodName: 'getTotalSoldAmount', methodParameters:[] },
        { reference: 'totalSoldCost', methodName: 'totalSoldPrice', methodParameters:[] },
        { reference: 'currentSoldAmount', methodName: 'getSoldOnCurrentStage', methodParameters:[] },
        { reference: 'currentPriceETH', methodName: 'ethBuyHelper', methodParameters:[ethers.utils.parseEther("1")] },
        { reference: 'saleActive', methodName: 'saleActive', methodParameters:[] },
        { reference: 'startTime', methodName: 'startTime', methodParameters:[] },
      ]
    })

    try {
      const result = await multicall.call(calls);
      if(!result) {
        console.log("Operating failed");
        return;
      }

      let _currentTier        = result.results['CODO'].callsReturnContext[0].success ? result.results['CODO'].callsReturnContext[0].returnValues[0] : 0;
      let _currentPrice       = result.results['CODO'].callsReturnContext[1].success ? result.results['CODO'].callsReturnContext[1].returnValues[0] : 0;
      let _totalSupply        = result.results['CODO'].callsReturnContext[2].success ? result.results['CODO'].callsReturnContext[2].returnValues[0] : 0;
      let _totalPresaleAmount = result.results['CODO'].callsReturnContext[3].success ? result.results['CODO'].callsReturnContext[3].returnValues[0] : 0;
      let _totalSoldAmount    = result.results['CODO'].callsReturnContext[4].success ? result.results['CODO'].callsReturnContext[4].returnValues[0] : 0;
      let _totalSoldCost      = result.results['CODO'].callsReturnContext[5].success ? result.results['CODO'].callsReturnContext[5].returnValues[0] : 0;
      let _soldAmount         = result.results['CODO'].callsReturnContext[6].success ? result.results['CODO'].callsReturnContext[6].returnValues[0] : 0;
      let _priceEth           = result.results['CODO'].callsReturnContext[7].success ? result.results['CODO'].callsReturnContext[7].returnValues[0] : 0;
      let _saleActive         = result.results['CODO'].callsReturnContext[8].success ? result.results['CODO'].callsReturnContext[8].returnValues[0] : 0;
      let _startTime          = result.results['CODO'].callsReturnContext[9].success ? result.results['CODO'].callsReturnContext[9].returnValues[0] : 0;

      console.log(_saleActive, _totalSoldCost, ethers.BigNumber.from(_totalSoldCost.hex).toNumber())

      setStage(_currentTier);
      setPrice(parseFloat(ethers.utils.formatUnits(ethers.BigNumber.from(_currentPrice.hex).toString(), 6)).toFixed(4));
      setTotalSupply(parseFloat(ethers.utils.formatUnits(ethers.BigNumber.from(_totalSupply.hex).toString(), 18)).toFixed());
      setTotalPresaleAmount(parseFloat(ethers.utils.formatUnits(ethers.BigNumber.from(_totalPresaleAmount.hex).toString(), 18)).toFixed());

      

      setTotalSoldAmount(parseFloat(ethers.utils.formatUnits(ethers.BigNumber.from(_totalSoldAmount.hex).toString(), 18)).toFixed());
      setTotalSoldCost(parseFloat(ethers.utils.formatUnits(ethers.BigNumber.from(_totalSoldCost.hex).toString(), 6)).toFixed(4));
      setSoldAmount(parseFloat(ethers.utils.formatUnits(ethers.BigNumber.from(_soldAmount.hex).toString(), 18)).toFixed());
      setPriceETH(parseFloat(ethers.utils.formatUnits(ethers.BigNumber.from(_priceEth.hex).toString(), 18)));
      setSaleActive(_saleActive)
      setStartTime(ethers.BigNumber.from(_startTime.hex).toNumber() * 1000)

    } catch(err) {
      console.log(err);
    }
  }

  const loadCurrentBalance = async () => {
    presaleContract.getTierPrice(stage + 1).then(res => {
      setNextStagePrice(parseFloat(ethers.utils.formatUnits(ethers.BigNumber.from(res._hex).toString(), 6)).toFixed(4));
    }).catch(err=>{
      console.log(err)
    })
    const current_res = await presaleContract.getTierSupply(stage)
    const previous_res = stage > 0 ? await presaleContract.getTierSupply(stage - 1) : 0;

    console.log("tier supply:", ethers.utils.formatEther(current_res) - ethers.utils.formatEther(previous_res));
    setStageSupply(ethers.utils.formatEther(current_res) - ethers.utils.formatEther(previous_res));

    // total sold cost = total cost in the previous tier + total cost in the current tier
    console.log(totalSoldCost, (price * (Number(ethers.utils.formatEther(current_res) - ethers.utils.formatEther(previous_res)) - soldAmount)));
    let sum = parseFloat(Number(totalSoldCost) + Number(price * (Number(ethers.utils.formatEther(current_res) - ethers.utils.formatEther(previous_res)) - soldAmount))).toFixed(2)
    setTotalRaised(sum);
  }

  const loadUserBalance = async () => {
    // address && presaleContract.getUserBalance(address).then(res => {
    //   setUserBalance(parseFloat(ethers.utils.formatUnits(ethers.BigNumber.from(res._hex).toString(), 6)).toFixed(4));
    // }).catch(err=>{
    //   console.log(err)
    // })

    if(!address) return;

    const calls = [];

    DEFAULT_PROVIDER.getBalance(address).then(balance => {
      const balanceInEth = ethers.utils.formatEther(balance)
      console.log(`Eth balance: ${balanceInEth} ETH`)
      setUserETHBalance(balanceInEth);
    })

    calls.push({
      reference: 'CODO',
      contractAddress: process.env.NEXT_PUBLIC_CODO_PRESALE ?? "",
      abi: abiCodoPresale,
      calls: [
        { reference: 'getUserBalance', methodName: 'getUserBalance', methodParameters:[address] },
      ]
    })
    calls.push({
      reference: 'USDC',
      contractAddress: process.env.NEXT_PUBLIC_USDC ?? "",
      abi: abiERC20,
      calls: [
        { reference: 'allowance', methodName: 'allowance', methodParameters:[address, process.env.NEXT_PUBLIC_CODO_PRESALE ?? ""] },
        { reference: 'balanceOf', methodName: 'balanceOf', methodParameters:[address] },
        { reference: 'decimals', methodName: 'decimals', methodParameters:[] },
      ]
    })

    try {
      const result = await multicall.call(calls);
      if(!result) {
        console.log("!Operating failed");
        return;
      }
      const _getUserBalance = result.results['CODO'].callsReturnContext[0].success ? result.results['CODO'].callsReturnContext[0].returnValues[0] : 0
      const _allowance = result.results['USDC'].callsReturnContext[0].success ? result.results['USDC'].callsReturnContext[0].returnValues[0] : 0
      const _balanceOf = result.results['USDC'].callsReturnContext[1].success ? result.results['USDC'].callsReturnContext[1].returnValues[0] : 0
      const _decimals = result.results['USDC'].callsReturnContext[2].success ? result.results['USDC'].callsReturnContext[2].returnValues[0] : 0

      console.log("allowance&balance:", ethers.utils.formatEther(_getUserBalance).toString());

      setUserUSDCIsApproved(ethers.BigNumber.from(_allowance).gt(0));
      setUserUSDCBalance(ethers.utils.formatUnits(_balanceOf, _decimals));
      setUserBalance(ethers.utils.formatEther(_getUserBalance));
      
    } catch (err) {
      console.log(err);
    }
  }

  const addCommas = (num) => {
    var str = num.toString().split('.');
    if (str[0].length >= 5) {
        str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }
    if (str[1] && str[1].length >= 5) {
        str[1] = str[1].replace(/(\d{3})/g, '$1 ');
    }
    return str.join('.');
  }
  
  useEffect(() => {
    if(typeof window !== "undefined") {
      web3ModalRef.current = new Web3Modal({
        network: "mainnet",
        cacheProvider: true,
        providerOptions,
        // disableInjectedProvider: false,
      });
    }
    console.log(walletConnected, address);
    if(walletConnected) connectWallet();
    loadBalance();
  }, []);
  useEffect(()=>{
    loadCurrentBalance();
  }, [stage]);
  useEffect(()=>{
    loadUserBalance();
  }, [address]);
  useEffect(()=>{
    setTotalSoldPercent(totalRaised > 0 ? parseFloat(100 * totalSoldCost / totalRaised).toFixed(2) : 0);
  },[totalSoldCost, totalRaised])
  useEffect(()=>{
    setSoldCost(price * soldAmount);
    console.log(soldAmount, price * soldAmount, stageSupply)
    setSoldPercent(stageSupply > 0 ? parseFloat(100 * soldAmount / stageSupply).toFixed(2) : 0);
  },[soldAmount, stageSupply])

  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts) => {
        console.log("Changed Web3 Account");
        setAddress(accounts[0])
        // dispatch({
        //   type: "SET_ADDRESS",
        //   address: accounts[0],
        // } as Web3Action);
      };

      // https://docs.ethers.io/v5/concepts/best-practices/#best-practices--network-changes
      const handleChainChanged = (_hexChainId) => {

        if (typeof window !== "undefined") {
          console.log("switched to chain...", _hexChainId);
          // window.location.reload();
          return;
        } else {
          console.log("window is undefined");
        }
      };

      const handleDisconnect = (error) => {
        // eslint-disable-next-line no-console
        console.log("disconnect", error);

        disconnect();
      };

      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChanged);
      provider.on("disconnect", handleDisconnect);

      // Subscription Cleanup
      return () => {
        if (provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChanged);
          provider.removeListener("chainChanged", handleChainChanged);
          provider.removeListener("disconnect", handleDisconnect);
        }
      };
    }

    if (web3Provider?.on) {
      const handleNetworkChanged = (newNetwork, oldNetwork) => {
        // When a Provider makes its initial connection, it emits a "network"
        // event with a null oldNetwork along with the newNetwork. So, if the
        // oldNetwork exists, it represents a changing network
        console.log({ oldNetwork, newNetwork });
        if (oldNetwork) {
          window.location.reload();
        }
      };

      web3Provider.on("network", handleNetworkChanged);

      return () => {
        if (web3Provider.removeListener) {
          web3Provider.removeListener("network", handleNetworkChanged);
        }
      };
    }
  }, [provider, web3Provider, web3ModalRef]);

  return {
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
    setUserUSDCIsApproved,
    userUSDCBalance,
    userETHBalance,
    saleActive,
    startTime,
    connectWallet,
    disConnectWallet,
    addCommas,
    loadBalance,
    loadCurrentBalance,
    loadUserBalance
  };
}


export const eth = createContainer(useEth);
