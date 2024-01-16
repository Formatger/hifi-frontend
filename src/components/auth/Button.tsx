import React from "react";

interface ButtonProps {
  buttonText: string;
  disabled: boolean;
  // active?: boolean;
  // onClick?: () => void;
}


const Button: React.FC<ButtonProps> = ({ buttonText, disabled }) => {
  return (
    <button
      disabled={disabled}
      className="auth-button">
      {buttonText}
    </button>
  );
};

export default Button;
