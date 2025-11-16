import { useCallback, useEffect, useState } from "react";
import departmentRepository from "../repository/departmentRepository";


const initialState = {
    departmets: null,
    loading: true,
    error: null
};

const useDepartments = () => {

    const [state, setState] = useState(initialState);

    const fetchDepartments = useCallback( async () => {

        setState(prev => ({
            ...prev,
            loading: true,
            error: null
        }));

        try {
            const departmets = await departmentRepository.listAll();
            setState({
                departmets,
                loading: false,
                error: null
            });
        } catch (error) {
            console.error("Failed to fetch departments", error);
            setState({
                departmets: null,
                loading: false,
                error
            });
        }

    }, []);

    const findById = useCallback (async (deparmentId) => {
        try {
            return await departmentRepository.findById(deparmentId);
        } catch (error) {
            console.error("Failed to fetch department", error);
            return null;
        }
    });

    const onAdd = useCallback( async (dto) => {

        try {
            await departmentRepository.save(dto);
            fetchDepartments();
        } catch (error) {
            console.error("Failed to save department", error);
        }
    }, [fetchDepartments]);

    const onUpdate = useCallback( async (dto, deparmentId) => {
        try {
            await departmentRepository.update(dto, deparmentId);
            fetchDepartments();
        } catch {
            console.error("Failed to edit department", error);
        }
    }, [fetchDepartments]);

    const onDelete = useCallback( async (deparmentId) => {
        try{
            await departmentRepository.delete(deparmentId);
            fetchDepartments();
        } catch {
            console.error("Failed to delete department", error);
        }
    }, [fetchDepartments]);

    useEffect (() => {
        fetchDepartments();
    }, [fetchDepartments]);

    return {
        ...state,
        refresh: fetchDepartments,
        findById,
        onAdd,
        onUpdate,
        onDelete
    };
};

export default useDepartments;