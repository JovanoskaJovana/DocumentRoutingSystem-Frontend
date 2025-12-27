import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet, useLocation } from "react-router";
import useAuth from "../../../hooks/useAuth";
import { useState, useEffect } from "react";
import AdminSidebar from "../../AdminComponents/AdminSidebar/AdminSidebar";
import RegularEmployeeSidebar from "./RegularEmployeeSidebar";

const pageTitleFromPath = (pathname) => {
  
  if (pathname === "/") return "Inbox";
  if (pathname.startsWith("/downloads")) return "My Downloads";
  if (pathname.startsWith("/uploads")) return "My Uploads";
  if (pathname.startsWith("/upload")) return "Upload Document";
  if (pathname.startsWith("/history")) return "History";
  if (pathname.startsWith("/department")) return "Department";
  return "";
};


const Layout = () => {

  const { user } = useAuth();
  const location = useLocation();

  const [overrideTitle, setOverrideTitle] = useState("");

  const userName = user?.firstName;
  const isAdmin = user?.role === "ADMIN";
  const isRegularEmployee = user?.employeeType === "REGULAR";
  const defaultTitle = pageTitleFromPath(location.pathname);
  const pageTitle = overrideTitle || defaultTitle;

  const renderSidebar = () => {
    if (isAdmin) return <AdminSidebar/>
    else if (isRegularEmployee) return <RegularEmployeeSidebar/>
    else return <Sidebar/>
  };


  useEffect(() => {
    setOverrideTitle("");
  }, [location.pathname]);

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 via-[#FFFBF7] to-gray-50">
      {renderSidebar()}

      <div className="flex-1 flex flex-col overflow-hidden">

        <Navbar title={pageTitle} userName={userName} />

        <main className="flex-1 overflow-y-auto">

          <Outlet context={{ setPageTitle: setOverrideTitle }} />
        
        </main>
      </div>
    </div>
  );
};

export default Layout;
