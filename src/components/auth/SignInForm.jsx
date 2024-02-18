import { GoogleOutlined } from "@ant-design/icons";
import { useState } from "react";

const INITIAL_FORM = {
    email: "",
    password: "",
    otp: "null"
};

function SignInForm() {

    const [state, setState] = useState(INITIAL_FORM);
    const [m2fEnabled, setM2fEnabled] = useState(false);

    const handleChange = evt => {
        const { name, value } = evt.target;

        if(name == "email") {
            if(value == "smnavin65@gmail.com") {
                setM2fEnabled(() => true);
            }
        }

        setState({
            ...state,
            [name]: value
        });
    };

    const handleOnSubmit = evt => {
        evt.preventDefault();

        const { email, password, otp } = state;
        alert(`You are login with email: ${email} and password: ${password} otp: ${otp}`);        

        for (const key in state) {
            setState({
                ...state,
                [key]: ""
            });
        }
    };

    return (
        <div className="form-container sign-in-container">
            <form>
                <h1>Sign in</h1>
                <div className="social-container">
                    <a href="#" className="social">
                        <GoogleOutlined />
                    </a>
                </div>
                <span>or use your account</span>
                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={state.email}
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