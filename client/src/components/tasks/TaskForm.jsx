import { useState, useEffect } from "react";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

const defaultForm = {
    user: "",
    department: "",
    client: "",
    title: "",
    description: "",
    priority: "Normal",
    taskDate: ""
};

const TaskForm = ({
    initialValues = defaultForm,
    onSubmit,
    loading = false,
    submitText = "Create Task"
}) => {

    const { user: loggedUser } = useAuth();

    const [employees, setEmployees] = useState([]);

    const [form, setForm] = useState(defaultForm);

    useEffect(() => {

        if (initialValues) {

            setForm({
                ...defaultForm,
                ...initialValues,
                taskDate: initialValues.taskDate
                    ? initialValues.taskDate.substring(0, 10)
                    : ""
            });

        }

    }, [initialValues]);

    useEffect(() => {

        if (loggedUser?.role === "admin") {

            loadEmployees();

        }

    }, [loggedUser]);

    const loadEmployees = async () => {

        try {

            const { data } = await api.get("/admin/users");

            setEmployees(data.users || []);

        }

        catch (err) {

            console.log(err);

        }

    };

    const handleChange = (e) => {

        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        if (
            !form.department ||
            !form.client ||
            !form.title ||
            !form.taskDate
        ) {

            return alert("Please fill all required fields.");

        }

        if (
            loggedUser?.role === "admin" &&
            !form.user
        ) {

            return alert("Please select employee.");

        }

        onSubmit(form);

    };

    return (

        <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8"
        >

            <h2 className="text-3xl font-bold mb-8">
                {submitText}
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

                {
                    loggedUser?.role === "admin" && (

                        <div>

                            <label className="font-medium">

                                Assign Employee

                            </label>

                            <select
                                name="user"
                                value={form.user}
                                onChange={handleChange}
                                className="mt-2 w-full border rounded-xl p-3"
                            >

                                <option value="">
                                    Select Employee
                                </option>

                                {
                                    employees.map(emp => (

                                        <option
                                            key={emp._id}
                                            value={emp._id}
                                        >

                                            {emp.name} ({emp.department})

                                        </option>

                                    ))
                                }

                            </select>

                        </div>

                    )
                }

                <div>

                    <label>Department</label>

                    <input
                        name="department"
                        value={form.department}
                        onChange={handleChange}
                        className="mt-2 w-full border rounded-xl p-3"
                    />

                </div>

                <div>

                    <label>Client</label>

                    <input
                        name="client"
                        value={form.client}
                        onChange={handleChange}
                        className="mt-2 w-full border rounded-xl p-3"
                    />

                </div>

                <div>

                    <label>Task Title</label>

                    <input
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        className="mt-2 w-full border rounded-xl p-3"
                    />

                </div>

                <div>

                    <label>Priority</label>

                    <select
                        name="priority"
                        value={form.priority}
                        onChange={handleChange}
                        className="mt-2 w-full border rounded-xl p-3"
                    >

                        <option>Low</option>
                        <option>Normal</option>
                        <option>High</option>
                        <option>Urgent</option>

                    </select>

                </div>

                <div>

                    <label>Task Date</label>

                    <input
                        type="date"
                        name="taskDate"
                        value={form.taskDate}
                        onChange={handleChange}
                        className="mt-2 w-full border rounded-xl p-3"
                    />

                </div>

            </div>

            <div className="mt-6">

                <label>Description</label>

                <textarea
                    rows="6"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    className="mt-2 w-full border rounded-xl p-3"
                />

            </div>

            <div className="flex justify-end mt-8">

                <button
                    disabled={loading}
                    className="bg-indigo-600 text-white px-8 py-3 rounded-xl"
                >

                    {
                        loading
                            ? "Please Wait..."
                            : submitText
                    }

                </button>

            </div>

        </form>

    );

};

export default TaskForm;