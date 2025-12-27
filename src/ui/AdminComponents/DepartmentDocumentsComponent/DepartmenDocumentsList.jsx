import { useState } from "react";
import { FileText, ChevronDown } from "lucide-react";
import useDepartments from "../../../hooks/useDepartments";
import { useDepartmentDocuments } from "../../../hooks/useDepartmentDocuments";
import DepartmentDocumentRow from "./DepartmentDocumentRow";


const DepartmentDocumentsList = () => {

  const { departmets, loading: deptLoading, error: deptError } = useDepartments();

  const {
    state,
    refresh: fetchDocumentsByDepartment,
  } = useDepartmentDocuments();

  const { data, loading: docsLoading, error } = state;

  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const departments = departmets || [];


  const documents = Array.isArray(data)
    ? data
    : Array.isArray(data?.content)
    ? data.content
    : [];

  const handleSelectDepartment = async (departmentId, departmentName) => {
    setSelectedDepartment(departmentName);
    setIsDropdownOpen(false);

    if (departmentId) {
      await fetchDocumentsByDepartment(departmentId);
    }
  };

  const selectedDept = departments.find((d) => d.name === selectedDepartment);

  if (deptLoading) {
    return (
      <div className="max-w-6xl mx-auto py-6 px-4">
        <div className="text-center py-12 bg-white border border-gray-200 shadow-sm rounded-lg">
          <p className="text-gray-600 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-6 px-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Department Documents</h2>
        <p className="text-gray-600 mt-1">
          Select a department to view its documents
        </p>
        {selectedDept && (
          <p className="text-gray-500 mt-1 text-sm">
            Showing documents routed to{" "}
            <span className="font-medium text-gray-800">
              {selectedDept.name}
            </span>
            .
          </p>
        )}
      </div>

      {deptError && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {deptError}
        </div>
      )}

      {/* Department dropdown */}
      <div className="mb-6 relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-full md:w-96 bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-[#B8860B]/30 transition-all duration-200 rounded-lg px-4 py-3 flex items-center justify-between group"
        >
          <span
            className={`${
              selectedDepartment ? "text-gray-900 font-medium" : "text-gray-500"
            }`}
          >
            {selectedDepartment || "Select a department"}
          </span>
          <ChevronDown
            className={`w-5 h-5 text-gray-600 group-hover:text-[#B8860B] transition-transform duration-200 ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isDropdownOpen && (
          <div className="absolute z-10 w-full md:w-96 mt-2 bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden">
            {departments.length === 0 ? (
              <div className="px-4 py-3 text-gray-500 text-sm">
                No departments available
              </div>
            ) : (
              departments.map((dept) => (
                <button
                  key={dept.id}
                  onClick={() =>
                    handleSelectDepartment(dept.id, dept.name)
                  }
                  type="button"
                  className="group w-full px-4 py-3 text-left hover:bg-[#FFFBF7] transition-colors border-b border-gray-100 last:border-b-0"
                >
                  <div className="font-medium text-gray-900 group-hover:text-[#B8860B]">
                    {dept.name}
                  </div>
                  {dept.description && (
                    <div className="text-xs text-gray-600 mt-1">
                      {dept.description}
                    </div>
                  )}
                </button>
              ))
            )}
          </div>
        )}
      </div>

      {/* Error from documents fetch */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {error?.response?.data?.message ||
            error.message ||
            "Failed to load documents."}
        </div>
      )}

      {selectedDepartment && (
        <>
          {/* Table header */}
          <div className="bg-white border border-gray-200 shadow-sm mb-3 rounded-lg overflow-hidden">
            <div className="grid grid-cols-[2fr,1.5fr,1fr,1fr,1.2fr,40px] gap-6 px-6 py-4 bg-[#FFFBF7] border-b border-gray-100">
              <div className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
                Title
              </div>
              <div className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
                Uploaded By
              </div>
              <div className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
                Status
              </div>
              <div className="font-semibold text-gray-700 text-sm uppercase tracking-wide text-center">
                Version
              </div>
              <div className="font-semibold text-gray-700 text-sm uppercase tracking-wide text-center">
                Date
              </div>
              <div></div>
            </div>
          </div>

          {/* Rows / states */}
          {docsLoading ? (
            <div className="text-center py-12 bg-white border border-gray-200 shadow-sm rounded-lg">
              <p className="text-gray-600 text-lg">Loading documents...</p>
            </div>
          ) : documents.length === 0 ? (
            <div className="text-center py-12 bg-white border border-gray-200 shadow-sm rounded-lg mt-6">
              <div className="p-4 bg-[#FFFBF7] rounded-full w-fit mx-auto mb-4">
                <FileText className="w-16 h-16 text-[#B8860B]" />
              </div>
              <p className="text-gray-600 text-lg">
                No documents for this department
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {documents.map((doc) => (
                <DepartmentDocumentRow
                  key={doc.documentId ?? doc.id}
                  document={doc}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DepartmentDocumentsList;
