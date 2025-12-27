import { ChevronDown } from "lucide-react";
import { useState } from "react";

const DepartmentDocumentRow = ({ document }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const statusColors = {
    pending: { bg: "#FFFBF7", text: "#E4742B" },
    routed: { bg: "#FFFBF7", text: "#E4742B" },
    approved: { bg: "#D1FAE5", text: "#059669" },
    rejected: { bg: "#FEE2E2", text: "#DC2626" },
    default: { bg: "#F3F4F6", text: "#6B7280" },
  };

  const statusKey = (document.documentStatus || "").toLowerCase();
  const status = statusColors[statusKey] || statusColors.default;

  const formattedDate = document.uploadedDateTime
    ? new Date(document.uploadedDateTime).toLocaleString("en-GB", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "N/A";

  return (
    <div className="bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-[#B8860B]/30 transition-all duration-200 rounded-lg overflow-visible group">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left"
      >
        <div className="grid grid-cols-[2fr,1.5fr,1fr,1fr,1.2fr,40px] gap-6 items-center px-6 py-4">
          
          {/* Title */}
          <div className="font-medium text-gray-900 group-hover:text-[#B8860B] transition-colors truncate">
            {document.title}
          </div>

          {/* Uploader */}
          <div className="text-gray-600 truncate text-sm">
            {document.uploadedByEmployee}
          </div>

          <div>
            {/* Status */}
            <span
              className="px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap"
              style={{ backgroundColor: status.bg, color: status.text }}
            >
              {document.documentStatus}
            </span>
          </div>

          {/* Version */}
          <div className="text-gray-600 font-medium text-center">
            {document.currentVersion}
          </div>

          {/* Date */}
          <div className="text-gray-600 text-sm text-center">
            {formattedDate}
          </div>

          <div className="flex justify-center">
            <ChevronDown
              className={`w-5 h-5 text-gray-600 group-hover:text-[#B8860B] transition-transform duration-200 ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </div>
        </div>
      </button>

      {isExpanded && (
        <div className="border-t border-gray-100 px-6 py-4 bg-gray-50">
          <div className="space-y-4">
            {document.routedToEmployees &&
            document.routedToEmployees.length > 0 ? (
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-2">
                  Routed to Employees:
                </h4>
                {/* Routed to employees */}
                <div className="flex flex-wrap gap-2">
                  {document.routedToEmployees.map((name, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                    >
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-600">No employees routed</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartmentDocumentRow;
