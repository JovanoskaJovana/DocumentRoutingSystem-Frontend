import { useCallback, useEffect, useState } from "react";
import documentDownloadRepository from "../../repository/documentDownloadRepository";

const initialState = {
    data: [],
    loading: true, 
    error: null
};

const useDocumentDownloads = (documentId) => {

    const [state, setState] = useState(initialState);

    const fetchDocumentDownloads = useCallback(async () => {

        setState(prev => ({
            ...prev,
            loading: true,
            error: null
        }));

        try {
            const data = await documentDownloadRepository.getDownloadsByDocument(documentId);
            setState({
                data,
                loading: false,
                error: null
            });
        } catch (error) {
            console.error("Failed to fetch document downloads", error);
            setState({
                data: null,
                loading: false,
                error
            });
        }
    }, [documentId]);

    useEffect(() => {
        fetchDocumentDownloads();
    }, [fetchDocumentDownloads]);

    return {
        ...state,
        refresh: fetchDocumentDownloads
    }

};

export default useDocumentDownloads;