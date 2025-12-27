import axiosInstance from "../axios/axios"

const documentActionRepository = {
    getAllDocumentActions: async (documentId) => {
        const { data } = await axiosInstance.get(`/documents/${documentId}/documentActions`);
        return data;
    },
    getMyDocumentActions: async (documentId) => {
        const { data } = await axiosInstance.get(`/documents/${documentId}/actionsByMe`);
        return data;
    }


};

export default documentActionRepository;