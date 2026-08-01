import { LoaderCircle } from "lucide-react";

const Loader = ({
    title = "Loading...",
    subtitle = "Please wait while we fetch your data."
}) => {

    return (

        <div className="flex min-h-[400px] items-center justify-center">

            <div
                className="
                    w-full
                    max-w-sm
                    rounded-3xl
                    border
                    border-slate-200
                    bg-white
                    p-8
                    text-center
                    shadow-lg
                "
            >

                <div className="flex justify-center">

                    <LoaderCircle
                        size={50}
                        className="animate-spin text-slate-700"
                    />

                </div>

                <h2 className="mt-6 text-xl font-semibold text-slate-900">

                    {title}

                </h2>

                <p className="mt-2 text-sm text-slate-500">

                    {subtitle}

                </p>

            </div>

        </div>

    );

};

export default Loader;