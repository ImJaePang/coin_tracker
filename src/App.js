import {useState, useEffect} from "react";


function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [usd, setUsd] = useState(0);
  const [exchange, setExchange] = useState(0);

  function onchangeUsd(usd) {
    setUsd(usd.target.value);
    const conis = document.querySelector("#conis");
    const targetCoin = conis.options[conis.selectedIndex];
    const targetPrice = targetCoin.getAttribute("price");
    setExchange(usd.target.value /targetPrice);
  }

  function onChangeCoins(){
    const conis = document.querySelector("#conis");
    const targetCoin = conis.options[conis.selectedIndex];
    const targetPrice = targetCoin.getAttribute("price");
    setExchange(usd/targetPrice);
  }

  useEffect(()=>{
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>The coins! ({loading ? null : coins.length}) </h1>
      <div>
        $ <input onChange={onchangeUsd} type="text" value={usd}/> usd
        <div>
          <h3> exchange :  {exchange} 개 구입 가능</h3>
        </div>
      </div>

      {
      loading ?
        <h3> loading... </h3>
        : <select id="conis" onChange={onChangeCoins}>
            {coins.map((coin) => 
              <option key={coin.id} name={coin.name} price={coin.quotes.USD.price}>
                {coin.name} ({coin.symbol}) : ${coin.quotes.USD.price} USD
              </option>)
            }
          </select>
      }
    </div>
  );
}

export default App;
