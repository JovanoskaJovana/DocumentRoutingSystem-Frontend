import useRoutedToDepartment from "../../../hooks/documentHooks/useRoutedToDepartment";
import DocumentDeptRow from "./DocumentDeptRow";
import { FileText } from "lucide-react";

const DocumentDeptList = () => {

    const { data } = useRoutedToDepartment();

    return (
        <div className="max-w-6.5xl mx-auto py-6 px-4">
        {/* Table header */}
        <div className="bg-white border border-gray-200 shadow-sm mb-3 rounded-lg overflow-hidden">
            <div className="grid grid-cols-[2fr,1.5fr,1fr,1fr,1fr,1fr] items-center px-6 py-4 bg-[#FFFBF7] border-b border-gray-100">
                <div className="font-semibold text-gray-700 text-sm uppercase text-left">
                    Document Title
                </div>
                <div className="font-semibold text-gray-700 text-sm uppercase text-left">
                    Document Status
                </div>
                <div className="font-semibold text-gray-700 text-sm uppercase text-left">
                    Document Version
                </div>
                <div className="font-semibold text-gray-700 text-sm uppercase text-left">
                    Uploader
                </div>
                <div className="font-semibold text-gray-700 text-sm uppercase text-left">
                    Uploaded Time
                </div>
                <div />
            </div>
        </div>

        {/* Rows */}
        <div className="space-y-2">
            {data?.content.map((item) => (
            <DocumentDeptRow key={item.documentId} document={item} />
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

export default DocumentDeptList;