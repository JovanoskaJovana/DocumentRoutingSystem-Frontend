import { useState } from "react";
import { Upload, ArrowLeft, Loader2, GitBranch, AlertTriangle, CheckCircle2, Building, ChevronRight } from "lucide-react";
import documentRepository from "../../../repository/documentRepository";

const DocumentUploadAndRoute = () => {
  const [title, setTitle]             = useState("");
  const [file, setFile]               = useState(null);
  const [documentId, setDocumentId]   = useState(null);
  const [departments, setDepartments] = useState(null);
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState(null);
  const [success, setSuccess]         = useState(false);

  {/* upload */}
  const handleFileChange = async (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    if (!title.trim()) { setError("Please enter a title first."); return; }

    setFile(selectedFile);
    setError(null);
    setLoading(true);
    try {
      const data = await documentRepository.createDocument({ title }, selectedFile);
      setDocumentId(data.documentId);
    } catch (err) {
      setError("Upload failed. Please try again.");
      setFile(null);
    } finally {
      setLoading(false);
    }
  };

  {/* route */}
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!documentId) return;

    setError(null);
    setLoading(true);
    try {
      const result = await documentRepository.routeDocument(documentId);

      if (result.documentStatus === "FAILED_ROUTING") {
        const depts = await documentRepository.getmanualRouteDocumentDepartments(documentId);
        setDepartments(depts);
      } else {
        setSuccess(true);
      }
    } catch (err) {
      setError("Routing failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

    {/* if failed - pick department  */} 
  const handleSelectDepartment = async (departmentKey) => {
    setError(null);
    setLoading(true);
    try {
      await documentRepository.manualRouteDocument(documentId, departmentKey);
      setSuccess(true);
    } catch (err) {
      setError("Manual routing failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-6 px-4">
      <button
        onClick={() => window.history.back()}
        disabled={loading}
        className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-900 transition-colors disabled:opacity-50"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">Back</span>
      </button>

      <form onSubmit={handleSubmit} className="bg-white border border-gray-200 shadow-sm rounded-lg p-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-8">Upload Document</h1>

        {success ? (
          <div className="flex flex-col items-center gap-3 py-8 text-center">
            <CheckCircle2 className="w-12 h-12 text-green-500" />
            <p className="text-base font-medium text-gray-800">Document uploaded and routed successfully!</p>
            <button type="button" onClick={() => window.history.back()} className="mt-2 text-sm text-[#B8860B] hover:underline">
              Go back
            </button>
          </div>
        ) : (
          <div className="space-y-6">

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Document Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter document title"
                disabled={loading || !!documentId}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B8860B] focus:border-transparent disabled:bg-gray-50 disabled:text-gray-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Upload Document</label>
              <input type="file" onChange={handleFileChange} className="hidden" id="file-input" disabled={loading || !!documentId} />
              <label
                htmlFor="file-input"
                className={`flex items-center justify-center gap-3 p-8 border-2 border-dashed rounded-lg transition-colors ${
                  documentId ? "border-green-200 bg-green-50 cursor-default"
                  : loading ? "border-gray-200 bg-gray-50 cursor-not-allowed"
                  : "border-gray-300 hover:border-[#B8860B] hover:bg-[#FFFBF7] cursor-pointer"
                }`}
              >
                {loading && !documentId ? <Loader2 className="w-5 h-5 text-[#B8860B] animate-spin" />
                  : documentId ? <CheckCircle2 className="w-5 h-5 text-green-500" />
                  : <Upload className="w-5 h-5 text-gray-400" />}
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-700">
                    {loading && !documentId ? "Uploading…" : file ? file.name : "Click to upload document"}
                  </p>
                  {!file && <p className="text-xs text-gray-500 mt-1">PDF up to 10MB</p>}
                  {documentId && <p className="text-xs text-green-600 mt-1">Uploaded — Document ID #{documentId}</p>}
                </div>
              </label>
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            {documentId && departments === null && (
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center bg-[#B8860B] text-white px-8 py-2 rounded-lg font-medium hover:bg-[#9a7109] transition-colors disabled:opacity-70"
                >
                  {loading
                    ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Processing...</>
                    : <><GitBranch className="w-4 h-4 mr-2" /> Route Document</>}
                </button>
              </div>
            )}

            {departments !== null && (
              <>
                <hr className="border-gray-100" />
                <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-100 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-red-700">Automatic routing failed</p>
                    <p className="text-xs text-red-500 mt-0.5">Please select a department below to route this document manually.</p>
                  </div>
                </div>

                <h2 className="text-base font-semibold text-gray-800">Select Department</h2>

                {departments.length === 0 ? (
                  <p className="text-sm text-gray-500">No departments available.</p>
                ) : (
                  <ul className="space-y-2">
                    {departments.map((dept) => (
                      <li key={dept.id}>
                        <button
                          type="button"
                          onClick={() => handleSelectDepartment(dept.key)}
                          disabled={loading}
                          className="w-full flex items-center justify-between px-4 py-3 border border-gray-200 rounded-lg hover:border-[#B8860B] hover:bg-amber-50 group transition-colors disabled:opacity-50"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-amber-100 flex items-center justify-center transition-colors">
                              <Building className="w-4 h-4 text-gray-500 group-hover:text-[#B8860B]" />
                            </div>
                            <span className="text-sm font-medium text-gray-800">{dept.name}</span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-[#B8860B]" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}

          </div>
        )}
      </form>
    </div>
  );
};

export default DocumentUploadAndRoute;