import Sidebar from "./Sidebar";
import Header from "./Header";
import StatusBar from "./StatusBar";

const DashboardLayout = ({ children }) => {

    return (

        <div className="min-h-screen bg-[#F5F7FA]">

            <div className="flex">

                <Sidebar />

                <div className="flex flex-1 flex-col min-h-screen">

                    <Header />

                    <main className="flex-1 overflow-y-auto">

                        <div className="max-w-[1700px] mx-auto px-8 py-8">

                            {children}

                        </div>

                    </main>

                    <StatusBar />

                </div>

            </div>

        </div>

    );

};

export default DashboardLayout;