import { useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import { useEffect, useState } from "react";
import authRepository from "../../../repository/authRepository";
import { User, Lock, Mail } from "lucide-react";
import logo from "../../../assets/Logo.png";

const initialFormData = {
    "email": "",
    "password": ""
};

const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState(initialFormData);

    const {login, isLoggedIn} = useAuth();

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = () => {
        authRepository
            .login(formData.email, formData.password)
            .then((response)  => {
                console.log("The user is succesfully logged in.");
                login(response.token);
                navigate("/home");
            })
            .catch ((error) => console.log(error));
    };

    useEffect(() => {
        if(!isLoggedIn) return;
        navigate('/home')

    }, [isLoggedIn])

    return (
        <div className="min-h-screen bg-cream flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Card Container */}
                <div className="relative">
                    {/* User Avatar Circle */}
                    <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 z-10">
                        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-slate-400 to-slate-500 flex items-center justify-center shadow-2xl border-4 border-cream">
                            <User className="w-16 h-16 text-cream" strokeWidth={1.5} />
                        </div>
                    </div>

                    {/* Login Card */}
                    <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl pt-24 pb-8 px-8 mt-16">
                        {/* Logo */}
                        <div className="text-center mb-0 -mt-4">
                            <img
                                src={logo}
                                alt="App Logo"
                                className="mx-auto w-[13.5rem] h-[13.5rem] object-contain drop-shadow-md -mt-20"
                            /> 
                        </div>

                        <form
                            onSubmit={(e) => {
                                e.preventDefault(); 
                                handleSubmit();
                            }}
                        >
                            <div className="space-y-6 -mt-10">
                                {/* Email Input */}
                                <div className="relative">
                                    <div className="absolute left-0 top-0 bottom-0 w-12 bg-slate-400 rounded-l-lg flex items-center justify-center">
                                        <Mail className="w-5 h-5 text-white" />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email ID"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full pl-16 pr-4 py-3.5 bg-slate-300 text-slate-700 placeholder-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold transition-all"
                                    />
                                </div>

                                {/* Password Input */}
                                <div className="relative">
                                    <div className="absolute left-0 top-0 bottom-0 w-12 bg-slate-400 rounded-l-lg flex items-center justify-center">
                                        <Lock className="w-5 h-5 text-white" />
                                    </div>
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full pl-16 pr-4 py-3.5 bg-slate-300 text-slate-700 placeholder-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold transition-all"
                                    />
                                </div>

                                {/* Login Button */}
                                <button
                                    type="submit"
                                    className="w-full bg-gold hover:bg-amber-500 text-white font-semibold py-3.5 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 uppercase tracking-wider"
                                >
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-11/12 h-4 bg-slate-200/50 rounded-b-3xl blur-sm -z-10"></div>
                    <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-10/12 h-4 bg-slate-200/30 rounded-b-3xl blur-md -z-20"></div>
                </div>
            </div>
        </div>
    );
};

export default Login;