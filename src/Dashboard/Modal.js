import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function Modal({data}) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [showModal, setShowModal] = React.useState(false);

  let name = watch("name");

  async function sendCategory(){
    const res = await axios.post("https://gmail-backend-production.up.railway.app/v1/category/create-category",{
      user_id: data.id,
      name
    })

    if(res.data.code === 200) {
      setShowModal(false)
    }
}
  return (
    <>
      {/* <button
        className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Open regular modal
      </button> */}
      <button 
            className={`w-full h-10 rounded-xl flex mt-1 `}
        >
            
            <div className='w-4/6 h-full flex items-center'>
                <p className="ml-3">Label</p>
            </div>
            <div className='w-2/6 h-full flex items-center bg-white'>
               <button 
                    className="w-8 h-8 ml-6 bg-gray-400 rounded-full flex items-center justify-center"
                    onClick={() => setShowModal(true)}
                >
                    <p className="text-xl font-bold pb-1">+</p>
               </button>
            </div>
        </button>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-2/5 my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-xl font-semibold">
                    New Label
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-4 flex-auto">
                  <p className="text-slate-500 text-sm leading-relaxed">
                    Please enter a new label name
                  </p>
                  <input 
                    placeholder="name" 
                    className="w-4/5 focus:outline-none border border-black rounded pl-2"
                    {...register("name",{ required: true })}
                  />
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-black hover:bg-gray-200 rounded background-transparent font-bold uppercase px-4 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="hover:bg-blue-900 bg-blue-500 text-white font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none text-white focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={sendCategory}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}