import api from "../../services/api";

export const getDashboardData = async (role) => {

    if (role === "admin") {

        const dashboardRes = await api.get("/admin/dashboard");

        const tasksRes = await api.get("/admin/tasks");

        return {

            dashboard: dashboardRes.data,

            tasks: tasksRes.data.tasks || []

        };

    }

    const myTasksRes = await api.get("/task/my-tasks");

    return {

        tasks: myTasksRes.data.tasks || []

    };

};