import { Upload, ArrowLeft, Loader2 } from "lucide-react";
import useCreateVersion from "../../../hooks/documentVersionHooks/useCreateVersion";
import { useParams, useNavigate } from "react-router";
import useVersion from "../../../hooks/documentVersionHooks/useVersion";
import { useEffect, useState } from "react";
import useDocument from "../../../hooks/documentHooks/useDocument";
import useDownloadDocument from "../../../hooks/documentDownloadHooks/useDownloadDocument";

const extractVersionFromUrl = (url) => {
  if (!url) return null;

  const parts = url.split("/");
  const versionIndex = parts.indexOf("versions");

  if (versionIndex !== -1) {
    return parts[versionIndex + 1]; 
  }

  return null;
};


const EditDocument = () => {

  const { documentId } = useParams();
  const [ title, setTitle ] = useState("");
  const [ changeNote, setChangeNote ] = useState("");
  const [ file, setFile ] = useState(null);
  const {downloadDocument, loading} = useDownloadDocument();
  const page = 0;
  const size = 10;
  const navigate = useNavigate();


  const document = useDocument(documentId);
  const versionNumber = document?.currentVersionDownloadUrl ? extractVersionFromUrl(document.currentVersionDownloadUrl) : null;
  const version = useVersion(versionNumber);  

  useEffect(() => {

    if (!version) return;

    setTitle(version.document);

  }, [version]);

  const {loading: editing, error: editError, updateDocument} = useCreateVersion();

  const handleFileChange = (e) => {
    
    const selectedFile = e.target.files?.[0] ?? null;
    setFile(selectedFile);

  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !changeNote) {
      alert("Please provide title and change note.");
      return;
    }

    const dto = { file, title, changeNote };
    const response = await updateDocument(documentId, dto, page, size);
    if (response) {
      alert("Document edited successfully.");
      navigate(-1);
    }
  };

  const isProcessing = editing;

  return (
    <div className="max-w-2xl mx-auto py-6 px-4">
      <button
        onClick={() => window.history.back()}
        className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-900 transition-colors"
        disabled={isProcessing}
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">Back</span>
      </button>

      <form
        onSubmit={handleSubmit}
        className="bg-white border border-gray-200 shadow-sm rounded-lg p-8"
      >
        <h1 className="text-2xl font-semibold text-gray-900 mb-8">
          Edit Document
        </h1>

        <div className="space-y-6">
          {/* Document Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Document Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter document title"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B8860B] focus:border-transparent"
              disabled={isProcessing}
            />
          </div>

          {/* Change Note */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Change Note
            </label>
            <input
              type="text"
              value={changeNote}
              onChange={(e) => setChangeNote(e.target.value)}
              placeholder="Enter change note"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B8860B] focus:border-transparent"
              disabled={isProcessing}
            />
          </div>

          {/* File Edit */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Change Document File
            </label>

          {/* current file info */}
          {document?.currentVersionDownloadUrl && (
            <p className="text-sm text-gray-600 mb-2">
              Current file:{" "}
                <button
                    disabled={loading}
                    onClick={() => {
                        const versionId = document.currentVersionDownloadUrl.split("/versions/")[1].split("/download")[0];
                        downloadDocument(document.documentId, versionId, document.title);
                    }}
                    className=" py-2 text-[#E4742B] bg-white hover:bg-[#FFFBF7] rounded-lg font-medium transition-colors duration-150 whitespace-nowrap">
                    {loading ? "Downloading..." : "Download current file"}
                </button>
            </p>
          )}

          <label className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
            <Upload className="w-4 h-4 mr-2" />
            <span>Select new file (optional)</span>
            <input
              type="file"
              className="hidden"
              onChange={handleFileChange}
              disabled={editing}
            />
          </label>

          {file && (
            <p className="mt-2 text-xs text-gray-500">
              Selected: <span className="font-medium">{file.name}</span>
            </p>
          )}

          {!file && (
            <p className="mt-2 text-xs text-gray-500">
              Leave this empty to keep the existing file.
            </p>
          )}
        </div>

          {/* Error Feedback */}
          {editError && (
            <p className="text-red-600 text-sm mt-2">
              {editError?.message || "An error occurred."}
            </p>
          )}

          {/* Buttons */}
          <div className="flex justify-between items-end pt-4">
            <button
              type="submit"
              disabled={isProcessing}
              className="flex items-center justify-center bg-[#B8860B] text-white px-8 py-2 rounded-lg font-medium hover:bg-[#9a7109] transition-colors disabled:opacity-70"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                "Edit Document"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditDocument;
