import { useState } from "react";
import { Plus, Users } from "lucide-react"; 
import useEmployees from "../../../hooks/useEmployees";
import EmployeeRow from "./EmployeeRow";
import EmployeeModal from "./EmployeeModal";

const EmployeeList = () => {

  const { loading, employees, onAdd, onEdit, onDelete } = useEmployees();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); 
  const [editingEmployee, setEditingEmployee] = useState(null);

  const handleAddClick = () => {
    setModalMode("add");
    setEditingEmployee(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (employee) => {
    setModalMode("edit");
    setEditingEmployee(employee);
    setIsModalOpen(true);
  };

  const handleModalSubmit = async (dto) => {
    if (modalMode === "add") {
      await onAdd(dto);
    } else if (editingEmployee) {
      await onEdit(dto, editingEmployee.employeeId);
    }
  };

  const handleDelete = async (id) => {
    await onDelete(id);
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto py-6 px-4">
        <div className="text-center py-12 bg-white border border-gray-200 shadow-sm rounded-lg">
          <p className="text-gray-600 text-lg">Loading employees...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-6 px-4">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">All Employees</h2>
          <p className="text-gray-600 mt-1">
            Manage your organization&apos;s employees
          </p>
        </div>
        <button
          onClick={handleAddClick}
          className="flex items-center gap-2 px-4 py-2 bg-[#E4742B] text-white rounded-lg hover:bg-[#B8860B] transition-colors font-medium shadow-sm"
        >
          <Plus className="w-5 h-5" />
          Add Employee
        </button>
      </div>

      <div className="bg-white border border-gray-200 shadow-sm mb-3 rounded-lg overflow-hidden">
        <div className="grid grid-cols-[2fr,2fr,2fr,1.5fr,1.5fr,40px] gap-6 px-6 py-4 bg-[#FFFBF7] border-b border-gray-100">
          {/* Employee */}
          <div className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
            Name
          </div>

          {/* E-mail */}
          <div className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
            Email
          </div>

          {/* Department */}
          <div className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
            Department
          </div>

          {/* Role */}
          <div className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
            Role
          </div>

          {/* Employee type */}
          <div className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
            Employee Type
          </div>
          <div />
        </div>
      </div>

      {/* Rows */}
      <div className="space-y-2">
        {employees.map((employee) => (
          <EmployeeRow
            key={employee.employeeId}
            employee={employee}
            onEdit={handleEditClick}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {/* Empty state */}
      {employees.length === 0 && (
        <div className="text-center py-12 bg-white border border-gray-200 shadow-sm rounded-lg mt-6">
          <div className="p-4 bg-[#FFFBF7] rounded-full w-fit mx-auto mb-4">
            <Users className="w-16 h-16 text-[#B8860B]" />
          </div>
          <p className="text-gray-600 text-lg mb-2">No employees yet</p>
          <p className="text-gray-500 text-sm">
            Get started by adding your first employee
          </p>
        </div>
      )}

      {/* Modal */}
      <EmployeeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        employee={editingEmployee}
        mode={modalMode}
      />
    </div>
  );
};

export default EmployeeList;
