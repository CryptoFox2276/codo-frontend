import Web3Modal from "web3modal";
import { BigNumber, ethers } from "ethers";
import { useRef, useState, useEffect } from "react";
import { createContainer } from "unstated-next";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { Multicall } from "ethereum-multicall";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCallback } from "react";

import { SUPPORTED_CHAIN, SUPPORTED_CHAIN_NAME, isSupportedChain } from "./common";
import abiCodoPresale from "/abi/CodoPresale.json";
import abiStaking from "/abi/Staking.json";
import abiERC20 from "/abi/ERC20.json";
import abiBinancePayment from "/abi/BinancePayment.json";
import abiPriceFeed from "/abi/PriceFeed.json";

const ApproveAmount = "0xffffffffffffffffffffffffffffffffffffff";
const INFURA_ID = "460f40a260564ac4a4f4b3fffb032dad";
const NETWORK_ID = Number(process.env.NEXT_PUBLIC_CHAINID);
const multicallAddress = process.env.NEXT_PUBLIC_MULTICALL || "";
const DEFAULT_PROVIDER = new ethers.providers.JsonRpcProvider(
  process.env.NEXT_PUBLIC_RPCURL
);
const BSC_DEFAUKT_PROVIDER = new ethers.providers.JsonRpcProvider(
  process.env.NEXT_PUBLIC_BSC_RPC_URL
)

export const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: INFURA_ID,
    },
  },
  binancechainwallet: {
    package: WalletConnectProvider,
    options: {
      infuraId: INFURA_ID,
    },
  },
  coinbasewallet: {
    package: WalletConnectProvider,
    options: {
      infuraId: INFURA_ID,
    },
  },
};

