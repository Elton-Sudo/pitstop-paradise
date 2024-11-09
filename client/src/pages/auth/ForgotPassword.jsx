import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useDispatch, useSelector } from "react-redux";
import { requestPasswordReset } from "@/store/auth-slice"; // Handles sending the request to the server

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { toast } = useToast();
  const isLoading = useSelector((state) => state.auth.isLoading);

  function onSubmit(event) {
    event.preventDefault();

    if (!email) {
      toast({
        title: "Please enter your email",
        variant: "destructive",
      });
      return;
    }

    dispatch(requestPasswordReset(email)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Password reset link sent",
          description: "Check your email for the password reset link.",
        });
      } else {
        toast({
          title: "Error",
          description: data?.payload?.message || "Something went wrong",
          variant: "destructive",
        });
      }
    });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <h1 className="text-3xl font-bold text-center">Forgot Password</h1>
      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className={`w-full bg-primary text-white py-2 px-4 rounded-md ${isLoading ? "opacity-50" : "hover:bg-primary-dark"}`}
          disabled={isLoading}
        >
          {isLoading ? "Sending..." : "Send Password Reset Link"}
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;
