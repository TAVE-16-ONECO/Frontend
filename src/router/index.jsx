import { createBrowserRouter } from "react-router-dom";

import Home from "@/pages/Home/Home";
import Login from "@/pages/Login/Login";
import Signup from "@/pages/Login/Signup";
import My from "@/pages/My/My";
import History from "@/pages/History/History";
import Members from "../pages/My/Members";
import Current from "../pages/Mission/Current";
import Make from "../pages/Mission/Make";
import More from "../pages/Mission/More";
import Alarm from "../pages/Alarm/Alarm";
import Quiz from "../pages/quiz";
import ParentSelect from "../pages/ParentSelect/ParentSelect";

import ProtectedRoute from "./ProtectedRoute";
import ModeLayout from "@/layouts/ModeLayout";


export const router = createBrowserRouter([
  { path: "/signup", element: <Signup /> },
  { path: "/login", element: <Login /> },

  {
    element: <ProtectedRoute />, //로그인 후
    children: [
      {
        element: <ModeLayout />,   // 부모/자녀 UI
        // 홈
        children: [
          { path: "/", element: <Home /> },
          { path: "/my", element: <My /> },
          { path: "/history", element: <History /> },

          // 멤버 선택 및 관리
          { path: "/parentselect", element: <ParentSelect /> },
          { path: "/my/members", element: <Members /> },

          // mission
          { path: "/mission/current", element: <Current /> },
          { path: "/mission/make", element: <Make /> },
          { path: "/mission/more", element: <More /> },

          // 알람 
          { path: "/alarm", element: <Alarm /> },

          // quiz
          { path: "/quiz", element: <Quiz /> },
        ],
      },
    ],
  },
]);
