import { useCallback, useEffect, useState } from "react";
import documentRepository from "../../repository/documentRepository";

const initialState = {
    data: null,
    loading: true,
    error: null
}

const useDocumentUploads = (page = 0, size = 10) => {

    const[state, setState] = useState(initialState);

    const fetchHistory = useCallback( async () => {

        setState(prev => ({
            ...prev,
            loading: true,
            error: null
        }));
  
        try {
            const data = await documentRepository.getUploadedByEmployee(page, size);
            setState({
                data,
                loading: false,
                error: null
            });
        } catch (error) {
            console.error("Failed to fetch uploaded documents", error);
            setState({
                data: null,
                loading: false,
                error
            });
        }
    }, [page, size]);


    useEffect(() => {
        fetchHistory();
    }, [fetchHistory]);

    const content = state.data?.content ?? [];
    const totalPages = state.data?.totalPages ?? 0;
    const totalElements = state.data?.totalElements ?? 0;

    return {
        ...state,
        refresh: fetchHistory,
        content,
        totalPages,
        totalElements
    };

};

export default useDocumentUploads;