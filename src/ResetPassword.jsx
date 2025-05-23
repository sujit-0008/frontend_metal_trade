import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Lock } from "lucide-react";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const role = searchParams.get("role");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || !role) {
      setError("Invalid reset link");
    }
  }, [token, role]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/auth/reset-password", {
        token,
        newPassword,
        role,
      });
      setMessage(response.data.message);
      setError("");
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
      setMessage("");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-gradient-x">
      <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <Lock size={48} className="text-indigo-600" />
          <h2 className="text-3xl font-extrabold text-gray-800 mt-2">Reset Password</h2>
        </div>

        {error && <p className="text-red-600 text-center font-medium mb-4">{error}</p>}

        {!error && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-gray-700 font-medium text-sm mb-1 block">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
                placeholder="Enter your new password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold transition duration-300 shadow-md"
            >
              Reset Password
            </button>
          </form>
        )}

        {message && <p className="text-green-600 text-center font-medium mt-4">{message}</p>}

        <p className="text-center mt-6 text-sm text-gray-600">
          Back to{" "}
          <a href="/login" className="text-indigo-600 font-semibold hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
