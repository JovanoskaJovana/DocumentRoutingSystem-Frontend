import useDownloadDocument from "../../hooks/documentDownloadHooks/useDownloadDocument";

const parseUrl = (url) => {
    if (!url) {
        return {
            documentId: null,
            versionId: null
        };
    }

    const versionPart = url.split("/versions/")[1];
    const documentPart = url.split("/documents/")[1];

    const versionId = versionPart ? versionPart.split("/download")[0] : null;
    const documentId = documentPart ? documentPart.split("/versions/")[0] : null;

    return {documentId, versionId};
}

const DownloadButton = ({downloadUrl, documentId : documentIdProp, versionId : versionIdProp, fileName, className, disabled = false, children}) => {

    const { downloadDocument, loading } = useDownloadDocument();

    const { documentId: parsedDocumentId, versionId: parsedVersionId } = parseUrl(downloadUrl);

    const documentId = documentIdProp ?? parsedDocumentId;
    const versionId = versionIdProp ?? parsedVersionId;

    const isDisabled = disabled || loading;

    return (
        <button
            disabled={isDisabled}
            onClick={() => {downloadDocument(documentId, versionId, fileName);}}
            className="px-6 py-2 border border-[#E4742B]/20 text-[#E4742B] bg-white hover:bg-[#FFFBF7] rounded-lg font-medium transition-colors duration-150 whitespace-nowrap"
        >
            {children ?? (loading ? "Downloading..." : "Download")}
        </button>
    );

};

export default DownloadButton;