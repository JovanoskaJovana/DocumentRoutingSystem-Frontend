import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { MoreVertical } from 'lucide-react';
import useDownloadDocument from "../../../hooks/documentDownloadHooks/useDownloadDocument";


const DocumentRow = ({document}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();
    const {downloadDocument, loading} = useDownloadDocument();

    useEffect(() => {

        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

        window.document.addEventListener("mousedown", handleClickOutside);
        return () => {
            window.document.removeEventListener("mousedown", handleClickOutside);
        }; //cleanup function

    }, []);

    const menuItems = [
        {label: "Edit Document", action: () => navigate(`/documents/${document.documentId}/edit`)},
        {label: "All Actions", action: () => navigate(`/documents/${document.documentId}/actions`)},
        {label: "All Versions", action: () => navigate(`/documents/${document.documentId}/versions`)},
        {label: "All Downloads", action: () => navigate(`/documents/${document.documentId}/downloads`)}
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
                <div className="relative w-[40px]" ref={menuRef}>
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="p-2 hover:bg-[#FFFBF7] rounded transition-colors duration-150 border border-transparent hover:border-[#B8860B]/30" aria-label="More options">
                        <MoreVertical className="w-5 h-5 text-gray-600 group-hover:text-[#B8860B]" />
                    </button>

                    {isMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                        {menuItems.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                item.action();
                                setIsMenuOpen(false);
                            }}
                            className="w-full px-4 py-2 text-left text-gray-700 hover:bg-[#FFFBF7] transition-colors border-b border-gray-100 last:border-b-0 font-medium first:rounded-t-lg last:rounded-b-lg">
                            {item.label}
                        </button>
                        ))}
                    </div>
                    )}
                </div>
            </div>
        </div>
    );


};

export default DocumentRow; 