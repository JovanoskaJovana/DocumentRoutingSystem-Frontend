import './App.css'
import {BrowserRouter, Routes, Route} from "react-router";
import Login from './ui/Login/Login.jsx';
import Layout from './ui/Layout/Layout.jsx';
import DocumentList from './ui/EmployeeComponents/Inbox/DocumentList.jsx';
import DownloadList from './ui/EmployeeComponents/Downloads/DownloadList';
import DocumentDeptList from './ui/EmployeeComponents/Department/DocumentDeptList';
import DocumentHistoryList from './ui/EmployeeComponents/History/DocumentHistoryList';
import DocumentActionList from './ui/EmployeeComponents/Actions/DocumentActionList.jsx';
import ProtectedRoute from './ui/EmployeeComponents/ProtectedRoute/ProtectedRoute';
import VersionList from './ui/EmployeeComponents/Versions/VersionList.jsx';
import DocumentDownloadList from './ui/EmployeeComponents/DocumentDownloads/DocumentDownloadList.jsx';
import DocumentUpload from './ui/EmployeeComponents/UploadAndRoute/DocumentUpload.jsx';
import EditDocument from './ui/EmployeeComponents/EditDocument/EditDocument.jsx';
import AdminRoute from './ui/AdminComponents/AdminRoute/AdminRoute.jsx';
import DepartmentList from './ui/AdminComponents/DepartmentComponent/DepartmentList.jsx';
import EmployeeList from './ui/AdminComponents/EmployeeComponent/EmployeeList.jsx';
import DepartmentDocumentsList from './ui/AdminComponents/DepartmentDocumentsComponent/DepartmenDocumentsList.jsx';
import DocumentUploadList from './ui/EmployeeComponents/DocumentUploads/DocumentUploadList.jsx';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>         
                <Route path="/login" element={<Login/>}/> 

                <Route element={<ProtectedRoute/>}>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<DocumentList />} />
                        <Route path="downloads" element={<DownloadList />} />
                        <Route path="department" element={<DocumentDeptList />} />
                        <Route path="history" element={<DocumentHistoryList/>} />
                        <Route path="upload" element={<DocumentUpload/>} />
                        <Route path="uploads" element={<DocumentUploadList/>} />
                        <Route path="documents/:documentId/actions" element={<DocumentActionList/>} />
                        <Route path="documents/:documentId/versions" element={<VersionList/>} />
                        <Route path="documents/:documentId/downloads" element={<DocumentDownloadList/>} />
                        <Route path="documents/:documentId/edit" element={<EditDocument/>}/>
                    </Route>

                    <Route element={<AdminRoute />}>
                        <Route path="/" element={<Layout />}>
                        <Route index element={<DepartmentList />} />
                        <Route path="departments" element={<DepartmentList />} />
                        <Route path="employees" element={<EmployeeList />} />
                        <Route path="department/documents" element={<DepartmentDocumentsList />} />
                        </Route>
                    </Route>
                </Route>
                
            </Routes>
        </BrowserRouter>
    );
};

export default App;
