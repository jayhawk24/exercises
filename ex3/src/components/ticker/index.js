import React, { useState, useEffect } from 'react';
import './ticker.css';
import logo from './logo.svg';
import useInterval from '../../hooks/setInterval';

const Ticker = () => {
    const [tick, setTick] = useState([]);
    const [percent, setPercent] = useState(0);

    const fetchData = async () => {
        const resp = await fetch(
            'https://cors-anywhere.herokuapp.com/https://api-pub.bitfinex.com/v2/ticker/tBTCUSD'
        );
        const [
            BID,
            BID_SIZE,
            ASK,
            ASK_SIZE,
            DAILY_CHANGE,
            DAILY_CHANGE_RELATIVE,
            LAST_PRICE,
            VOLUME,
            HIGH,
            LOW
        ] = await resp.json();

        setTick([BID, VOLUME, HIGH, LOW, LAST_PRICE]);
        setPercent(parseFloat((tick[0] / tick[4] - 1) * 100).toFixed(3));
    };

    const stopInterval = useInterval(fetchData, 2000);

    const handlePercent = () => {
        return percent < 0 ? 'red' : 'green';
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <React.Fragment>
            <div className="ticker">
                <img src={logo} />
                <div>
                    <h4>BTC/USD</h4>
                    <p>
                        <span> VOL </span>
                        {tick[1]}
                    </p>
                    <p>
                        <span> LOW </span>
                        {tick[3]}
                    </p>
                </div>
                <div>
                    {tick.length ? <h4>{tick[0]} </h4> : <h4>Loading</h4>}
                    <p className={handlePercent()}>{percent}%</p>
                    <p>
                        <span> HIGH</span> {tick[2]}
                    </p>
                </div>
            </div>

            <div className="controls">
                <button onClick={fetchData}>Connect</button>
                <button onClick={stopInterval}>Disconnect</button>
            </div>
        </React.Fragment>
    );
};

export default Ticker;
