import LoginPage from "../pages/LoginPage";

const ProtectedComponent = ({ component }) => {
    return (
        <div>
            { false ? component : <LoginPage /> };
        </div>
    );
};

export default ProtectedComponent;
