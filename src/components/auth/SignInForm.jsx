import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isM2FEnabled, login, isAuthenticated } from "../../services/auth-service";
import OAuth from "./OAuth";

const INITIAL_FORM = {
    userName: "",
    password: "",
    otp: "null"
};

const SignInForm = _ => {

    const navigate = useNavigate();
    const [state, setState] = useState(INITIAL_FORM);
    const [m2fEnabled, setM2fEnabled] = useState(false);
    const [authenticated, setAuthenticated] = useState(isAuthenticated());

    const handleChange = evt => {
        const { name, value } = evt.target;
        if (name == "userName") {
            isM2FEnabled(value)
                .then(s => {
                    setM2fEnabled(_ => s.data);
                });
        }
        setState({
            ...state,
            [name]: value
        });
    };

    const handleOnSubmit = evt => {
        evt.preventDefault();
        const auth = login(state);
        setAuthenticated(_ => auth);
    };

    useEffect(_ => {
        if(authenticated)
            navigate("/");
    }, [authenticated]);

    return (
        <div className="form-container sign-in-container">
            <form>
                <h1>Sign in</h1>
                <OAuth />
                <span>or use your account</span>
                <input
                    type="userName"
                    placeholder="User Name"
                    name="userName"
                    value={state.userName}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={state.password}
                    onChange={handleChange}
                />
                {
                    m2fEnabled &&
                    <input
                        type="number"
                        name="otp"
                        placeholder="Secure Id"
                        value={state.otp}
                        onChange={handleChange}
                    />
                }
                <a href="#">Forgot your password?</a>
                <button onClick={handleOnSubmit}>Sign In</button>
            </form>
        </div>
    );
}

export default SignInForm;