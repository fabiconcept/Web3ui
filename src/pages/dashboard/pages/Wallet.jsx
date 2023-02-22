import React, { useContext, useEffect, useRef, useState } from 'react';
import TransactionHashs from '../token/TransactionHashs';
import SendToken from '../token/sendToken';
import TokenSale from '../token/TokenSale';
import { fireStore } from '../../../firebase/sdk';
import { contextData } from '../dashboard';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { greetUser } from '../../../useful/useful_tool';

export const walletData = React.createContext();

const Wallet = () => {
  const { coinBase, storeDataUser } = useContext(contextData);
  const [transactions, setTransactions] = useState([]);
  const [loadingData, setLoadingData] = useState(false);

  const updateTransactionList = async () => {
    if (coinBase) {
      setLoadingData(true);
      const userRef = collection(fireStore, "user_transactions");

      transactions.forEach(async (element) => {
        await setDoc(doc(userRef, `${element.hash}`), element);
      });
      setLoadingData(false);
    }
  }

  const fetchTransactions = async () => {
    setLoadingData(true);
    const collectionSnap = await getDocs(collection(fireStore, "user_transactions"));
    const walletAddress = coinBase.coinbase;
    let tempArray = [];
    let refinedArray = [];

    collectionSnap.forEach(element => {
      tempArray.push(element.data());
    });

    tempArray.forEach(element => {
      if ((element.from).toLowerCase() === (walletAddress).toLowerCase()) {
        refinedArray.push(element);
      }
    });

    refinedArray.sort((a, b) => {
      let timestampA = new Date(a.timestamp);
      let timestampB = new Date(b.timestamp);
      if (timestampA < timestampB) {
        return -1;
      }
      if (timestampA > timestampB) {
        return 1;
      }
      return 0;
    }).reverse();

    const max = 10;
    const total = refinedArray.length - max;

    if (total > 0) {
      refinedArray.splice(-total, total);
    }

    setTransactions(refinedArray);
    setLoadingData(false);
  }

  useEffect(() => {
    if (coinBase) {
      fetchTransactions();
    }
  }, [coinBase]);


  useEffect(() => {
    if (transactions.length > 0) {
      updateTransactionList();
    }
  }, [transactions]);

  const buyRef = useRef();
  const transferRef = useRef();
  return (
    <walletData.Provider value={{ loadingData, transactions, setTransactions }}>
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
        <div className="grid-system">
          <TokenSale buyRef={buyRef} transferRef={transferRef} />
          <SendToken buyRef={buyRef} transferRef={transferRef} />
        </div>
        <TransactionHashs />
      </div>
    </walletData.Provider>
  );
}

export default Wallet;