const DocumentActionRow = ({ document }) => {
  return (
    <div className="bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-[#B8860B]/30 transition-all duration-200 rounded-lg overflow-hidden group relative">

      <div className="grid grid-cols-[2fr,1fr,1fr,1fr] gap-6 items-center px-6 py-4">

        {/* Version */}
        <div className="text-gray-600 font-medium truncate">
          {document.documentVersion}
        </div>

        {/* Employee - performer */}
        <div className="text-gray-600 truncate">
          {document.performedByEmployee}
        </div>

        {/* Type of action */}
        <div className="text-gray-600 truncate">
          {document.actionType}
        </div>
      </div>

      {/* note */}
      {document.note && (
        <div className="border-t border-gray-100 px-6 py-3 text-gray-600 text-sm">
          <span className="font-semibold mr-1">Note:</span>
          <span className="break-words">{document.note}</span>
        </div>
      )}
    </div>
  );
};

export default DocumentActionRow;
