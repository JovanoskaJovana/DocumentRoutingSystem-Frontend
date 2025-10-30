import { useCallback, useState } from "react";
import documentDownloadRepository from "../../repository/documentDownloadRepository";

const initialState = {
    loading: false,
    error: null
};

const useDownloadDocument = () => {

    const [state, setState] = useState(initialState);

    const donwloadDocument = useCallback(async (documentId) => {
        
        setState({
            loading: true,
            error: null
        });

        try {
            await documentDownloadRepository.downloadPdf(documentId);
            setState({
                loading: false, 
                error: null
            });
        } catch (error) {
            console.error("Failed to download document", error);
            setState({
                loading: false, 
                error
            });
        }

    });

    return {
        ...state, 
        donwloadDocument
    }

};

export default useDownloadDocument;