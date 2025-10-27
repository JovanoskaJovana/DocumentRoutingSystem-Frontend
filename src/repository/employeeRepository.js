import axiosInstance from "../axios/axios";

const employeeRepository = {
    findAll: async () => {
        const { data } = await axiosInstance.get("/employees");
        return data;
    },
    findById: async (employeeId) => {
        const { data } = await axiosInstance.get(`/employees/${employeeId}`);
        return data;
    },
    save: async (dto) => {
        const { data } = await axiosInstance.post("/employees", dto);
        return data;
    },
    update: async (dto, employeeId) => {
        const { data } = await axiosInstance.put(`/employees/${employeeId}`, dto);
        return data;
    },
    delete: async (employeeId) => {
        await axiosInstance.delete(`/employees/${employeeId}`);
    },
};

export default employeeRepository;