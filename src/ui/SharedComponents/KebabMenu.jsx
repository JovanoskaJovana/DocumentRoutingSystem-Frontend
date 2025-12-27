import { useEffect, useRef, useState } from "react";
import { MoreVertical } from "lucide-react";

const KebabMenu = ({items = [], buttonClassName}) => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

        window.document.addEventListener("mousedown", handleClickOutside);
        return () => {
            window.document.removeEventListener("mousedown", handleClickOutside);
        }; 
    }, []);

    return (
        <div className="relative w-[40px]" ref={menuRef}>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 hover:bg-[#FFFBF7] rounded transition-colors duration-150 border border-transparent hover:border-[#B8860B]/30"
            aria-label="More options"
          >
            <MoreVertical className="w-5 h-5 text-gray-600 group-hover:text-[#B8860B]" />
          </button>

            {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                {items.map((item, index) => (
                    <button
                    key={index}
                    onClick={() => {
                        item.action();
                        setIsMenuOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left text-gray-700 hover:bg-[#FFFBF7] transition-colors border-b border-gray-100 last:border-b-0 font-medium first:rounded-t-lg last:rounded-b-lg"
                    >
                    {item.label}
                    </button>
                ))}
                </div>
            )}
        </div>

    );
};

export default KebabMenu;