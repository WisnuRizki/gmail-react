import { useForm } from "react-hook-form";
import axios from "axios";

import GoogleLogo from './google.png';
import GmailLogo from './gmail.png';
function Register(){
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    let firstName = watch("firstName");
    let lastName = watch("lastName");
    let userName = watch("username");
    let password = watch("password");
    let confirmPassword = watch("confirmPassword");

    function CreateUser(){
        if(password === confirmPassword){
            axios.post(
                "https://gmail-backend-production.up.railway.app/v1/user/register",
                {
                  first_name: firstName,
                  last_name: lastName,
                  email: userName,
                  password,
                },
              ).then(response => console.log(response))
        }
    }

    return (
        <div className="w-full h-full flex justify-center">
            <div className="xl:w-4/6 md:w-3/6 h-full border-2 mt-2 border-gray-200 flex justify-center items-center">
                <div className='w-2/4 h-full flex justify-center overflow-hidden'>
                    <div className='w-4/5 h-full mt-4'>
                        <img src={GoogleLogo} alt='Google Logo'  className='w-20'/>
                        <p className='text-2xl'>Buat Akun Google</p>
                        <p className='mt-2'>Lanjutkan ke Gmail</p>
                        <form 
                            className='w-full h-full mt-10'
                            onSubmit={handleSubmit(CreateUser)}
                        >
                            <div className='w-full flex'>
                                <input 
                                    type="text" 
                                    placeholder='Nama Depan' 
                                    className='placeholder-gray-500 w-2/4 h-8 pl-2 rounded-md border-2 border-gray-200 mr-2 text-gray-600'
                                    {...register("firstName",{ required: true })}
                                />
                                <input 
                                    type="text" 
                                    placeholder='Nama Belakang' 
                                    className='placeholder-gray-500 w-2/4 h-8 pl-2 rounded-md border-2 border-gray-200 mr-2'
                                    {...register("lastName",{ required: true })}
                                />
                            </div>
                            <input
                                type="text" 
                                placeholder='Nama Pengguna' 
                                className='placeholder-gray-500 w-full h-8 pl-2 mt-6 rounded-md border-2 border-gray-200 mr-2'
                                {...register("username",{ required: true })}
                            />
                            <p className='text-sm text-gray-500 ml-2'>Anda dapat menggunakan huruf dan angka</p>
                            <div className='w-full flex mt-6'>
                                <input 
                                    type="password"
                                    placeholder='Sandi' 
                                    className='placeholder-gray-500 w-2/4 h-8 pl-2 rounded-md border-2 border-gray-200 mr-2 '
                                    {...register("password",{ required: true })}
                                />
                                <input 
                                    type="password"
                                    placeholder='Konfirmasi' 
                                    className='placeholder-gray-500 w-2/4 h-8 pl-2 rounded-md border-2 border-gray-200 mr-2'
                                    {...register("confirmPassword",{ required: true })}
                                />
                            </div>
                            <p className='text-sm text-gray-500 ml-2'>Gunakan minimal 8 karakter dengan campuran huruf, angka & simbol</p>
                            <div className="w-full h-12 flex justify-between mt-14">
                                <button
                                    className="hover:bg-gray-200 w-2/6 h-8 rounded-sm text-blue-800 font-bold"
                                >
                                    Login Saja
                                </button>
                                <button
                                    type='submit'
                                    className="hover:bg-blue-900 bg-blue-500 w-2/6 h-8 rounded-sm text-white font-bold"
                                >
                                    Register
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className='w-2/4 h-full flex justify-center items-center'>
                    <div className='w-3/4 h-3/4 flex flex-col justify-center items-center'>
                        <img src={GmailLogo} alt='Google Logo'  className='w-40'/>
                        <p className='text-center mb-10'>Satu akun. Seluruh Google bekerja untuk Anda.</p>
                    </div>
                </div>          
            </div>
        </div>
    );
}

export default Register