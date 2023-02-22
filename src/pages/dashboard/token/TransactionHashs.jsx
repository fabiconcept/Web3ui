import React, { useContext } from 'react';
import { walletData } from '../pages/Wallet';
import TdTime from './components/transsactions/TdTime';
import Td from './components/transsactions/TdType';

const TransactionHashs = () => {
    const { transactions, loadingData } = useContext(walletData);
    return (
        <div className="div-table">
            {loadingData && <div className="pending">
                <img src="https://gineousc.sirv.com/Images/icons/animated/1490.gif" alt="" />
            </div>}
            <label>Last 10 Transactions</label>
            <table>
                <thead>
                    <tr>
                        <td>Hash</td>
                        <td className='mb'>Sender</td>
                        <td className='mb amt'>Method</td>
                        <td className='amt'>Amount</td>
                        <td className='mb'>Date</td>
                    </tr>
                </thead>
                <tbody>
                    {transactions.length > 0 && transactions.map(transaction => (
                        <tr key={transaction.hash}>
                            <td className='ad'><a href={`https://goerli.etherscan.io/tx/${transaction.hash}`} target="_blank" rel="noopener noreferrer">{transaction.hash}</a></td>
                            <td className='ad mb'>{transaction.from}</td>
                            <Td type={(transaction.type)} />
                            <td className='amt'>{(transaction.amount / (10 ** 18))}</td>
                            <TdTime timestamp={(transaction.timestamp)} />
                        </tr>
                    ))}
                </tbody>
            </table>
            {transactions.length === 0 && <div className="empty">No Transactions...</div>}
        </div>
    )
}

export default TransactionHashs;