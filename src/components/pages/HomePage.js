import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import urlContext from '../URLContext'
import axios from 'axios';
import InforTable from "../standardTable_NEW";

export default function HomePage() {

    const [accountInfo, setAccountInfo] = useState([]);

    const baseURL = React.useContext(urlContext);
    const [activeTradeID, setActiveTradeID] = useState(0);
    //const [deleteTradeSettingRow, setDeleteTradeSettingRow] = useState(false);
    const [changeData, setChangeData] = useState({});
    const [isModified, setIsModified] = useState(false);
   

    useEffect(() => {
        if (isModified) {
            setIsModified(false);
            const accessToken = window.localStorage.getItem('accessToken');
            var config = {
                method: 'post',
                url: `${baseURL}/api/scanner/update/${activeTradeID}`,
                headers: { 'Authorization': accessToken },
                data: changeData
            };
            axios(config)
                .then(function (res) {
                    console.log(res.data);
                })
                .catch(function (err) {
                    console.log('error=', err);
                });
        }
        // eslint-disable-next-line
    }, [isModified]);

    useEffect(() => {

        const timer = window.localStorage.getItem('timer');
        clearInterval(timer);
        const interval = setInterval(async () => {
            const accessToken = window.localStorage.getItem('accessToken');
            var config = {
                method: 'get',
                url: `${baseURL}/api/scanner/?brokerName=&accountNumber=`,
                headers: { 'Authorization': accessToken }
            };
            var Data;
            // var check = false;
            await axios(config)
                .then(function (res) {
                    //console.log(res.data);
                     Data = res.data;
                    modifyTrueFalse_ToString(Data);
                    setAccountInfo(Data);
                    // check = true;
                })
                .catch(function (err) {
                    console.log('error=', err);
                });
            // if (check)
            //     AlertProcess(Data);

        }, 1000);
        localStorage.setItem('timer', interval);
        return () => {
            // console.log('timer=', interval);
            clearInterval(interval);
        }
    });

    const modifyTrueFalse_ToString = (oldData) => {
        for (let i = 0; i < oldData.length; i++) {
            oldData[i]._activeStatus = oldData[i].activeStatus ? "True" : "False";
            oldData[i]._alertChecked = oldData[i].alertChecked ? "pass" : "wait";
        }
    }

    const headername = [
        { id: "brokerName", numeric: false, label: "brokerName" },
        { id: "accountNumber", numeric: false, label: "accountNumber" },
        { id: "currentEquity", numeric: false, label: "currentEquity" },
        { id: "threshold", numeric: false, label: "threshold" },
        { id: "topUpAmount", numeric: false, label: "topUpAmount" },
        { id: "_activeStatus", numeric: false, label: "activeStatus" },
        { id: "totalSwap", numeric: false, label: "totalSwap" },
        { id: "longSwap", numeric: false, label: "longSwap" },
        { id: "shortSwap", numeric: false, label: "shortSwap" },
        {id:"_alertChecked", numeric:false, label:"alert pass"},
        { id: "edit", numeric: false, label: " " },
       
        //{ id: "delete", numeric: false, label: " " },

    ];

    const signUP = () => {
        localStorage.setItem('accessToken', "");
    }
    return (
        <div>
            <div style={{ display: "flex", justifyContent: "Space-between" }}>
                <h1 className="main-title2 home-page-title" style={{ marginLeft: 50 }}>Scan table</h1>
                <div >
                    <Link to="/">
                        <button className="primary-button" style={{ marginTop: "2rem" }} onClick={signUP}>Log out</button>
                    </Link>
                </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <div style={{
                    border: '2px solid rgba(0, 0, 0, 0.1)', borderRadius: 5, marginLeft: 10, marginTop: 50,
                    width: 'calc(90%)', marginRight: 10, padding: 5
                }}>
                    <InforTable targets={accountInfo} setTargets={setAccountInfo} headername={headername}
                        activeName={activeTradeID} setActiveName={setActiveTradeID} setChangeData={setChangeData}
                        setIsModified={setIsModified} disabledTable={false} />
                </div>
            </div>
        </div>

    )
}
