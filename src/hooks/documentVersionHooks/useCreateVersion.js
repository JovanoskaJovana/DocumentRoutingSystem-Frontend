import { useCallback, useState } from "react";
import documentVersionRepository from "../../repository/documentVersionRepository";

const initialState =  {
    data: null,
    loading: false,
    error: null
};

const useCreateVersion = () => {

    const [state, setState] = useState(initialState);

    const updateDocument = useCallback(async (documentId, {file, title, changeNote}, page, size) => {

        setState({
            data: null,
            loading: true,
            error: null
        });

        try {
            const data = await documentVersionRepository.updateDocumentAndVersion(documentId, {file, title, changeNote}, page, size);
            setState({
                data,
                loading: false,
                error: null
            });
        } catch (error) {
            console.error("Failed to edit the document", error);
            setState({
                data: null,
                laoding: false,
                error
            });
        }

    }, []);

    return {
        ...state,
        updateDocument
    };


};

export default useCreateVersion;