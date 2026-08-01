import {
    CheckCircle2,
    Clock3,
    PlayCircle,
    PlusCircle
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

const ActivityTimeline = ({ tasks = [] }) => {

    const { user } = useAuth();

    const latestTasks = [...tasks]

        .sort(

            (a, b) =>

                new Date(b.updatedAt) -

                new Date(a.updatedAt)

        )

        .slice(0, 5);

    const getIcon = (task) => {

        if (task.status === "Done") {

            return (

                <CheckCircle2

                    size={18}

                    className="text-green-600"

                />

            );

        }

        if (task.status === "In Progress") {

            return (

                <PlayCircle

                    size={18}

                    className="text-blue-600"

                />

            );

        }

        return (

            <PlusCircle

                size={18}

                className="text-amber-600"

            />

        );

    };

    const getTitle = (task) => {

        if (task.status === "Done") {

            return "Task Completed";

        }

        if (task.status === "In Progress") {

            return "Task In Progress";

        }

        return "Task Created";

    };

    return (

        <div

            className="

                rounded-3xl

                border

                border-slate-200

                bg-white

                shadow-sm

                p-6

            "

        >

            <h2

                className="

                    text-xl

                    font-bold

                    text-slate-900

                "

            >

                Activity Timeline

            </h2>

            <p

                className="

                    text-sm

                    text-slate-500

                    mt-1

                "

            >

                Latest task activity

            </p>

            <div className="mt-8 space-y-6">

                {

                    latestTasks.length === 0 ?

                    (

                        <div

                            className="

                                text-center

                                py-12

                                text-slate-400

                            "

                        >

                            No Activity Found

                        </div>

                    )

                    :

                    latestTasks.map((task, index) => (

                        <div

                            key={task._id}

                            className="flex gap-4"

                        >

                            <div

                                className="

                                    flex

                                    flex-col

                                    items-center

                                "

                            >

                                <div

                                    className="

                                        h-10

                                        w-10

                                        rounded-full

                                        bg-slate-100

                                        flex

                                        items-center

                                        justify-center

                                    "

                                >

                                    {getIcon(task)}

                                </div>

                                {

                                    index !==

                                    latestTasks.length - 1 &&

                                    (

                                        <div

                                            className="

                                                w-px

                                                flex-1

                                                bg-slate-200

                                                mt-2

                                            "

                                        />

                                    )

                                }

                            </div>

                            <div className="flex-1">

                                <div

                                    className="

                                        flex

                                        justify-between

                                        items-start

                                    "

                                >

                                    <div>

                                        <h4

                                            className="

                                                font-semibold

                                                text-slate-800

                                            "

                                        >

                                            {getTitle(task)}

                                        </h4>

                                        <p

                                            className="

                                                text-sm

                                                text-slate-500

                                            "

                                        >

                                            {task.title}

                                        </p>

                                    </div>

                                    <div

                                        className="

                                            flex

                                            items-center

                                            gap-1

                                            text-xs

                                            text-slate-400

                                        "

                                    >

                                        <Clock3 size={14} />

                                        {

                                            new Date(

                                                task.updatedAt

                                            ).toLocaleString()

                                        }

                                    </div>

                                </div>

                                {

                                    user.role === "admin" &&

                                    (

                                        <div

                                            className="

                                                mt-2

                                                text-sm

                                                text-slate-500

                                            "

                                        >

                                            Employee :

                                            <span

                                                className="

                                                    font-medium

                                                    text-slate-700

                                                    ml-1

                                                "

                                            >

                                                {

                                                    task.user?.name

                                                }

                                            </span>

                                        </div>

                                    )

                                }

                                <div

                                    className="

                                        mt-2

                                        flex

                                        gap-2

                                        flex-wrap

                                    "

                                >

                                    <span

                                        className="

                                            rounded-full

                                            bg-slate-100

                                            px-3

                                            py-1

                                            text-xs

                                        "

                                    >

                                        {task.client}

                                    </span>

                                    <span

                                        className="

                                            rounded-full

                                            bg-blue-50

                                            px-3

                                            py-1

                                            text-xs

                                            text-blue-700

                                        "

                                    >

                                        {task.status}

                                    </span>

                                </div>

                            </div>

                        </div>

                    ))

                }

            </div>

        </div>

    );

};

export default ActivityTimeline;