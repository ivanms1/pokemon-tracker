interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant: "primary" | "secondary";
}

function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`${
        props.variant == "primary"
          ? "primary-button"
          : props.variant == "secondary"
          ? "secondary-button"
          : ""
      }`}
    >
      {children}
    </button>
  );
}

export default Button;
