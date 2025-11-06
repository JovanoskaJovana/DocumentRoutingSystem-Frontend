import { useEffect, useState } from "react";
import { FileText } from "lucide-react";
import DocumentActionRow from "./DocumentActionRow";
import useDocumentAction from "../../../hooks/documentActionHooks/useDocumentAction";
import { useParams, useOutletContext } from "react-router";
import useAuth from "../../../hooks/useAuth";

const DocumentActionList = () => {

    const [activeTab, setActiveTab] = useState("all");
    const scope = activeTab;

    const { documentId } = useParams();
    const { data } = useDocumentAction(documentId, scope);
    const { setPageTitle } = useOutletContext();

    useEffect(() => {
          if (data && data.length > 0)  {
              setPageTitle(data[0].document);
          };
    }, [data, activeTab, setPageTitle]);

    const handleTabChange = (newScope) => {
      setActiveTab(newScope);
    }

    return (
      <div className="max-w-6xl mx-auto py-6 px-4">
        {/* Tabs */}
        <div className="mb-6 flex justify-center">
          <div className="inline-flex bg-[#FFFBF7] rounded-lg p-1 gap-2 border border-gray-200">
            <button
              onClick={() => handleTabChange("all")}
              className={`px-6 py-2 rounded font-medium text-sm transition-colors ${
                activeTab === "all"
                  ? "bg-[#B8860B] text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              All
            </button>
            <button
              onClick={() => handleTabChange("mine")}
              className={`px-6 py-2 rounded font-medium text-sm transition-colors ${
                activeTab === "mine"
                  ? "bg-[#B8860B] text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Mine
            </button>
          </div>
        </div>

        {/* Table Header */}
        <div className="bg-white border border-gray-200 shadow-sm mb-3 rounded-lg overflow-hidden">
          <div className="grid grid-cols-[2fr,1.5fr,1fr,1fr,auto,auto] gap-8 px-6 py-4 bg-[#FFFBF7] border-b border-gray-100">
            <div className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
              Document Title
            </div>
            <div className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
              Document Version
            </div>
            <div className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
              Performer
            </div>
            <div className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
              Action
            </div>
            <div className="w-[120px]"></div>
            <div className="w-[40px]"></div>
          </div>
        </div>

        {/* Document Rows */}
        <div className="space-y-2">
          {data?.map((item) => (
            <DocumentActionRow key={item.actionId} document={item}/>
          ))}
        </div>

        {/* Empty State */}
        {data?.length === 0 && (
          <div className="text-center py-12 bg-white border border-gray-200 shadow-sm rounded-lg mt-6">
            <div className="p-4 bg-[#FFFBF7] rounded-full w-fit mx-auto mb-4">
              <FileText className="w-16 h-16 text-[#B8860B]" />
            </div>
            <p className="text-gray-600 text-lg">
              {activeTab === "all"
                ? "No documents found"
                : "You have no documents"}
            </p>
          </div>
        )}
      </div>
    );
};

export default DocumentActionList;
