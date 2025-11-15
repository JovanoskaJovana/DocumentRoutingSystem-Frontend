import { useCallback, useEffect, useState } from "react";
import documentDownloadRepository from "../../repository/documentDownloadRepository";

const initialState = {
    data: null,
    loading: true,
    error: null
};

const useDownloadEmployee = () => {

    const [state, setState] = useState(initialState);

    const fetchDownloads = useCallback(async () => {

        setState(prev => ({
            ...prev,
            loading: true,
            error: null
        }));

        try {
            const data = await documentDownloadRepository.getDownloadsByEmployee();
            setState({
                data,
                loading: false,
                error: null
            });
        } catch (error) {
            console.error("Failed to fetch downloads", error);
            setState({
                data: null,
                loading: false,
                error
            });
        }

    }, []);

    useEffect(() => {
        fetchDownloads();
    }, [fetchDownloads]);

    return {
        ...state,
        refresh: fetchDownloads
    };

};

export default useDownloadEmployee;