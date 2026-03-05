import { useCallback, useState } from "react";
import suggestionRepository from "../repository/suggestionRepository";

const initialState = {
    loading: false,
    error: null,
    suggestions: []
};

const useKeywordSuggestions = () => {

    const [state, setState] = useState(initialState);

    const fetchSuggestions = useCallback(async () => {
        setState({ loading: true, error: null, suggestions: [] });

        try {
            const data = await suggestionRepository.getKeywordSuggestions();
            setState({ loading: false, error: null, suggestions: data });
            return data;
        } catch (error) {
            console.error("Failed to fetch keyword suggestions", error);
            setState({ loading: false, error, suggestions: [] });
        }
    }, []);

    return {
        ...state,
        fetchSuggestions
    };
};

export default useKeywordSuggestions;