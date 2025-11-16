import { useState } from "react";
import { Plus, Building2 } from "lucide-react";
import useDepartments from "../../../hooks/useDepartments";
import DepartmentRow from "./DepartmentRow";
import DepartmentModal from "./DepartmentModal";

const DepartmentList = () => {
  const { loading, departmets, onAdd, onUpdate, onDelete } = useDepartments();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); 
  const [editingDepartment, setEditingDepartment] = useState(null);


  const handleAddClick = () => {
    setModalMode("add");
    setEditingDepartment(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (department) => {
    setModalMode("edit");
    setEditingDepartment(department);
    setIsModalOpen(true);
  };

  const handleModalSubmit = async (dto) => {
    if (modalMode === "add") {
      return await onAdd(dto);
    } else {
      return await onUpdate(dto, editingDepartment.id);
    }
  };

  const handleDelete = async (id) => {
    await onDelete(id);
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto py-6 px-4">
        <div className="text-center py-12 bg-white border border-gray-200 shadow-sm rounded-lg">
          <p className="text-gray-600 text-lg">Loading departments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-6 px-4">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">All Departments</h2>
          <p className="text-gray-600 mt-1">
            Manage your organization&apos;s departments
          </p>
        </div>
        <button
          onClick={handleAddClick}
          className="flex items-center gap-2 px-4 py-2 bg-[#E4742B] text-white rounded-lg hover:bg-[#B8860B] transition-colors font-medium shadow-sm"
        >
          <Plus className="w-5 h-5" />
          Add Department
        </button>
      </div>

      {/* Table header */}
      <div className="bg-white border border-gray-200 shadow-sm mb-3 rounded-lg overflow-hidden">
        <div className="grid grid-cols-[2fr,3fr,40px] gap-6 px-6 py-4 bg-[#FFFBF7] border-b border-gray-100">
          <div className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
            Department Name
          </div>
          <div className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
            Department ID
          </div>
          <div />
        </div>
      </div>

      {/* Rows */}
      <div className="space-y-2">
        {departmets.map((department) => (
          <DepartmentRow
            key={department.id}
            department={department}
            onEdit={handleEditClick}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {/* Empty state */}
      {departmets.length === 0 && (
        <div className="text-center py-12 bg-white border border-gray-200 shadow-sm rounded-lg mt-6">
          <div className="p-4 bg-[#FFFBF7] rounded-full w-fit mx-auto mb-4">
            <Building2 className="w-16 h-16 text-[#B8860B]" />
          </div>
          <p className="text-gray-600 text-lg mb-2">No departments yet</p>
          <p className="text-gray-500 text-sm">
            Get started by adding your first department
          </p>
        </div>
      )}

      {/* THIS is the modal */}
      <DepartmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        department={editingDepartment}
        mode={modalMode}
      />
    </div>
  );
};

export default DepartmentList;
