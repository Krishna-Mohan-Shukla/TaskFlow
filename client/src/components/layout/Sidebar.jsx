import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    SquarePlus,
    ClipboardList,
    Users,
    LogOut,
    ChevronLeft,
    ChevronRight,
    FolderKanban
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import NavItem from "./NavItem";

const Sidebar = () => {

    const navigate = useNavigate();

    const { user, logout } = useAuth();

    const [collapsed, setCollapsed] = useState(false);

    const handleLogout = () => {

        logout();

        navigate("/login");

    };

    const menuItems = [

        {
            label: "Dashboard",
            icon: LayoutDashboard,
            to: "/dashboard"
        },

        {
            label: "Add Task",
            icon: SquarePlus,
            to: "/add-task"
        },

        {
            label: "Data Of Tasks",
            icon: ClipboardList,
            to: "/tasks"
        }

    ];

    if (user?.role === "admin") {

        menuItems.push({

            label: "Users",

            icon: Users,

            to: "/users"

        });

    }

    return (

        <aside
            className={`
                h-screen
                sticky
                top-0
                border-r
                border-slate-200
                bg-white
                transition-all
                duration-300
                flex
                flex-col
                ${collapsed ? "w-24" : "w-72"}
            `}
        >

            {/* Logo */}

            <div className="h-20 border-b border-slate-200 flex items-center justify-between px-5">

                <div className="flex items-center gap-3">

                    <div className="w-11 h-11 rounded-2xl bg-slate-900 text-white flex items-center justify-center">

                        <FolderKanban size={22} />

                    </div>

                    {!collapsed && (

                        <div>

                            <h2 className="font-bold text-slate-900">

                                TaskFlow

                            </h2>

                            <p className="text-xs text-slate-500">

                                Employee Manager

                            </p>

                        </div>

                    )}

                </div>

                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="w-8 h-8 rounded-lg hover:bg-slate-100 transition"
                >

                    {

                        collapsed

                            ? <ChevronRight size={18} />

                            : <ChevronLeft size={18} />

                    }

                </button>

            </div>

            {/* User */}

            <div className="px-4 py-5">

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">

                    <div className="flex items-center gap-3">

                        <div className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold">

                            {user?.name?.charAt(0)}

                        </div>

                        {

                            !collapsed && (

                                <div>

                                    <h3 className="font-semibold text-slate-800">

                                        {user?.name}

                                    </h3>

                                    <p className="text-sm text-slate-500 capitalize">

                                        {user?.role}

                                    </p>

                                </div>

                            )

                        }

                    </div>

                </div>

            </div>

            {/* Menu */}

            <div className="flex-1 px-4 space-y-2">

                {

                    menuItems.map((item) => (

                        <NavItem

                            key={item.label}

                            to={item.to}

                            icon={item.icon}

                            label={item.label}

                            collapsed={collapsed}

                        />

                    ))

                }

            </div>

            {/* Logout */}

            <div className="border-t border-slate-200 p-4">

                <button

                    onClick={handleLogout}

                    className="w-full flex items-center gap-3 rounded-xl px-4 py-3 text-red-500 hover:bg-red-50 transition"

                >

                    <LogOut size={20} />

                    {

                        !collapsed && (

                            <span>

                                Logout

                            </span>

                        )

                    }

                </button>

            </div>

        </aside>

    );

};

export default Sidebar;