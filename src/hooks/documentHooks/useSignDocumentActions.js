
import { useCallback, useState } from "react";
import documentRepostory from "../../repository/documentRepository";

const initialState = {
    loading: false,
    error: null
};

const useSignDocumentAction = () => {

    const [state, setState] = useState(initialState);

    const onApprove = useCallback(async (documentId) => {

        setState({
            loading: true,
            error: null
        });

        try {
            await documentRepostory.approveDocument(documentId);
            setState({
                loading: false,
                error:null
            });
            return true;
        } catch (error) {
            console.error("Failed to approve document", error);
            setState({
                loading: false,
                error
            });
            return false;
        }
    },[]);

    const onReject = useCallback(async (documentId) => {

        setState({
            loading: true,
            error: null
        });

        try {
            await documentRepostory.rejectDocument(documentId);
            setState({
                loading: false,
                error:null
            });
            return true;
        } catch (error) {
            console.error("Failed to approve document", error);
            setState({
                loading: false,
                error
            });
            return false;
        }
        

    }, []);

    return {
        ...state,
        onApprove,
        onReject
    };
};


export default useSignDocumentAction;