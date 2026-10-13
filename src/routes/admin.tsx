import { createFileRoute, Outlet } from "@tanstack/react-router";

// Admin layout — no navbar/footer, standalone shell
export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

function AdminLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Outlet />
    </div>
  );
}
