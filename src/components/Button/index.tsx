import cx from "classnames";
import { HTMLMotionProps, motion } from "framer-motion";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "warning";
  outlined?: boolean;
}

function Button({
  children,
  variant = "primary",
  outlined = false,
  className,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileTap={{ y: "1px" }}
      className={cx("base-button", variant, className, { outlined })}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export default Button;
