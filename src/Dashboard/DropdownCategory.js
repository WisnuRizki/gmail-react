import { useState } from 'react';
import axios from "axios";
import ArrowdDownLogo from './img/arrow-down.png'
import MenuStraightLogo from './img/menu_straight.png'

function DropdownMenuCategory({emailId,userID}) {
  const [isOpen, setIsOpen] = useState(false);
  const [allCategorys, setAllCategorys] = useState([]);

  async function UpdateCategoryEmail(categoryId,event){
    const res = await axios.put(`${process.env.REACT_APP_BACKEND_URL}email/update-category/${emailId}`,
     { categoryId: categoryId });

      event.stopPropagation();
      setIsOpen(!isOpen)

  }

  async function fetchCategory(){
    const filter = {}
    filter[`userId`] = userID
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}category/get-category`,
        { 
            params: filter 
        }).then(response => {
          setAllCategorys(response.data.message)
        });

  }

  console.log(allCategorys)

  function changeStatusIsOpen(event){
    event.stopPropagation();
    setIsOpen(!isOpen)
  }

  return (
    <div className="relative">
        <button 
            className='w-10 h-10 hover:bg-gray-200 rounded-full flex justify-center items-center'
            onClick={(event) =>  {
              fetchCategory()
              changeStatusIsOpen(event)
            }}
        >
            <img src={MenuStraightLogo} className='w-4'/>
        </button>
        
        {isOpen && allCategorys.length > 0 && (
        <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-10">

          {
            allCategorys.map(data => {
              return <a
                      onClick={(event) =>  {
                        UpdateCategoryEmail(data.id,event)
                        changeStatusIsOpen(event)
                      }}
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100 hover:text-gray-900"
                      >
                        {data.name}
                      </a>
            })
          }
        </div>
      )}
    </div>
  );
}

export default DropdownMenuCategory;
