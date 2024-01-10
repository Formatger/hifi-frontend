import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  bgColor?: string;
  width?: string;
  height?: string;
}

const Button: React.FC<ButtonProps> = ({
  bgColor = "#3498db",
  width = "auto",
  height = "auto",
  children,
  ...props
}: ButtonProps) => {
  return (
    <button style={{ backgroundColor: bgColor, width, height }} {...props}>
      {children}
    </button>
  );
};

export default Button;
