import { doc, getDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fireStore } from '../../firebase/sdk';
import { destroySession, disconnectWallet, isSessionSet } from '../../useful/useful_tool';
import getContract from '../../util/getContract';
import getWeb3 from '../../util/getWeb3';
import ChangeProfilePicture from './components/ChangeProfilePicture';
import Mobile_navBar from './components/mobile_navBar';
import NavArea from './components/navArea';
import UserCard from './components/userCard';
import HomePage from './pages/Home';
import Settings from './pages/Settings';
import Transactions from './pages/Transactions';
import Userprofile from './pages/Userprofile';
import Wallet from './pages/Wallet';

export const contextData = React.createContext();

const Dashboard = () => {
  const { id } = useParams()
  const [settingDp, setSettingDp] = useState(false);
  const [storeDataUser, setStoreDataUser] = useState(null);
  const [coinBase, setCoinbase] = useState(null);
  const [contract, setContract] = useState(null);
  const [logOut, setLogOut] = useState(false);

  const connectWallet = async () => {
    const fetchContracts = getContract;
    fetchContracts.then(i => setContract(i));
    const web3Instance = getWeb3;
    await web3Instance.then(i => {
      setCoinbase(i);
    });
  }

  const fetchCredentials = async (e) => {
    const docRef = doc(fireStore, "user_credentials", `${e}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const userInfo = docSnap.data();
      const email = (userInfo.email);
      const name = (userInfo.name);
      const img = (userInfo.profile_picture);
      let gender;
      switch (userInfo.gender) {
        case "female":
          gender = 1;
          break;
        case "non-binary":
          gender = 2;
          break;

        default:
          gender = 0;
          break;
      }
      const data = {
        email: email,
        name: name,
        gender: gender,
        dp: img,
      }

      return data;
    } else {
      return false;
    }

  }

  useEffect(() => {
    if (!isSessionSet()) {
      window.location = "/";
    } else {
      const loginSession = JSON.parse(localStorage.getItem('loginSession'));
      const addr = loginSession.username;
      if (fetchCredentials(addr) !== false) {
        fetchCredentials(addr).then(i=>setStoreDataUser(i))
      }
      connectWallet();
    }
  }, []);

  useEffect(()=>{
    if (!isSessionSet()) {
      window.location = "/";
    } else {
      const loginSession = JSON.parse(localStorage.getItem('loginSession'));
      const addr = loginSession.username;
      if (fetchCredentials(addr) !== false) {
        fetchCredentials(addr).then(i=>setStoreDataUser(i));
      }
    }
  }, [settingDp]);

  useEffect(() => {
    if (logOut) {
      if (window.confirm("Are you sure you want to disconnect?")) {
        destroySession();
        disconnectWallet();
        window.location = "/";
      }else{
        setLogOut(false);
      }
    }
  }, [logOut]);


  return (
    <contextData.Provider value={{ storeDataUser, coinBase, contract, setStoreDataUser, setLogOut }}>
      <div className="dashboard">
        <NavArea />
        <Mobile_navBar />
        {settingDp && <ChangeProfilePicture setSettingDp={setSettingDp} />}
        {id === '' && <HomePage />}
        {id === undefined && <HomePage />}
        {id === "wallet" && <Wallet />}
        {id === "userprofile" && <Userprofile />}
        {id === "transactions" && <Transactions />}
        {id === "settings" && <Settings />}
        <UserCard setSettingDp={setSettingDp} />
      </div>
    </contextData.Provider>
  )
}

export default Dashboard;