import { Search, RefreshCw, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TaskFilters = ({
    search,
    setSearch,

    department,
    setDepartment,

    status,
    setStatus,

    priority,
    setPriority,

    onRefresh
}) => {

    const navigate = useNavigate();

    return (

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">

            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">

                {/* Search */}

                <div className="relative w-full lg:w-80">

                    <Search
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                        type="text"
                        placeholder="Search task, client..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        className="
                            w-full
                            pl-11
                            pr-4
                            py-3
                            rounded-xl
                            border
                            border-slate-300
                            focus:ring-2
                            focus:ring-indigo-500
                            outline-none
                        "
                    />

                </div>

                {/* Filters */}

                <div className="flex flex-wrap gap-3">

                    <select
                        value={department}
                        onChange={(e) =>
                            setDepartment(e.target.value)
                        }
                        className="px-4 py-3 rounded-xl border border-slate-300"
                    >

                        <option value="">
                            All Departments
                        </option>

                        <option>
                            HR
                        </option>

                        <option>
                            Development
                        </option>

                        <option>
                            Sales
                        </option>

                        <option>
                            Marketing
                        </option>

                    </select>

                    <select
                        value={priority}
                        onChange={(e) =>
                            setPriority(e.target.value)
                        }
                        className="px-4 py-3 rounded-xl border border-slate-300"
                    >

                        <option value="">
                            All Priority
                        </option>

                        <option>
                            Low
                        </option>

                        <option>
                            Normal
                        </option>

                        <option>
                            High
                        </option>

                        <option>
                            Urgent
                        </option>

                    </select>

                    <select
                        value={status}
                        onChange={(e) =>
                            setStatus(e.target.value)
                        }
                        className="px-4 py-3 rounded-xl border border-slate-300"
                    >

                        <option value="">
                            All Status
                        </option>

                        <option>
                            Pending
                        </option>

                        <option>
                            In Progress
                        </option>

                        <option>
                            Done
                        </option>

                    </select>

                </div>

                {/* Buttons */}

                <div className="flex gap-3">

                    <button
                        onClick={onRefresh}
                        className="
                            flex
                            items-center
                            gap-2
                            px-5
                            py-3
                            rounded-xl
                            bg-slate-100
                            hover:bg-slate-200
                            transition
                        "
                    >

                        <RefreshCw size={18} />

                        Refresh

                    </button>

                    <button
                        onClick={() => navigate("/add-task")}
                        className="
                            flex
                            items-center
                            gap-2
                            px-6
                            py-3
                            rounded-xl
                            bg-indigo-600
                            hover:bg-indigo-700
                            text-white
                            transition
                        "
                    >

                        <Plus size={18} />

                        Add Task

                    </button>

                </div>

            </div>

        </div>

    );

};

export default TaskFilters;