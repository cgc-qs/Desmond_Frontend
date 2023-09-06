import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import urlContext from '../URLContext'
import axios from 'axios';

export default function HomePage() {

    const [accountInfo, setAccountInfo] = useState();

    const baseURL = React.useContext(urlContext);

    useEffect(() => {

        const timer = window.localStorage.getItem('timer');
        clearInterval(timer);
        const interval = setInterval(() => {
            const accessToken = window.localStorage.getItem('accessToken');

            var config = {
                method: 'get',
                url: `${baseURL}/api/scanner/?brokerName=&accountNumber=`,
                headers: { 'Authorization': accessToken }
            };
            axios(config)
                .then(function (res) {
                    console.log(res.data);

                })
                .catch(function (err) {
                    console.log('error=', err);
                });
        }, 2000);
        localStorage.setItem('timer', interval);
        return () => {
            // console.log('timer=', interval);
            clearInterval(interval);
        }

    });
    return (
        <div style={{ display: "flex", justifyContent: "Space-between" }}>
            <h1 className="main-title2 home-page-title" style={{ marginLeft: 50 }}>Scanner table</h1>
            <div >
                <Link to="/">
                    <button className="primary-button" style={{ marginTop: "2rem" }}>Log out</button>
                </Link>
            </div>
        </div>

    )
}
