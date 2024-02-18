import { useEffect, useState } from "react";
import { isAuthenticated } from "../services/auth-service";
import LoginPage from "../pages/LoginPage";

const ProtectedComponent = ({ component }) => {
    const [auth, setAuth] = useState(isAuthenticated());
    useEffect(_ => {
        setAuth(_ => isAuthenticated());
    }, [auth]);
    return (
        <div>
            { auth ? component : <LoginPage /> };
        </div>
    );
};

export default ProtectedComponent;
