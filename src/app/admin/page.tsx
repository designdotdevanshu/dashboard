import Link from "next/link";

export default function Admin() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Link href="/admin/users" className="rounded p-4 shadow dark:shadow-white">
        User Management
      </Link>
      <Link href="/admin/analytics" className="rounded p-4 shadow dark:shadow-white">
        Analytics
      </Link>
      <Link href="/admin/notifications" className="rounded p-4 shadow dark:shadow-white">
        Notifications
      </Link>
      <Link href="/admin/settings" className="rounded p-4 shadow dark:shadow-white">
        Settings
      </Link>
      <Link href="/admin/tasks" className="rounded p-4 shadow dark:shadow-white">
        Task Management
      </Link>
    </div>
  );
}
