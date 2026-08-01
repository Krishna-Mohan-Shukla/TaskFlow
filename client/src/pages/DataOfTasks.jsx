import { useEffect, useState } from "react";

import DashboardLayout from "../components/layout/DashboardLayout";

import api from "../services/api";

import TaskTable from "../components/dashboard/TaskTable";

import TaskToolbar from "../components/tasks/TaskToolbar";

import Loader from "../components/common/Loader";

const DataOfTasks = () => {

    const [search, setSearch] = useState("");

    const [department, setDepartment] = useState("");

    const [status, setStatus] = useState("");

    const [priority, setPriority] = useState("");

    const [tasks, setTasks] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchTasks();

    }, []);

    const fetchTasks = async () => {

        try {

            const res = await api.get("/task/my-tasks");

            setTasks(res.data.tasks);

        }

        catch (err) {

            console.log(err);

        }

        finally {

            setLoading(false);

        }

    };

    if (loading) {

        return <Loader />;

    }


    const departments = [
        ...new Set(tasks.map(task => task.department))
    ];

    const filteredTasks = tasks.filter(task => {

        const matchesSearch =
            task.title.toLowerCase().includes(search.toLowerCase()) ||
            task.client.toLowerCase().includes(search.toLowerCase());

        const matchesDepartment =
            !department || task.department === department;

        const matchesStatus =
            !status || task.status === status;

        const matchesPriority =
            !priority || task.priority === priority;

        return (
            matchesSearch &&
            matchesDepartment &&
            matchesStatus &&
            matchesPriority
        );

    });

    return (

        <DashboardLayout>

            <TaskToolbar
                search={search}
                setSearch={setSearch}

                department={department}
                setDepartment={setDepartment}

                status={status}
                setStatus={setStatus}

                priority={priority}
                setPriority={setPriority}

                departments={departments}

                onReset={() => {
                    setSearch("");
                    setDepartment("");
                    setStatus("");
                    setPriority("");
                }}
            />

            <TaskTable
                tasks={filteredTasks}
            />

        </DashboardLayout>

    );

};


export default DataOfTasks;