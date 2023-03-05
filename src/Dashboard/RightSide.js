import React, { useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import axios from "axios";
import DetailEmail from './DetailEmail'

import MenuLogo from './img/menu.png'
import DeleteLogo from './img/delete.png'
import InboxLogo from './img/inbox.png'
import StarLogo from './img/star.png'
import StarYellowLogo from './img/starYellow.png'
import DrafLogo from './img/draf.png'
import SearchLogo from  './img/search.png'
import QuestionLogo from './img/question.png'
import Menu3Logo from './img/menu3.png'
import SettingLogo from './img/setting.png'
import RefreshLogo from './img/refresh.png'
import MenuStraightLogo from './img/menu_straight.png'
import ArrayLeftLogo from './img/keyboard-arrow-left.png'
import ArrayRightLogo from './img/keyboard-arrow-right.png'
import DropdownMenuCategory from './DropdownCategory';

function RightSide({
    allEmail,
    data,
    changeSetMessageFieldStatus,
    messageFieldIsOpen,
    SuccessSendEmail,
    FailedSendEmail,
    updateListEmail,
    
}){
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const [indexDetailEmail,setIndexDetailEmail] = useState();
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [refresh, setRefresh] = useState(false);

    const [isTopMenuOpen, setIsTopMenuOpen] = useState(false);
    const [isTypeButton, setIsTypeButton] = useState("logout");

    const toggleMenuTop = (type) => {
        setIsTopMenuOpen(!isTopMenuOpen);
        setIsTypeButton(type)
    };

    let userID = data.id
    let array = allEmail

    let to = watch("to");
    let subject = watch("subject");
    let message = watch("message");


    function limitToTenWords(str) {
        let words = str.trim().split(/\s+/); // split string into array of words
        if (words.length > 10) {
            words.length = 10; // limit the array to the first 10 words
        }
        words =  words.join(" "); // join the array into a string
        const textWithoutBr = words.replace(/<br\s*\/?>/gi, ' ');
        return textWithoutBr
    }

    function changeStatusIsDetailOpen(status,event){
        event.stopPropagation();
        setIsDetailOpen(status)
    }

    function upup(index){
        let arr = array
        arr.splice(index,1)
        updateListEmail(arr)
        console.log(arr)
    }

    async function handleUpdateStar(event,index,val,id){
        event.stopPropagation();
        allEmail[index].isStar = val
        setRefresh(!refresh)

        const res = await axios.put(`${process.env.REACT_APP_BACKEND_URL}email/update-star/${id}`, { isStar: val });
        if(res.data.code === 200){
            allEmail[index].isStar = val
            setRefresh(!refresh)
        }

    }

    function sendEmail() {
        const formattedMessage = message.replace(/\n/g, '<br />')
        axios.post(
            `${process.env.REACT_APP_BACKEND_URL}email/send-email`,
            {
              from: data.email,
              to,
              subject,
              message: formattedMessage
            },
          ).then((response) => {
              if(response.data.code === 200){
                SuccessSendEmail()
              }else {
                  to = ""
                  subject = ""
                  message = ""
                  FailedSendEmail()
              }
          })
    }

    async function deleteEmail(emailId,event,index){
        event.stopPropagation();
        const res = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}email/delete-email/${emailId}`)
        if(res.data.code === 200){
            console.log("Deleted")
        }
        
        upup(index)
        setRefresh(!refresh)
      }

    


    return(
        <div className="md:w-4/5 w-full h-full overflow-hidden bg-gray-50 overflow-x-auto">
        {/* Menu Top Right */}
        <div className="w-full h-14 flex items-center">
            <div className="md:w-4/6 w-11/12 h-12 mt-3 rounded-xl flex items-center border-gray-200 border-2">
                <button className="w-12 bg-gray-100 h-full flex items-center justify-center">
                    <img src={SearchLogo} className='w-6'/>
                </button>
                <input className="w-full h-full focus:outline-none bg-gray-100" placeholder="Telusuri Email"/>
            </div>
            <div className='md:w-2/6 w:1/12 h-12 mt-3 md:flex md:flex-row md:justify-end md:items-center flex flex-col-reverse  pl-2 '>
                <button className='mr-3 w-10 h-10 hover:bg-gray-200 flex justify-center items-center rounded-full'>
                    <img src={QuestionLogo} className='md:w-6 md:block hidden'/>
                </button>
                <button className='mr-3 w-10 h-10 hover:bg-gray-200 flex justify-center items-center rounded-full'>
                    <img src={SettingLogo} className='md:w-6 md:block hidden'/>
                </button>
                <button className='mr-3 w-10 h-10 hover:bg-gray-200 flex justify-center items-center rounded-full'>
                    <img src={Menu3Logo} className='md:w-6 md:block hidden'/>
                </button>
                <div className='relative'>
                    <button 
                        onClick={() => toggleMenuTop("logout")}
                        className='md:w-9 md:h-9 w-full h-full mr-2 bg-blue-400 rounded-full'>
                        <p className='font-bold text-white uppercase pt-3 pb-3 md:pt-0 md:pb-0 '>{data.email[0]}</p>
                    </button>
                    {isTopMenuOpen && isTypeButton === "logout" && (

                        <div className="absolute right-0 mt-2 py-2 md:w-80 w-80 h-40 bg-white rounded-md shadow-xl z-10">  
                            <div className='w-full h-full flex'>
                                    <div className='w-1/5 h-full flex justify-center'>
                                        <button className='w-full h-16 rounded-full bg-blue-400 flex justify-center items-center'>
                                            <p className='text-xl font-bold text-white uppercase'>{data.email[0]}</p>
                                        </button>
                                    </div>
                                    <div className='w-4/5 h-full ml-1 mt-2'>
                                        <p className='font-bold text-md'>{`${data.first_name} ${data.last_name}`}</p>
                                        <p className='text-gray-400 text-sm mt--1'>{`${data.email}`}</p>
                                        <button
                                            onClick={() => navigate("/")}
                                            className="focus:cursor mt-4 w-3/4 rounded-xl border-black border block px-4 py-2 text-gray-800 hover:bg-gray-100 hover:text-gray-900"
                                        >
                                            <p className='text-md font-bold'>LogOut From Your Account</p>
                                        </button>
                                        
                                    </div>
                            </div>
                        </div>


                        
                    )}
                    
                </div>
            </div>
         </div>
        {/* End Menu Top Right */}

        {/* Content */}
        {
            isDetailOpen === false 
                ? <div className='w-full h-full bg-gray-50 flex '>
                <div className='md:w-11/12 w-full h-full bg-white rounded-t-xl mt-4 relative'>
                    {/* Nav Menu 1 */}
                    <div className='w-full h-12 mt-1 flex justify-between items-center'>
                        <div className='w-1/5 h-10 flex items-center'>
                            <button className='w-10 ml-2 h-10 hover:bg-gray-100 rounded-full flex justify-center items-center'>
                                <img src={RefreshLogo} className='w-4'/>
                            </button>
                            <button className='w-10 ml-2 h-10 hover:bg-gray-100 rounded-full flex justify-center items-center'>
                                <img src={MenuStraightLogo} className='w-4'/>
                            </button>
                        </div>
                        <div className='w-2/5 h-10 flex justify-end items-center'>
                            <button className='w-20 ml-2 h-10 hover:bg-gray-100 rounded-md flex justify-center items-center'>
                               <p className='text-xs text-gray-400'>1-50 from 100</p>
                            </button>

                            <button className='w-10 ml-2 h-10 hover:bg-gray-100 rounded-full flex justify-center items-center'>
                                <img src={ArrayLeftLogo} className='w-4'/>
                            </button>

                            <button className='w-10 ml-2 mr-2 h-10 hover:bg-gray-100 rounded-full flex justify-center items-center'>
                                <img src={ArrayRightLogo} className='w-4'/>
                            </button>
                        </div>
                    </div>
                     {/* End Nav Menu 1 */}

                     {/* Nav Menu 2 */}
                     <div className='w-full h-12 mt-1 flex items-center overflow-x-scroll'>
                        <button className='w-1/4 h-full hover:bg-gray-200 flex items-center '>
                            <img src={InboxLogo} className='w-4 ml-4'/>
                            <p className='ml-4 overflow-hidden'>Utama</p>
                        </button>
                        <button className='w-1/4 h-full hover:bg-gray-200 flex items-center '>
                            <img src={SettingLogo} className='w-4 ml-4'/>
                            <p className='ml-4 overflow-hidden'>Promosi</p>
                        </button>
                        <button className='w-1/4 h-full hover:bg-gray-200 flex items-center '>
                            <img src={DrafLogo} className='w-4 ml-4'/>
                            <p className='ml-4 overflow-hidden'>Sosial</p>
                        </button>
                        <button className='w-1/4 h-full hover:bg-gray-200 flex items-center '>
                            <img src={MenuLogo} className='w-4 ml-4'/>
                            <p className='ml-4 overflow-hidden'>Update</p>
                        </button>
                    </div>
                    {/* End Nav Menu 2 */}

                    {/* Main Menu */}
                    <div className='w-full h-full overflow-scroll'>
                        {
                            
                            allEmail.length > 0 ? allEmail.map((data,index) => 
                                <div 
                                    className='w-full h-16 cursor-pointer bg-gray-50 flex border-gray-200 hover:border-gray-400 border-b-2'
                                    onClick={(event) => {
                                        changeStatusIsDetailOpen(true,event)
                                        setIndexDetailEmail(index)
                                    }
                                    
                                    }
                                >
                                <div className='md:w-2/12 w:3/12 h-full flex justify-center'>
                                    <button className='w-10 h-10 hover:bg-gray-200 rounded-full flex justify-center items-center'>
                                        <img src={SettingLogo} className='w-4'/>
                                    </button>       
                                    <button className='w-10 z-10 h-10 hover:bg-gray-200 rounded-full flex justify-center items-center'>
                                        {
                                            data.isStar === false 
                                                ? <img src={StarLogo} className='w-4' onClick={(event) => handleUpdateStar(event,index,true,data.id)}/>
                                                : <img src={StarYellowLogo} className='w-5'onClick={(event) => handleUpdateStar(event,index,false,data.id)} />
                                                
                                        }
                                    </button>
                                    <button className='w-10 h-10 hover:bg-gray-200 rounded-full flex justify-center items-center'>
                                        <img src={MenuLogo} className='w-4'/>
                                    </button>
                                </div>
                                <div className='md:w-3/12 w-5/12 h-full flex '>
                                    <p className='text-sm mt-2'>{data.from}</p>
                                </div>
                                <div className='hidden md:block w-5/12 h-full flex'>
                                    <p className='text-sm mt-2'>{data.subject} - {limitToTenWords(data.message)}</p>
                                </div>
                                <div className='md:w-2/12 md:w-4/12 h-full flex justify-center'>
                                    <DropdownMenuCategory  emailId={data.id} userID={userID} />
                                    <button 
                                        className='w-10 h-10 ml-2 flex justify-center items-center hover:bg-gray-200 rounded-full'
                                        onClick={(event) => deleteEmail(data.id,event,index)}
                                    >
                                        <img src={DeleteLogo} className='w-4'/>
                                    </button>
                                </div>
                            </div>
                            )
                            : null
                        }
                    </div>  
                    
                    
                     {/* End Main Menu */}
                     {
                         messageFieldIsOpen === false 
                            ? <div></div> 
                            : <div className='z-10 md:w-6/12 w-full h-5/6 border-gray-200 border-2 bg-white rounded-md shadow-2xl absolute bottom-0 right-0'>
                                <div className='w-full h-8 bg-gray-100 flex justify-between items-center'>
                                    <p className='ml-3'>Pesan Baru</p>
                                    <button 
                                        className='mr-4'
                                        onClick={() => {changeSetMessageFieldStatus(false)}}
                                    >
                                        <p className='font-bold tx-xs'>x</p>
                                    </button>
                                </div>  
                                <form 
                                    className='ml-2 w-full h-full'
                                    onSubmit={handleSubmit(sendEmail)}
                                >
                                    <div className='w-full h-8'>
                                        <input
                                            {...register("to",{ required: true })} 
                                            placeholder='Kepada'
                                            className='w-11/12 h-full focus:outline-none pl-2 border-gray-200 border-b-2'
                                            type="text"
                                        />
                                    </div>
                                    <div className='w-full h-8'>
                                        <input 
                                            {...register("subject",{ required: true })}
                                            placeholder='Subjek'
                                            className='w-11/12 h-full focus:outline-none pl-2 border-gray-200 border-b-2'
                                            type="text"
                                        />
                                    </div>
                                    <div className='w-full h-3/4'>
                                        <textarea 
                                            className='pl-2 pt-2 w-11/12 h-4/6 focus:outline-none ' id="w3review" name="w3review" rows="8" cols="50"
                                            {...register("message",{ required: true })}
                                        >
    
                                        </textarea>
                                        <button 
                                            className='h-8 w-3/12 bg-blue-600 rounded-xl'
                                            type='submit'
                                        >
                                            <p className='text-white font-blod'>Send</p>
                                        </button>
                                    </div>
    
                                </form>
                              </div>
                     }
                     

                </div>
                
            </div>
                : <DetailEmail 
                    changeStatusIsDetailOpen = {changeStatusIsDetailOpen}
                    detailEmail = {allEmail[indexDetailEmail]}
                />
        }
        

        {/* End Content */}
    </div>
    );
}

export default RightSide