import cx from "classnames";

interface Box {
  children: React.ReactNode;
  className?: string;
}

function Box({ children, className, ...props }: Box) {
  return (
    <div className={cx("base-box", className)} {...props}>
      {children}
    </div>
  );
}

export default Box;
