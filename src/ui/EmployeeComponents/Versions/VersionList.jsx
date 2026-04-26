import useDocumentVersions from "../../../hooks/documentVersionHooks/useDocumentVersions";
import { useParams, useOutletContext } from "react-router";
import { useEffect } from "react";
import VersionRow from "./VersionRow";
import { FileText, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";


const VersionList = () => {

    const [page, setPage] = useState(0);

    const { documentId } = useParams();
    const { data, totalPages, loading, error } = useDocumentVersions(documentId);
    const { setPageTitle } = useOutletContext();

    console.log(data);

    useEffect(() => {
          if (data?.content?.length > 0)  {
              setPageTitle("Document: " + data.content[0].document);
          };
    }, [data, setPageTitle]);

    return (
      <div className="max-w-6xl mx-auto py-6 px-4">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back</span>
        </button>
    
        {/* Table Header */}
        <div className="bg-white border border-gray-200 shadow-sm mb-3 rounded-lg overflow-hidden">
          <div className="grid grid-cols-[2fr,1.5fr,1fr,1fr,auto,auto] gap-8 px-6 py-4 bg-[#FFFBF7] border-b border-gray-100">
            <div className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
              Document Version
            </div>
            <div className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
              Performer
            </div>
            <div className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
              Note
            </div>
            <div className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
              Download Version
            </div>
          </div>
        </div>

        {/* Document Rows */}
        <div className="space-y-2">
          {data?.content.map((item) => (
            <VersionRow key={item.versionId} document={item}/>
          ))}
        </div>

        {/* Empty State */}
        {data?.length === 0 && (
          <div className="text-center py-12 bg-white border border-gray-200 shadow-sm rounded-lg mt-6">
            <div className="p-4 bg-[#FFFBF7] rounded-full w-fit mx-auto mb-4">
              <FileText className="w-16 h-16 text-[#B8860B]" />
            </div>
            <p className="text-gray-600 text-lg">
                No versions found for this document.
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick = {() => setPage((p) => p - 1)}
              disabled = {page === 0}
              className = "flex items-center gap-1 px-4 py-2 rounded-lg border border-[#B8860B] text-[#B8860B] font-medium text-sm transition-colors hover:bg-[#B8860B] hover:text-white disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-[#B8860B]"
            >
              <ChevronLeft className = "w-4 h-4" />
              Previous
            </button>

            <span className = "text-sm text-gray-500">
              Page <span className = "font-semibold text-gray-700"> {page + 1} </span> of <span className="font-semibold text-gray-700"> {totalPages} </span>
            </span>

            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={page === totalPages - 1}
              className="flex items-center gap-1 px-4 py-2 rounded-lg border border-[#B8860B] text-[#B8860B] font-medium text-sm transition-colors hover:bg-[#B8860B] hover:text-white disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-[#B8860B]"
            >
              Next
              <ChevronRight className = "w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    );
    
};

export default VersionList;