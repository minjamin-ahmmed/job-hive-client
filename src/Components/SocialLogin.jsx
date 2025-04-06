import { useContext } from "react";
import { FaGoogle } from "react-icons/fa"; // Import Google icon from react-icons
import AuthContext from "../context/AuthContext";

const SocialLogin = () => {
  const { googleSignIn } = useContext(AuthContext);

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        const user = result.user;
        console.log("User signed in successfully:", user);
      })
      .catch((error) => {
        console.error("Error signing in with Google:", error);
      });
  };

  return (
    <div>
      <button
        onClick={handleGoogleSignIn}
        className="flex items-center justify-center space-x-2 bg-white text-primary border-2 border-primary  px-4 py-2 rounded-md hover:bg-secondary hover:text-primary hover:border-secondary transition w-full"
      >
        {/* Google Icon */}
        <FaGoogle size={20} />
        <span>Sign in with Google</span>
      </button>
    </div>
  );
};

export default SocialLogin;
