
// import React from "react";
// import OtpInput from "react-otp-input";

// interface AuthCodeOtpProps {
//   otp: any;
//   handleChange: (otpValue: any) => void;
//   isValid: boolean;
//   onSubmit: () => void;
//   loader: boolean;
// }

// const AuthCodeOtp: React.FC<AuthCodeOtpProps> = ({
//   otp,
//   handleChange,
//   isValid,
//   onSubmit,
//   loader,
// }) => {
//   return (
//     <div className="authcode-wrap">
//       <OtpInput
//         value={otp}
//         onChange={handleChange}
//         numInputs={6}
//         containerStyle=""
//         inputStyle="inputStyle"
//         renderInput={(props, keys) => (
//           <> 
//         {keys === 0 && (
//             <div className="authkey left">
//               <input
//                 {...props}
//                 inputMode="numeric"
//                 className="authkey-number"
//               />
//             </div>
//           )}
//           {keys === 3 && (
//             <div className="authkey-space-wrap">
//               <hr className="authkey-space" />
//               <div className="authkey left">
//                 <input
//                   {...props}
//                   inputMode="numeric"
//                   className="authkey-number"
//                 />
//               </div>
//             </div>
//           )}
//           {keys === 1 && (
//             <div className="authkey center">
//               <input
//                 {...props}
//                 inputMode="numeric"
//                 className="authkey-number"
//               />
//             </div>
//           )}
//           {keys === 4 && (
//             <div className="authkey center">
//               <input
//                 {...props}
//                 inputMode="numeric"
//                 className="authkey-number"
//               />
//             </div>
//           )}
//           {keys === 2 && (
//             <div className="authkey right">
//               <input
//                 {...props}
//                 inputMode="numeric"
//                 className="authkey-number"
//               />
//             </div>
//           )}
//           {keys === 5 && (
//             <div className="authkey right">
//               <input
//                 {...props}
//                 inputMode="numeric"
//                 className="authkey-number"
//               />
//             </div>
//           )}
//           </>
//         )}
//       />
//       {!isValid && (
//         <div className="row-center">
//           <p className="warning-text-2">Please enter numbers only</p>
//         </div>
//       )}
//       <div className="mt-box">
//         {!loader ? (
//           <button className="app-button" onClick={onSubmit} disabled={otp.length <= 5}>
//             Confirm
//           </button>
//         ) : (
//           <Loading />
//         )}
//       </div>
//     </div>
//   );
// };

// export default AuthCodeOtp;

// import React from "react";
// import OtpInput from "react-otp-input";

// const AuthCode = ({ otp, handleChange }) => (
//   <div className="authcode-wrap">
//     <OtpInput
//       value={otp}
//       onChange={handleChange}
//       numInputs={6}
//       containerStyle=""
//       inputStyle="inputStyle"
//       renderInput={(props, keys) => (
//         <>
//           {keys === 0 && (
//             <div className="authkey left">
//               <input
//                 {...props}
//                 inputMode="numeric"
//                 className="authkey-number"
//               />
//             </div>
//           )}
//           {keys === 3 && (
//             <div className="authkey-space-wrap">
//               <hr className="authkey-space" />
//               <div className="authkey left">
//                 <input
//                   {...props}
//                   inputMode="numeric"
//                   className="authkey-number"
//                 />
//               </div>
//             </div>
//           )}
//           {keys === 1 && (
//             <div className="authkey center">
//               <input
//                 {...props}
//                 inputMode="numeric"
//                 className="authkey-number"
//               />
//             </div>
//           )}
//           {keys === 4 && (
//             <div className="authkey center">
//               <input
//                 {...props}
//                 inputMode="numeric"
//                 className="authkey-number"
//               />
//             </div>
//           )}
//           {keys === 2 && (
//             <div className="authkey right">
//               <input
//                 {...props}
//                 inputMode="numeric"
//                 className="authkey-number"
//               />
//             </div>
//           )}
//           {keys === 5 && (
//             <div className="authkey right">
//               <input
//                 {...props}
//                 inputMode="numeric"
//                 className="authkey-number"
//               />
//             </div>
//           )}
//         </>
//       )}
//     />
//   </div>
// );

// export default AuthCode;
