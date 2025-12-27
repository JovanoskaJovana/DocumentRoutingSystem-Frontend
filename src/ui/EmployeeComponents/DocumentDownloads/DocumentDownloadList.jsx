import { useParams } from "react-router";
import useDocumentDownloads from "../../../hooks/documentDownloadHooks/useDocumentDownloads";
import DocumentDownloadRow from "./DocumentDownloadRow";
import { useOutletContext } from "react-router";
import { useEffect } from "react";
import { FileText, ArrowLeft } from "lucide-react";


const DocumentDownloadList = () => {

    const { documentId } = useParams();

    const { data } = useDocumentDownloads(documentId);
    console.log(data);
    const { setPageTitle } = useOutletContext();

    useEffect(() => {
          if (data?.length > 0)  {
              setPageTitle("Document: " + data[0].documentTitle);
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
              Download Time
            </div>
            <div className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
              Performer
            </div>
            <div className="w-[120px]"></div>
            <div className="w-[40px]"></div>
          </div>
        </div>

        {/* Document Rows */}
        <div className="space-y-2">
          {data.map((item) => (
            <DocumentDownloadRow key={item.downloadId} document={item}/>
          ))}
        </div>

        {/* Empty State */}
        {data?.length === 0 && (
          <div className="text-center py-12 bg-white border border-gray-200 shadow-sm rounded-lg mt-6">
            <div className="p-4 bg-[#FFFBF7] rounded-full w-fit mx-auto mb-4">
              <FileText className="w-16 h-16 text-[#B8860B]" />
            </div>
            <p className="text-gray-600 text-lg">
                No downloads found for this document.
            </p>
          </div>
        )}
      </div>
    );

};

export default DocumentDownloadList;