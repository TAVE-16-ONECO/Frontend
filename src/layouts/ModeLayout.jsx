import { Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

import ParentLayout from "./ParentLayout";
import ChildLayout from "./ChildLayout";

export default function ModeLayout() {
  const mode = useAuthStore((state) => state.mode);

  if (mode === "parent") {
    return (
      <ParentLayout>
        <Outlet />
      </ParentLayout>
    );
  }

  return (
    <ChildLayout>
      <Outlet />
    </ChildLayout>
  );
}
