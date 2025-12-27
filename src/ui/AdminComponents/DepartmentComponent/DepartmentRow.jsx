import { useEffect, useRef, useState } from "react";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";

const DepartmentRow = ({ department, onEdit, onDelete }) => {
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

  const menuItems = [
    {
      label: "Edit Department",
      icon: Pencil,
      action: () => {
        onEdit(department);
        setIsMenuOpen(false);
      },
    },
    {
      label: "Delete Department",
      icon: Trash2,
      action: () => {
        if (
          window.confirm(
            `Are you sure you want to delete "${department.name}"?`
          )
        ) {
          onDelete(department.id);
        }
        setIsMenuOpen(false);
      },
      danger: true,
    },
  ];

  return (
    <div className="bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-[#B8860B]/30 transition-all duration-200 rounded-lg overflow-visible group relative">
      <div className="grid grid-cols-[2fr,3fr,40px] gap-6 items-center px-6 py-4">
        <div className="font-medium text-gray-900 group-hover:text-[#B8860B] transition-colors truncate">
          {department.name}
        </div>

        <div className="text-gray-600 truncate">
          {department.id}
        </div>

        <div className="relative w-[40px]" ref={menuRef}>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 hover:bg-[#FFFBF7] rounded transition-colors duration-150 border border-transparent hover:border-[#B8860B]/30"
            aria-label="More options"
            type="button"
          >
            <MoreVertical className="w-5 h-5 text-gray-600 group-hover:text-[#B8860B]" />
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={item.action}
                  type="button"
                  className={`w-full px-4 py-2 text-left hover:bg-[#FFFBF7] transition-colors border-b border-gray-100 last:border-b-0 font-medium first:rounded-t-lg last:rounded-b-lg flex items-center gap-2 ${
                    item.danger ? "text-red-600" : "text-gray-700"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DepartmentRow;
