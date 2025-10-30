import { useCallback, useEffect, useState } from "react";
import documentVersionRepository from "../../repository/documentVersionRepository";

const initialState = {
    data: null,
    loading: true,
    error: null
};

const useDocumentVersions = (documentId, page, size) => {

    const [state, setState] = useState(initialState);

    const fetchVersions = useCallback(async () => {
        if (!documentId) return;
        setState(prev => ({
            ...prev,
            loading: true,
            error: null
        }));

        try { 
            const data = await documentVersionRepository.getAllVersions(documentId, page, size);
            setState({
                data, 
                loading: false,
                error: null
            });
        } catch (error) {
            console.error("Failed to fetch document versions", error);
            setState({
                data: null,
                loading: false,
                error
            });
        }
    }, [documentId, page, size]);

    useEffect(() => {
        fetchVersions();
    }, [fetchVersions]);

    const content = state.data?.content ?? [];
    const totalPages = state.data?.totalPages ?? 0;
    const totalElements = state.data?.totalElements ?? 0;

    return {
        ...state,
        refresh: useDocumentVersions,
        content,
        totalPages,
        totalElements
    };

};

export default useDocumentVersions;