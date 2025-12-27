import { useCallback, useState } from "react";
import documentRepository from "../../repository/documentRepository";

const initialState = {
    loading: false,
    error: null,
};

const useUploadDocument = () => {

    const [state, setState] = useState(initialState);

    const uploadDocument = useCallback ( async (dto, file) => {

        setState({
            loading: true,
            error: null
        });

        try {
            const data = await documentRepository.createDocument(dto, file);
            
            setState({
               loading: false,
               error: null
            });

            return data;
            
        } catch (error) {
            console.error("Failed to upload document", error);
            setState({
                loading: false,
                error
            });
        };
    }, []);

    return {
        ...state,
        uploadDocument
    };
};

export default useUploadDocument;