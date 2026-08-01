import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import StatusBadge from "../components/layout/StatusBar";

import api from "../services/api";

const Register = () => {

    const navigate = useNavigate();

    const [form, setForm] = useState({

        name: "",

        department: "",

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

            await api.post("/auth/register", form);

            alert("Registration Successful");

            navigate("/login");

        }

        catch (err) {

            alert(

                err.response?.data?.message ||

                "Registration Failed"

            );

        }

    };

    return (

        <div className="min-h-screen bg-slate-950 flex justify-center items-center">

            <form

                onSubmit={handleSubmit}

                className="w-full max-w-lg bg-slate-900 rounded-xl shadow-xl p-8"

            >

                <h1 className="text-3xl text-center text-white font-bold mb-8">

                    Register

                </h1>

                <input

                    name="name"

                    placeholder="Full Name"

                    onChange={handleChange}

                    className="w-full mb-4 p-3 rounded-lg bg-slate-800 text-white"

                />

                <input

                    name="department"

                    placeholder="Department"

                    onChange={handleChange}

                    className="w-full mb-4 p-3 rounded-lg bg-slate-800 text-white"

                />

                <input

                    type="email"

                    name="email"

                    placeholder="Email"

                    onChange={handleChange}

                    className="w-full mb-4 p-3 rounded-lg bg-slate-800 text-white"

                />

                <input

                    type="password"

                    name="password"

                    placeholder="Password"

                    onChange={handleChange}

                    className="w-full mb-6 p-3 rounded-lg bg-slate-800 text-white"

                />

                <button

                    className="w-full bg-blue-600 hover:bg-blue-700 rounded-lg p-3 text-white"

                >

                    Register

                </button>

                <p className="text-center text-gray-400 mt-5">

                    Already have an account?

                    <Link

                        className="text-blue-500 ml-2"

                        to="/login"

                    >

                        Login

                    </Link>

                </p>

            </form>

        </div>

    );

};

export default Register;