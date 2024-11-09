import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast"; 
import { useDispatch } from "react-redux";
import { resetPassword } from "@/store/auth-slice"; 
const ResetPassword = () => {
  const params = useParams();  
  const { token } = params;    

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();

  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!password) {
      toast({
        title: "Error",
        description: "Please enter a new password",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      await dispatch(resetPassword({ token, password })).unwrap(); 

      toast({
        title: "Success",
        description: "Password reset successfully!",
      });
      navigate("/auth/login"); 
    } catch (error) {
      toast({
        title: "Error",
        description: error?.message || "Failed to reset password",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <h1 className="text-3xl font-bold text-center">Reset Password</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border-gray-300 rounded-md shadow-sm"
          required
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-primary text-white py-2 px-4 rounded-md ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-primary-dark"
          }`}
        >
          {isSubmitting ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
