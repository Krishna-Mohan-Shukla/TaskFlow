const TodayProgress = ({

    completed,

    total

}) => {

    const percentage = total
        ? Math.round((completed / total) * 100)
        : 0;

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

            <div
                className="
                    flex
                    items-center
                    justify-between
                "
            >

                <div>

                    <h3
                        className="
                            text-xl
                            font-semibold
                        "
                    >

                        Today's Progress

                    </h3>

                    <p className="mt-2 text-slate-500">

                        {completed} of {total} Tasks Completed

                    </p>

                </div>

                <h2
                    className="
                        text-4xl
                        font-bold
                        text-slate-900
                    "
                >

                    {percentage}%

                </h2>

            </div>

            <div
                className="
                    mt-6
                    h-3
                    rounded-full
                    bg-slate-200
                "
            >

                <div

                    className="
                        h-3
                        rounded-full
                        bg-slate-900
                        transition-all
                    "

                    style={{

                        width: `${percentage}%`

                    }}

                />

            </div>

        </div>

    );

};

export default TodayProgress;