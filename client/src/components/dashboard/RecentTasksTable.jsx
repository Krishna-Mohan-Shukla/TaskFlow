import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    Search,
    Eye,
    Pencil,
    Trash2,
    Clock3,
    LoaderCircle,
    CircleCheckBig
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

/* -------------------------------------------------------------------------- */
/*                              Status Badge Theme                            */
/* -------------------------------------------------------------------------- */

const statusConfig = {

    Pending: {

        label: "Pending",

        icon: Clock3,

        className: `
            bg-gradient-to-r
            from-amber-50
            to-yellow-100
            text-amber-700
            border
            border-amber-300
            shadow-md
            shadow-amber-200/60
            animate-pulse
        `

    },

    "In Progress": {

        label: "In Progress",

        icon: LoaderCircle,

        className: `
            bg-gradient-to-r
            from-blue-50
            to-cyan-100
            text-blue-700
            border
            border-blue-300
            shadow-md
            shadow-blue-200/60
        `

    },

    Done: {

        label: "Done",

        icon: CircleCheckBig,

        className: `
            bg-gradient-to-r
            from-emerald-50
            to-green-100
            text-emerald-700
            border
            border-emerald-300
            shadow-md
            shadow-emerald-200/60
        `

    }

};

/* -------------------------------------------------------------------------- */
/*                             Priority Badge Theme                           */
/* -------------------------------------------------------------------------- */

const priorityStyles = {

    Low: `
        bg-slate-100
        text-slate-700
        border
        border-slate-200
    `,

    Normal: `
        bg-cyan-100
        text-cyan-700
        border
        border-cyan-200
    `,

    High: `
        bg-orange-100
        text-orange-700
        border
        border-orange-200
    `,

    Urgent: `
        bg-gradient-to-r
        from-red-500
        to-rose-600
        text-white
        shadow-lg
        shadow-red-300
        animate-pulse
    `

};

/* -------------------------------------------------------------------------- */
/*                           Recent Tasks Component                           */
/* -------------------------------------------------------------------------- */

