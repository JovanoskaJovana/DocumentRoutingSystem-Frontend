import { useEffect, useState } from "react";
import { Upload, ArrowLeft, Loader2 } from "lucide-react";
import useUploadDocument from "../../../hooks/documentHooks/useUploadDocument";
import useRouteDocument from "../../../hooks/documentHooks/useRouteDocument";

const DocumentUpload = () => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [documentId, setDocumentId] = useState(null);

  const { loading: uploading, error: uploadError, uploadDocument } = useUploadDocument();
  const { loading: routing, error: routeError, routeDocument } = useRouteDocument();

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files && e.target.files[0];

    const dto = { title };
    
    const response = await uploadDocument(dto, selectedFile);
    
    setDocumentId(response.documentId)

    if (selectedFile) setFile(selectedFile);
  }; 

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title || !file || !documentId) {
      alert("Please provide both title and file.");
      return;
    }


    try {
      await routeDocument(documentId); 

      alert("Document uploaded and routed successfully!");
      window.history.back();
    } catch (error) {
      console.error("Upload or routing failed:", error);
    }
  };

  const isProcessing = uploading || routing;

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
          Upload Document
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

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Document
            </label>
            <div className="relative">
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                id="file-input"
                disabled={isProcessing}
              />
              <label
                htmlFor="file-input"
                className={`flex items-center justify-center gap-3 p-8 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                  isProcessing
                    ? "border-gray-200 bg-gray-50 cursor-not-allowed"
                    : "border-gray-300 hover:border-[#B8860B] hover:bg-[#FFFBF7]"
                }`}
              >
                <Upload className="w-5 h-5 text-gray-400" />
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-700">
                    {file ? file.name : "Click to upload document"}
                  </p>
                  {!file && (
                    <p className="text-xs text-gray-500 mt-1">
                      PDF up to 10MB
                    </p>
                  )}
                </div>
              </label>
            </div>
          </div>

          {/* Error Feedback */}
          {(uploadError || routeError) && (
            <p className="text-red-600 text-sm mt-2">
              {uploadError?.message || routeError?.message || "An error occurred."}
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
                "Route Document"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DocumentUpload;