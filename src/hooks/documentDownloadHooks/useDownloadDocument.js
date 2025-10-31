import { useCallback, useState } from "react";
import documentDownloadRepository from "../../repository/documentDownloadRepository";

const initialState = {
    loading: false,
    error: null
};

const useDownloadDocument = () => {

    const [state, setState] = useState(initialState);

    const downloadDocument = useCallback(async (documentId, versionId, title) => {
        
        setState({
            loading: true,
            error: null
        });

        try {
            const blob = await documentDownloadRepository.downloadPdf(documentId, versionId);
            
            const url = window.URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = url

            link.setAttribute("download", `${title}.pdf`);

            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

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
        downloadDocument
    }

};

export default useDownloadDocument;