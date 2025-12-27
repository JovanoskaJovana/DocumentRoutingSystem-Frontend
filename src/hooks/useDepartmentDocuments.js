import { useCallback, useState } from "react";
import adminDepartmentRepository from "../repository/adminDepartmentRepository";

const initialState = {
    data: null,
    loading: true,
    error: null
};


export const useDepartmentDocuments = () => {
  const [state, setState] = useState(initialState);

  const fetchDocumentsByDepartment = useCallback(async (departmentId) => {

      if (departmentId == null) return;
      

    setState(prev => ({
      ...prev,
      loading: true,
      error: null
    }));

    try {
      const data = await adminDepartmentRepository.getRoutedDocumentsByDepartment(departmentId);
      setState({
        data,
        loading: false,
        error: null
      });
    } catch (error) {
        console.error("Failed to fetch documents", error);
        setState({
          data: null,
          loading: false,
          error
        });
        }
  }, []);

     

  return {
    state,
    refresh: fetchDocumentsByDepartment
  };
};
