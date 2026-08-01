const StatCard = ({

    title,

    value,

    icon: Icon,

    color,

    subtitle

}) => {

    return (

        <div
            className="
                rounded-3xl
                border
                border-slate-200
                bg-white
                p-6
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-md
            "
        >

            <div className="flex items-center justify-between">

                <div>

                    <p className="text-sm text-slate-500">

                        {title}

                    </p>

                    <h2
                        className="
                            mt-3
                            text-3xl
                            font-bold
                            text-slate-900
                        "
                    >

                        {value}

                    </h2>

                    <p className="mt-2 text-xs text-slate-500">

                        {subtitle}

                    </p>

                </div>

                <div
                    className="h-14 w-14 rounded-2xl flex items-center justify-center"
                    style={{

                        backgroundColor: color

                    }}
                >

                    <Icon

                        size={28}

                        className="text-white"

                    />

                </div>

            </div>

        </div>

    );

};

export default StatCard;