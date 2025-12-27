import { useState, useEffect } from "react";
import { X } from "lucide-react";

const DepartmentModal = ({ isOpen, onClose, onSubmit, department, mode }) => {
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen) {
      if (mode === "edit" && department) {
        setName(department.name || "");
      } else {
        setName("");
      }
      setError(null);
    }
  }, [isOpen, mode, department]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("Department name is required");
      return;
    }

    const dto = { name: name.trim() };

    try {
      setSubmitting(true);
      await onSubmit(dto);
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
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            {mode === "add" ? "Add New Department" : "Edit Department"}
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
        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Department Name *
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B8860B] focus:border-transparent"
                placeholder="e.g., Human Resources"
                disabled={submitting}
              />
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
                ? "Add Department"
                : "Save Changes"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default DepartmentModal;
