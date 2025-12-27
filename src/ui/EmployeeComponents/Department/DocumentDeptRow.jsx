import { useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import DownloadButton from "../../sharedComponents/DownloadButton";
import KebabMenu from "../../sharedComponents/KebabMenu";

const formatDate = (isoString) => {
    if (!isoString) return "N/A";

    const date = new Date(isoString);

    return date.toLocaleString("en-GB", {
        year: "numeric",
        month: "short", 
        day: "2-digit", 
        hour: "2-digit",
        minute: "2-digit",
    });
};


const DocumentRow = ({document}) => {

    const navigate = useNavigate();
    const { user } = useAuth();
    const isRegular = user?.employeeType === "REGULAR";

    const menuItems = [
        {label: "All Actions", action: () => navigate(`/documents/${document.documentId}/actions`)},
        {label: "All Versions", action: () => navigate(`/documents/${document.documentId}/versions`)},
        {label: "All Downloads", action: () => navigate(`/documents/${document.documentId}/downloads`)}
    ];

    return (
        <div className="bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-[#B8860B]/30 transition-all duration-200 rounded-lg overflow-visible group relative">
            <div className="grid grid-cols-[2fr,1.5fr,1fr,1fr,1fr,1fr] items-center px-6 py-4">

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

                {/* Date */}
                <div className="text-gray-600 truncate">
                    {formatDate(document.uploadedDateTime)}
                </div>
                
                <div className="flex items-center justify-end gap-2">

                    {/* Download button */}
                    {!isRegular && <DownloadButton downloadUrl={document.currentVersionDownloadUrl} documentId={document.documentId} fileName={document.title}/>}

                    {/* Kebab menu */}
                    <KebabMenu items={menuItems}/>
                </div>
            </div>
        </div>
    );


};

export default DocumentRow; 