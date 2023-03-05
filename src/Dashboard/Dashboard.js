import React, { useState , useEffect} from 'react';
import { useLocation } from 'react-router-dom';

import axios from "axios";
import LeftSide from './LeftSide';
import RightSide from './RightSide';

function Dashboard(){
    const {state} = useLocation();
    const { data } = state; 
    console.log(data.email)

    const [allEmail, setAllEmail] = useState([]);
    const [messageFieldIsOpen, setMessageFieldStatus] = useState(false);
    const [statusSend, setStatusSend] = useState(false);
    const [statusText, setStatusText] = useState("Pesan Terkirim");
    const [statusLeftMenuOpen, setStatusLeftMenuOpen] = useState(false);
    console.log(statusLeftMenuOpen)

    function changeStatusLeftMenu(status){
        setStatusLeftMenuOpen(status)
    }

    async function getEmail(query,categoryId,name){
        const filter = {}
        filter[`query`] = query
        filter[`email`] = data.email
        if(categoryId !== null){
            filter[`category`] = categoryId

        }

        if(name === "ALL EMAIL"){
            filter[`query`] = "ALL EMAIL"
        }
        console.log(filter)
        await axios.get(`${process.env.REACT_APP_BACKEND_URL}email/get-email`,
            { 
                params: filter 
            }).then(response =>  {
                if(response.data.code === 200){
                    setAllEmail(response.data.message)
                }else{  
                    setAllEmail([])
                }
                
            });
    }

    console.log(allEmail)

    function changeSetMessageFieldStatus(status){
        setMessageFieldStatus(status)
    }

    function SuccessSendEmail(){
        setMessageFieldStatus(false)
        setStatusSend(true)
        setInterval(function(){setStatusSend(false)},3000);
    }

    function FailedSendEmail(){
        setStatusText("Gagal Dikirim")
        setMessageFieldStatus(false)
        setStatusSend(true)
        setInterval(function(){setStatusSend(false)},3000);
    }

    function updateListEmail(list){
        setAllEmail(list)
    }

    useEffect(() => {
        async function fetch(){
            const filter = {}
            filter[`query`] = "to"
            filter[`email`] = data.email
            await axios.get(`${process.env.REACT_APP_BACKEND_URL}email/get-email`,
                { 
                    params: filter 
                }).then(response => {
                    if(response.data.code === 200){
                        setAllEmail(response.data.message)
                    }

                });

        }
        fetch()
    },[]);


    return (
        <div className="w-full h-full flex">
            <LeftSide 
                changeSetMessageFieldStatus={changeSetMessageFieldStatus} 
                getEmail={getEmail}
                statusSend={statusSend}
                statusText={statusText}
                data={data}
                changeStatusLeftMenu={changeStatusLeftMenu}
            />

            <RightSide 
                allEmail={allEmail}
                data={data}
                changeSetMessageFieldStatus={changeSetMessageFieldStatus} 
                messageFieldIsOpen={messageFieldIsOpen}
                SuccessSendEmail={SuccessSendEmail}
                FailedSendEmail={FailedSendEmail}
                updateListEmail={updateListEmail}
                statusLeftMenuOpen={statusLeftMenuOpen}
            />
            
        </div>
    );
}

export default Dashboard