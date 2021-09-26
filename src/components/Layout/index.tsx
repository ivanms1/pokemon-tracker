interface Layout {
  children: React.ReactNode;
}

function Layout({ children }: Layout) {
  return <div className="w-screen h-screen bg-gray-50">{children}</div>;
}

export default Layout;
