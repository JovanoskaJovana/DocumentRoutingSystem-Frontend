import './App.css'
import {BrowserRouter, Routes, Route} from "react-router";
import Login from "./ui/components/auth/Login";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
