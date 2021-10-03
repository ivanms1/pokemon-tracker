interface Layout {
  children: React.ReactNode;
}

function Layout({ children }: Layout) {
  return (
    <div className="w-screen box-border h-screen p-5 bg-gray-50 lg:p-20 ">
      {children}
    </div>
  );
}

export default Layout;
