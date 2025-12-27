const Navbar = ({title, userName}) => {

    return (
        <header className="bg-white border-b border-gray-200 shadow-sm px-8 py-4">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">{title}</h1>

                <div className="flex items-center gap-3">
                <span className="text-gray-700 font-medium">
                    Hello, {userName}
                </span>
                <div className="w-9 h-9 rounded-full bg-[#FFFBF7] border border-[#E4742B]/30 flex items-center justify-center text-[#E4742B] font-semibold">
                    {userName?.charAt(0).toUpperCase() ?? "U"}
                </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;