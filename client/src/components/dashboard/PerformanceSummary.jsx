import {
    TrendingUp,
    Clock3,
    CheckCircle2,
    Users,
    Award,
    Timer,
    BarChart3
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

const Progress = ({ value, color }) => (

    <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">

        <div
            className={`h-full rounded-full ${color}`}
            style={{ width: `${Math.min(value, 100)}%` }}
        />

    </div>

);

const PerformanceSummary = ({

    tasks = [],

    dashboard = {}

}) => {

    const { user } = useAuth();

    if (user?.role === "admin") {

        const totalEmployees = dashboard?.totalUsers || 0;

        const totalTasks = dashboard?.totalTasks || 0;

        const completed = dashboard?.done || 0;

        const completionRate = totalTasks
            ? Math.round((completed / totalTasks) * 100)
            : 0;

        const totalHours = tasks.reduce(

            (sum, task) => {

                return sum +
                    ((task.totalWorkingSeconds || 0) / 3600);

            },

            0

        );

        const averageHours = totalEmployees
            ? (totalHours / totalEmployees).toFixed(1)
            : 0;

        const employeeMap = {};

        tasks.forEach((task) => {

            const name =
                task.user?.name ||
                task.assignee?.name ||
                "Unknown";

            if (!name) return;

            employeeMap[name] =

                (employeeMap[name] || 0) +

                (task.workHours || 0);

        });

        const topPerformer =

            Object.entries(employeeMap)

                .sort((a, b) => b[1] - a[1])[0]?.[0] ||

            "--";

        return (

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

                <div className="flex items-center justify-between">

                    <div>

                        <h2 className="text-xl font-bold text-slate-900">

                            Team Performance

                        </h2>

                        <p className="text-sm text-slate-500 mt-1">

                            Overall organization analytics

                        </p>

                    </div>

                    <BarChart3 className="text-slate-400" size={30} />

                </div>

                <div className="grid md:grid-cols-2 gap-5 mt-8">

                    <div className="rounded-2xl bg-slate-50 p-5">

                        <div className="flex items-center gap-3">

                            <Users className="text-indigo-600" />

                            <span>Total Employees</span>

                        </div>

                        <h3 className="text-3xl font-bold mt-3">

                            {totalEmployees}

                        </h3>

                    </div>

                    <div className="rounded-2xl bg-slate-50 p-5">

                        <div className="flex items-center gap-3">

                            <Award className="text-yellow-600" />

                            <span>Top Performer</span>

                        </div>

                        <h3 className="text-xl font-bold mt-3">

                            {topPerformer}

                        </h3>

                    </div>

                    <div className="rounded-2xl bg-slate-50 p-5">

                        <div className="flex items-center gap-3">

                            <TrendingUp className="text-green-600" />

                            <span>Completion Rate</span>

                        </div>

                        <h3 className="text-3xl font-bold mt-3">

                            {completionRate}%

                        </h3>

                        <div className="mt-3">

                            <Progress
                                value={completionRate}
                                color="bg-green-500"
                            />
                        </div>

                    </div>

                    <div className="rounded-2xl bg-slate-50 p-5">

                        <div className="flex items-center gap-3">

                            <Timer className="text-blue-600" />

                            <span>Average Hours</span>

                        </div>

                        <h3 className="text-3xl font-bold mt-3">

                            {averageHours}h

                        </h3>

                    </div>

                </div>

            </div>

        );

    }

    // ================= USER =================

    const totalTasks = tasks.length;

    const completed = tasks.filter(

        (t) => t.status === "Done"

    ).length;

    const pending = tasks.filter(

        (t) => t.status === "Pending"

    ).length;

    const totalHours = tasks.reduce(

        (sum, task) => sum + (task.workHours || 0),

        0

    );

    const completionRate = totalTasks
        ? Math.round((completed / totalTasks) * 100)
        : 0;

    const pendingRate = totalTasks
        ? Math.round((pending / totalTasks) * 100)
        : 0;

    const productivity = Math.min(

        Math.round(completionRate * 0.8 + totalHours * 2),

        100

    );

    return (

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="flex items-center justify-between">

                <div>

                    <h2 className="text-xl font-bold text-slate-900">

                        Performance Summary

                    </h2>

                    <p className="text-sm text-slate-500 mt-1">

                        Your work insights

                    </p>

                </div>

                <TrendingUp
                    className="text-slate-400"
                    size={30}
                />

            </div>

            <div className="grid md:grid-cols-2 gap-5 mt-8">

                <div className="rounded-2xl bg-slate-50 p-5">

                    <div className="flex items-center gap-3">

                        <CheckCircle2 className="text-green-600" />

                        <span>Completion Rate</span>

                    </div>

                    <h3 className="text-3xl font-bold mt-3">

                        {completionRate}%

                    </h3>

                    <div className="mt-3">

                        <Progress
                            value={completionRate}
                            color="bg-green-500"
                        />

                    </div>

                </div>

                <div className="rounded-2xl bg-slate-50 p-5">

                    <div className="flex items-center gap-3">

                        <Clock3 className="text-blue-600" />

                        <span>Total Working Hours</span>

                    </div>

                    <h3 className="text-3xl font-bold mt-3">

                        {totalHours}h

                    </h3>

                </div>

                <div className="rounded-2xl bg-slate-50 p-5">

                    <div className="flex items-center gap-3">

                        <Timer className="text-orange-600" />

                        <span>Pending Rate</span>

                    </div>

                    <h3 className="text-3xl font-bold mt-3">

                        {pendingRate}%

                    </h3>

                    <div className="mt-3">

                        <Progress
                            value={pendingRate}
                            color="bg-orange-500"
                        />

                    </div>

                </div>

                <div className="rounded-2xl bg-slate-50 p-5">

                    <div className="flex items-center gap-3">

                        <Award className="text-violet-600" />

                        <span>Productivity Score</span>

                    </div>

                    <h3 className="text-3xl font-bold mt-3">

                        {productivity}/100

                    </h3>

                    <div className="mt-3">

                        <Progress
                            value={productivity}
                            color="bg-violet-500"
                        />

                    </div>

                </div>

            </div>

        </div>

    );

};

export default PerformanceSummary;