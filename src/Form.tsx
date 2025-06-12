import { useState } from "react";
import logo from "/logo.svg";
import { Eye, EyeOff } from "lucide-react";
import { useForm, FieldErrors, RegisterOptions } from "react-hook-form";

// Define form data structure
type FormData = {
  firstname?: string;
  lastname?: string;
  email: string;
  password: string;
};

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ mode: "onChange" });

  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePasswordVisibility = (): void => {
    setShowPassword((prev) => !prev);
  };

  const handleModeSwitch = (mode: boolean): void => {
    setIsLogin(mode);
    reset();
  };

  const response = (data: FormData): void => {
    console.log("Form Submitted:", data);
  };

  const InputField = ({
    id,
    label,
    type = "text",
    placeholder,
    registerOptions,
  }: {
    id: keyof FormData;
    label: string;
    type?: string;
    placeholder: string;
    registerOptions?: RegisterOptions;
  }) => (
    <div className="mb-3">
      <label htmlFor={id} className="fw-bold form-label">
        {label}
      </label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className="form-control"
        {...register(id, registerOptions ?? {})}
      />
      {errors[id] && (
        <span className="text-danger">{(errors[id] as any)?.message}</span>
      )}
    </div>
  );

  const PasswordField = () => (
    <div className="mb-3">
      <label htmlFor="password" className="fw-bold form-label">
        Password
      </label>
      <div className="position-relative">
        <input
          type={showPassword ? "text" : "password"}
          className="form-control pe-5"
          id="password"
          {...register("password", {
            required: "Password is required",
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
              message:
                "Password must be at least 8 characters, include uppercase, lowercase, number, and special character",
            },
          })}
        />
        <button
          type="button"
          className="btn position-absolute end-0 top-50 translate-middle-y pe-3"
          onClick={togglePasswordVisibility}
          style={{ border: "none", background: "transparent", zIndex: 10 }}
          aria-label="Toggle password visibility"
        >
          {showPassword ? <EyeOff /> : <Eye />}
        </button>
      </div>
      {errors.password && (
        <span className="text-danger">{errors.password.message}</span>
      )}
    </div>
  );

  return (
    <form className="p-4 rounded bg-gray" onSubmit={handleSubmit(response)}>
      <div className="d-flex justify-content-center mb-3">
        <img src={logo} alt="logo" width="30" height="24" />
        <strong className="ms-2">GradeTracker</strong>
      </div>

      <h2 className="text-center">
        {isLogin ? "Login into your account" : "Create an account"}
      </h2>
      <p className="text-center">
        {isLogin
          ? "Track your grades effortlessly"
          : "Get access to more features"}
      </p>

      {!isLogin && (
        <>
          <InputField
            id="firstname"
            label="First Name"
            placeholder="Jane"
            registerOptions={{ required: "First name is required" }}
          />
          <InputField
            id="lastname"
            label="Last Name"
            placeholder="Doe"
            registerOptions={{ required: "Last name is required" }}
          />
        </>
      )}

      <InputField
        id="email"
        type="email"
        label="Email address"
        placeholder="janedoe@gmail.com"
        registerOptions={{
          required: "Email is required",
          pattern: {
            value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
            message: "Please provide a valid email address",
          },
        }}
      />

      <PasswordField />

      {isLogin && (
        <div>
          <a href="#" className="text-decoration-none">
            Forgot your password?
          </a>
        </div>
      )}

      <div>
        <button type="submit" className="fw-bold btn btn-dark w-100 mt-2">
          {isLogin ? "Sign in with Email" : "Sign up with Email"}
        </button>
        <p className="border-test text-center">or</p>
        <button type="button" className="fw-bold btn btn-dark w-100">
          {isLogin ? "Sign in with Google" : "Sign up with Google"}
        </button>
      </div>

      <div className="d-flex justify-content-center align-items-baseline fw-bold mt-3">
        <p className="me-2">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
        </p>
        <button
          type="button"
          className="btn text-primary p-0"
          onClick={() => handleModeSwitch(!isLogin)}
        >
          {isLogin ? "Sign Up" : "Sign In"}
        </button>
      </div>
    </form>
  );
};

export default Form;
