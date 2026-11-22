import { createFileRoute, Outlet } from "@tanstack/react-router";

// Admin layout — no navbar/footer, standalone shell
export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin | Sleek Automotive" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminLayout,
});

function AdminLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Outlet />
    </div>
  );
}
