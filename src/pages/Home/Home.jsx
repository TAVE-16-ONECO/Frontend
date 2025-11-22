import React from 'react';
import {useAuthStore} from "../../stores/authStore";
import ChildHome from './ChildHome';
import ParentHome from './ParentHome';




//Homepage 부모 자식 모드에 따라 다르게 렌더링
export default function HomePage() {
  const mode = useAuthStore((s) => s.mode);

  if (mode === "parent") {
    return <ParentHome />;
  }

  if (mode === "child") {
    return <ChildHome />;
  }

  return null;
}