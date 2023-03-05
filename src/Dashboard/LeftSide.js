import React, { useState , useEffect} from 'react';
import DropdownMenu from './Dropdown';
import Modal from './Modal';

import GmailLogo from './img/gmail.png'
import MenuLogo from './img/menu.png'
import PencilLogo from './img/pencil.png'
import InboxLogo from './img/inbox.png'
import DrafLogo from './img/draf.png'
import StarLogo from './img/star.png'
import SendLogo from './img/send.png'

function LeftSide({
    changeSetMessageFieldStatus,
    getEmail,
    statusSend,
    statusText,
    data,
    changeStatusLeftMenu
}){
    const [typeButton, setTypeButton] = useState("inbox");
    const [isMenuOpen, setIsMenuOpen] = useState(true);

    const toggleMenu = () => {
        changeStatusLeftMenu(!isMenuOpen)
        setIsMenuOpen(!isMenuOpen);
      };
    return(
        <div className={`md:w-1/5 ${isMenuOpen === true && 'w-full '} h-full flex justify-center bg-gray-50`}>
                <div className="w-4/5 h-4/6 mt-3">
                    <div className="w-full h-12 flex items-center">
                        <button 
                            onClick={toggleMenu}
                            className='w-12 h-12 mr-2 hover:bg-gray-200 rounded-full flex justify-center items-center'
                        >
                            <img className='w-6' src={MenuLogo} alt='Menu'/>
                        </button>
                        <img  className="w-8 mr-2 hidden md:block" src={GmailLogo} alt='Gmail'/>
                        <p className='hidden md:block text-xl'>Gmail</p>
                    </div>
                   
                        <>
                            <button 
                                className='w-4/6 h-14 mb-4 mt-8 bg-blue-200 hover:shadow-2xl rounded-xl flex justify-center items-center'
                                onClick={() => {
                                    changeSetMessageFieldStatus(true)
                                }}
                            >
                                <img 
                                    className={'w-6'}
                                    alt='Pencil' src={PencilLogo}
                                />
                                <p className='ml-3 hidden md:block'>Tulis</p>
                            </button>

                            <button 
                                className={`w-full h-8 rounded-xl hover:bg-gray-200 flex mt-1 ${typeButton === "inbox" && 'bg-blue-100 font-bold hover:bg-blue-100'}`}
                                onClick={ () => {
                                    setTypeButton("inbox")
                                    getEmail("to",null)
                                } }
                            >
                                <div className={`${isMenuOpen === true ? 'w-1/6 ' :  ' w-full'} md:w-1/6 h-full flex items-center justify-center`}>
                                    <img className="w-4" src={InboxLogo}/>
                                </div>
                                <div className={`w-4/6 h-full flex items-center ${isMenuOpen === true ? 'block ' :  ' hidden'}`}>
                                    <p className="ml-3">Inbox</p>
                                </div>
                            </button> 

                            <button 
                                className={`w-full h-8 rounded-xl hover:bg-gray-200 flex mt-1 ${typeButton === "star" && 'bg-blue-100 font-bold hover:bg-blue-100'}`}
                                onClick={ () => {
                                    setTypeButton("star")
                                    getEmail("STAR",null)
                                } }
                            >
                                <div className={`${isMenuOpen === true ? 'w-1/6 ' :  ' w-full'} md:w-1/6 h-full flex items-center justify-center`}>
                                    <img className="w-4" src={StarLogo}/>
                                </div>
                                <div className={`w-4/6 h-full flex items-center ${isMenuOpen === true ? 'block ' :  ' hidden'}`}>
                                    <p className="ml-3">Star</p>
                                </div>
                            </button> 

                            <button
                                className={`w-full h-8 rounded-xl hover:bg-gray-200 flex mt-1 ${typeButton === "send" && 'bg-blue-100 font-bold hover:bg-blue-100'}`}
                                onClick={ () => {
                                    setTypeButton("send")
                                    getEmail("from",null)
                                } }
                            >
                                <div className={`${isMenuOpen === true ? 'w-1/6 ' :  ' w-full'} md:w-1/6 h-full flex items-center justify-center`}>
                                    <img className="w-4" src={SendLogo}/>
                                </div>
                                <div className={`w-4/6 h-full flex items-center ${isMenuOpen === true ? 'block ' :  ' hidden'}`}>
                                    <p className="ml-3">Send</p>
                                </div>
                            </button> 

                            <button 
                                className={`w-full h-8 rounded-xl hover:bg-gray-200 flex mt-1 ${typeButton === "draf" && 'bg-blue-100 font-bold hover:bg-blue-100'}`}
                                onClick={ () => {
                                    setTypeButton("draf")
                                } }
                            >
                                <div className={`${isMenuOpen === true ? 'w-1/6 ' :  ' w-full'} md:w-1/6 h-full flex items-center justify-center`}>
                                    <img className="w-4" src={DrafLogo}/>
                                </div>
                                <div className={`w-4/6 h-full flex items-center ${isMenuOpen === true ? 'block ' :  ' hidden'}`}>
                                    <p className="ml-3">Draf</p>
                                </div>
                            </button> 

                            <DropdownMenu userId={data.id} getEmail={getEmail}/>
                            <Modal data={data}/>
                        </>
                
                    

                    
                    {
                        statusSend === true 
                            ? <div className='rounded-xl bg-gray-400 mb-10 ml-10 absolute bottom-0 left-0 h-10 w-40 flex justify-center items-center'>
                                    <p className='text-white text-sm'>{statusText}</p>
                              </div> 
                            : null
                    }
                    

                   
                </div>
            </div>
    );
}

export default LeftSide