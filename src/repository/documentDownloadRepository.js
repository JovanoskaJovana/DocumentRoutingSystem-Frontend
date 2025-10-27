import axiosInstance from "../axios/axios"

const documentDownloadRepository = {
    downloadPdf: async (documentId, versionId) => {
        const { data } = await axiosInstance.get(`/documents/${documentId}/versions/${versionId}/download`,
        {responseType : "blob"});

        return { blob : data.data, headers: data.headers };

    },
    getDownloadsByDocument: async (documentId) => {
        const { data } = await axiosInstance.get(`/documents/${documentId}/documentDownloads`);
        return data;
    },
    getDownloadsByEmployee: async () => {
        const { data } = await axiosInstance.get(`/documents/downloadsByMe`);
        return data;
    }
};

export default documentDownloadRepository;