import './App.css'
import {BrowserRouter, Routes, Route} from "react-router";
import Login from './ui/EmployeeComponents/Login/Login.jsx';
import Layout from './ui/EmployeeComponents/Layout/Layout.jsx'
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
                        <Route path="documents/:documentId/actions" element={<DocumentActionList/>} />
                        <Route path="documents/:documentId/versions" element={<VersionList/>} />
                        <Route path="documents/:documentId/downloads" element={<DocumentDownloadList/>} />
                        <Route path="documents/:documentId/edit" element={<EditDocument/>}/>
                    </Route>

                    <Route element={<AdminRoute/>}></Route>
                </Route>
                
            </Routes>
        </BrowserRouter>
    );
};

export default App;
