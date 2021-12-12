import cx from "classnames";
import { HTMLMotionProps, motion } from "framer-motion";
import Link from "next/link";
import React from "react";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "warning";
  href?: string;
  outlined?: boolean;
}

function Button({
  children,
  variant = "primary",
  outlined = false,
  className,
  href,
  ...props
}: ButtonProps) {
  if (href) {
    return (
      <Link href={href}>
        <a className={cx("base-button", variant, className, { outlined })}>
          {children}
        </a>
      </Link>
    );
  }
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
