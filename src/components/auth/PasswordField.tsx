import React, { useState, useEffect, FC } from 'react';
import { ErrorMessage, useField, useFormikContext } from 'formik';
import Circle from "@/components/assets/svg/Circle";
import CircleCheck from "@/components/assets/svg/CircleCheck";
import Eye from "@/components/assets/svg/Eye";
import EyeHide from "@/components/assets/svg/EyeHide";

interface PasswordCriteria {
  minChar: boolean;
  upperCase: boolean;
  lowerCase: boolean;
  number: boolean;
  specialChar: boolean;
}

interface PasswordCriteriaFieldProps {
  name: string;
  placeholder: string;
  includePasswordCriteria?: boolean;
  errorName: string;
}

const PasswordCriteriaField: React.FC<PasswordCriteriaFieldProps> = ({ 
  name, 
  placeholder, 
  includePasswordCriteria = false, 
  errorName,
}) => {  
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();
  const showError = meta.touched && meta.error;
  const [showPasswordCriteria, setShowPasswordCriteria] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const passwordCriteria = {
    minChar: field.value?.length >= 8,
    upperCase: /[A-Z]/.test(field.value),
    lowerCase: /[a-z]/.test(field.value),
    number: /[0-9]/.test(field.value),
    specialChar: /[\^$*.[\]{}()?\-"!@#%&/\\,><':;|_~`]/.test(field.value),
  };
  
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFieldValue(name, value);
  };

  const handleFocus = () => {
    includePasswordCriteria && setShowPasswordCriteria(true)
  };

  return (
    <>
    <div className="input-wrapper" style={{ position: 'relative' }}>
      <input
        {...field}
        type={showPassword ? 'text' : 'password'} 
        placeholder={placeholder}
        onChange={handleInputChange}
        className={`main-input ${showError ? "error" : "valid"}`}
        onFocus={handleFocus}
      />

      <button
        type="button"
        onClick={toggleShowPassword}
        className="eyeicon-wrap"
        >
        {showPassword ? <Eye /> : <EyeHide />}
      </button>

      <ErrorMessage
        name={errorName}
        component="div"
        className="warning-text"
      />

     {includePasswordCriteria && showPasswordCriteria && (
        <div className="pass-criteria">
          <ul>
            <li>{passwordCriteria.upperCase ? <CircleCheck /> : <Circle />} An uppercase letter</li>
            <li>{passwordCriteria.lowerCase ? <CircleCheck /> : <Circle />} A lowercase letter</li>
            <li>{passwordCriteria.number ? <CircleCheck /> : <Circle />} A number</li>
            <li>{passwordCriteria.specialChar ? <CircleCheck /> : <Circle />} A special character</li>
            <li>{passwordCriteria.minChar ? <CircleCheck /> : <Circle />} At least 8 characters</li>
          </ul>
        </div>
      )}
    </div>
    </>
  );
};

export default PasswordCriteriaField;


  // const [passwordCriteria, setPasswordCriteria] = useState<PasswordCriteria>({
  //   minChar: false,
  //   upperCase: false,
  //   lowerCase: false,
  //   number: false,
  //   specialChar: false,
  // });

  // useEffect(() => {
  //   setPasswordCriteria({
  //     minChar: password.length >= 8,
  //     upperCase: /[A-Z]/.test(password),
  //     lowerCase: /[a-z]/.test(password),
  //     number: /[0-9]/.test(password),
  //     specialChar: /[\^$*.[\]{}()?\-"!@#%&/\\,><':;|_~`]/.test(password),
  //   });
  // }, [password]);