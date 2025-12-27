import { useCallback, useEffect, useState } from "react";
import documentRepository from "../../repository/documentRepository";

const initialState = {
    data: null,
    loading: true,
    error: null
};


const useDocumentInbox = (page = 0, size = 10) => {

    const [state, setState] = useState(initialState);
   
    const fetchInbox = useCallback( async () => {
        
        setState(prev => ({
            ...prev,
            loading: true,
            error: null
        }));

        try {
            const data = await documentRepository.getRoutedToEmployeeInbox(page, size);
            setState({
                data,
                loading: false,
                error: null
            });
        } catch (error) {
            console.error("Failed to fetch inbox", error);
            setState({
                data: null,
                loading: false,
                error
            });
        }
    }, [page, size]);

    useEffect(() => {
        fetchInbox();
    }, [fetchInbox]);
   

    const content = state.data?.content ?? [];
    const totalPages = state.data?.totalPages ?? 0;
    const totalElements = state.data?.totalElements ?? 0;

    return {
        ...state,
        refresh:fetchInbox,
        content,
        totalPages,
        totalElements
    };


};

export default useDocumentInbox;
