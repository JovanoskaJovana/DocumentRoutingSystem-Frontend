import axiosInstance from "../axios/axios"

const authRepository = {
    login: async (email, password) => {
        
        const { data } = await axiosInstance.post("/auth/login", {email, password});
        return data;
    },
    logout: async () => {
        await axiosInstance.post("/auth/logout");
    },
};

export default authRepository;