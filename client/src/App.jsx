import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddTask from "./pages/AddTask";
import DataOfTasks from "./pages/DataOfTasks";
import TaskDetails from "./pages/TaskDetails";
import EditTask from "./pages/EditTask";
import Users from "./pages/Users";

import { useAuth } from "./context/AuthContext";

function App() {

    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center">
                Loading...
            </div>
        );
    }

    return (
        <Routes>

            <Route
                path="/"
                element={
                    user
                        ? <Navigate to="/dashboard" replace />
                        : <Navigate to="/login" replace />
                }
            />

            <Route
                path="/login"
                element={
                    user
                        ? <Navigate to="/dashboard" replace />
                        : <Login />
                }
            />

            <Route
                path="/register"
                element={
                    user
                        ? <Navigate to="/dashboard" replace />
                        : <Register />
                }
            />

            <Route
                path="/dashboard"
                element={
                    user
                        ? <Dashboard />
                        : <Navigate to="/login" replace />
                }
            />

            <Route
                path="/add-task"
                element={
                    user
                        ? <AddTask />
                        : <Navigate to="/login" replace />
                }
            />

            <Route
                path="/tasks"
                element={
                    user
                        ? <DataOfTasks />
                        : <Navigate to="/login" replace />
                }
            />

            <Route
                path="/task/:id"
                element={
                    user
                        ? <TaskDetails />
                        : <Navigate to="/login" replace />
                }
            />

            <Route
                path="/task/edit/:id"
                element={
                    user
                        ? <EditTask />
                        : <Navigate to="/login" replace />
                }
            />

            <Route
                path="/users"
                element={
                    user
                        ? <Users />
                        : <Navigate to="/login" replace />
                }
            />

        </Routes>
    );
}

export default App;