import { useEffect, useMemo, useState,  } from "react";
import { jwtDecode } from "jwt-decode";
import AuthContext from "../contexts/authContext";


const isExpired = (payload) => {

    if (!payload?.exp) return false;
    const now = Date.now();
    return payload.exp <= now;
}

const authProvider = ({children}) => {

    const [state, setState] = useState({
        "user": null,
        "loading": true
    });

    const login = (jwtToken) => {
        try {
            const payload = jwtDecode(jwtToken);
            if (!payload || isExpired(payload)) {
                localStorage.removeItem("token");
                setState ({
                    user:null, 
                    loading: false
                });
                return;
            }
            localStorage.setItem("token", jwtToken);
            setState ({
                    user:payload, 
                    loading: false
            });
        } catch {
            console.error("Invalid token");
            localStorage.removeItem("token");
            setState ({
                user:null, 
                loading: false
            });
        }
    };

    const logout = () => {

        localStorage.removeItem("token");
        setState ({
            user:null, 
            loading: false
        });
    };

    useEffect(() => {

        const token = localStorage.getItem("token");
        try {
            const payload = token ? jwtDecode(token) : null;
            if (payload && !isExpired(payload)) {
                setState ({
                    user: payload, 
                    loading: false
                });
            } else {
                localStorage.removeItem("token");
                setState ({
                    user:null, 
                    loading: false
                });
            }
        } catch {
            localStorage.removeItem("token");
            setState ({
                user:null, 
                loading: false
            });
        }
    }, []);

    const role = state.user?.role || null;
    const hasRole = (r) => role === r;

    const values = useMemo(
        () => ({
            user: state.user,
            loading: state.loading,
            isLoggedIn: !!state.user,
            role,
            hasRole,
            login,
            logout
        }), [state, role]
    );

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    );
    
};

export default authProvider;


