import GmailLogo from './img/gmail.png'
import MenuLogo from './img/menu.png'
import PencilLogo from './img/pencil.png'
import InboxLogo from './img/inbox.png'
import DrafLogo from './img/draf.png'
import StarLogo from './img/star.png'
import SendLogo from './img/send.png'
import SearchLogo from  './img/search.png'
import QuestionLogo from './img/question.png'
import Menu3Logo from './img/menu3.png'
import SettingLogo from './img/setting.png'
import RefreshLogo from './img/refresh.png'
import MenuStraightLogo from './img/menu_straight.png'
import ArrayLeftLogo from './img/keyboard-arrow-left.png'
import ArrayRightLogo from './img/keyboard-arrow-right.png'

function ListEmail(){
    return(
        <div className='w-full h-16 bg-gray-50 flex border-gray-200 hover:border-gray-400 border-b-2'>
            <div className='w-2/12 h-full flex justify-center'>
                <button className='w-10 h-10 hover:bg-gray-200 rounded-full flex justify-center items-center'>
                    <img src={SettingLogo} className='w-4'/>
                </button>       
                <button className='w-10 h-10 hover:bg-gray-200 rounded-full flex justify-center items-center'>
                    <img src={InboxLogo} className='w-4'/>
                </button>
                <button className='w-10 h-10 hover:bg-gray-200 rounded-full flex justify-center items-center'>
                    <img src={MenuLogo} className='w-4'/>
                </button>
            </div>
            <div className='w-3/12 h-full flex justify-center '>
                <p className='text-sm mt-2'>akunpopo2@gmail.com</p>
            </div>
            <div className='w-7/12 h-full flex justify-center'>
                <p className='text-sm mt-2'>We’re received your application for the position of Backend Engineer</p>
            </div>
        </div>
    );
}

export default ListEmail