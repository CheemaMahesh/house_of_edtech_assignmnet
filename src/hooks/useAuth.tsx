import axios from "axios";

const useAuth = () => {
    const signupUser = async (name: string, email: string, password: string) => {
        try {
            const response = await axios.post("/api/v1/auth/signup", { name, email, password });
            return response.data;
        } catch (error) {
            console.error("Error signing up:", error);
            throw error;
        }
    }

    const signinUser = async (email: string, password: string) => {
        try {
            const response = await axios.post("/api/v1/auth/signin", { email, password });
            return response.data;
        } catch (error) {
            console.error("Error signing in:", error);
            throw error;
        }
    }

    return { signupUser, signinUser };
}

export default useAuth;