import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import DashboardLayout from "../components/layout/DashboardLayout";
import api from "../services/api";

const EditTask = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [form, setForm] = useState({

        department: "",
        client: "",
        title: "",
        description: "",
        priority: "Normal",
        taskDate: "",
        remarks: ""

    });

    useEffect(() => {

        loadTask();

    }, []);

    const loadTask = async () => {

        try {

            const res = await api.get(`/task/${id}`);

            const task = res.data.task;

            setForm({

                department: task.department || "",

                client: task.client || "",

                title: task.title || "",

                description: task.description || "",

                priority: task.priority || "Normal",

                taskDate: task.taskDate
                    ? task.taskDate.substring(0, 10)
                    : "",

                remarks: task.remarks || ""

            });

        }

        catch (err) {

            console.log(err);

            alert("Unable to load task.");

        }

        finally {

            setLoading(false);

        }

    };

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setSaving(true);

            await api.put(`/task/update/${id}`, form);

            alert("Task Updated Successfully");

            navigate("/tasks");

        }

        catch (err) {

            console.log(err);

            alert(err.response?.data?.message || "Update Failed");

        }

        finally {

            setSaving(false);

        }

    };

    if (loading) {

        return (

            <DashboardLayout>

                <div className="py-32 text-center">

                    Loading Task...

                </div>

            </DashboardLayout>

        );

    }

    return (

        <DashboardLayout>

            <div className="max-w-5xl mx-auto">

                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">

                    <h1 className="text-3xl font-bold text-slate-800 mb-8">

                        Edit Task

                    </h1>

                    <form
                        onSubmit={handleSubmit}
                        className="grid md:grid-cols-2 gap-6"
                    >

                        <input
                            name="department"
                            value={form.department}
                            onChange={handleChange}
                            placeholder="Department"
                            className="border rounded-xl p-3"
                        />

                        <input
                            name="client"
                            value={form.client}
                            onChange={handleChange}
                            placeholder="Client"
                            className="border rounded-xl p-3"
                        />

                        <input
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            placeholder="Task Title"
                            className="border rounded-xl p-3 md:col-span-2"
                        />

                        <textarea
                            rows={5}
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            placeholder="Description"
                            className="border rounded-xl p-3 md:col-span-2"
                        />

                        <select
                            name="priority"
                            value={form.priority}
                            onChange={handleChange}
                            className="border rounded-xl p-3"
                        >

                            <option>Low</option>
                            <option>Normal</option>
                            <option>High</option>
                            <option>Urgent</option>

                        </select>

                        <input
                            type="date"
                            name="taskDate"
                            value={form.taskDate}
                            onChange={handleChange}
                            className="border rounded-xl p-3"
                        />

                        <textarea
                            rows={4}
                            name="remarks"
                            value={form.remarks}
                            onChange={handleChange}
                            placeholder="Remarks"
                            className="border rounded-xl p-3 md:col-span-2"
                        />

                        <div className="md:col-span-2 flex justify-end gap-4">

                            <button
                                type="button"
                                onClick={() => navigate("/tasks")}
                                className="px-6 py-3 rounded-xl border"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                disabled={saving}
                                className="px-8 py-3 rounded-xl bg-slate-900 text-white"
                            >

                                {
                                    saving
                                        ? "Updating..."
                                        : "Update Task"
                                }

                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </DashboardLayout>

    );

};

export default EditTask;