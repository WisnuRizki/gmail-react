import DOMPurify from 'dompurify';

import ArrayLeftLogo from './img/keyboard-arrow-left.png'
import StarLogo from './img/star.png'
import Menu3Logo from './img/menu3.png'
import SettingLogo from './img/setting.png'

function DetailEmail({changeStatusIsDetailOpen,detailEmail}){
    const htmlString = detailEmail.message;
    const sanitizedHtml = DOMPurify.sanitize(htmlString);

    function convertDate(date){
        const dateObj = new Date(date);
        const day = dateObj.getDate().toString().padStart(2, '0');
        const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
        const year = dateObj.getFullYear().toString();

        const formattedDate = `${day}/${month}/${year}`;
        return formattedDate
    }
    return (
        <div className="w-full h-full bg-gray-50 flex ">
           <div className='w-11/12 h-full bg-white rounded-t-xl mt-4 overflow-scroll'>
                <div className="w-full h-12 bg-white">
                    <button 
                        className='w-10 h-10 hover:bg-gray-200 rounded-full flex justify-center items-center mt-2 ml-1'
                        onClick={(event) => changeStatusIsDetailOpen(false,event)}
                    >
                        <img  src={ArrayLeftLogo} className='w-6'/>
                    </button>
                </div>
                <div className='w-full h-14 flex'>
                    <div className='w-1/12 h-full'></div>
                    <div className='w-full h-full flex items-center'>
                        <p className='font-italic text-xl'>{detailEmail.subject}</p>
                    </div>
                </div>
                <div className='w-full h-full flex mt-6'>
                    <div className='w-1/12 h-full flex justify-center'>
                        <button className='w-12 h-12 rounded-full flex justify-center items-center bg-blue-200'>
                            <p className='font-bold text-xl uppercase'>{detailEmail.from[0]}</p>
                        </button>
                    </div>
                    <div className='w-full h-full'>
                        <div className='w-full h-16 flex'>
                            <div className='w-4/6 h-12'>
                                <p>wisnu@gmail.com</p>
                                <p className='text-gray-500 text-xs'>kepada</p>
                            </div>
                            <div className='w-2/6 h-12 flex justify-end items-center'>
                                <p className='text-gray-500 text-xs'>{convertDate(detailEmail.created_at)}</p>
                                <button className='ml-2 w-10 h-10 hover:bg-gray-400 rounded-full flex justify-center items-center'>
                                    <img src={StarLogo} className='w-4'/>
                                </button>
                                <button className='ml-2 w-10 h-10 hover:bg-gray-400 rounded-full flex justify-center items-center'>
                                    <img src={SettingLogo} className='w-4'/>
                                </button>
                                <button className='ml-2 w-10 h-10 hover:bg-gray-400 rounded-full flex justify-center items-center'>
                                    <img src={Menu3Logo} className='w-4'/>
                                </button>
                            </div>      

                        </div>

                        <div className='w-3/5 h-full'>
                        <p dangerouslySetInnerHTML={{ __html: sanitizedHtml }}></p>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
}

export default DetailEmail