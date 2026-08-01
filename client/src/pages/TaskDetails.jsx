import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import DashboardLayout from "../components/layout/DashboardLayout";
import api from "../services/api";


const TaskDetails = () => {


    const { id } = useParams();

    const navigate = useNavigate();


    const [task, setTask] = useState(null);



    useEffect(() => {

        if (id) {
            loadTask();
        }

    }, [id]);





    const loadTask = async () => {


        const res = await api.get(`/task/${id}`);


        setTask(res.data.task);


    };






    const startTask = async () => {


        await api.put(`/task/start/${id}`);


        loadTask();


    };





    const stopTask = async () => {


        await api.put(`/task/stop/${id}`);


        loadTask();


    };





    const changeStatus = async (status) => {


        await api.put(`/task/status/${id}`, {

            status

        });


        loadTask();


    };





    const deleteTask = async () => {


        await api.delete(`/task/delete/${id}`);


        navigate("/tasks");


    };






    if (!task)

        return null;




    return (

        <DashboardLayout>


            <div className="bg-slate-900 p-8 rounded-xl text-white">


                <h1 className="text-3xl font-bold">

                    {task.title}

                </h1>


                <p className="mt-3">

                    Client : {task.client}

                </p>


                <p>

                    Priority : {task.priority}

                </p>



                <p>

                    Status : {task.status}

                </p>





                <div className="flex gap-4 mt-6">


                    <button

                        onClick={startTask}

                        className="bg-green-600 px-5 py-2 rounded"

                    >

                        ▶ Start

                    </button>



                    <button

                        onClick={stopTask}

                        className="bg-red-600 px-5 py-2 rounded"

                    >

                        ⏹ Stop

                    </button>



                    <button

                        onClick={() => changeStatus("Done")}

                        className="bg-blue-600 px-5 py-2 rounded"

                    >

                        Complete

                    </button>


                    <button

                        onClick={deleteTask}

                        className="bg-gray-700 px-5 py-2 rounded"

                    >

                        Delete

                    </button>



                </div>



            </div>


        </DashboardLayout>

    );



};


export default TaskDetails;