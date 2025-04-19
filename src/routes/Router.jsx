import { createBrowserRouter } from "react-router-dom";
import Mainlayout from "../Layout/Mainlayout";
import Home from "../Pages/Home/Home";
import Login from "../Components/Login";
import Register from "../Components/Register";
import JobDetails from "../Pages/JobDetails/JobDetails";
import PrivateRoute from "./PrivateRoute";
import Jobs from "../Pages/Jobs/Jobs";
import JobApply from "../Pages/JobApply/JobApply";
import Dashboard from "../Pages/Dashboard/Dashboard";
import CreateJobs from "../Pages/CreateJobs/CreateJobs";
import ErrorPage from "../Components/ErrorPage";
import MypostedJobs from "../Pages/MyPostedJobs/MypostedJobs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainlayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },

      {
        path: "/jobs",
        element: (
          <PrivateRoute>
            <Jobs />
          </PrivateRoute>
        ),
      },

      {
        path: "/jobs/:id",
        element: (
          <PrivateRoute>
            <JobDetails />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/jobs/${params.id}`),
      },

      {
        path: "/job-apply/:id",
        element: (
          <PrivateRoute>
            <JobApply />
          </PrivateRoute>
        ),
      },

      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },

      {
        path: "/create-job-listing",
        element: (
          <PrivateRoute>
            <CreateJobs />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-posted-jobs",
        element: (
          <PrivateRoute>
            <MypostedJobs />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
