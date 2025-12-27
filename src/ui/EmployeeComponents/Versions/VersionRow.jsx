import DownloadButton from "../../sharedComponents/DownloadButton";

const VersionRow = ({document}) => {

    return (
        <div className="bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-[#B8860B]/30 transition-all duration-200 rounded-lg overflow-visible group relative">
            <div className="grid grid-cols-[2fr,1.5fr,1fr,1fr,auto,auto] gap-6 items-center px-6 py-4">

                {/* Version */}
                <div className="text-gray-600 font-medium truncate">
                    {document.versionNumber}
                </div>

                {/* Type of action */}
                <div className="text-gray-600 truncate">
                    {document.uploadedByEmployee}
                </div>

                {/* Change note */}
                <div className="text-gray-600 w-64 truncate">
                    {document.changeNote}
                </div>

                {/* Download Button*/}
                <div className="flex justify-center">
                    <DownloadButton downloadUrl = {document.downloadUrl} fileName = {document.fileName}/>
                </div>
                
            </div>
        </div>  
    );

};

export default VersionRow;