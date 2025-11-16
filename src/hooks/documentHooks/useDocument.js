import { useCallback, useEffect, useState } from "react";
import documentRepository from "../../repository/documentRepository";

const useDocument = (documentId) => {
  const [document, setDocument] = useState(null);

  const fetchDocument = useCallback(async () => {
    if (!documentId) return;

    try {
      const data = await documentRepository.getDocument(documentId);
      setDocument(data);
    } catch (error) {
      console.log("Failed to fetch document :", error);
      setDocument(null);
    }
  }, [documentId]);

  useEffect(() => {
    fetchDocument();
  }, [fetchDocument]);

  return document; 
};

export default useDocument;
