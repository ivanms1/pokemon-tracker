import cx from "classnames";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}

function Button({ children, variant = "primary", ...props }: ButtonProps) {
  return (
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
