import { useNavigate } from "react-router";
import DownloadButton from "../../sharedComponents/DownloadButton";
import KebabMenu from "../../sharedComponents/KebabMenu";


const DocumentHistoryRow = ({document}) => {

    const navigate = useNavigate();

    const menuItems = [
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

                {/* Download Button */}
                <div className="flex justify-center">
                    <DownloadButton downloadUrl={document.currentVersionDownloadUrl} documentId={document.documentId} fileName={document.title}/>
                </div>

                {/* Kebab menu */}
                <KebabMenu items={menuItems}/>

            </div>
        </div>
    );


};

export default DocumentHistoryRow; 