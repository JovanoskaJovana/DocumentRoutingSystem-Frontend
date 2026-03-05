import axiosInstance from "../axios/axios"

const suggestionRepository = {
    getKeywordSuggestions: async () => {
        const { data } = await axiosInstance.get("/suggestions");
        return data;
    },
};

export default suggestionRepository;