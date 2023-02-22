import React, { useContext, useEffect } from 'react';
import { buyData } from '../../card/BuyToken';

const Confirmation = () => {
  const { buyTokenData, setPending } = useContext(buyData);

  useEffect(() => {
    if (!buyTokenData.failed) {
      setPending(true)
      setTimeout(() => {
        setPending(false)
      }, 12000);
    }
  }, [buyTokenData])
  return (
    <div className="div-carosel c">
      {!buyTokenData.failed && <div className="con">
        <img className='ld' src="https://gineousc.sirv.com/Images/icons/animated/1103-confetti-outline.gif" alt="" />
        <div className="title">Transaction Complete</div>
        <div className="p">You've sucessfully purchased {buyTokenData.amountOFFR} {buyTokenData.symbol} Tokens, your new balance is {buyTokenData.amountOFFR + (parseInt(buyTokenData.bal))} {buyTokenData.symbol}</div>
      </div>}
      {buyTokenData.failed && <div className="con">
        <img className='ld' src="https://gineousc.sirv.com/Images/icons/animated/1140-error-outline.gif" alt="" />
        <div className="title">An Error Occured</div>
        <div className="p">This maybe as a result of an Insuffient Balance or User rejected the transaction.</div>
      </div>}

    </div>
  )
}

export default Confirmation;