import { useCallback, useState } from "react";
import documentRepository from "../../repository/documentRepository";

const initialState = {
    loading: false,
    error: null    
};

const useRouteDocument = () => {

    const [state, setState] = useState(initialState);

    const routeDocument = useCallback( async (documentId) => {

        setState({
            loading: true,
            error: null
        });

        try {
            await documentRepository.routeDocument(documentId);
            setState({
                loading: false,
                error: null
            });
        } catch (error) {
            console.error("Failed to route document", error);
            setState({
                loading: false,
                error
            });
        }
    }, []);

    return {
        ...state,
        routeDocument
    };

};


export default useRouteDocument;


