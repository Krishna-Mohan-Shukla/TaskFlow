import {

    ClipboardList,

    Clock3,

    Loader,

    CircleCheckBig

} from "lucide-react";

import StatCard from "./StatCard";

const StatsGrid = ({ stats }) => {

    return (

        <div
            className="
                grid
                gap-6
                mt-7
                sm:grid-cols-2
                xl:grid-cols-4
            "
        >

            <StatCard

                title="Total Tasks"

                value={stats.total}

                subtitle="Overall Tasks"

                icon={ClipboardList}

                color="#3B82F6"

            />

            <StatCard

                title="Pending"

                value={stats.pending}

                subtitle="Need Attention"

                icon={Clock3}

                color="#F59E0B"

            />

            <StatCard

                title="In Progress"

                value={stats.progress}

                subtitle="Currently Working"

                icon={Loader}

                color="#8B5CF6"

            />

            <StatCard

                title="Completed"

                value={stats.done}

                subtitle="Successfully Finished"

                icon={CircleCheckBig}

                color="#22C55E"

            />

        </div>

    );

};

export default StatsGrid;