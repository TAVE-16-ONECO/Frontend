import { createBrowserRouter } from "react-router-dom";

import Home from "@/pages/Home/Home";
import Login from "@/pages/Login/Login";
import History from "@/pages/History/History";

import Members from "../pages/My/Members";
import Index from "../pages/My";

import Current from "../pages/Mission/Current";
import Make from "../pages/Mission/Make";
import Detials from "../pages/Mission/Details";

import Alarm from "../pages/Alarm/Alarm";
import Quiz from "../pages/quiz";
import RoleSelect from "../pages/RoleSelect";
import KeyWord from "../pages/KeyWord";

import ProtectedRoute from "./ProtectedRoute";
import ModeLayout from "@/layouts/ModeLayout";



export const router = createBrowserRouter([
  { path: "/login", element: <Login /> },

  {
    element: <ProtectedRoute />, //로그인 후
    children: [
      {
        element: <ModeLayout />,   // 부모/자녀 UI
        // 홈
        children: [
          { path: "/", element: <Home /> },
          { path: "/index", element: <Index /> },
          { path: "/history", element: <History /> },

          // 멤버 선택 및 관리
          { path: "/roleselect", element: <RoleSelect /> },
          { path: "/my/members", element: <Members /> },

          // mission
          { path: "/mission/current", element: <Current /> },
          { path: "/mission/make", element: <Make /> },
          { path: "/mission/details", element: <Detials /> },

          // 알람 
          { path: "/alarm", element: <Alarm /> },

          // quiz
          { path: "/quiz", element: <Quiz /> },
          { path: "/keyword", element: <KeyWord /> },
        ],
      },
    ],
  },
]);
