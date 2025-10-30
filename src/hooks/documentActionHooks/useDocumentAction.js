import { use, useCallback, useEffect, useState } from "react";
import documentActionRepository from "../../repository/documentActionRepository";

const initialState = {
    data: null,
    loading: true,
    error: null
};

const useDocumentAction = (documentId, scope = "all") => {

    const [state, setState] = useState(initialState);

    const fetchActions = useCallback(async () => {

        if (!document) return;
        setState(prev => ({
            ...prev,
            loading: true,
            error: null
        }));

        try {
            
            const data = scope === "all" ? await documentActionRepository.getAllDocumentActions(documentId) : 
            await documentActionRepository.getAllActionsByEmployeeId(documentId);

            setState({
                data,
                laoding: false,
                error: null
            });
        } catch (error) {
            console.error("Failed to fetch document actions", error);
            setState({
                data: null,
                loading: false,
                error
            });
        }
    }, [documentId, scope]);

    useEffect(() => {
        fetchActions();
    }, [fetchActions]);

    return {
        ...state,
        refresh: fetchActions
    };

};

export default useDocumentAction;
