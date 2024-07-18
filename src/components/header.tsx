import Link from "next/link";

const Header = () => {
  return (
    <header className="body-font bg-gray-900 text-gray-400">
      <div className="container mx-auto flex flex-col flex-wrap items-center p-5 md:flex-row">
        <Link href="/" className="title-font mb-4 flex items-center font-medium text-white md:mb-0">
          <span className="ml-3 text-xl">Devanshu</span>
        </Link>
        <nav className="flex flex-wrap items-center justify-center text-base md:ml-auto">
          <Link href="/" className="mr-5 hover:text-white">
            Client
          </Link>
          <Link href="/admin" className="mr-5 hover:text-white">
            Dashboard
          </Link>
          <Link href="/admin/users" className="mr-5 hover:text-white">
            Users
          </Link>
          <Link href="/admin/notifications" className="mr-5 hover:text-white">
            Notifications
          </Link>
          <Link href="/admin/settings" className="mr-5 hover:text-white">
            Settings
          </Link>
          <Link href="/admin/analytics" className="mr-5 hover:text-white">
            Analytics
          </Link>
          <Link href="/admin/tasks" className="mr-5 hover:text-white">
            Tasks
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
