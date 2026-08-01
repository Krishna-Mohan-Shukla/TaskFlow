import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const Login = () => {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [form, setForm] = useState({

        email: "",

        password: ""

    });

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const res = await api.post("/auth/login", form);

            login(res.data.token, res.data.user);

            navigate("/dashboard");

        }

        catch (err) {

            alert(

                err.response?.data?.message ||

                "Login Failed"

            );

        }

    };

    return (

        <div className="min-h-screen bg-slate-950 flex justify-center items-center">

            <form

                onSubmit={handleSubmit}

                className="w-full max-w-md bg-slate-900 rounded-xl shadow-xl p-8"

            >

                <h1 className="text-white text-3xl font-bold text-center mb-8">

                    Login

                </h1>

                <input

                    type="email"

                    name="email"

                    placeholder="Email"

                    onChange={handleChange}

                    className="w-full mb-4 p-3 rounded-lg bg-slate-800 text-white outline-none"

                />

                <input

                    type="password"

                    name="password"

                    placeholder="Password"

                    onChange={handleChange}

                    className="w-full mb-6 p-3 rounded-lg bg-slate-800 text-white outline-none"

                />

                <button

                    className="w-full bg-blue-600 hover:bg-blue-700 transition rounded-lg p-3 text-white font-semibold"

                >

                    Login

                </button>

                <p className="text-gray-400 mt-5 text-center">

                    Don't have an account?

                    <Link

                        to="/register"

                        className="text-blue-500 ml-2"

                    >

                        Register

                    </Link>

                </p>

            </form>

        </div>

    );

};

export default Login;