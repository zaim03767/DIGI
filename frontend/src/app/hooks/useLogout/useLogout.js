import { signOut } from "firebase/auth";
import { auth } from "@/config/firebase";
import { useRouter } from "next/navigation";

const useLogout = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth); // Log the user out
      router.push("/signin"); // Redirect to the sign-in page
    } catch (err) {
      console.error("Error signing out:", err);
    }
  };

  return handleLogout;
};

export default useLogout;
