import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Eye,
    Pencil,
    Trash2,
    Plus,
    X
} from "lucide-react";

import DashboardLayout from "../components/layout/DashboardLayout";
import Loader from "../components/common/Loader";

import api from "../services/api";

const Users = () => {

    const navigate = useNavigate();

    /* ===========================================================
       STATES
    =========================================================== */

    const [loading, setLoading] = useState(true);

    const [users, setUsers] = useState([]);

    const [search, setSearch] = useState("");

    const [department, setDepartment] = useState("");

    const [deleteId, setDeleteId] = useState(null);

    const [stats, setStats] = useState({

        totalEmployees: 0,

        totalTasks: 0,

        pending: 0,

        progress: 0,

        done: 0

    });

    /* ===========================================================
       LOAD USERS
    =========================================================== */

    useEffect(() => {

        fetchUsers();

    }, []);

    const fetchUsers = async () => {

        try {

            setLoading(true);

            const { data } = await api.get("/admin/users");

            const employeeList = data.users || [];

            setUsers(employeeList);

            let totalTasks = 0;

            let pending = 0;

            let progress = 0;

            let done = 0;

            employeeList.forEach((user) => {

                totalTasks += user.totalTasks;

                pending += user.pending;

                progress += user.inProgress;

                done += user.done;

            });

            setStats({

                totalEmployees: employeeList.length,

                totalTasks,

                pending,

                progress,

                done

            });

        }

        catch (error) {

            console.log(error);

        }

        finally {

            setLoading(false);

        }

    };

    /* ===========================================================
       FILTER DATA
    =========================================================== */

    const filteredUsers = useMemo(() => {

        return users.filter((user) => {

            const keyword = search.toLowerCase();

            const matchSearch =

                user.name
                    ?.toLowerCase()
                    .includes(keyword)

                ||

                user.email
                    ?.toLowerCase()
                    .includes(keyword)

                ||

                user.department
                    ?.toLowerCase()
                    .includes(keyword);

            const matchDepartment =

                !department ||

                user.department === department;

            return (

                matchSearch &&

                matchDepartment

            );

        });

    }, [

        users,

        search,

        department

    ]);

    /* ===========================================================
       DEPARTMENTS
    =========================================================== */

    const departments = [

        ...new Set(

            users.map(

                (u) => u.department

            )

        )

    ];

    /* ===========================================================
       DELETE USER
    =========================================================== */

    const handleDelete = async () => {

        if (!deleteId) {

            return;

        }

        try {

            await api.delete(

                `/admin/user/${deleteId}`

            );

            setDeleteId(null);

            fetchUsers();

        }

        catch (error) {

            console.log(error);

            alert(

                error.response?.data?.message ||

                "Unable to delete employee."

            );

        }

    };

    /* ===========================================================
       LOADER
    =========================================================== */

    if (loading) {

        return (

            <DashboardLayout>

                <Loader

                    title="Loading Employees"

                    subtitle="Fetching employee records..."

                />

            </DashboardLayout>

        );

    }

    /* ===========================================================
       RETURN
    =========================================================== */

    return (

        <DashboardLayout>

            <>
                {/* ===========================================================
        PAGE HEADER
    =========================================================== */}

                <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-8 text-white">

                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                        <div>

                            <h1 className="text-4xl font-bold">

                                Employee Management

                            </h1>

                            <p className="mt-2 text-slate-300">

                                Manage employees, assign tasks and monitor performance.

                            </p>

                        </div>

                        <button

                            onClick={() => navigate("/add-task")}

                            className="
                    rounded-xl
                    bg-white
                    px-6
                    py-3
                    font-semibold
                    text-slate-900
                    transition
                    hover:scale-105
                "

                        >

                            + Assign Task

                        </button>

                    </div>

                </div>

                {/* ===========================================================
        STATS
    =========================================================== */}

                <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-5">

                    <div className="rounded-3xl border bg-white p-6 shadow-sm">

                        <h4 className="text-slate-500">

                            Employees

                        </h4>

                        <h2 className="mt-3 text-4xl font-bold">

                            {stats.totalEmployees}

                        </h2>

                    </div>

                    <div className="rounded-3xl border bg-white p-6 shadow-sm">

                        <h4 className="text-slate-500">

                            Total Tasks

                        </h4>

                        <h2 className="mt-3 text-4xl font-bold">

                            {stats.totalTasks}

                        </h2>

                    </div>

                    <div className="rounded-3xl border bg-white p-6 shadow-sm">

                        <h4 className="text-amber-600">

                            Pending

                        </h4>

                        <h2 className="mt-3 text-4xl font-bold text-amber-600">

                            {stats.pending}

                        </h2>

                    </div>

                    <div className="rounded-3xl border bg-white p-6 shadow-sm">

                        <h4 className="text-blue-600">

                            In Progress

                        </h4>

                        <h2 className="mt-3 text-4xl font-bold text-blue-600">

                            {stats.progress}

                        </h2>

                    </div>

                    <div className="rounded-3xl border bg-white p-6 shadow-sm">

                        <h4 className="text-emerald-600">

                            Completed

                        </h4>

                        <h2 className="mt-3 text-4xl font-bold text-emerald-600">

                            {stats.done}

                        </h2>

                    </div>

                </div>

                {/* ===========================================================
        TOOLBAR
    =========================================================== */}

                <div className="mt-8 rounded-3xl border bg-white p-6 shadow-sm">

                    <div className="grid gap-5 lg:grid-cols-3">

                        <input

                            value={search}

                            onChange={(e) =>

                                setSearch(e.target.value)

                            }

                            placeholder="Search Employee..."

                            className="
                    rounded-xl
                    border
                    border-slate-300
                    px-4
                    py-3
                    outline-none
                    focus:ring-2
                    focus:ring-slate-400
                "

                        />

                        <select

                            value={department}

                            onChange={(e) =>

                                setDepartment(e.target.value)

                            }

                            className="
                    rounded-xl
                    border
                    border-slate-300
                    px-4
                    py-3
                "

                        >

                            <option value="">

                                All Departments

                            </option>

                            {

                                departments.map((dept) => (

                                    <option

                                        key={dept}

                                        value={dept}

                                    >

                                        {dept}

                                    </option>

                                ))

                            }

                        </select>

                        <button

                            onClick={() => {

                                setSearch("");

                                setDepartment("");

                            }}

                            className="
                    rounded-xl
                    bg-slate-900
                    text-white
                    transition
                    hover:bg-slate-700
                "

                        >

                            Reset Filters

                        </button>

                    </div>

                </div>

                {/* ===========================================================
        EMPLOYEE TABLE
    =========================================================== */}

                <div className="mt-8 overflow-hidden rounded-3xl border bg-white shadow-sm">

                    <div className="overflow-x-auto">

                        <table className="min-w-full">

                            <thead>

                                <tr className="border-b bg-slate-50 text-sm text-slate-600">

                                    <th className="px-6 py-4 text-left">

                                        Employee

                                    </th>

                                    <th className="px-6 py-4 text-left">

                                        Department

                                    </th>

                                    <th className="px-6 py-4 text-left">

                                        Email

                                    </th>

                                    <th className="px-6 py-4 text-center">

                                        Tasks

                                    </th>

                                    <th className="px-6 py-4 text-center">

                                        Pending

                                    </th>

                                    <th className="px-6 py-4 text-center">

                                        Progress

                                    </th>

                                    <th className="px-6 py-4 text-center">

                                        Done

                                    </th>

                                    <th className="px-6 py-4 text-center">

                                        Performance

                                    </th>

                                    <th className="px-6 py-4 text-center">

                                        Actions

                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {

                                    filteredUsers.length === 0 ?

                                        (

                                            <tr>

                                                <td
                                                    colSpan={9}
                                                    className="py-20 text-center"
                                                >

                                                    <div className="flex flex-col items-center">

                                                        <div className="
                            flex
                            h-20
                            w-20
                            items-center
                            justify-center
                            rounded-full
                            bg-slate-100
                            text-3xl
                        ">

                                                            👥

                                                        </div>

                                                        <h3 className="mt-5 text-xl font-bold text-slate-700">

                                                            No Employees Found

                                                        </h3>

                                                        <p className="mt-2 text-slate-500">

                                                            Try changing search or department filter.

                                                        </p>

                                                    </div>

                                                </td>

                                            </tr>

                                        )

                                        :

                                        filteredUsers.map((employee) => {

                                            const percentage =

                                                employee.totalTasks > 0

                                                    ?

                                                    Math.round(

                                                        (employee.done /

                                                            employee.totalTasks) * 100

                                                    )

                                                    :

                                                    0;

                                            return (

                                                <tr
                                                    key={employee._id}
                                                    className="
                        border-b
                        border-slate-100
                        transition
                        hover:bg-slate-50
                    "
                                                >

                                                    {/* Employee */}

                                                    <td className="px-6 py-5">

                                                        <div className="flex items-center gap-4">

                                                            <div className="
                                flex
                                h-12
                                w-12
                                items-center
                                justify-center
                                rounded-full
                                bg-slate-900
                                font-bold
                                text-white
                            ">

                                                                {

                                                                    employee.name
                                                                        ?.charAt(0)
                                                                        .toUpperCase()

                                                                }

                                                            </div>

                                                            <div>

                                                                <h3 className="font-semibold text-slate-800">

                                                                    {employee.name}

                                                                </h3>

                                                                <p className="text-sm text-slate-500">

                                                                    Employee

                                                                </p>

                                                            </div>

                                                        </div>

                                                    </td>

                                                    {/* Department */}

                                                    <td className="px-6 py-5">

                                                        <span className="
                            rounded-full
                            bg-indigo-100
                            px-3
                            py-1
                            text-xs
                            font-semibold
                            text-indigo-700
                        ">

                                                            {employee.department}

                                                        </span>

                                                    </td>

                                                    {/* Email */}

                                                    <td className="px-6 py-5 text-slate-600">

                                                        {employee.email}

                                                    </td>

                                                    {/* Total */}

                                                    <td className="px-6 py-5 text-center font-bold">

                                                        {employee.totalTasks}

                                                    </td>

                                                    {/* Pending */}

                                                    <td className="px-6 py-5 text-center">

                                                        <span className="
                            rounded-full
                            bg-amber-100
                            px-3
                            py-1
                            text-xs
                            font-semibold
                            text-amber-700
                        ">

                                                            {employee.pending}

                                                        </span>

                                                    </td>

                                                    {/* Progress */}

                                                    <td className="px-6 py-5 text-center">

                                                        <span className="
                            rounded-full
                            bg-blue-100
                            px-3
                            py-1
                            text-xs
                            font-semibold
                            text-blue-700
                        ">

                                                            {employee.inProgress}

                                                        </span>

                                                    </td>

                                                    {/* Done */}

                                                    <td className="px-6 py-5 text-center">

                                                        <span className="
                            rounded-full
                            bg-emerald-100
                            px-3
                            py-1
                            text-xs
                            font-semibold
                            text-emerald-700
                        ">

                                                            {employee.done}

                                                        </span>

                                                    </td>

                                                    {/* Performance */}

                                                    <td className="px-6 py-5">

                                                        <div className="w-36">

                                                            <div className="
                                mb-2
                                flex
                                justify-between
                                text-xs
                                font-semibold
                            ">

                                                                <span>

                                                                    {percentage}%

                                                                </span>

                                                                <span>

                                                                    Performance

                                                                </span>

                                                            </div>

                                                            <div className="
                                h-2
                                overflow-hidden
                                rounded-full
                                bg-slate-200
                            ">

                                                                <div
                                                                    style={{

                                                                        width: `${percentage}%`

                                                                    }}
                                                                    className="
                                        h-full
                                        rounded-full
                                        bg-emerald-500
                                        transition-all
                                        duration-700
                                    "
                                                                />

                                                            </div>

                                                        </div>

                                                    </td>

                                                    {/* Actions */}

                                                    <td className="px-6 py-5">

                                                        <div className="flex justify-center gap-2">

                                                            <button

                                                                onClick={() =>

                                                                    navigate(

                                                                        `/users/${employee._id}`

                                                                    )

                                                                }

                                                                className="
                                    rounded-xl
                                    bg-slate-100
                                    p-2.5
                                    transition
                                    hover:bg-slate-200
                                "

                                                            >

                                                                <Eye size={18} />

                                                            </button>

                                                            <button

                                                                onClick={() =>

                                                                    navigate(

                                                                        `/add-task?employee=${employee._id}`

                                                                    )

                                                                }

                                                                className="
                                    rounded-xl
                                    bg-indigo-100
                                    p-2.5
                                    text-indigo-700
                                    transition
                                    hover:bg-indigo-200
                                "

                                                            >

                                                                <Plus size={18} />

                                                            </button>

                                                            <button

                                                                onClick={() =>

                                                                    navigate(

                                                                        `/users/edit/${employee._id}`

                                                                    )

                                                                }

                                                                className="
                                    rounded-xl
                                    bg-blue-100
                                    p-2.5
                                    text-blue-700
                                    transition
                                    hover:bg-blue-200
                                "

                                                            >

                                                                <Pencil size={18} />

                                                            </button>

                                                            <button

                                                                onClick={() =>

                                                                    setDeleteId(employee._id)

                                                                }

                                                                className="
                                    rounded-xl
                                    bg-red-100
                                    p-2.5
                                    text-red-700
                                    transition
                                    hover:bg-red-200
                                "

                                                            >

                                                                <Trash2 size={18} />

                                                            </button>

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
                {

                    deleteId && (

                        <div className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/40
            backdrop-blur-sm
        ">

                            <div className="
                w-full
                max-w-md
                rounded-3xl
                bg-white
                p-8
                shadow-2xl
            ">

                                <div className="flex justify-between items-center">

                                    <h2 className="text-2xl font-bold">

                                        Delete Employee

                                    </h2>

                                    <button

                                        onClick={() =>

                                            setDeleteId(null)

                                        }

                                    >

                                        <X />

                                    </button>

                                </div>

                                <p className="mt-5 text-slate-600">

                                    Are you sure you want to delete this employee?

                                </p>

                                <div className="mt-8 flex justify-end gap-3">

                                    <button

                                        onClick={() =>

                                            setDeleteId(null)

                                        }

                                        className="
                            rounded-xl
                            border
                            px-5
                            py-3
                        "

                                    >

                                        Cancel

                                    </button>

                                    <button

                                        onClick={handleDelete}

                                        className="
                            rounded-xl
                            bg-red-600
                            px-5
                            py-3
                            text-white
                        "

                                    >

                                        Delete

                                    </button>

                                </div>

                            </div>

                        </div>

                    )

                }
            </>

        </DashboardLayout>

    );

};

export default Users;