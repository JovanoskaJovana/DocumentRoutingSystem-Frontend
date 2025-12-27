import { useState, useCallback, useEffect } from "react";
import employeeRepository from "../repository/employeeRepository";

const initialState = {
    employees: null,
    loading: true,
    error: null
};

const useEmployees = () => {

    const [state, setState] = useState(initialState);

    const fetchEmployees = useCallback(async () => {

        setState(prev => ({
            ...prev,
            loading: true,
            error: null
        }));
        
        try {
            const employees = await employeeRepository.findAll();
            setState({
                employees, 
                loading: false,
                error: null
            });
            
        } catch (error) {
            console.error("Failed to fetch employees:", error);
            setState({
                employees: null, 
                loading: false,
                error
            });
        }
    }, []);

    const getById = useCallback( async (employeeId) => {

        try {
            return await employeeRepository.findById(employeeId);
        } catch (error) {
            console.error("Failed to fetch employee by id:", error);
            return null;
        }
    }, []);

    const onAdd = useCallback( async (dto) => {
        
        try {
            await employeeRepository.save(dto);
            await fetchEmployees();
        } catch (error) {
            console.error("Failed to add empployee:", error);
        }
    }, [fetchEmployees]);

    const onEdit = useCallback( async (dto, employeeId) => {

        try {
            await employeeRepository.update(dto, employeeId);
            await fetchEmployees();
        } catch (error) {
            console.error("Failed to edit empployee:", error);
        }
    }, [fetchEmployees]);

    const onDelete = useCallback( async (employeeId) => {

        try {
            await employeeRepository.delete(employeeId);
            await fetchEmployees();
        } catch (error) {
            console.error("Failed to delete employee: ", error);
        }
    }, [fetchEmployees]);

    useEffect(() => {
        fetchEmployees();
    }, [fetchEmployees]);

    return {
        ...state,
        refresh: fetchEmployees,
        getById,
        onAdd,
        onEdit,
        onDelete,
    };
};

export default useEmployees;