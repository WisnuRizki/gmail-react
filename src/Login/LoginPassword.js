import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import axios from "axios";

import GoogleLogo from './google.png';
import PersonLogo from './person.png'

function LoginPassword(){
    const navigate = useNavigate();
    const {state} = useLocation();
    const { email } = state; 
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    let password = watch("password");

    function verifyLoginPassword(){
        axios.post(
            `${process.env.REACT_APP_BACKEND_URL}user/login-password`,
            {
              email,
              password
            },
          ).then((response) => {
            if(response.data.code === 200){
                navigate("/dashboard",{ state: { data: response.data.data } });
              }
          })
    }

    return (
        <div className="w-full h-full flex justify-center">
            <div className="xl:w-2/6 md:w-3/6 h-5/6 border-2 mt-2 border-gray-200 flex justify-center items-center">
                <div className="w-5/6 h-5/6  flex-col flex items-center">
                    <img src={GoogleLogo} alt='Google Logo'  className='w-24'/>
                    <p className='text-2xl'>Selamat Datang</p>
                    <button className='flex justify-center w-3/5 h-12 mt-1 rounded-full border-2 border-gray-200'>
                        <img src={PersonLogo} alt='Person logo' className='w-6 mr-1'/>
                        <p className='text-sm text-black font-bold'>{email}</p>
                    </button>
                    <div className="w-full h-5/6 mt-8">
                        <form onSubmit={handleSubmit(verifyLoginPassword)}>
                            <input 
                                type="password"
                                placeholder="Password"
                                className="w-full h-10 border border-gray-300 pl-4"
                                {...register("password",{ required: true })}
                            />
                            <p className='mt-10 text-sm'>Bukan komputer Anda? Gunakan mode Tamu untuk login secara pribadi. Pelajari lebih lanjut</p>
                        <div className="w-full h-12 flex justify-between mt-8">
                            <button
                                className="hover:bg-gray-200 w-2/6 h-8 rounded-sm text-blue-800 font-bold"
                            >
                                Lupa Sandi ?
                            </button>
                            <button
                                type='submit'
                                className="hover:bg-blue-900 bg-blue-500 w-2/6 h-8 rounded-sm text-white font-bold"
                            >
                                Login
                            </button>
                        </div>
                        </form>                      
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPassword