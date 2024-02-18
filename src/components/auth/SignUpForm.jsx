import { useState } from "react";
import OAuth from "./OAuth";

const INITIAL_FORM = {
    name: "",
    email: "",
    password: ""
}

const SignUpForm = _ => {
    const [state, setState] = useState(INITIAL_FORM);
    const handleChange = evt => {
        const value = evt.target.value;
        setState({
            ...state,
            [evt.target.name]: value
        });
    };

    const handleOnSubmit = evt => {
        evt.preventDefault();

        const { name, email, password } = state;
        alert(
            `You are sign up with name: ${name} email: ${email} and password: ${password}`
        );

        for (const key in state) {
            setState({
                ...state,
                [key]: ""
            });
        }
    };

    return (
        <div className="form-container sign-up-container">
            <form onSubmit={handleOnSubmit}>
                <h1>Create Account</h1>
                <OAuth />
                <span>or use your email for registration</span>
                <input
                    type="text"
                    name="name"
                    value={state.name}
                    onChange={handleChange}
                    placeholder="Name"
                />
                <input
                    type="email"
                    name="email"
                    value={state.email}
                    onChange={handleChange}
                    placeholder="Email"
                />
                <input
                    type="password"
                    name="password"
                    value={state.password}
                    onChange={handleChange}
                    placeholder="Password"
                />
                <button>Sign Up</button>
            </form>
        </div>
    );
}

export default SignUpForm;
