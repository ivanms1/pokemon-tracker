import cx from "classnames";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}

function Button({ children, variant = "primary", ...props }: ButtonProps) {
  // console.log("classnames lib test", buttonClasses);

  return (
    // <button {...props} className={`${props.variant == "primary" ? "primary-button" : props.variant == "secondary" ? "secondary-button" : ""}`}>
    //   {children}
    // </button>
    <button
      className={cx({
        "primary-button": variant == "primary",
        "secondary-button": variant == "secondary",
      })}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
