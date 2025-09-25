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
import Button from "react-bootstrap/Button";

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
    <div className="d-flex justify-content-center align-items-center min-vh-100 my-5">
      <Form
        name="signup"
        className="p-4 rounded signup"
        onSubmit={handleSubmit((data) => emailSignup.mutate(data))}
      >
        <Link
          to="/"
          className="d-flex justify-content-center mb-3 text-decoration-none"
        >
          <img src={logo} alt="logo" width="30" height="24" />
          <strong className="text-dark">GradeTracker</strong>
        </Link>

        <h2 className="text-center">Create an account</h2>
        <p className="text-center">Get access to more features</p>
        <div className="mb-3 d-md-flex gap-4">
          <Form.Group controlId="firstname">
            <Form.Label className="fw-bold">First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Jane"
              {...register("firstname", { required: true })}
            />
            {errors.firstname && (
              <span className="text-danger">First name is required</span>
            )}
          </Form.Group>
          <Form.Group controlId="lastname">
            <Form.Label className="fw-bold">Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Doe"
              {...register("lastname", { required: true })}
            />
            {errors.lastname && (
              <span className="text-danger">Last name is required</span>
            )}
          </Form.Group>
        </div>
        <Form.Group controlId="email" className="mb-3">
          <Form.Label className="fw-bold">Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="janedoe@gmail.com"
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
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label className="fw-bold">Password</Form.Label>
          <div className="position-relative">
            <Form.Control
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
                  message:
                    "Password must be at least 8 characters, include uppercase, lowercase, number, and special character",
                },
              })}
            />
            <Button
              type="button"
              className="position-absolute end-0 top-50 translate-middle-y pe-3"
              onClick={togglePasswordVisibility}
              style={{ border: "none", background: "transparent", zIndex: 10 }}
              aria-label="Toggle password visibility"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </Button>
          </div>
          {errors.password && (
            <span className="text-danger">{errors.password.message}</span>
          )}
        </Form.Group>

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
            {googleSignup.isPending
              ? "Authenticating..."
              : "Sign up with Google"}
          </PulseEffect>
        </div>

        <div className="d-flex justify-content-center align-items-baseline fw-bold mt-3">
          <p className="me-2">Already have an account?</p>
          <Link to="../login" className="btn text-primary p-0">
            Sign In
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default SignUp;
