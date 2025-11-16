import { useCallback, useState } from "react";
import documentVersionRepository from "../../repository/documentVersionRepository";

const initialState =  {
    loading: false,
    error: null
};

const useCreateVersion = () => {

    const [state, setState] = useState(initialState);

    const updateDocument = useCallback(async (documentId, {file, title, changeNote}, page, size) => {

        setState({
            loading: true,
            error: null
        });

        try {
            await documentVersionRepository.updateDocumentAndVersion(documentId, {file, title, changeNote}, page, size);
            setState({
                loading: false,
                error: null
            });
            return true;
        } catch (error) {
            console.error("Failed to edit the document", error);
            setState({
                loading: false,
                error
            });
            return false;
        }

    }, []);

    return {
        ...state,
        updateDocument
    };


};

export default useCreateVersion;