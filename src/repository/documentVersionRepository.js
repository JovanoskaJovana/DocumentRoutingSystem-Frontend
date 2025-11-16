import axiosInstance from "../axios/axios";

const documentVersionRepository = {
    getAllVersions: async (documentId, page = 0, size = 10) => {
        const { data } = await axiosInstance.get(`/documents/${documentId}/allVersions`, { params: { page, size }});
        return data;
    },
    updateDocumentAndVersion: async (documentId, {file, title, changeNote}, page = 0, size = 10) => {
        const formData = new FormData();
        if (file) formData.append("file", file);
        if (title) formData.append("title", title);
        if (changeNote) formData.append("changeNote", changeNote);

        const { data } = await axiosInstance.put(`/documents/${documentId}/editDocument`, formData, 
            { 
             params: { page, size }, 
             headers: {"Content-Type": "multipart/form-data"}
            }
        );
        return data;
    },
    getVersion: async (versionId) => {
        const { data } = await axiosInstance.get(`/documents/version/${versionId}`);
        return data;
    }
};

export default documentVersionRepository;