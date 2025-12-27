import { useCallback, useEffect, useState } from "react";
import documentVersionRepository from "../../repository/documentVersionRepository";

const useVersion = (versionId) => {
  const [version, setVersion] = useState(null);

  const fetchVersion = useCallback(async () => {
    if (!versionId) return;

    try {
      const data = await documentVersionRepository.getVersion(versionId);
      setVersion(data);
    } catch (error) {
      console.log("Failed to fetch document version:", error);
      setVersion(null);
    }
  }, [versionId]);

  useEffect(() => {
    fetchVersion();
  }, [fetchVersion]);

  return version; 
};

export default useVersion;
