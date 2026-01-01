import { createBrowserRouter } from 'react-router-dom'

import Home from '@/pages/Home'
import Login from '@/pages/Login'
import History from '@/pages/History'

import Members from '@/pages/My/Members'
import My from '@/pages/My'

import Current from '@/pages/Mission/Current'
import Make from '@/pages/Mission/Make'
import Details from '@/pages/Mission/Details'

import Alarm from '@/pages/Alarm'
import RoleSelect from '@/pages/RoleSelect'

import ProtectedRoute from '@/router/ProtectedRoute'
import DefaultLayout from '@/layouts/DefaultLayout'
import LoginBridge from '../pages/LoginBridge'
import QuizLayout from '../layouts/QuizLayout'

// Quiz
import KeyWordExplain from '@/pages/Quiz/KeyWordExplain'
import Test from '@/pages/Quiz/Test'
import Result from '@/pages/Quiz/Result'

// url 작명 규칙은 케밥 케이스를 사용
// 케밥 케이스: 단어와 단어를 하이픈(-)으로 구분
export const router = createBrowserRouter([
  {
    element: <DefaultLayout />, // 기본 레이아웃
    children: [
      { path: '/login', element: <Login /> },
      { path: '/login-bridge', element: <LoginBridge /> },
      { path: '/role-select', element: <RoleSelect /> },
      {
        element: <ProtectedRoute />,
        // 홈
        children: [
          { path: '/', element: <Home /> },
          { path: '/alarm', element: <Alarm /> },
          { path: '/history', element: <History /> },

          // 멤버 선택 및 관리
          { path: '/my', element: <My /> },
          { path: '/my/members', element: <Members /> },

          // 미션
          { path: '/mission/current', element: <Current /> },
          { path: '/mission/make', element: <Make /> },
          { path: '/mission/details/:id', element: <Details /> },

          // 퀴즈
          {
            path: '/quiz',
            element: <QuizLayout />,
            children: [
              { path: 'keyword-explain', element: <KeyWordExplain /> },
              { path: 'test/:id', element: <Test /> },
              { path: 'result', element: <Result /> },
            ],
          },
        ],
      },
    ],
  },
])
