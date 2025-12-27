import axiosInstance from "../axios/axios";

const adminDepartmentRepository = {
  async getRoutedDocumentsByDepartment(departmentId) {
    const { data } = await axiosInstance.get(`/admin/departments/${departmentId}/routed-documents`);
    return data;
  }
};

export default adminDepartmentRepository;
