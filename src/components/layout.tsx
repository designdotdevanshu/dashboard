const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <header className="bg-green-600 p-4 text-white">User App</header>
      <main className="flex-grow p-4">{children}</main>
    </div>
  );
};

export default Layout;
