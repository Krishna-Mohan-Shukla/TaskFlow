import { useEffect, useState } from "react";

import DashboardLayout from "../components/layout/DashboardLayout";

import Loader from "../components/common/Loader";

import WelcomeCard from "../components/dashboard/WelcomeCard";
import StatsGrid from "../components/dashboard/StatsGrid";
import QuickActions from "../components/dashboard/QuickActions";
import TodayProgress from "../components/dashboard/TodayProgress";
import RecentTasksTable from "../components/dashboard/RecentTasksTable";
import ActivityTimeline from "../components/dashboard/ActivityTimeline";
import PerformanceSummary from "../components/dashboard/PerformanceSummary";

import { useAuth } from "../context/AuthContext";

import { getDashboardData } from "../components/api/dashboardApi";

const Dashboard = () => {

    const { user } = useAuth();

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [stats, setStats] = useState({

        total: 0,
        pending: 0,
        progress: 0,
        done: 0

    });

    const [tasks, setTasks] = useState([]);

    const [dashboardData, setDashboardData] = useState({});

    useEffect(() => {

        if (user) {

            fetchDashboard();

        }

    }, [user]);

    const fetchDashboard = async () => {

        try {

            setLoading(true);

            setError("");

            const response = await getDashboardData(user.role);
            console.log(response)

            if (user.role === "admin") {

                const dashboard = response.dashboard;

                const allTasks = response.tasks || [];

                setDashboardData(dashboard);

                setTasks(allTasks);

                setStats({

                    total: dashboard.totalTasks,

                    pending: dashboard.pending,

                    progress: dashboard.inProgress,

                    done: dashboard.done

                });

            }

            else {

                const myTasks = response.tasks || [];

                setTasks(myTasks);

                setDashboardData({});

                setStats({

                    total: myTasks.length,

                    pending: myTasks.filter(

                        t => t.status === "Pending"

                    ).length,

                    progress: myTasks.filter(

                        t => t.status === "In Progress"

                    ).length,

                    done: myTasks.filter(

                        t => t.status === "Done"

                    ).length

                });

            }

        }

        catch (err) {

            console.log(err);

            setError("Unable to load dashboard.");

        }

        finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (

            <DashboardLayout>

                <Loader
                    title="Loading Dashboard"
                    subtitle="Preparing your workspace..."
                />

            </DashboardLayout>

        );

    }

    if (error) {

        return (

            <DashboardLayout>

                <div className="py-24 text-center">

                    <h2 className="text-2xl font-bold text-red-600">

                        {error}

                    </h2>

                </div>

            </DashboardLayout>

        );

    }

    return (

        <DashboardLayout>

            {/* Welcome */}

            <WelcomeCard />

            {/* Stats */}

            <div className="mt-8">

                <StatsGrid stats={stats} />

            </div>

            {/* Quick Actions + Progress */}

            <div className="grid xl:grid-cols-2 gap-6 mt-8">

                <QuickActions />

                <TodayProgress

                    completed={stats.done}

                    total={stats.total}

                />

            </div>

            {/* Recent Tasks */}

            <div className="mt-8">

                <RecentTasksTable

                    tasks={tasks.slice(0, 5)}

                    loading={false}

                />

            </div>

            {/* Analytics */}

            <div className="grid xl:grid-cols-2 gap-6 mt-8">

                <ActivityTimeline

                    tasks={tasks}

                />

                <PerformanceSummary

                    tasks={tasks}

                    dashboard={dashboardData}

                />

            </div>

            {/* Future Widgets */}

            {

                user.role === "admin" && (

                    <div className="mt-8">

                        {/* Team Analytics */}
                        {/* Employee Performance */}
                        {/* Department Charts */}
                        {/* Upcoming */}

                    </div>

                )

            }

        </DashboardLayout>

    );

};

export default Dashboard;