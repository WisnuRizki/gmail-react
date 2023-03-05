import { useState } from 'react';
import axios from "axios";
import ArrowdDownLogo from './img/arrow-down.png'

function DropdownMenu({userId,getEmail}) {
  const [allCategory, setAllCategory] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  async function fetchCategory(){
    const filter = {}
    filter[`userId`] = userId
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}category/get-category`,
        { 
            params: filter 
        }).then(response => {
            setAllCategory(response.data.message)
        });

  }


  return (
    <div className="relative">
        <button 
            className={`w-full h-8 rounded-xl hover:bg-gray-200 flex mt-1 `}
            onClick={() => {
              fetchCategory()
              setIsOpen(!isOpen)
            }}
        >
            <div className='md:w-1/6 w-full h-full flex items-center justify-center'>
                <img className="w-5" src={ArrowdDownLogo}/>
            </div>
            <div className='w-4/6 hidden md:block h-full flex items-center'>
                <p className="ml-3">Complete</p>
            </div>
        </button>
      {isOpen && allCategory.length > 0 && (
        <div className="absolute right-0 left-4 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-10">

          {
            allCategory.map(data => {
              return <button
                        onClick={() => getEmail("CATEGORY",data.id,data.name)}
                        className="focus:cursor w-full block px-4 py-2 text-gray-800 hover:bg-gray-100 hover:text-gray-900"
                      >
                        {data.name}
                      </button>
            })
          }
        </div>
      )}
    </div>
  );
}

export default DropdownMenu;
