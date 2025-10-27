import axiosInstance from "../axios/axios"

const documentRepository = {
    createDocument: async (dto, file) => {
        const formData = new FormData();
        formData.append("data", new Blob([JSON.stringify(dto)], {type: "application/json"}));
        formData.append("file", file);

        const { data } = await axiosInstance.post("/documents", formData, {
            headers: { "Content-Type" : "multipart/form-data"},
        });
        return data;
    },
    routeDocument: async (documentId) => { 
        const { data } = await axiosInstance.put(`/documents/${documentId}/route`);
        return data;
    },
    approveDocument: async (documentId) => { 
        await axiosInstance.put(`/documents/${documentId}/approve`);
    },
    rejectDocument: async (documentId) => { 
        await axiosInstance.put(`/documents/${documentId}/reject`);
    },
    getDocumentWithVersions: async (documentId) => {
        const { data } = await axiosInstance.get(`/documents/${documentId}`);
        return data;
    },
    getRoutedToEmployeeInbox: async (page = 0, size = 10) => {
        const { data } = await axiosInstance.get("/documents/routedToMe/inbox", { params: { page, size }});
        return data;
    },
    getRoutedToEmployeeHistory: async (page = 0, size = 10) => {
        const { data } = await axiosInstance.get("/documents/routedToMe/history", { params: { page, size }});
        return data;
    },
    getRoutedToEmployeeDepartment: async (page = 0, size = 10) => {
        const { data } = await axiosInstance.get("/documents/routedToMyDepartment", { params: { page, size }});
        return data;
    }


};

export default documentRepository;