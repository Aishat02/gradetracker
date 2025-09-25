import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "/logo.svg";
import { FcGoogle as Google } from "react-icons/fc";
import { Mail, Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";
import { PulseEffect } from "@/dashboard/components/MotionAnimations";
import { AuthFormData } from "@/shared/types/user";

const Login = () => {
  const { useEmailLogin, useGoogle, useResetPassword } = useAuth();

  const emailLogin = useEmailLogin();
  const googleLogin = useGoogle();
  const resetPassword = useResetPassword();
  const [loginError, setLoginError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<AuthFormData>({ mode: "onChange" });

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePasswordVisibility = (): void => {
    setShowPassword((prev) => !prev);
  };

  const userEmail: string = getValues("email");

  return (
    <div className="d-flex justify-content-center align-items-center h-100">
      <form
        className="p-4 rounded login"
        onSubmit={handleSubmit((data) => emailLogin.mutate(data))}
      >
        <Link
          to="/"
          className="d-flex justify-content-center mb-3 text-decoration-none"
        >
          <img src={logo} alt="logo" width="30" height="24" />
          <strong className="text-dark">GradeTracker</strong>
        </Link>
        <h4 className="text-center">Login into your account</h4>
        <p className="text-center">Track your grades effortlessly</p>

        {loginError && <span className="text-danger">{loginError}</span>}

        <div className="mb-3">
          <label htmlFor="email" className="fw-bold form-label">
            Email address
          </label>
          <input
            id="email"
            type="email"
            placeholder="janedoe@gmail.com"
            className="form-control"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "Please provide a valid email address",
              },
            })}
          />
          {errors.email && (
            <span className="text-danger">{errors.email.message}</span>
          )}
        </div>

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

        <button
          type="button"
          className="border-0 text-primary"
          style={{ background: "transparent" }}
          onClick={() => resetPassword.mutate(userEmail)}
        >
          Forgot your password?
        </button>
        <div>
          <PulseEffect
            type="submit"
            state={emailLogin.isPending}
            style="fw-bold btn btn-dark w-100 mt-2 d-flex justify-content-center align-items-center gap-2 mt-3"
          >
            <Mail size={20} />
            {emailLogin.isPending ? "Logging in......" : "Sign in with Email"}
          </PulseEffect>
          <div className="d-flex align-items-center my-1">
            <hr className="flex-grow-1 me-2" />
            <span className="text-muted">or</span>
            <hr className="flex-grow-1 ms-2" />
          </div>
          <PulseEffect
            type="button"
            state={googleLogin.isPending}
            style="fw-bold btn btn-dark w-100 d-flex justify-content-center align-items-center gap-2"
            onClick={() => googleLogin.mutate()}
          >
            <Google size={20} />
            {googleLogin.isPending
              ? "Authenticating..."
              : "Sign in with Google"}
          </PulseEffect>
        </div>

        <div className="d-flex justify-content-center align-items-baseline fw-bold mt-3">
          <p className="me-2">Don't have an account?</p>
          <Link to="../signup" className="btn text-primary p-0">
            Sign Up{" "}
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
