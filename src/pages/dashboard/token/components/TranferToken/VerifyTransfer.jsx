import { ethers } from 'ethers';
import React, { useContext, useEffect, useState } from 'react';
import { formatNum, toEth } from '../../../../../useful/useful_tool';
import { ABI, address } from '../../../../../util/constants/fundContract';
import { walletData } from '../../../pages/Wallet';
import { transferData } from '../../card/TranferTokens';

const VerifyTransfer = () => {
    const { transData, setPending, setStatus, setCurrentPage } = useContext(transferData);
    const { setTransactions, transactions } = useContext(walletData);
    const [bought, setBought] = useState(false);
    const [tempTransactionHolder, setTempTransactionHolder] = useState([]);

    useEffect(()=>{
        setTempTransactionHolder(transactions);
    }, [transactions]);

    useEffect(()=>{
        if (tempTransactionHolder.length > 0) {
            setTransactions(tempTransactionHolder);
        }
    },[tempTransactionHolder]);

    const approveHandler = async () => {
        setPending(true);
        try {
            // Request the user's Ethereum accounts
            const provider = new ethers.providers.Web3Provider(window.ethereum);

            const amountETH = transData.sendAmount;

            // Get the contract signer
            const signer = await provider.getSigner();

            // Connect to the contract
            const OffrToken = new ethers.Contract(address, ABI, signer);
            const value = toEth(amountETH);

            const approved = await OffrToken.approve(signer.getAddress(), value);
            const transactionDate = new Date();
            const timeStamp = transactionDate.toISOString().slice(0, 19).replace('T', ' ');
            let fromAddress;

            await (signer.getAddress()).then((result)=>{
                fromAddress = result;
            })

            const approvedTrasaction = {hash: approved.hash, type: 0, amount: value, from: fromAddress, timestamp:timeStamp };

            if (approved) {
                const to = transData.toAddress;
                const sendTransfer = await OffrToken.transfer(to, value);
                setTransactions([...tempTransactionHolder, approvedTrasaction, {hash: sendTransfer.hash, type: 2, amount: value, from: fromAddress, timestamp: timeStamp }]);
                setBought(true);
                setStatus(true);
                setCurrentPage(4);
            }

            // Reset the usdc state to 0

        } catch (error) {
            const msg = error.reason;
            const type = 2;
            // Handle any errors that may occur when calling the buyTokens method
            console.log(error);
            setCurrentPage(4);
            setBought(true);
            setStatus(false);
        }
        setPending(false);
    };

    useEffect(()=>{
        setStatus(bought);
    }, [bought]);




    return (
        <div className="div-carosel">
            <div className="c">
                <div className="title">Transfer {formatNum(transData.sendAmount)} ({transData.symbol})</div>
                <div className="p">Do you want to send {formatNum(transData.sendAmount)} ({transData.symbol}) to {transData.toAddress}?</div>
            </div>
            <section className='inf'>
                <div>
                    <span>Asset:</span>
                    <span>{transData.symbol ? transData.symbol : <img src="https://gineousc.sirv.com/Images/sp.gif" alt="" />}</span>
                </div>
                <div>
                    <span>From:</span>
                    <span>{transData.fromAddress ? transData.fromAddress : <img src="https://gineousc.sirv.com/Images/sp.gif" alt="" />}</span>
                </div>
                <div>
                    <span>To:</span>
                    <span>{transData.toAddress ? transData.toAddress : <img src="https://gineousc.sirv.com/Images/sp.gif" alt="" />}</span>
                </div>
                <div>
                    <span>Amount:</span>
                    <span>{formatNum(transData.sendAmount)} </span>
                </div>
            </section>

            <div className="r">
                <div className="btnx" onClick={approveHandler}>Approve</div>
                <div className="btnx c">Cancel</div>
            </div>
        </div>
    );
}

export default VerifyTransfer;