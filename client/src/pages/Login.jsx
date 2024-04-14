import React,{useEffect,useState} from 'react';
import Navbar from "../component/Navbar"
import { useNavigate } from "react-router-dom";
import LoginService from '../services/LoginService';


const Login = () => {

    const loginstate = {
        email: '',
        password: ''
      };

    const [isError, setIsError] = useState(false);

    const [formData, setFormData] = useState(loginstate);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const navigate = useNavigate();

    const handleSubmit = async(e) => {
    e.preventDefault();

    try {
        const response = await LoginService(formData);
        console.log(response);

        // Move to dashboard with UUID in cookie
        if(response === true){
        navigate('/dashboard');
        }
      
      } catch (error) {
        console.error(error);
        // Handle error appropriately
    }

    console.log('Email:', formData.email);
    console.log('Password:', formData.password);
  };

    //

    useEffect(() => {
        document.documentElement.style.overflow = 'hidden';
        return () => {
            document.documentElement.style.overflow = 'unset';
        };
    }, []);
    return (
        <div className="h-screen w-screen overflow-hidden">
            <Navbar/>
            <div className='flex justify-center items-center h-full w-full bg-gradient-to-b from-black to-gray-800 p-6 pb-4'>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-white">Username {formData.email ? '' : <span className="text-red-600">*</span>}</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-md text-lg" // Adjusted className for bigger size
                            required={true}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-white">Password {formData.password ? '' : <span className="text-red-600">*</span>}</label>
                        <input
                            type="password"
                            id="password"
                            name='password'
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-md text-lg" // Adjusted className for bigger size
                            required={true}
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-[#00df9a]">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
    
}

export default Login;
