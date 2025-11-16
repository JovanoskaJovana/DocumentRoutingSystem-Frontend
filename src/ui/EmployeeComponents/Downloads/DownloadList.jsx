import useDownloadEmployee from "../../../hooks/documentDownloadHooks/useDownloadsEmployee";
import DownloadRow from "./DownloadRow";
import { FileText } from "lucide-react";

const DocumentList = () => {
    const { data } = useDownloadEmployee();

    console.log(data);

      return (
        <div className="max-w-5.4xl mx-auto py-6 px-4">
            {/* Table header */}
            <div className="bg-white border border-gray-200 shadow-sm mb-3 rounded-lg overflow-hidden">
                <div className="grid grid-cols-[2fr,1.5fr,1fr,1fr,auto,auto] gap-6 px-6 py-4 bg-[#FFFBF7] border-b border-gray-100">
                <div className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
                    Document Title
                </div>
                <div className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
                    Document Version
                </div>
                <div className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
                    Download Time
                </div>
                <div className="w-[120px]"></div>
                <div className="w-[40px]"></div>
                </div>
            </div>

            {/* Rows */}
            <div className="space-y-2">
                {data?.map((item) => (
                    <DownloadRow key={item.downloadId} document={item} />
                ))}
            </div>

            {/* Empty state */}
            {data?.length === 0 && (
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