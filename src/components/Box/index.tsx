import classNames from "classnames";

interface Box {
  children: React.ReactNode;
  className?: string;
}

function Box({ children, className, ...props }: Box) {
  return (
    <div className={classNames("base-box", className)} {...props}>
      {children}
    </div>
  );
}

export default Box;
