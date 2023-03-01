import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import axios from "axios";
import GoogleLogo from './google.png';

function LoginEmail(){
    const navigate = useNavigate();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    
    let email = watch("email");
    
    function changeToLoginPassword(){
        axios.post(
            "https://gmail-backend-production.up.railway.app/v1/user/login-email",
            {
              email
            },
          ).then((response) => {
              if(response.data.code === 200){
                navigate("/login-password",{ state: { email } });
              }
          })
    }

    function changeToRegister(){
        navigate("/register");
    }

    return (
        <div className="w-full h-full flex justify-center">
            <div className="xl:w-2/6 md:w-3/6 h-5/6 border-2 mt-2 border-gray-200 flex justify-center items-center">
                <div className="w-5/6 h-5/6  flex-col flex items-center">
                    <img src={GoogleLogo} alt='Google Logo'  className='w-24'/>
                    <p className='text-2xl'>Login</p>
                    <p className='mt-2'>Lanjutkan ke Gmail</p>
                    <div className="w-full h-5/6 mt-8">
                        <form onSubmit={handleSubmit(changeToLoginPassword)}>
                            <input 
                                type="text"
                                placeholder="Email"
                                className="w-full h-10 border border-gray-300 pl-4"
                                {...register("email",{ required: true })}
                            />
                            <p className='text-red-400 text-sm'>{errors.email && <span>*This field is required</span>}</p>
                            <button className='text-blue-800 text-sm mt-1'>Lupa Email ?</button> 
                            <p className='mt-10 text-sm'>Bukan komputer Anda? Gunakan mode Tamu untuk login secara pribadi. Pelajari lebih lanjut</p>
                            <div className="w-full h-12 flex justify-between mt-8">
                                <button
                                    onClick={changeToRegister}
                                    className="hover:bg-gray-200 w-2/6 h-8 rounded-sm text-blue-800 font-bold"
                                >
                                    Buat Akun
                                </button>
                                <button
                                    type='submit'
                                    className="hover:bg-blue-900 bg-blue-500 w-2/6 h-8 rounded-sm text-white font-bold"
                                >
                                    Selanjutnya
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginEmail