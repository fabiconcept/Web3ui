import { ethers, Signer } from 'ethers';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { formatNumFreeStyle, moneyFormat, toEth } from '../../../../../useful/useful_tool';
import { ABI2, address2 } from '../../../../../util/constants/daiContract';
import { ABI, address } from '../../../../../util/constants/fundContract';
import { contextData } from '../../../dashboard';
import { walletData } from '../../../pages/Wallet';
import { buyData } from '../../card/BuyToken';

const PendingTransaction = () => {
    const { setTransactions, transactions } = useContext(walletData);
    const { buyArr, setCurrentPage, setPending, setBuyTokenData, setApproved, currency} = useContext(buyData);
    const { contract, coinBase } = useContext(contextData);

    const [offr, setOffr] = useState(null);
    const [coin, setCoin] = useState("");
    const [coinInfo, setCoinInfo] = useState(null);
    const [bought, setBought] = useState(false);

    useEffect(() => {
        if (contract !== null) {
            setOffr(contract[0]);
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
            const beneficiaryAddress = await offr._beneficiary();
            const myBalance = await offr.balanceOf(coinBase?.coinbase);

            const data = {
                name,
                symbol,
                max,
                decimals,
                totalSupply,
                beneficiaryAddress,
                myBalance,
                claimableAmountOf
            }

            setCoinInfo(data);
        }
    }

    useEffect(() => {
        if (offr !== null) {
            fetchOFFR();
        }
    }, [offr, coinBase]);

    useEffect(() => {
        switch (buyArr.crypto) {
            case 1:
                setCoin("USDC")
                break;
            case 2:
                setCoin("ETH")
                break;

            default:
                break;
        }
    }, [buyArr]);
    
    // function weiNum(e){
    //     return `${(e / (10**-18))}`
    // }

    const handleBuyTokenEth = async () => {
        setPending(true);

        try {
            // Request the user's Ethereum accounts
            const provider = new ethers.providers.Web3Provider(window.ethereum);

            const amountETH = (buyArr.offrValue);
            const amountOFFR = buyArr.amount;

            // Get the contract signer
            const signer = await provider.getSigner();

            // Connect to the contract
            const OffrToken = new ethers.Contract(address, ABI, signer);
            const saleOpen = await OffrToken.tokensale_open();
            const value = toEth(amountETH.toFixed(8));

            const transactionDate = new Date();
            const timeStamp = transactionDate.toISOString().slice(0, 19).replace('T', ' ');
            let fromAddress;

            await (signer.getAddress()).then((result)=>{
                fromAddress = result;
            })

            if (saleOpen) {
                const BuyTokensTransaction = await OffrToken.buyTokens(toEth(amountOFFR), { 
                    from: signer.getAddress(), 
                    value: value,
                });
                console.log(BuyTokensTransaction);
                setTransactions([...transactions, {hash: BuyTokensTransaction.hash, type: 1, amount: toEth(amountOFFR), from: fromAddress, timestamp: timeStamp}]);
                
                const bal = formatNumFreeStyle(coinInfo.myBalance/(10**18));
                const symbol = coinInfo.symbol
                setBuyTokenData({amountOFFR, bal, symbol, failed: false});
                setBought(true);
            }

            // Reset the usdc state to 0
 
        } catch (error) {
            const msg = error.reason;
            const type = 2;
            // Handle any errors that may occur when calling the buyTokens method
            console.log(error.message);
            setBought(true);
            setBuyTokenData({failed: true});
        }
        setPending(false);
    }
    
    const handleBuyTokenUSDC = async () => {
        setPending(true);

        try {
            // Request the user's Ethereum accounts
            const provider = new ethers.providers.Web3Provider(window.ethereum);

            const amountUSDC = (buyArr.offrValue);
            const amountOFFR = buyArr.amount;

            // Get the contract signer
            const signer = await provider.getSigner();

            // Connect to the contract
            const OffrToken = new ethers.Contract(address, ABI, signer);
            const USDCInstance =  new ethers.Contract(address2, ABI2, signer);
            const saleOpen = await OffrToken.tokensale_open();
            const value = toEth(amountUSDC.toFixed(8));

            const transactionDate = new Date();
            const timeStamp = transactionDate.toISOString().slice(0, 19).replace('T', ' ');
            let fromAddress;

            await (signer.getAddress()).then((result)=>{
                fromAddress = result;
            });

            if (saleOpen) {
                const approveUSDC_Transaction = await USDCInstance.approve(address, (amountOFFR * (10**6)));
                const BuyTokensTransaction = await OffrToken.buyTokens(amountOFFR, {
                    from: fromAddress
                });


                console.log({approveUSDC_Transaction, BuyTokensTransaction});

                // setTransactions([...transactions, {hash: BuyTokensTransaction.hash, type: 1, amount: toEth(amountOFFR), from: fromAddress, timestamp: timeStamp}]);
                
                // const bal = formatNumFreeStyle(coinInfo.myBalance/(10**18));
                // const symbol = coinInfo.symbol
                // setBuyTokenData({amountOFFR, bal, symbol, failed: false});
                // setBought(true);
            }

            // Reset the usdc state to 0
 
        } catch (error) {
            const msg = error.reason;
            const type = 2;
            // Handle any errors that may occur when calling the buyTokens method
            console.log(error.message);
            setBought(true);
            setBuyTokenData({failed: true});
        }
        setPending(false);
    }

    useEffect(()=>{
        if(bought){
            setApproved(bought);
            setCurrentPage(3);
        }
    }, [bought]);



    const approveHandler = async () => {
        if (coinInfo && coinBase) {
            if (currency === 2) {
                handleBuyTokenEth();
            }else if (currency === 1){
                handleBuyTokenUSDC();
            }
        }
    }

    return (
        <div className="div-carosel">
            <div className="c">
                <div className="title">~{moneyFormat(buyArr.amount, 1)} ({coinInfo && coinInfo.symbol})</div>
                <div className="p">≈ {moneyFormat(buyArr.offrValue, 1)} {coin}</div>
            </div>
            <section className='inf'>
                <div>
                    <span>Asset:</span>
                    <span>{coinInfo ? `${coinInfo.name} (${coinInfo.symbol})` : <img src="https://gineousc.sirv.com/Images/sp.gif" alt="" />}</span>
                </div>
                <div>
                    <span>From:</span>
                    <span>Token Sale</span>
                </div>
                <div>
                    <span>To:</span>
                    <span>{coinBase ? coinBase.coinbase : <img src="https://gineousc.sirv.com/Images/sp.gif" alt="" />}</span>
                </div>
            </section>

            <div className="r">
                <div onClick={approveHandler} className="btnx">Approve</div>
                <div onClick={() => setCurrentPage(1)} className="btnx c">Cancel</div>
            </div>
        </div>
    )
}

export default PendingTransaction;