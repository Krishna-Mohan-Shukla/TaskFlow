import { useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../components/layout/DashboardLayout";
import TaskForm from "../components/tasks/TaskForm";

import api from "../services/api";

import { useSearchParams } from "react-router-dom";


const AddTask = () => {

    const [searchParams] = useSearchParams();

    const employeeId = searchParams.get("employee");
    
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const handleCreateTask = async (formData) => {

        try {

            setLoading(true);

            const { data } = await api.post(
                "/task/create",
                formData
            );

            alert(data.message);

            navigate("/tasks");

        }

        catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Task Create Failed."
            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <DashboardLayout>

            <div className="max-w-5xl mx-auto py-8">

                <TaskForm
                    employeeId={employeeId}
                    submitText="Assign Task"
                    loading={loading}
                    onSubmit={handleCreateTask}
                />

            </div>

        </DashboardLayout>

    );

};

export default AddTask;