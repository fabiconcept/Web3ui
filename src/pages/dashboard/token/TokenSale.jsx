import React, { useContext, useEffect, useState } from 'react';
import { bigNum, formatNum } from '../../../useful/useful_tool';
import { address } from '../../../util/constants/fundContract';
import { contextData } from '../dashboard';
import BuyToken from './card/BuyToken';
import TranferTokens from './card/TranferTokens';
import Clock from './components/BuyToken/clock';

const TokenSale = ({buyRef, transferRef}) => {
    const [buying, setBuying] = useState(false);
    const [transfering, setTransfering] = useState(false);
    const { contract, coinBase } = useContext(contextData);
    const [offr, setOffr] = useState(null);
    const [coinInfo, setCoinInfo] = useState(null);



    useEffect(() => {
        if (contract !== null) {
            setOffr(contract[0]);
        }
    }, [contract]);

    useEffect(() => {
        if (offr !== null) {
            fetchOFFR();
        }
    }, [offr, coinBase, buying, transfering]);

    const fetchOFFR = async () => {
        if (coinBase) {
            const name = await offr.name();
            const symbol = await offr.symbol();
            const max = await offr.totalSupply();
            const decimals = await offr.decimals();
            const totalSupply = await offr.totalSupply();
            let cap = await offr.cap();
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
            }

            setCoinInfo(data);
        }
    }

    return (
        <div className="grid-card tk">
            {buying && <BuyToken setBuying={setBuying} />}
            {transfering && <TranferTokens setTransfering={setTransfering}/>}
            <div className="sec">
                <div className="p">Token Sale</div>
                <div className="s">30 july 2023</div>
            </div>

            <div className="sec st">
                <section>
                    <div className="p">Max Supply</div>
                    <div className="m">{formatNum(coinInfo?.cap)}</div>
                </section>
                <section>
                    <div className="p">Total Supply</div>
                    <div className="m">{formatNum(coinInfo?.totalSupply)}</div>
                </section>
            </div>

            <div className="rng">
                <div className="ld" style={{width: `${(100/(coinInfo?.cap)) * (coinInfo?.totalSupply*1000000)}%`}}></div>
            </div>

            <div className="sec">
                <div className="raised">{formatNum(coinInfo?.myBalance)}</div>
                {coinInfo && <div className="p">My {coinInfo?.symbol} Balance</div>}
            </div>
            <Clock />
            
            <div className="sec bt hide">
                <div className="btnx" ref={buyRef} onClick={()=> setBuying(true)}>Buy Token</div>
            </div>
            <div className="sec bt hide">
                <div className="btnx" ref={transferRef} onClick={()=> setTransfering(true)}>Buy Token</div>
            </div>
        </div>
    )
}

export default TokenSale;