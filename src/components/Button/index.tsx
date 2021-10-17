import cx from "classnames";
import { HTMLMotionProps, motion } from "framer-motion";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "warning";
}

function Button({
  children,
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileTap={{ y: "1px" }}
      className={cx("base-button", variant, className)}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export default Button;
