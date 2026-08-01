import { CalendarDays } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const WelcomeCard = () => {

    const { user } = useAuth();

    const getGreeting = () => {

        const hour = new Date().getHours();

        if (hour < 12) return "Good Morning";

        if (hour < 18) return "Good Afternoon";

        return "Good Evening";

    };

    const today = new Date().toLocaleDateString("en-IN", {

        weekday: "long",

        day: "numeric",

        month: "long",

        year: "numeric"

    });

    return (

        <div
            className="
                rounded-3xl
                border
                border-slate-200
                bg-white
                p-7
                shadow-sm
            "
        >

            <div className="flex items-center justify-between">

                <div>

                    <p className="text-sm text-slate-500">

                        Welcome Back

                    </p>

                    <h2 className="mt-2 text-3xl font-bold text-slate-900">

                        {getGreeting()}, {user?.name} 👋

                    </h2>

                    <p className="mt-3 text-slate-500">

                        Let's manage your work efficiently today.

                    </p>

                </div>

                <div
                    className="
                        hidden
                        md:flex
                        items-center
                        gap-3
                        rounded-2xl
                        bg-slate-100
                        px-5
                        py-4
                    "
                >

                    <CalendarDays
                        size={22}
                        className="text-slate-600"
                    />

                    <span className="text-sm text-slate-700">

                        {today}

                    </span>

                </div>

            </div>

        </div>

    );

};

export default WelcomeCard;