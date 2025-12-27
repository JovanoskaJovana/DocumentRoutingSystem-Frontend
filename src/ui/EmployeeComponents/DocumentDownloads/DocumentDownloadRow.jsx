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


const DocumentDownloadRow = ({ document }) => {
    return (
        <div className="bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-[#B8860B]/30 transition-all duration-200 rounded-lg overflow-visible group relative">
            <div className="grid grid-cols-[2fr,1.5fr,1fr,1fr,auto,auto] gap-6 items-center px-6 py-4">
                {/* Version */}
                <div className="text-gray-600 font-medium truncate">
                    {document.versionNumber}
                </div>

                {/* Download Time */}
                <div className="text-gray-600 truncate">
                    {formatDate(document.downloadedAt)}
                </div>

                {/* Employee */}
                <div className="text-gray-600 truncate">
                    {document.employee}
                </div>

            </div>
        </div>        
    );
};

export default DocumentDownloadRow;
