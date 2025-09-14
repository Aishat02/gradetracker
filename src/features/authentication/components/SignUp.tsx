import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "/logo.svg";
import { FcGoogle as Google } from "react-icons/fc";
import { Mail, Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";
import { PulseEffect } from "@/dashboard/components/MotionAnimations";
import { AuthFormData } from "@/shared/types/user";
import Form from "react-bootstrap/Form";

const SignUp = () => {
  const { useEmailSignUp, useGoogle } = useAuth();

  const emailSignup = useEmailSignUp();
  const googleSignup = useGoogle();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormData>({ mode: "onChange" });

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePasswordVisibility = (): void => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Form
      name="signup"
      className="p-4 rounded signup"
      onSubmit={handleSubmit((data) => emailSignup.mutate(data))}
    >
      <Link to="/" className="d-flex justify-content-center mb-3">
        <img src={logo} alt="logo" width="30" height="24" />
        <strong>GradeTracker</strong>
      </Link>

      <h2 className="text-center">Create an account</h2>
      <p className="text-center">Get access to more features</p>
      <div className="mb-3 d-md-flex gap-4">
        <div>
          <label htmlFor="firstname" className="fw-bold form-label">
            First Name
          </label>
          <input
            id="firstname"
            type="text"
            placeholder="Jane"
            className="form-control"
            {...register("firstname", { required: true })}
          />
          {errors.firstname && (
            <span className="text-danger">First name is required</span>
          )}
        </div>
        <div>
          <label htmlFor="lastname" className="fw-bold form-label">
            Last Name
          </label>
          <input
            id="lastname"
            type="text"
            placeholder="Doe"
            className="form-control"
            {...register("lastname", { required: true })}
          />
          {errors.lastname && (
            <span className="text-danger">Last name is required</span>
          )}
        </div>
      </div>
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

      <div>
        <PulseEffect
          type="submit"
          state={emailSignup.isPending}
          style="fw-bold btn btn-dark w-100 mt-2 d-flex justify-content-center align-items-center gap-2 mt-3"
        >
          <Mail size={20} />
          {emailSignup.isPending
            ? "Creating account......"
            : "Sign up with Email"}
        </PulseEffect>

        <div className="d-flex align-items-center my-1">
          <hr className="flex-grow-1 me-2" />
          <span className="text-muted">or</span>
          <hr className="flex-grow-1 ms-2" />
        </div>
        <PulseEffect
          type="button"
          state={googleSignup.isPending}
          style="fw-bold btn btn-dark w-100 d-flex justify-content-center align-items-center gap-2"
          onClick={() => googleSignup.mutate()}
        >
          <Google size={20} />
          {googleSignup.isPending ? "Authenticating..." : "Sign up with Google"}
        </PulseEffect>
      </div>

      <div className="d-flex justify-content-center align-items-baseline fw-bold mt-3">
        <p className="me-2">Already have an account?</p>
        <Link to="../login" className="btn text-primary p-0">
          Sign In
        </Link>
      </div>
    </Form>
  );
};

export default SignUp;
