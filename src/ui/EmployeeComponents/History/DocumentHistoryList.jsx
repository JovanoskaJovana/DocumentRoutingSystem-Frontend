import useDocumentHistory from "../../../hooks/documentHooks/useDocumentHistory";
import DocumentHistoryRow from "./DocumentHistoryRow";
import { FileText, ChevronLeft, ChevronRight  } from "lucide-react"; 
import { useState } from "react"; 

const DocumentHistory = () => {

    const [page, setPage] = useState(0);
    
    const { content, totalPages, loading, error } = useDocumentHistory(page);

    return (
        <div className="max-w-6.5xl mx-auto py-6 px-4">

            {/* Table header */}
            <div className="bg-white border border-gray-200 shadow-sm mb-3 rounded-lg overflow-hidden">
                <div className="grid grid-cols-[2fr,1.5fr,1fr,1fr,auto,auto] gap-6 px-6 py-4 bg-[#FFFBF7] border-b border-gray-100">
                    <div className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
                        Document Title
                    </div>
                    <div className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
                        Document Status
                    </div>
                    <div className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
                        Document Version
                    </div>
                    <div className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
                        Uploader
                    </div>
                    <div className="w-[120px]"></div>
                    <div className="w-[40px]"></div>
                </div>
            </div>

            {/* Rows */}
            <div className="space-y-2">
                {content?.map((item) => (
                    <DocumentHistoryRow key={item.documentId} document={item} />
                ))}
            </div>

            {/* Empty state */}
            {content?.length === 0 && (
                <div className="text-center py-12 bg-white border border-gray-200 shadow-sm rounded-lg mt-6">
                    <div className="p-4 bg-[#FFFBF7] rounded-full w-fit mx-auto mb-4">
                        <FileText className="w-16 h-16 text-[#B8860B]" />
                    </div>
                    <p className="text-gray-600 text-lg">
                        Inbox is empty
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

export default DocumentHistory;
