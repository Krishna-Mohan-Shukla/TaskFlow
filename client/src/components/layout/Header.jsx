import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import {
    Bell,
    Search,
    CalendarDays,
    UserCircle2
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

const Header = () => {

    const { user } = useAuth();

    const location = useLocation();

    const pageTitle = useMemo(() => {

        const routes = {

            "/dashboard": "Dashboard",

            "/add-task": "Add Task",

            "/tasks": "Data Of Tasks",

            "/users": "Users",

            "/profile": "Profile"

        };

        return routes[location.pathname] || "Dashboard";

    }, [location.pathname]);

    const greeting = () => {

        const hour = new Date().getHours();

        if (hour < 12) return "Good Morning";

        if (hour < 18) return "Good Afternoon";

        return "Good Evening";

    };

    const today = new Date().toLocaleDateString("en-IN", {

        weekday: "long",

        day: "numeric",

        month: "long",

        year: "numeric"

    });

    return (

        <header className="sticky top-0 z-30 bg-white border-b border-slate-200">

            <div className="flex items-center justify-between px-8 py-5">

                {/* Left */}

                <div>

                    <h1 className="text-2xl font-bold text-slate-900">

                        {pageTitle}

                    </h1>

                    <p className="text-sm text-slate-500 mt-1">

                        {greeting()}, {user?.name}

                    </p>

                </div>

                {/* Right */}

                <div className="flex items-center gap-5">

                    {/* Search */}

                    <div className="relative hidden lg:block">

                        <Search
                            size={18}
                            className="absolute left-4 top-3 text-slate-400"
                        />

                        <input

                            type="text"

                            placeholder="Search..."

                            className="
                                w-72
                                rounded-xl
                                border
                                border-slate-200
                                bg-slate-50
                                py-3
                                pl-11
                                pr-4
                                outline-none
                                transition
                                focus:border-blue-500
                                focus:bg-white
                            "

                        />

                    </div>

                    {/* Date */}

                    <div className="hidden xl:flex items-center gap-2 text-slate-600">

                        <CalendarDays size={18} />

                        <span className="text-sm">

                            {today}

                        </span>

                    </div>

                    {/* Notification */}

                    <button
                        className="
                            relative
                            h-11
                            w-11
                            rounded-xl
                            bg-slate-100
                            hover:bg-slate-200
                            transition
                            flex
                            items-center
                            justify-center
                        "
                    >

                        <Bell size={20} />

                        <span
                            className="
                                absolute
                                top-2
                                right-2
                                h-2
                                w-2
                                rounded-full
                                bg-red-500
                            "
                        />

                    </button>

                    {/* Profile */}

                    <div
                        className="
                            flex
                            items-center
                            gap-3
                            rounded-xl
                            border
                            border-slate-200
                            bg-slate-50
                            px-3
                            py-2
                        "
                    >

                        <UserCircle2
                            size={38}
                            className="text-slate-500"
                        />

                        <div className="hidden md:block">

                            <p className="font-semibold text-slate-800">

                                {user?.name}

                            </p>

                            <p className="text-xs text-slate-500 capitalize">

                                {user?.role}

                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </header>

    );

};

export default Header;