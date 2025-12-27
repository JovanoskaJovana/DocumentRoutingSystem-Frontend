import { useNavigate } from "react-router";
import useSignDocumentAction from "../../../hooks/documentHooks/useSignDocumentActions";
import useAuth from "../../../hooks/useAuth";
import DownloadButton from "../../sharedComponents/DownloadButton";
import KebabMenu from "../../sharedComponents/KebabMenu";

const DocumentRow = ({ document }) => {
  const navigate = useNavigate();
  const { onApprove } = useSignDocumentAction();
  const { onReject } = useSignDocumentAction();
  const { user } = useAuth();
  const isAdmin = user?.role === "ADMIN";

  const menuItems = [
    { label: "Edit Document", action: () => navigate(`/documents/${document.documentId}/edit`) },
    { label: "All Actions", action: () => navigate(`/documents/${document.documentId}/actions`) },
    { label: "All Versions", action: () => navigate(`/documents/${document.documentId}/versions`) },
    { label: "All Downloads", action: () => navigate(`/documents/${document.documentId}/downloads`) },
  ];

  const handleApprove = async () => {
    const response = await onApprove(document.documentId);
    if (response) {
      alert("Document Approved");
      window.location.reload();
    }
  };

  const handleReject = async () => {
    const response = await onReject(document.documentId);
    if (response) {
      alert("Document Rejected");
      window.location.reload();
    }
  };

  return (
    <div className="bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-[#B8860B]/30 transition-all duration-200 rounded-lg overflow-visible group relative">
      {/* 7 columns: title, status, version, uploader, download, action, menu */}
      <div className="grid grid-cols-[2fr,1.5fr,1fr,1.5fr,1.2fr,1.5fr,40px] gap-6 items-center px-6 py-4">

        {/* Title */}
        <div className="font-medium text-gray-900 group-hover:text-[#B8860B] transition-colors truncate">
          {document.title}
        </div>

        {/* Status */}
        <div>
          <span className="px-3 py-1 bg-[#FFFBF7] text-[#E4742B] rounded-full text-sm font-medium">
            {document.documentStatus}
          </span>
        </div>

        {/* Version */}
        <div className="text-gray-600 font-medium truncate text-center">
          {document.currentVersion}
        </div>

        {/* Uploader */}
        <div className="text-gray-600 truncate">
          {document.uploadedByEmployee}
        </div>

        {/* Download Button */}
        <div className="flex justify-center">
          <DownloadButton downloadUrl={document.currentVersionDownloadUrl} documentId={document.documentId} fileName={document.title}/>
        </div>

        {/* Approve / Reject (Action column) */}
        { !isAdmin && (
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={handleApprove}
              className="px-6 py-2 border border-green-600/20 text-green-600 bg-white hover:bg-green-50 rounded-lg font-medium transition-colors duration-150 whitespace-nowrap"
            >
              Approve
            </button>
            <button
              onClick={handleReject}
              className="px-6 py-2 border border-red-600/20 text-red-600 bg-white hover:bg-red-50 rounded-lg font-medium transition-colors duration-150 whitespace-nowrap"
            >
              Reject
            </button>
          </div>
        )}

        { !isAdmin && (
          <KebabMenu items={menuItems}/>
        )}

      </div>
    </div>
  );
};

export default DocumentRow;
