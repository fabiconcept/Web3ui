import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { bigNum, formatNum, formatNumFreeStyle, greetUser } from '../../../useful/useful_tool';
import { address } from '../../../util/constants/fundContract';
import GridCard from '../components/GridCard';
import { contextData } from '../dashboard';

const HomePage = () => {
  const { contract, coinBase, storeDataUser } = useContext(contextData);

  const [offr, setOffr] = useState(null);
  const [usdc, setUsdc] = useState(null);

  const [coinInfo, setCoinInfo] = useState(null);

  useEffect(()=>{
    if (contract !== null) {
      setOffr(contract[0]);
      setUsdc(contract[1]);
    }
  }, [contract]);


  const fetchOFFR = async () => {
    if (coinBase) {
      const name = await offr.name();
      const symbol = await offr.symbol();
      const max = await offr.totalSupply();
      const decimals = await offr.decimals();
      const totalSupply = await offr.totalSupply();
      const claimableAmountOf = await offr.claimableAmountOf(coinBase?.coinbase);
      let cap =  await offr.cap();
      cap = bigNum(cap);
      const beneficiaryAddress = await offr._beneficiary();
      const contractAdress = address;
      const myBalance = await offr.balanceOf(coinBase?.coinbase);

      const data = {
        name,
        symbol,
        max,
        decimals,
        totalSupply,
        beneficiaryAddress,
        contractAdress,
        myBalance,
        cap,
        claimableAmountOf
      }

      setCoinInfo(data);
    }
  }

  useEffect(()=>{
    if (offr !== null) {
      fetchOFFR();
    }
  }, [offr, coinBase]); 



  return (
    <div className="dash_section">
      <div className="greet">
        <div className="title">{greetUser()} {storeDataUser ? ((storeDataUser?.name).split(" ")[0]) : "@firstname"}, </div>
        <div className="tags">
          <div className="img">
            {storeDataUser && <img src={storeDataUser?.dp} alt="" />}
            {!storeDataUser && <img src="https://gineousc.sirv.com/Images/Infinite.gif" alt="" />}
          </div>
        </div>
      </div>
      <label>Your Wallet</label>
      <div className="grid-system">
        <GridCard ico={"https://gineousc.sirv.com/Images/icons/money%20(2).svg"} detail={`${ coinInfo ? formatNumFreeStyle((coinInfo?.myBalance / (10**18))) : '' } (${coinInfo && coinInfo.symbol})`} p={`Your ${coinInfo?.symbol} Balance`} />
        <GridCard ico={"https://gineousc.sirv.com/Images/icons/money (3).svg"} detail={`${coinInfo ? formatNum((coinInfo?.claimableAmountOf)): ''} ${coinInfo ? "USDC": ''}`} p={"Claimable Dividend"} />
        <GridCard ico={"https://gineousc.sirv.com/Images/icons/wallet.svg"} detail={coinBase ? coinBase?.coinbase : "0x00"} p={"Wallet Address"} />
      </div>
      <label>Coin Informations</label>
      <div className="grid-system">
        <GridCard ico={"https://gineousc.sirv.com/Images/icons/info.svg"} detail={coinInfo?.name} p={"token name"} />
        <GridCard ico={"https://gineousc.sirv.com/Images/icons/coin.svg"} detail={coinInfo?.symbol} p={"token symbol"} />
        <GridCard ico={"https://gineousc.sirv.com/Images/icons/analytics.svg"} detail={coinInfo ? formatNumFreeStyle(coinInfo?.cap) : ''} p={"Max Supply"} />
        <GridCard ico={"https://gineousc.sirv.com/Images/icons/dc.png"} detail={coinInfo?.decimals} p={"decimals"} />
        <GridCard ico={"https://gineousc.sirv.com/Images/icons/coins.svg"} detail={`${coinInfo ? (coinInfo?.totalSupply > 0 ? ((formatNumFreeStyle((coinInfo?.totalSupply)))) : '0'): ''} (${coinInfo ? coinInfo.symbol : ''})`} p={"total supply"} />
        <GridCard ico={"https://gineousc.sirv.com/Images/icons/tr.png"} detail={`1 USDC`} p={`price`} />
        <GridCard ico={"https://gineousc.sirv.com/Images/icons/wallet.svg"} detail={"0x35CB38345f6f6FEfFa5AF922e5B5c08928F29c91"} p={"beneficiary address"} />
        <GridCard ico={"https://gineousc.sirv.com/Images/icons/wallet.svg"} detail={coinInfo?.contractAdress} p={"Contract Address"} />
      </div>
    </div>
  )
}

export default HomePage;