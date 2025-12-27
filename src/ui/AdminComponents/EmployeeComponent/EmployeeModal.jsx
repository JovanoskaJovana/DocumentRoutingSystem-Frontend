import { useState, useEffect } from "react";
import { X } from "lucide-react";
import useDepartments from "../../../hooks/useDepartments";

const roles = ["EMPLOYEE", "ADMIN"];
const employeeTypes = ["REGULAR", "SIGNATORY"];

const EmployeeModal = ({ isOpen, onClose, onSubmit, employee, mode }) => {
  const { departmets: departments = [], loading: departmentsLoading } =
    useDepartments();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // required only on add
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [role, setRole] = useState("EMPLOYEE");
  const [employeeType, setEmployeeType] = useState("REGULAR");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen) {
      if (mode === "edit" && employee) {
        setEmail(employee.email || "");
        setPassword(""); 
        setFirstName(employee.firstName || "");
        setLastName(employee.lastName || "");
        setDepartmentId(
          String(
            employee.departmentId ??
              employee.department?.id ??
              ""
          )
        );
        setRole(employee.role || "EMPLOYEE");
        setEmployeeType(employee.employeeType || "REGULAR");
      } else {
        setEmail("");
        setPassword("");
        setFirstName("");
        setLastName("");
        setDepartmentId("");
        setRole("EMPLOYEE");
        setEmployeeType("REGULAR");
      }
      setError(null);
    }
  }, [isOpen, mode, employee]);

    const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!email.trim()) {
        setError("Email is required");
        return;
    }
    if (!firstName.trim()) {
        setError("First name is required");
        return;
    }
    if (!lastName.trim()) {
        setError("Last name is required");
        return;
    }
    // Require department only when adding a new employee
    if (mode === "add" && !departmentId) {
        setError("Department is required");
        return;
    }
    // Require password only when adding a new employee
    if (mode === "add" && !password.trim()) {
        setError("Password is required for new employees");
        return;
    }

    const dto = {
        email: email.trim(),
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        role,
        employeeType,
    };

    // Only send departmentId if selected
    if (departmentId) {
        dto.departmentId = Number(departmentId);
    }

    // Only send password if user typed something
    if (password.trim()) {
        dto.password = password.trim();
    }

    try {
        setSubmitting(true);
        await onSubmit(dto);      // PUT or POST fired here
        onClose();
    } catch (error) {
        setError(error?.response?.data?.message || "An error occurred");
    } finally {
        setSubmitting(false);
    }
    };


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            {mode === "add" ? "Add New Employee" : "Edit Employee"}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
            aria-label="Close"
            type="button"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="mb-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email *
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B8860B] focus:border-transparent"
              disabled={submitting}
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {mode === "add" ? "Password *" : "Password (optional)"}
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B8860B] focus:border-transparent"
              placeholder={mode === "edit" ? "Leave blank to keep current" : ""}
              disabled={submitting}
            />
          </div>

          {/* First & Last name */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                First Name *
              </label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B8860B] focus:border-transparent"
                disabled={submitting}
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Last Name *
              </label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B8860B] focus:border-transparent"
                disabled={submitting}
              />
            </div>
          </div>

          {/* Department */}
          <div>
            <label
              htmlFor="department"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Department *
            </label>
            <select
              id="department"
              value={departmentId}
              onChange={(e) => setDepartmentId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B8860B] focus:border-transparent bg-white"
              disabled={submitting || departmentsLoading}
            >
              <option value="">
                {departmentsLoading ? "Loading..." : "Select department"}
              </option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name} (ID: {dept.id})
                </option>
              ))}
            </select>
          </div>

          {/* Role & Employee Type */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Role *
              </label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B8860B] focus:border-transparent bg-white"
                disabled={submitting}
              >
                {roles.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="employeeType"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Employee Type *
              </label>
              <select
                id="employeeType"
                value={employeeType}
                onChange={(e) => setEmployeeType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B8860B] focus:border-transparent bg-white"
                disabled={submitting}
              >
                {employeeTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 px-4 py-2 bg-[#E4742B] text-white rounded-lg hover:bg-[#B8860B] transition-colors font-medium disabled:opacity-50"
            >
              {submitting
                ? "Saving..."
                : mode === "add"
                ? "Add Employee"
                : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeModal;
