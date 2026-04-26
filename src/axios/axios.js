import axios from "axios";

const axiosInstance = axios.create({

    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const jwtToken = localStorage.getItem("token");
        if (jwtToken) {
            config.headers.Authorization = `Bearer ${jwtToken}`;
        }
        return config;
    }
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status;
        const message = error.response?.data?.message || "An unexpected error occurred";

        switch(status) {
            case 400:
                toast.error(message);
                break;
            case 401:
                localStorage.removeItem("token");
                if (window.location.pathname !== "/login"){
                    window.location.href = "/login";
                }
                break;
            case 403:
                toast.error(message);
                break;
            case 404:
                toast.error(message);
                break;
            case 409:
                toast.error(message);
                break;
            case 500:
                toast.error(message);
                break;
            default:
                toast.error(message);
        }
        
        return Promise.reject(error)
    }
);

export default axiosInstance;






