import {
    Search,
    RotateCcw
} from "lucide-react";

const TaskToolbar = ({
    search,
    setSearch,

    department,
    setDepartment,

    status,
    setStatus,

    priority,
    setPriority,

    departments = [],

    onReset
}) => {

    return (

        <div className="bg-white rounded-3xl border border-slate-200 p-5 mb-6">

            <div className="grid xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2 gap-4">

                {/* Search */}

                <div className="relative">

                    <Search
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                        type="text"
                        placeholder="Search task..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="
                            w-full
                            rounded-xl
                            border
                            border-slate-300
                            pl-11
                            pr-4
                            py-3
                            outline-none
                            focus:ring-2
                            focus:ring-slate-300
                        "
                    />

                </div>

                {/* Department */}

                <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="
                        rounded-xl
                        border
                        border-slate-300
                        px-4
                        py-3
                        outline-none
                        focus:ring-2
                        focus:ring-slate-300
                    "
                >

                    <option value="">
                        All Departments
                    </option>

                    {departments.map((item) => (

                        <option
                            key={item}
                            value={item}
                        >
                            {item}
                        </option>

                    ))}

                </select>

                {/* Status */}

                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="
                        rounded-xl
                        border
                        border-slate-300
                        px-4
                        py-3
                        outline-none
                        focus:ring-2
                        focus:ring-slate-300
                    "
                >

                    <option value="">
                        All Status
                    </option>

                    <option value="Pending">
                        Pending
                    </option>

                    <option value="In Progress">
                        In Progress
                    </option>

                    <option value="Done">
                        Done
                    </option>

                </select>

                {/* Priority */}

                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="
                        rounded-xl
                        border
                        border-slate-300
                        px-4
                        py-3
                        outline-none
                        focus:ring-2
                        focus:ring-slate-300
                    "
                >

                    <option value="">
                        All Priority
                    </option>

                    <option value="Low">
                        Low
                    </option>

                    <option value="Normal">
                        Normal
                    </option>

                    <option value="High">
                        High
                    </option>

                    <option value="Urgent">
                        Urgent
                    </option>

                </select>

                {/* Reset */}

                <button
                    onClick={onReset}
                    className="
                        flex
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        bg-slate-900
                        text-white
                        hover:bg-slate-700
                        transition
                    "
                >

                    <RotateCcw size={18} />

                    Reset

                </button>

            </div>

        </div>

    );

};

export default TaskToolbar;