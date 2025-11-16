import { Building2, Users, Inbox, LogOut } from "lucide-react";
import {useNavigate, useLocation} from "react-router";
import logo from "../../../assets/Logo.png";
import authRepository from "../../../repository/authRepository";
import useAuth from "../../../hooks/useAuth";

    const navItems = [
        { icon: Users, label: "employees", path: "/employees" },
        { icon: Building2, label: "department documents", path: "/department" },
        { icon: Building2, label: "departments", path: "/departments" },
        { icon: Inbox, label: "inbox", path: "/" }

    ];

const Sidebar = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const {logout} = useAuth();

    const isActive = (path) => location.pathname === path;

    const handleLogout = () => {
        authRepository
            .logout()
            .then(() => {
                logout();
                navigate("/login");
            })
            .catch((error) => console.log(error)); 
    }

    return (
        <aside className="w-[270px] bg-white border-r border-gray-200 flex flex-col h-screen shadow-sm">
            {/* Logo / brand */}
            <div className="p-8 border-b border-gray-200">
                <div className="flex items-center justify-center h-20 bg-[#FFFBF7] rounded-lg shadow-sm">
                <span className="text-2xl font-bold text-[#B8860B]">
                    <img src={logo} alt="App Logo" >
                    </img>
                </span>
                </div>
            </div>

            {/* Nav list */}
            <nav className="flex-1 px-4 py-6">
                <div className="space-y-2">
                {navItems.map((item) => {
                    const active = isActive(item.path);

                    return (
                        <button
                            key={item.path}
                            onClick={() => navigate(item.path)}
                            className={[
                            "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-150 text-left border",
                            active
                                ? "bg-[#FFFBF7] text-[#E4742B] font-medium border-[#B8860B]/30 shadow-sm"
                                : "text-gray-700 border-transparent hover:bg-[#FFFBF7] hover:text-[#B8860B] hover:border-[#B8860B]/30"
                            ].join(" ")}
                        >
                            <item.icon className="w-5 h-5" />
                            <span className="text-sm capitalize">{item.label}</span>
                        </button>
                    );
                })}
                </div>
            </nav>

            {/* Bottom action */}
            <div className="p-4 border-t border-gray-200">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-[#FFFBF7] hover:text-[#B8860B] transition-colors duration-150 border border-gray-200 hover:border-[#B8860B]/30 text-left"
                >
                    <LogOut className="w-5 h-5" />
                    <span className="text-sm">Log out</span>
                </button>
            </div>
        </aside>
    );



};

export default Sidebar;