function useEth() {
  const presaleContract = new ethers.Contract(
    process.env.NEXT_PUBLIC_CODO_PRESALE ?? "",
    abiCodoPresale,
    DEFAULT_PROVIDER
  );
  const usdcContract = new ethers.Contract(
    process.env.NEXT_PUBLIC_USDC ?? "",
    abiERC20,
    DEFAULT_PROVIDER
  );
  // const busdContract = new ethers.Contract(
  //   process.env.NEXT_PUBLIC_BSC_BUSD,
  //   abiERC20,
  //   BSC_DEFAUKT_PROVIDER
  // );

  const bnbPriceFeedContract = new ethers.Contract(
    process.env.NEXT_PUBLIC_BSC_PRICEFEED,
    abiPriceFeed,
    BSC_DEFAUKT_PROVIDER
  )

  const multicall = new Multicall({
    ethersProvider: DEFAULT_PROVIDER,
    multicallCustomContractAddress: multicallAddress,
    tryAggregate: true,
  });
  // const multicall = new Multicall({ethersProvider: DEFAULT_PROVIDER, tryAggregate: true});

  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState();
  const [signer, setSigner] = useState(null);
  const [walletConnected, setWalletConnected] = useState(false);
  const [web3Provider, setWeb3Provider] = useState();
  const [provider, setProvider] = useState();
  const web3ModalRef = useRef();

  const [stage, setStage] = useState(0); // current state
  const [price, setPrice] = useState(0); // presale price(USDT) of token in current stage
  const [priceETH, setPriceETH] = useState(0); // presale price(ETH) of token in current stage
  const [priceBNB, setPriceBNB] = useState(0); // presale price(ETH) of token in current stage
  const [stageSupply, setStageSupply] = useState(0); // Supply of current stage
  const [soldAmount, setSoldAmount] = useState(0); // Amount of tokens sold on the current stage
  const [soldCost, setSoldCost] = useState(0);
  const [soldPercent, setSoldPercent] = useState(0); // Percent of tokens sold on the current stage
  const [nextStagePrice, setNextStagePrice] = useState(0);
  const [saleActive, setSaleActive] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [tierEndTime, setTierEndTime] = useState(0);
  const [rewardTokenPerBlock, setRewardTokenPerBlock] = useState(0) // Amount of reward token per block in the staking
  const [endBlockNumber, setEndBlockNumber] = useState(0) // Number of block that staking can be ended

  const [bnbPriceFeed, setBnbPriceFeed] = useState(0);

  const [totalSupply, setTotalSupply] = useState(0);
  const [totalPresaleAmount, setTotalPresaleAmount] = useState(0);
  const [totalSoldAmount, setTotalSoldAmount] = useState(0);
  const [totalSoldCost, setTotalSoldCost] = useState(0);
  const [totalRaised, setTotalRaised] = useState(0);
  const [totalSoldPercent, setTotalSoldPercent] = useState(0);
  const [totalStaked, setTotalStaked] = useState(0);

  const [userBalance, setUserBalance] = useState(0);  // Amount of token user purchased
  const [userStakedTokenBalance, setUserStakedTokenBalance] = useState(0);  // Amount of token staked to the pool by user
  const [userStakedTime, setUserStakedTime] = useState(0);
  const [userUSDCIsApproved, setUserUSDCIsApproved] = useState(false);
  const [userBUSDIsApproved, setUserBUSDIsApproved] = useState(false);
  const [userUSDCBalance, setUserUSDCBalance] = useState(0);
  const [userBUSDCBalance, setUserBUSDCBalance] = useState(0);
  const [userETHBalance, setUserETHBalance] = useState(0);
  const [userBNBBalance, setUserBNBBalance] = useState(0)

  const [claimStart, setClaimStart] = useState(0); // Time to start claim
  const [lockedTime, setLockedTime] = useState(0); // Time to lock withdraw
  const [harvestLock, setHarvestLock] = useState(true); // Is locked to harvest rewards from staking contract

  const connectWallet = async () => {
    try {
      if (!walletConnected || !address) {
        const _provider = await web3ModalRef.current.connect();
        // await web3ModalRef.current.toggleModal();
        const _web3Provider = new ethers.providers.Web3Provider(_provider);
        const _signer = _web3Provider.getSigner();
        const _address = await _signer.getAddress();
        const { chainId } = await _web3Provider.getNetwork();

        if (!isSupportedChain(chainId)) {
          toast.info(
            `Please switch your metamask network`
          );
          return;
        }
        setWalletConnected(true);
        setProvider(_provider);
        setWeb3Provider(_web3Provider);
        setAddress(_address);
        setSigner(_signer);
      }
    } catch (err) {
      console.error(err);
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
      reference: "CODO",
      contractAddress: process.env.NEXT_PUBLIC_CODO_PRESALE ?? "",
      abi: abiCodoPresale,
      calls: [
        {
          reference: "currentTier",
          methodName: "getCurrentTier",
          methodParameters: [],
        },
        {
          reference: "currentPrice",
          methodName: "getCurrentPrice",
          methodParameters: [],
        },
        {
          reference: "totalSupply",
          methodName: "getTotalSupply",
          methodParameters: [],
        },
        {
          reference: "totalPresaleAmount",
          methodName: "getTotalPresaleAmount",
          methodParameters: [],
        },
        {
          reference: "totalSoldAmount",
          methodName: "getTotalSoldAmount",
          methodParameters: [],
        },
        {
          reference: "totalSoldCost",
          methodName: "totalSoldPrice",
          methodParameters: [],
        },
        {
          reference: "currentSoldAmount",
          methodName: "getSoldOnCurrentStage",
          methodParameters: [],
        },
        {
          reference: "currentPriceETH",
          methodName: "ethBuyHelper",
          methodParameters: [ethers.utils.parseEther("1")],
        },
        {
          reference: "saleActive",
          methodName: "saleActive",
          methodParameters: [],
        },
        {
          reference: "startTime",
          methodName: "startTime",
          methodParameters: [],
        },
      ],
    });
    calls.push({
      reference: "Stake",
      contractAddress: process.env.NEXT_PUBLIC_STAKING,
      abi: abiStaking,
      calls: [
        {
          reference: "tokensStaked",
          methodName: "tokensStaked",
          methodParameters: [],
        },
        {
          reference: "rewardTokensPerBlock",
          methodName: "rewardTokensPerBlock",
          methodParameters: []
        },
        {
          reference: "endBlock",
          methodName: "endBlock",
          methodParameters: [],
        }
      ]
    })

    try {
      const result = await multicall.call(calls);
      if (!result) {
        return;
      }

      let _currentTier = result.results["CODO"].callsReturnContext[0].success
        ? result.results["CODO"].callsReturnContext[0].returnValues[0]
        : 0;
      let _currentPrice = result.results["CODO"].callsReturnContext[1].success
        ? result.results["CODO"].callsReturnContext[1].returnValues[0]
        : 0;
      let _totalSupply = result.results["CODO"].callsReturnContext[2].success
        ? result.results["CODO"].callsReturnContext[2].returnValues[0]
        : 0;
      let _totalPresaleAmount = result.results["CODO"].callsReturnContext[3]
        .success
        ? result.results["CODO"].callsReturnContext[3].returnValues[0]
        : 0;
      let _totalSoldAmount = result.results["CODO"].callsReturnContext[4]
        .success
        ? result.results["CODO"].callsReturnContext[4].returnValues[0]
        : 0;
      let _totalSoldCost = result.results["CODO"].callsReturnContext[5].success
        ? result.results["CODO"].callsReturnContext[5].returnValues[0]
        : 0;
      let _soldAmount = result.results["CODO"].callsReturnContext[6].success
        ? result.results["CODO"].callsReturnContext[6].returnValues[0]
        : 0;
      let _priceEth = result.results["CODO"].callsReturnContext[7].success
        ? result.results["CODO"].callsReturnContext[7].returnValues[0]
        : 0;
      let _saleActive = result.results["CODO"].callsReturnContext[8].success
        ? result.results["CODO"].callsReturnContext[8].returnValues[0]
        : 0;
      let _startTime = result.results["CODO"].callsReturnContext[9].success
        ? result.results["CODO"].callsReturnContext[9].returnValues[0]
        : 0;

      setStage(_currentTier);
      setPrice(
        parseFloat(
          ethers.utils.formatUnits(
            ethers.BigNumber.from(_currentPrice.hex).toString(),
            6
          )
        ).toFixed(4)
      );
      setTotalSupply(
        parseFloat(
          ethers.utils.formatUnits(
            ethers.BigNumber.from(_totalSupply.hex).toString(),
            18
          )
        ).toFixed()
      );
      setTotalPresaleAmount(
        parseFloat(
          ethers.utils.formatUnits(
            ethers.BigNumber.from(_totalPresaleAmount.hex).toString(),
            18
          )
        ).toFixed()
      );

      setTotalSoldAmount(
        parseFloat(
          ethers.utils.formatUnits(
            ethers.BigNumber.from(_totalSoldAmount.hex).toString(),
            18
          )
        ).toFixed()
      );
      setTotalSoldCost(
        parseFloat(
          ethers.utils.formatUnits(
            ethers.BigNumber.from(_totalSoldCost.hex).toString(),
            6
          )
        ).toFixed(4)
      );
      setSoldAmount(
        parseFloat(
          ethers.utils.formatUnits(
            ethers.BigNumber.from(_soldAmount.hex).toString(),
            18
          )
        ).toFixed()
      );
      setPriceETH(
        parseFloat(
          ethers.utils.formatUnits(
            ethers.BigNumber.from(_priceEth.hex).toString(),
            18
          )
        )
      );
      setSaleActive(_saleActive);
      setStartTime(ethers.BigNumber.from(_startTime.hex).toNumber() * 1000);

      let _totalStaked = result.results["Stake"].callsReturnContext[0].success ? result.results["Stake"].callsReturnContext[0].returnValues[0] : 0;
      let _rewardTokenPerBlock = result.results["Stake"].callsReturnContext[1].success ? result.results["Stake"].callsReturnContext[1].returnValues[0] : 0;
      let _endBlock = result.results["Stake"].callsReturnContext[2].success ? result.results["Stake"].callsReturnContext[2].returnValues[0] : 0;
      setTotalStaked(parseFloat(ethers.utils.formatUnits(ethers.BigNumber.from(_totalStaked).toString(),18)).toFixed());
      setRewardTokenPerBlock(parseFloat(ethers.utils.formatUnits(ethers.BigNumber.from(_rewardTokenPerBlock).toString(),18)).toFixed())
      setEndBlockNumber(ethers.BigNumber.from(_endBlock).toString());
    } catch (err) {
      console.error(err);
    }
  };

  const loadCurrentBalance = async () => {
    try {
      presaleContract
        .getTierPrice(stage + 1)
        .then((res) => {
          setNextStagePrice(
            parseFloat(
              ethers.utils.formatUnits(
                ethers.BigNumber.from(res._hex).toString(),
                6
              )
            ).toFixed(4)
          );
        })
        .catch((err) => {
          console.error(err);
        });
      const current_res = await presaleContract.getTierSupply(stage);
      const previous_res =
        stage > 0 ? await presaleContract.getTierSupply(stage - 1) : 0;
      setStageSupply(
        ethers.utils.formatEther(current_res) -
        ethers.utils.formatEther(previous_res)
        );
      // get duration of current tier
      const current_tier_end_time = await presaleContract.getCurrentDuration();
      setTierEndTime(ethers.BigNumber.from(current_tier_end_time).toNumber() * 1000);

      // total sold cost = total cost in the previous tier + total cost in the current tier
      // console.log(totalSoldCost, (price * (Number(ethers.utils.formatEther(current_res) - ethers.utils.formatEther(previous_res)) - soldAmount)));
      let sum = parseFloat(
        Number(totalSoldCost) +
          Number(
            price *
              (Number(
                ethers.utils.formatEther(current_res) -
                  ethers.utils.formatEther(previous_res)
              ) -
                soldAmount)
          )
      ).toFixed(2);
      setTotalRaised(sum);

      const tx = await bnbPriceFeedContract.latestAnswer();
      setBnbPriceFeed(ethers.utils.formatUnits(tx, 8))
      setPriceBNB(Number(ethers.utils.formatUnits(tx, 8)) > 0 ? parseFloat(price / Number(ethers.utils.formatUnits(tx, 8))) : 0);
    } catch (e) {
      console.error(e);
    }
  };

  const loadUserBalance = async () => {
    // address && presaleContract.getUserBalance(address).then(res => {
    //   setUserBalance(parseFloat(ethers.utils.formatUnits(ethers.BigNumber.from(res._hex).toString(), 6)).toFixed(4));
    // }).catch(err=>{
    //   console.log(err)
    // })

    if (!address) return;

    const calls = [];

    DEFAULT_PROVIDER.getBalance(address).then((balance) => {
      const balanceInEth = ethers.utils.formatEther(balance);
      setUserETHBalance(balanceInEth);
    });

    BSC_DEFAUKT_PROVIDER.getBalance(address).then((balance) => {
      const balanceInBNB = ethers.utils.formatUnits(balance, 18);
      setUserBNBBalance(balanceInBNB);
    });
    try {
      const busdContract = new ethers.Contract(
        process.env.NEXT_PUBLIC_BSC_BUSD,
        abiERC20,
        signer
      );
      var tx = await busdContract.balanceOf(address);
      setUserBUSDCBalance(ethers.utils.formatUnits(tx, 6));
      tx = await busdContract.allowance(address, process.env.NEXT_PUBLIC_BSC_PAYMENT);
      setUserBUSDIsApproved(ethers.BigNumber.from(tx).gt(0))
    } catch(e) {
      console.error(address, "busdContract.balanceOf error: ", e)
    }

    calls.push({
      reference: "CODO",
      contractAddress: process.env.NEXT_PUBLIC_CODO_PRESALE ?? "",
      abi: abiCodoPresale,
      calls: [
        {
          reference: "getUserBalance",
          methodName: "getUserBalance",
          methodParameters: [address],
        },
      ],
    });
    calls.push({
      reference: "USDC",
      contractAddress: process.env.NEXT_PUBLIC_USDC ?? "",
      abi: abiERC20,
      calls: [
        {
          reference: "allowance",
          methodName: "allowance",
          methodParameters: [
            address,
            process.env.NEXT_PUBLIC_CODO_PRESALE ?? "",
          ],
        },
        {
          reference: "balanceOf",
          methodName: "balanceOf",
          methodParameters: [address],
        },
        { reference: "decimals", methodName: "decimals", methodParameters: [] },
      ],
    });
    calls.push({
      reference: "Stake",
      contractAddress: process.env.NEXT_PUBLIC_STAKING,
      abi: abiStaking,
      calls: [
        {
          reference: "poolStaker",
          methodName: "poolStakers",
          methodParameters: [address],
        },
        {
          reference: "claimStart",
          methodName: "claimStart",
          methodParameters: [],
        },
        {
          reference: "lockedTime",
          methodName: "lockedTime",
          methodParameters: [],
        },
        {
          reference: "harvestLock",
          methodName: "harvestLock",
          methodParameters: [],
        }
      ]
    });

    try {
      const result = await multicall.call(calls);
      if (!result) {
        console.error("!Operating failed");
        return;
      }
      const _getUserBalance = result.results["CODO"].callsReturnContext[0].success
        ? result.results["CODO"].callsReturnContext[0].returnValues[0]
        : 0;
      const _allowance = result.results["USDC"].callsReturnContext[0].success
        ? result.results["USDC"].callsReturnContext[0].returnValues[0]
        : 0;
      const _balanceOf = result.results["USDC"].callsReturnContext[1].success
        ? result.results["USDC"].callsReturnContext[1].returnValues[0]
        : 0;
      const _decimals = result.results["USDC"].callsReturnContext[2].success
        ? result.results["USDC"].callsReturnContext[2].returnValues[0]
        : 0;
      const _userStakedBalance = result.results["Stake"].callsReturnContext[0].success
        ? result.results["Stake"].callsReturnContext[0].returnValues[0]
        : 0;
      const _userStakedTime = result.results["Stake"].callsReturnContext[0].success
        ? result.results["Stake"].callsReturnContext[0].returnValues[1]
        : 0;
      const _claimStart = result.results["Stake"].callsReturnContext[1].success
        ? result.results["Stake"].callsReturnContext[1].returnValues[0]
        : 0;
      const _lockedTime = result.results["Stake"].callsReturnContext[2].success
        ? result.results["Stake"].callsReturnContext[2].returnValues[0]
        : 0;
      const _harvestLock = result.results["Stake"].callsReturnContext[3].success
        ? result.results["Stake"].callsReturnContext[3].returnValues[0]
        : 0;
      setUserUSDCIsApproved(ethers.BigNumber.from(_allowance).gt(0));
      setUserUSDCBalance(ethers.utils.formatUnits(_balanceOf, _decimals));
      setUserBalance(parseFloat(ethers.utils.formatUnits(ethers.BigNumber.from(_getUserBalance).toString(),18)).toFixed());
      setUserStakedTokenBalance(parseFloat(ethers.utils.formatUnits(ethers.BigNumber.from(_userStakedBalance).toString(),18)).toFixed())
      setUserStakedTime(ethers.BigNumber.from(_userStakedTime).toNumber() * 1000);
      setClaimStart(ethers.BigNumber.from(_claimStart).toNumber() * 1000);
      setLockedTime(ethers.BigNumber.from(_lockedTime).toNumber() * 1000);
      setHarvestLock(_harvestLock)
    } catch (err) {
      console.error(err);
    }
  };

  const approveUSDT = async () => {
    try {
      if (!signer) return false;
      setLoading(true);
      const usdt = new ethers.Contract(
        process.env.NEXT_PUBLIC_USDC,
        abiERC20,
        signer
      );
      const tx = await usdt.approve(
        process.env.NEXT_PUBLIC_CODO_PRESALE,
        ApproveAmount
      );
      await tx.wait();
      setUserUSDCIsApproved(true);
      setLoading(false);
      return true;
    } catch (e) {
      console.error(e);
      setLoading(false);
      return false;
    }
  };

  const approveBUSD = async () => {
    try {
      if (!signer) return false;
      setLoading(true);
      const busdContract = new ethers.Contract(
        process.env.NEXT_PUBLIC_BSC_BUSD,
        abiERC20,
        signer
      );
      const tx = await busdContract.approve(
        process.env.NEXT_PUBLIC_BSC_PAYMENT,
        ApproveAmount
      );
      await tx.wait();
      setUserBUSDIsApproved(true);
      setLoading(false);
      return true;
    } catch (e) {
      console.error(e);
      setLoading(false);
      return false;
    }
  }

  const buyTokenWithUSDT = async (amount) => {
    try {
      if (!signer) return false;
      setLoading(true);
      const presale = new ethers.Contract(
        process.env.NEXT_PUBLIC_CODO_PRESALE,
        abiCodoPresale,
        signer
      );
      const tx = await presale.buyWithUSDT(ethers.utils.parseEther(Number(amount).toString()));
      await tx.wait();
      await loadBalance();
      await loadUserBalance();
      setLoading(false);
      return true;
    } catch (e) {
      console.error(e);
      setLoading(false);
      return false;
    }
  };

  const buyTokenWithETH = async (tokenAmount, ethAmount) => {
    try {
      if (!signer) return false;
      setLoading(true);
      const presale = new ethers.Contract(
        process.env.NEXT_PUBLIC_CODO_PRESALE,
        abiCodoPresale,
        signer
      );
      const tx = await presale.buyWithEth(ethers.utils.parseEther(Number(tokenAmount.toString()).toString()), {value: ethers.utils.parseEther(ethAmount.toString())});
      await tx.wait();
      await loadBalance();
      await loadUserBalance();
      setLoading(false);
      return true;
    } catch (e) {
      console.error(e);
      setLoading(false);
      return false;
    }
  }

  const buyTokenWithBNB = async (amount) => {
    try {
      if (!signer) return false;
      setLoading(true);
      const binancePayment = new ethers.Contract(
        process.env.NEXT_PUBLIC_BSC_PAYMENT,
        abiBinancePayment,
        signer
      );
      const tx = await binancePayment.receiveBNB({value: ethers.utils.parseEther(amount)});
      await tx.wait();
      setLoading(false);
      return true;
    } catch (e) {
      console.error(e);
      setLoading(false);
      return false;
    }
  }

  const buyTokenWithBUSD = async (amount) => {
    try {
      if (!signer) return false;
      setLoading(true);
      const binancePayment = new ethers.Contract(
        process.env.NEXT_PUBLIC_BSC_PAYMENT,
        abiBinancePayment,
        signer
      );
      const tx = await binancePayment.receiveBUSD(ethers.utils.parseUnits(amount.toString(), 6));
      await tx.wait();
      setLoading(false);
      return true;
    } catch (e) {
      console.error(e);
      setLoading(false);
      return false;
    }
  }

  const stakingToken = async (amount) => {
    try {
      if (!signer) return false;
      setLoading(true);
      const presale = new ethers.Contract(
        process.env.NEXT_PUBLIC_CODO_PRESALE,
        abiCodoPresale,
        signer
      );
      const tx = await presale.stakeToken(ethers.utils.parseEther(Number(amount).toString()));
      await tx.wait();
      setLoading(false);
      return true;
    } catch(e) {
      console.error(e);
      setLoading(false);
      return false;
    }
  }

  const harvestRewards = async () => {
    try {
      if (!signer) return false;
      setLoading(true);
      const stakingContract = new ethers.Contract(process.env.NEXT_PUBLIC_STAKING, abiStaking, signer);
      const tx = await stakingContract.harvestRewards();
      await tx.wait();
      setLoading(false);
      return true;
    } catch(e) {
      console.error(e);
      setLoading(false);
      return false;
    }
  }

  const withdrawStakedToken = async () => {
    try {
      if (!signer) return false;
      setLoading(true);
      const stakingContract = new ethers.Contract(process.env.NEXT_PUBLIC_STAKING, abiStaking, signer);
      const tx = await stakingContract.withdraw();
      await tx.wait();
      setLoading(false);
      return true;
    } catch(e) {
      console.error(e);
      setLoading(false);
      return false;
    }
  }

  const switchNetwork = useCallback(async (_chainId) => {
    try {
      const { chainId } = await DEFAULT_PROVIDER.getNetwork();
      if(Number(chainId) !== _chainId) {
        setWalletConnected(false);
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: _chainId }], // chainId must be in hexadecimal numbers
        });
        setWalletConnected(false);
        toast.success(`Switched to ${SUPPORTED_CHAIN_NAME[_chainId]}`);
        return;
      }
    } catch (ex) {
      console.error("error", ex);
    }
  }, []);

  const isWithdrawable = () => {
    var nowTime= new Date().getTime();
    return nowTime >= userStakedTime + lockedTime && nowTime >= claimStart + lockedTime;
  }

  const isHarvestable = () => {
    return !harvestLock;
  }

  const addCommas = (num) => {
    var str = num.toString().split(".");
    if (str[0].length >= 5) {
      str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, "$1,");
    }
    if (str[1] && str[1].length >= 5) {
      str[1] = str[1].replace(/(\d{3})/g, "$1 ");
    }
    return str.join(".");
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      web3ModalRef.current = new Web3Modal({
        network: "goerli",
        theme: "light",
        cacheProvider: false,
        providerOptions,
        // disableInjectedProvider: false,
      });

    }
    if (walletConnected) connectWallet();
    
    loadBalance();
  }, []);

  useEffect(() => {
    loadCurrentBalance();
  }, [stage]);

  useEffect(() => {
    loadUserBalance();
  }, [address]);

  useEffect(() => {
    setTotalSoldPercent(
      totalRaised > 0
        ? parseFloat((100 * totalSoldCost) / totalRaised).toFixed(2)
        : 0
    );
  }, [totalSoldCost, totalRaised]);

  useEffect(() => {
    setSoldCost(price * soldAmount);
    setSoldPercent(
      stageSupply > 0
        ? parseFloat((100 * soldAmount) / stageSupply).toFixed(2)
        : 0
    );
  }, [soldAmount, stageSupply]);

  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts) => {
        setAddress(accounts[0]);
        setWalletConnected(false);
        // dispatch({
        //   type: "SET_ADDRESS",
        //   address: accounts[0],
        // } as Web3Action);
      };

      // https://docs.ethers.io/v5/concepts/best-practices/#best-practices--network-changes
      const handleChainChanged = (_hexChainId) => {
        // console.log("switched to chain...", _hexChainId, Number(NETWORK_ID), Number(_hexChainId));        
        if(!isSupportedChain(_hexChainId)) {
          toast.info(
            `Please switch your metamask network to "${SUPPORTED_CHAIN_NAME['0x5']}"`
          );
          setWalletConnected(false)
        }
        if (typeof window !== "undefined") {
          // window.location.reload();
          return;
        } else {
          console.log("window is undefined");
        }
      };

      const handleDisconnect = (error) => {
        // eslint-disable-next-line no-console
        // disconnectWallet();
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
        console.log(newNetwork, oldNetwork)
        // When a Provider makes its initial connection, it emits a "network"
        // event with a null oldNetwork along with the newNetwork. So, if the
        // oldNetwork exists, it represents a changing network
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
    loading,
    walletConnected,
    address,
    signer,
    stage,
    price,
    priceETH,
    priceBNB,
    stageSupply,
    totalSupply,
    totalPresaleAmount,
    totalSoldAmount,
    totalSoldCost,
    totalRaised,
    totalSoldPercent,
    totalStaked,
    soldAmount,
    soldCost,
    soldPercent,
    nextStagePrice,
    userBalance,
    userStakedTokenBalance,
    userUSDCIsApproved,
    setUserUSDCIsApproved,
    userBUSDIsApproved,
    setUserBUSDCBalance,
    userUSDCBalance,
    userETHBalance,
    userBNBBalance,
    saleActive,
    startTime,
    tierEndTime,
    rewardTokenPerBlock,
    endBlockNumber,
    connectWallet,
    disConnectWallet,
    addCommas,
    loadBalance,
    loadCurrentBalance,
    loadUserBalance,
    approveUSDT,
    approveBUSD,
    buyTokenWithUSDT,
    buyTokenWithETH,
    buyTokenWithBNB,
    buyTokenWithBUSD,
    stakingToken,
    switchNetwork,
    harvestRewards,
    withdrawStakedToken,
    isWithdrawable,
    isHarvestable
  };
}

export const eth = createContainer(useEth);
