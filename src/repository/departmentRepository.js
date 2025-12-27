import axiosInstance from "../axios/axios"

const departmentRepository = {
    listAll: async () => {
        const { data } = await axiosInstance.get("/departments");
        return data;
    },
    findById: async (departmentId) => {
        const { data } = await axiosInstance.get(`/departments/${departmentId}`);
        return data;
    },
    save: async (dto) => {
        const { data } = await axiosInstance.post("/departments", dto);
        return data;
    },
    update: async (dto, departmentId) => {
        const { data } = await axiosInstance.put(`/departments/${departmentId}`, dto);
        return data;
    }, 
    delete: async (departmentId) => {
        await axiosInstance.delete(`/departments/${departmentId}`);
    }
};

export default departmentRepository;