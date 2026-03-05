import { useEffect } from "react";
import { ArrowLeft, Loader2, Tag, Hash, Building, MessageSquare } from "lucide-react";
import useKeywordSuggestions from "../../hooks/useSuggestions";

const KeywordSuggestions = () => {
    const { loading, error, suggestions, fetchSuggestions } = useKeywordSuggestions();

    useEffect(() => {
        fetchSuggestions();
    }, []);

    return (
        <div className="max-w-2xl mx-auto py-6 px-4">

            <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-8">
                <h1 className="text-2xl font-semibold text-gray-900 mb-2">Keyword Suggestions</h1>
                <p className="text-sm text-gray-500 mb-8">Keywords detected across your company's documents and their suggested departments.</p>

                {loading && (
                    <div className="flex items-center justify-center py-16">
                        <Loader2 className="w-6 h-6 animate-spin text-[#B8860B]" />
                    </div>
                )}

                {error && (
                    <p className="text-red-600 text-sm">Failed to load suggestions. Please try again.</p>
                )}

                {!loading && !error && suggestions.length === 0 && (
                    <p className="text-sm text-gray-500 text-center py-12">No keyword suggestions available.</p>
                )}

                {!loading && suggestions.length > 0 && (
                    <ul className="space-y-3">
                        {suggestions.map((s, index) => (
                            <li
                                key={index}
                                className="flex items-start justify-between p-4 border border-gray-200 rounded-lg hover:border-[#B8860B] hover:bg-[#FFFBF7] transition-colors group"
                            >
                                <div className="flex items-start gap-4">
                                    {/* Keyword */}
                                    <div className="w-9 h-9 rounded-lg bg-amber-50 group-hover:bg-amber-100 flex items-center justify-center shrink-0 transition-colors">
                                        <Tag className="w-4 h-4 text-[#B8860B]" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm font-semibold text-gray-900">{s.word}</p>

                                        {s.departmentKey && (
                                            <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                                <Building className="w-3.5 h-3.5" />
                                                <span>{s.departmentKey}</span>
                                            </div>
                                        )}

                                        {s.message && (
                                            <div className="flex items-center gap-1.5 text-xs text-gray-400">
                                                <MessageSquare className="w-3.5 h-3.5" />
                                                <span>{s.message}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Count */}
                                {s.count !== null && s.count !== undefined && (
                                    <div className="flex items-center gap-1.5 shrink-0 ml-4">
                                        <Hash className="w-3.5 h-3.5 text-gray-400" />
                                        <span className="text-sm font-medium text-gray-600">{s.count}</span>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default KeywordSuggestions;