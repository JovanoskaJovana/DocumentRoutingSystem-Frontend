const DocumentActionRow = ({document}) => {

    return (
        <div className="bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-[#B8860B]/30 transition-all duration-200 rounded-lg overflow-visible group relative">
            <div className="grid grid-cols-[2fr,1.5fr,1fr,1fr,auto,auto] gap-6 items-center px-6 py-4">
                {/* Title */}
                <div className="font-medium text-gray-900 group-hover:text-[#B8860B] transition-colors truncate">
                    {document.document}
                </div>

                {/* Version */}
                <div className="text-gray-600 font-medium truncate">
                    {document.documentVersion}
                </div>

                {/* Employee */}
                <div className="text-gray-600 truncate">
                    {document.performedByEmployee}
                </div>

                {/* Type of action */}
                <div className="text-gray-600 truncate">
                    {document.actionType}
                </div>
                
            </div>
        </div>
    );

};

export default DocumentActionRow;