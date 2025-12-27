import { useNavigate } from "react-router";
import useDownloadDocument from "../../../hooks/documentDownloadHooks/useDownloadDocument";
import KebabMenu from "../../sharedComponents/KebabMenu";


const DocumentHistoryRow = ({document}) => {

    const {downloadDocument, loading} = useDownloadDocument();
    const navigate = useNavigate();

    const isRouted = document.documentStatus === "ROUTED";
    const isAccepted = document.documentStatus === "APPROVED";
    const isRejected = document.documentStatus === "REJECTED";

    const menuItems1 = [
        { label: "Edit Document", action: () => navigate(`/documents/${document.documentId}/edit`) },
    ];

    const menuItems2 = [
        { label: "All Actions", action: () => navigate(`/documents/${document.documentId}/actions`) },
        { label: "All Versions", action: () => navigate(`/documents/${document.documentId}/versions`) },
        { label: "All Downloads", action: () => navigate(`/documents/${document.documentId}/downloads`) },
    ];

    return ( 
        <div className="bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-[#B8860B]/30 transition-all duration-200 rounded-lg overflow-visible group relative">
            <div className="grid grid-cols-[2fr,1.5fr,1fr,1fr,auto,auto] gap-6 items-center px-6 py-4">

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
                <div className="text-gray-600 font-medium truncate">
                    {document.currentVersion}
                </div>

                {/* Uploader */}
                <div className="text-gray-600 truncate">
                    {document.uploadedByEmployee}
                </div>

                {/* Download button */}
                <button
                    disabled={loading}
                    onClick={() => {
                        const versionId = document.currentVersionDownloadUrl.split("/versions/")[1].split("/download")[0];
                        downloadDocument(document.documentId, versionId, document.title);
                    }}
                    className="px-6 py-2 border border-[#E4742B]/20 text-[#E4742B] bg-white hover:bg-[#FFFBF7] rounded-lg font-medium transition-colors duration-150 whitespace-nowrap">
                    {loading ? "Downloading..." : "Download"}
                </button>

                {/* Kebab menu */}
                {isRouted && (
                    <KebabMenu items={menuItems1}/>
                )}

                {(isAccepted || isRejected) && (
                    <KebabMenu items={menuItems2}/>
                )}

            </div>
        </div>
    );


};

export default DocumentHistoryRow; 