import styles from "./Layout.module.scss";

interface Layout {
  children: React.ReactNode;
}

function Layout({ children }: Layout) {
  return <div className={styles.Layout}>{children}</div>;
}

export default Layout;
