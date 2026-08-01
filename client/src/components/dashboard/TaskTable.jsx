import {
    Eye,
    Pencil,
    Trash2,
    Play,
    Square
} from "lucide-react";

import { Link } from "react-router-dom";

const priorityStyle = {
    Low: "bg-emerald-100 text-emerald-700",
    Normal: "bg-blue-100 text-blue-700",
    High: "bg-orange-100 text-orange-700",
    Urgent: "bg-red-100 text-red-700"
};

const statusStyle = {
    Pending: "bg-slate-200 text-slate-700",
    "In Progress": "bg-amber-100 text-amber-700",
    Done: "bg-emerald-100 text-emerald-700"
};

const TaskTable = ({
    tasks = [],
    role,
    onDelete,
    onStart,
    onStop
}) => {

    return (

        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">

            <div className="overflow-x-auto">

                <table className="min-w-full">

                    <thead className="bg-slate-100">

                        <tr className="text-left text-sm font-semibold text-slate-600">

                            <th className="px-6 py-4">Task</th>

                            <th className="px-6 py-4">Client</th>

                            {
                                role === "admin" && (
                                    <th className="px-6 py-4">
                                        Employee
                                    </th>
                                )
                            }

                            <th className="px-6 py-4">
                                Department
                            </th>

                            <th className="px-6 py-4">
                                Priority
                            </th>

                            <th className="px-6 py-4">
                                Status
                            </th>

                            <th className="px-6 py-4">
                                Working
                            </th>

                            <th className="px-6 py-4">
                                Date
                            </th>

                            <th className="px-6 py-4 text-center">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {
                            tasks.length === 0 && (

                                <tr>

                                    <td
                                        colSpan={9}
                                        className="py-20 text-center text-slate-400"
                                    >

                                        No Tasks Found

                                    </td>

                                </tr>

                            )
                        }

                        {

                            tasks.map(task => (

                                <tr
                                    key={task._id}
                                    className="border-t border-slate-100 hover:bg-slate-50 transition"
                                >

                                    <td className="px-6 py-5">

                                        <div>

                                            <p className="font-semibold text-slate-800">

                                                {task.title}

                                            </p>

                                            <p className="text-xs text-slate-500">

                                                {task.description?.slice(0,45)}

                                            </p>

                                        </div>

                                    </td>

                                    <td className="px-6">

                                        {task.client}

                                    </td>

                                    {

                                        role === "admin" && (

                                            <td className="px-6">

                                                {task.user?.name}

                                            </td>

                                        )

                                    }

                                    <td className="px-6">

                                        {task.department}

                                    </td>

                                    <td className="px-6">

                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${priorityStyle[task.priority]}`}>

                                            {task.priority}

                                        </span>

                                    </td>

                                    <td className="px-6">

                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyle[task.status]}`}>

                                            {task.status}

                                        </span>

                                    </td>

                                    <td className="px-6">

                                        {task.workHours}h {task.workMinutes}m

                                    </td>

                                    <td className="px-6">

                                        {
                                            new Date(task.taskDate)
                                            .toLocaleDateString()
                                        }

                                    </td>

                                    <td className="px-6">

                                        <div className="flex items-center justify-center gap-2">

                                            <Link
                                                to={`/task/${task._id}`}
                                                className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200"
                                            >
                                                <Eye size={16}/>
                                            </Link>

                                            <Link
                                                to={`/task/edit/${task._id}`}
                                                className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-700"
                                            >
                                                <Pencil size={16}/>
                                            </Link>

                                            <button
                                                onClick={() => onStart(task._id)}
                                                className="p-2 rounded-lg bg-green-100 hover:bg-green-200 text-green-700"
                                            >
                                                <Play size={16}/>
                                            </button>

                                            <button
                                                onClick={() => onStop(task._id)}
                                                className="p-2 rounded-lg bg-yellow-100 hover:bg-yellow-200 text-yellow-700"
                                            >
                                                <Square size={16}/>
                                            </button>

                                            <button
                                                onClick={() => onDelete(task._id)}
                                                className="p-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-700"
                                            >
                                                <Trash2 size={16}/>
                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))

                        }

                    </tbody>

                </table>

            </div>

        </div>

    );

};

export default TaskTable;