const RecentTasksTable = ({

    tasks = [],

    loading = false,

    onDelete

}) => {

    const navigate = useNavigate();

    const { user } = useAuth();

    const [search, setSearch] = useState("");

    /* ---------------------------------------------------------------------- */
    /*                               Search Filter                            */
    /* ---------------------------------------------------------------------- */

    const filteredTasks = useMemo(() => {

        const keyword = search.trim().toLowerCase();

        if (!keyword) {

            return tasks;

        }

        return tasks.filter((task) => {

            return (

                (task.title ?? "")
                    .toLowerCase()
                    .includes(keyword)

                ||

                (task.client ?? "")
                    .toLowerCase()
                    .includes(keyword)

                ||

                (task.department ?? "")
                    .toLowerCase()
                    .includes(keyword)

                ||

                (task.user?.name ?? "")
                    .toLowerCase()
                    .includes(keyword)

            );

        });

    }, [tasks, search]);

    /* ---------------------------------------------------------------------- */
    /*                               Loading UI                               */
    /* ---------------------------------------------------------------------- */

    if (loading) {

        return (

            <div
                className="
                    flex
                    flex-col
                    items-center
                    justify-center
                    gap-5
                    rounded-3xl
                    border
                    border-slate-200
                    bg-white
                    py-20
                    shadow-sm
                "
            >

                <LoaderCircle
                    size={44}
                    className="animate-spin text-indigo-600"
                />

                <div className="text-center">

                    <h3 className="text-lg font-semibold text-slate-800">

                        Loading Tasks...

                    </h3>

                    <p className="mt-1 text-sm text-slate-500">

                        Please wait while we fetch your latest tasks.

                    </p>

                </div>

            </div>

        );

    }

    return (

        <div
            className="
            mt-8
            overflow-hidden
            rounded-3xl
            border
            border-slate-200
            bg-white
            shadow-xl
            shadow-slate-200/40
            transition-all
            duration-300
        "
        >

            {/* ============================== */}
            {/* Header */}
            {/* ============================== */}

            <div
                className="
                flex
                flex-col
                gap-6
                border-b
                border-slate-200
                bg-gradient-to-r
                from-white
                via-slate-50
                to-slate-100
                p-7

                lg:flex-row
                lg:items-center
                lg:justify-between
            "
            >

                {/* Left */}

                <div>

                    <h2
                        className="
                        text-2xl
                        font-bold
                        tracking-tight
                        text-slate-900
                    "
                    >

                        Recent Tasks

                    </h2>

                    <p
                        className="
                        mt-2
                        text-sm
                        text-slate-500
                    "
                    >

                        Manage and monitor your latest task activities.

                    </p>

                </div>

                {/* Right */}

                <div className="relative w-full lg:w-[340px]">

                    <Search
                        size={18}
                        className="
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        text-slate-400
                        transition-all
                    "
                    />

                    <input

                        type="text"

                        value={search}

                        onChange={(e) => setSearch(e.target.value)}

                        placeholder="Search task, client or employee..."

                        className="
                        w-full
                        rounded-2xl
                        border
                        border-slate-200
                        bg-slate-50
                        py-3
                        pl-12
                        pr-4
                        text-sm
                        outline-none
                        transition-all
                        duration-300

                        focus:border-indigo-500
                        focus:bg-white
                        focus:ring-4
                        focus:ring-indigo-100
                    "

                    />

                </div>

            </div>

            {/* ============================== */}
            {/* Table */}
            {/* ============================== */}

            <div className="overflow-x-auto">

                <table className="min-w-full">

                    <thead>

                        <tr
                            className="
                            sticky
                            top-0
                            z-10

                            border-b
                            border-slate-200

                            bg-slate-100

                            text-xs
                            font-semibold
                            uppercase
                            tracking-wider
                            text-slate-600
                        "
                        >

                            {

                                user?.role === "admin" && (

                                    <th
                                        className="
                                        whitespace-nowrap
                                        px-6
                                        py-4
                                        text-left
                                    "
                                    >

                                        Employee

                                    </th>

                                )

                            }

                            <th
                                className="
                                whitespace-nowrap
                                px-6
                                py-4
                                text-left
                            "
                            >

                                Client

                            </th>

                            <th
                                className="
                                whitespace-nowrap
                                px-6
                                py-4
                                text-left
                            "
                            >

                                Task

                            </th>

                            <th
                                className="
                                whitespace-nowrap
                                px-6
                                py-4
                                text-left
                            "
                            >

                                Priority

                            </th>

                            <th
                                className="
                                whitespace-nowrap
                                px-6
                                py-4
                                text-left
                            "
                            >

                                Status

                            </th>

                            <th
                                className="
                                whitespace-nowrap
                                px-6
                                py-4
                                text-left
                            "
                            >

                                Working Time

                            </th>

                            <th
                                className="
                                whitespace-nowrap
                                px-6
                                py-4
                                text-center
                            "
                            >

                                Actions

                            </th>

                        </tr>

                    </thead>
                    <tbody>

                        {

                            filteredTasks.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan={user?.role === "admin" ? 7 : 6}
                                        className="py-24"
                                    >

                                        <div className="flex flex-col items-center justify-center gap-3">

                                            <Search
                                                size={42}
                                                className="text-slate-300"
                                            />

                                            <h3 className="text-lg font-semibold text-slate-700">

                                                No Tasks Found

                                            </h3>

                                            <p className="text-sm text-slate-500">

                                                Try searching with another keyword.

                                            </p>

                                        </div>

                                    </td>

                                </tr>

                            )

                                :

                                filteredTasks.map((task) => {

                                    const StatusIcon =
                                        statusConfig[task.status]?.icon;

                                    return (

                                        <tr

                                            key={task._id}

                                            className="
                            border-b
                            border-slate-100

                            transition-all
                            duration-300

                            hover:bg-gradient-to-r
                            hover:from-slate-50
                            hover:to-indigo-50

                            hover:shadow-md
                        "

                                        >

                                            {/* Employee */}

                                            {

                                                user?.role === "admin" && (

                                                    <td className="px-6 py-5">

                                                        <div>

                                                            <h4 className="font-semibold text-slate-800">

                                                                {task.user?.name}

                                                            </h4>

                                                            <p className="text-xs text-slate-500">

                                                                {task.department}

                                                            </p>

                                                        </div>

                                                    </td>

                                                )

                                            }

                                            {/* Client */}

                                            <td className="px-6 py-5">

                                                <span className="font-medium text-slate-700">

                                                    {task.client}

                                                </span>

                                            </td>

                                            {/* Task */}

                                            <td className="px-6 py-5">

                                                <div>

                                                    <h4 className="font-semibold text-slate-800">

                                                        {task.title}

                                                    </h4>

                                                    {

                                                        task.description && (

                                                            <p className="mt-1 line-clamp-1 text-xs text-slate-500">

                                                                {task.description}

                                                            </p>

                                                        )

                                                    }

                                                </div>

                                            </td>

                                            {/* Priority */}

                                            <td className="px-6 py-5">

                                                <span

                                                    className={`
                                    inline-flex
                                    items-center
                                    rounded-full
                                    px-4
                                    py-1.5
                                    text-xs
                                    font-semibold
                                    transition-all
                                    duration-300
                                    hover:scale-105
                                    ${priorityStyles[task.priority]}
                                `}

                                                >

                                                    {task.priority}

                                                </span>

                                            </td>

                                            {/* Status */}

                                            <td className="px-6 py-5">

                                                <span

                                                    className={`
                                    inline-flex
                                    items-center
                                    gap-2
                                    rounded-full
                                    px-4
                                    py-1.5
                                    text-xs
                                    font-semibold
                                    transition-all
                                    duration-300
                                    hover:scale-105
                                    ${statusConfig[task.status]?.className}
                                `}

                                                >

                                                    {

                                                        StatusIcon && (

                                                            <StatusIcon

                                                                size={15}

                                                                className={

                                                                    task.status === "Pending"

                                                                        ? "animate-pulse"

                                                                        : task.status === "In Progress"

                                                                            ? "animate-spin"

                                                                            : "animate-bounce"

                                                                }

                                                            />

                                                        )

                                                    }

                                                    {task.status}

                                                </span>

                                            </td>

                                            {/* Time */}

                                            <td className="px-6 py-5">

                                                <span
                                                    className="
                                    rounded-xl
                                    bg-slate-100
                                    px-3
                                    py-2
                                    text-sm
                                    font-medium
                                    text-slate-700
                                "
                                                >

                                                    {task.workHours || 0}h {" "}

                                                    {task.workMinutes || 0}m

                                                </span>

                                            </td>

                                            {/* Actions */}

                                            <td className="px-6 py-5">

                                                <div className="flex justify-center gap-3">

                                                    {/* View */}

                                                    <button

                                                        onClick={() =>
                                                            navigate(`/task/${task._id}`)
                                                        }

                                                        className="
                                        rounded-xl
                                        bg-slate-100
                                        p-2.5

                                        transition-all
                                        duration-300

                                        hover:-translate-y-1
                                        hover:bg-slate-900
                                        hover:text-white
                                    "

                                                    >

                                                        <Eye size={18} />

                                                    </button>

                                                    {/* Edit */}

                                                    <button

                                                        onClick={() =>
                                                            navigate(`/task/edit/${task._id}`)
                                                        }

                                                        className="
                                        rounded-xl
                                        bg-blue-100
                                        p-2.5
                                        text-blue-700

                                        transition-all
                                        duration-300

                                        hover:-translate-y-1
                                        hover:bg-blue-600
                                        hover:text-white
                                    "

                                                    >

                                                        <Pencil size={18} />

                                                    </button>

                                                    {/* Delete */}

                                                    {

                                                        user?.role === "admin" && (

                                                            <button

                                                                onClick={() =>
                                                                    onDelete?.(task._id)
                                                                }

                                                                className="
                                                rounded-xl
                                                bg-red-100
                                                p-2.5
                                                text-red-700

                                                transition-all
                                                duration-300

                                                hover:-translate-y-1
                                                hover:bg-red-600
                                                hover:text-white
                                            "

                                                            >

                                                                <Trash2 size={18} />

                                                            </button>

                                                        )

                                                    }

                                                </div>

                                            </td>

                                        </tr>

                                    );

                                })

                        }

                    </tbody>

                </table>

            </div>

        </div>

    );

};

export default RecentTasksTable;