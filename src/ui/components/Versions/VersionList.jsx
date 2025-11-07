import useDocumentVersions from "../../../hooks/documentVersionHooks/useDocumentVersions";
import { useParams, useOutletContext } from "react-router";
import { useEffect } from "react";
import VersionRow from "./VersionRow";



const VersionList = (page = 0, size = 10) => {

    const { documentId } = useParams();

    const { data } = useDocumentVersions(documentId, page, size);
    console.log(data);

    const { setPageTitle } = useOutletContext();

    useEffect(() => {
          if (data?.content?.length > 0)  {
              setPageTitle(data.content[0].document);
          };
    }, [data, setPageTitle]);

    return (
      <div className="max-w-6xl mx-auto py-6 px-4">
    
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
            <div className="w-[120px]"></div>
            <div className="w-[40px]"></div>
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
              {activeTab === "all"
                ? "No documents found"
                : "You have no documents"}
            </p>
          </div>
        )}
      </div>
    );
    
};

export default VersionList;