import { Link } from "react-router-dom";

const QuickActions = () => {

    return (

        <div
            className="
                mt-8
                rounded-3xl
                border
                border-slate-200
                bg-white
                p-6
                shadow-sm
            "
        >

            <h3
                className="
                    text-xl
                    font-semibold
                    text-slate-900
                "
            >

                Quick Actions

            </h3>

            <div
                className="
                    mt-5
                    flex
                    flex-wrap
                    gap-4
                "
            >

                <Link
                    to="/add-task"
                    className="
                        rounded-xl
                        bg-slate-900
                        px-6
                        py-3
                        text-white
                        transition
                        hover:bg-slate-700
                    "
                >

                    + Create Task

                </Link>

                <Link
                    to="/tasks"
                    className="
                        rounded-xl
                        border
                        border-slate-300
                        px-6
                        py-3
                        transition
                        hover:bg-slate-100
                    "
                >

                    View Tasks

                </Link>

            </div>

        </div>

    );

};

export default QuickActions;