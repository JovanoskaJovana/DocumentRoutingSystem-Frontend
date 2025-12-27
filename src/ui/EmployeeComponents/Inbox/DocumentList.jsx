import useDocumentInbox from "../../../hooks/documentHooks/useDocumentInbox";
import useAuth from "../../../hooks/useAuth";
import DocumentRow from "./DocumentRow";
import { FileText } from "lucide-react";

const DocumentList = () => {
  const { data } = useDocumentInbox();
  const { user } = useAuth();
  const isAdmin = user?.role === "ADMIN";

  return (
    <div className="max-w-7xl mx-auto py-6 px-4">
      {/* Table header */}
      <div className="bg-white border border-gray-200 shadow-sm mb-3 rounded-lg overflow-hidden">
        <div className="grid grid-cols-[1.4fr,1.2fr,1fr,1.2fr,1fr,1.2fr,40px] gap-4 items-center px-6 py-4 bg-[#FFFBF7] border-b border-gray-100 text-left">
          <div className="font-semibold text-gray-700 text-sm uppercase tracking-wide whitespace-nowrap">
            Document Title
          </div>
          <div className="font-semibold text-gray-700 text-sm uppercase tracking-wide whitespace-nowrap">
            Document Status
          </div>
          <div className="font-semibold text-gray-700 text-sm uppercase tracking-wide text-center whitespace-nowrap">
            Document Version
          </div>
          <div className="font-semibold text-gray-700 text-sm uppercase tracking-wide whitespace-nowrap">
            Uploader
          </div>
          <div className="font-semibold text-gray-700 text-sm uppercase tracking-wide text-start whitespace-nowrap">
            Download
          </div>
          {
            !isAdmin && (
              <div className="flex gap-2">
                <div className="font-semibold text-gray-700 text-sm uppercase tracking-wide text-center whitespace-nowrap">
                  Action
                </div>
                <div></div>
              </div>
            )
          }
 
        </div>
      </div>

      {/* Rows */}
      <div>
        {data?.content.map((item) => (
          <DocumentRow key={item.documentId} document={item} />
        ))}
      </div>

      {/* Empty state */}
      {data?.content.length === 0 && (
        <div className="text-center py-12 bg-white border border-gray-200 shadow-sm rounded-lg mt-6">
          <div className="p-4 bg-[#FFFBF7] rounded-full w-fit mx-auto mb-4">
            <FileText className="w-16 h-16 text-[#B8860B]" />
          </div>
          <p className="text-gray-600 text-lg">Inbox is empty</p>
        </div>
      )}
    </div>
  );
};

export default DocumentList;
