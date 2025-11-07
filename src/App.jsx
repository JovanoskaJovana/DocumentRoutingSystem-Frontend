import './App.css'
import {BrowserRouter, Routes, Route, Navigate} from "react-router";
import Login from "./ui/components/Login/Login";
import Layout from './ui/components/Layout/Layout';
import DocumentList from './ui/components/inbox/DocumentList';
import DownloadList from './ui/components/Downloads/DownloadList';
import DocumentDeptList from './ui/components/Department/DocumentDeptList';
import DocumentHistoryList from './ui/components/History/DocumentHistoryList';
import DocumentActionList from './ui/components/Actions/DocumentActionList.jsx';
import ProtectedRoute from './ui/components/ProtectedRoute/ProtectedRoute';
import VersionList from './ui/components/Versions/VersionList.jsx';

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
                        <Route path="documents/:documentId/actions" element={<DocumentActionList/>} />
                        <Route path="documents/:documentId/versions" element={<VersionList/>} />
                    </Route>
                </Route>
                
            </Routes>
        </BrowserRouter>
    );
};

export default App;
