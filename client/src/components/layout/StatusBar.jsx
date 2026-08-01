import { useEffect, useState } from "react";

import {
    User,
    ShieldCheck,
    Building2,
    Clock3,
    CalendarDays,
    ListTodo,
    Server
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

import api from "../../services/api";

const StatusBar = () => {

    const { user } = useAuth();

    const [currentTime, setCurrentTime] = useState(new Date());

    const [taskCount, setTaskCount] = useState(0);

    const [serverStatus, setServerStatus] = useState("Online");

    useEffect(() => {

        const timer = setInterval(() => {

            setCurrentTime(new Date());

        }, 1000);

        return () => clearInterval(timer);

    }, []);

    useEffect(() => {

        if (user) {

            loadTaskCount();

        }

    }, [user]);

    const loadTaskCount = async () => {

        try {

            if (user.role === "admin") {

                const res = await api.get("/admin/tasks");

                setTaskCount(res.data.totalTasks || 0);

            }

            else {

                const res = await api.get("/tasks/my-tasks");

                setTaskCount(res.data.totalTasks || 0);

            }

            setServerStatus("Online");

        }

        catch (err) {

            console.log(err);

            setServerStatus("Offline");

        }

    };

    return (

        <footer
            className="
                border-t
                border-slate-200
                bg-white
                px-8
                py-3
            "
        >

            <div
                className="
                    flex
                    flex-wrap
                    items-center
                    justify-between
                    gap-4
                    text-sm
                    text-slate-600
                "
            >

                {/* Left */}

                <div className="flex flex-wrap items-center gap-6">

                    <div className="flex items-center gap-2">

                        <User size={16} />

                        <span>

                            {user?.name}

                        </span>

                    </div>

                    <div className="flex items-center gap-2">

                        <Building2 size={16} />

                        <span>

                            {user?.department}

                        </span>

                    </div>

                    <div className="flex items-center gap-2">

                        <ShieldCheck size={16} />

                        <span className="capitalize">

                            {user?.role}

                        </span>

                    </div>

                </div>

                {/* Center */}

                <div className="flex flex-wrap items-center gap-6">

                    <div className="flex items-center gap-2">

                        <ListTodo size={16} />

                        <span>

                            {taskCount} Tasks

                        </span>

                    </div>

                    <div className="flex items-center gap-2">

                        <Server
                            size={16}
                            className={
                                serverStatus === "Online"
                                    ? "text-green-600"
                                    : "text-red-600"
                            }
                        />

                        <span
                            className={
                                serverStatus === "Online"
                                    ? "text-green-600 font-medium"
                                    : "text-red-600 font-medium"
                            }
                        >

                            {serverStatus}

                        </span>

                    </div>

                </div>

                {/* Right */}

                <div className="flex flex-wrap items-center gap-6">

                    <div className="flex items-center gap-2">

                        <CalendarDays size={16} />

                        <span>

                            {currentTime.toLocaleDateString("en-IN")}

                        </span>

                    </div>

                    <div className="flex items-center gap-2">

                        <Clock3 size={16} />

                        <span>

                            {currentTime.toLocaleTimeString("en-IN")}

                        </span>

                    </div>

                    <div
                        className="
                            rounded-lg
                            bg-slate-100
                            px-3
                            py-1
                            font-semibold
                            text-slate-700
                        "
                    >

                        TaskFlow v2.0

                    </div>

                </div>

            </div>

        </footer>

    );

};

export default StatusBar;