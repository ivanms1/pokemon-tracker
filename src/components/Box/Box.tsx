import cx from "classnames";

import styles from "./Box.module.scss";

interface Box {
  children: React.ReactNode;
  className?: string;
}

function Box({ children, className, ...props }: Box) {
  return (
    <div className={cx(styles.Box, className)} {...props}>
      {children}
    </div>
  );
}

export default Box;
