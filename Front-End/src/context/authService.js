import { auth, googleProvider } from "./firebaseConfig";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  sendPasswordResetEmail, 
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect
} from "firebase/auth";

/**
 * 🔹 Common Firebase Auth Errors with User-Friendly Messages
 */
const authErrors = {
  "auth/email-already-in-use": "This email is already registered. Try logging in.",
  "auth/invalid-email": "Invalid email format. Please check your email.",
  "auth/weak-password": "Password should be at least 6 characters long.",
  "auth/user-not-found": "No account found with this email.",
  "auth/wrong-password": "Incorrect password. Please try again.",
  "auth/popup-closed-by-user": "Sign-in popup closed. Try again.",
  "auth/cancelled-popup-request": "Multiple popups blocked. Try again later.",
  default: "An error occurred. Please try again.",
};

/**
 * 🔹 Sign Up User
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<Object>} User object or error message
 */
export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user, error: null };
  } catch (error) {
    console.error("Sign Up Error:", error);
    return { user: null, error: authErrors[error.code] || authErrors.default };
  }
};

/**
 * 🔹 Log In User
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<Object>} User object or error message
 */
export const logIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user, error: null };
  } catch (error) {
    console.error("Log In Error:", error);
    return { user: null, error: authErrors[error.code] || authErrors.default };
  }
};

/**
 * 🔹 Log In with Google
 * @returns {Promise<Object>} User object or error message
 */
export const logInWithGoogle = async () => {
  try {
    const userCredential = await signInWithPopup(auth, googleProvider);
    return { user: userCredential.user, error: null };
  } catch (error) {
    console.error("Google Sign In Error:", error);
    
    // 🔹 Fallback to Redirect Sign-In if pop-ups are blocked
    if (error.code === "auth/popup-blocked" || error.code === "auth/cancelled-popup-request") {
      try {
        await signInWithRedirect(auth, googleProvider);
        return { user: null, error: "Redirecting for Google Sign-in..." };
      } catch (redirectError) {
        console.error("Google Redirect Error:", redirectError);
        return { user: null, error: authErrors[redirectError.code] || authErrors.default };
      }
    }

    return { user: null, error: authErrors[error.code] || authErrors.default };
  }
};

/**
 * 🔹 Log Out User
 * @returns {Promise<Object>} Success or error message
 */
export const logOut = async () => {
  try {
    await signOut(auth);
    return { success: true, error: null };
  } catch (error) {
    console.error("Log Out Error:", error);
    return { success: false, error: authErrors[error.code] || authErrors.default };
  }
};

/**
 * 🔹 Reset Password
 * @param {string} email 
 * @returns {Promise<Object>} Success or error message
 */
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true, error: null };
  } catch (error) {
    console.error("Password Reset Error:", error);
    return { success: false, error: authErrors[error.code] || authErrors.default };
  }
};

/**
 * 🔹 Listen for Auth State Changes
 * @param {Function} callback 
 * @returns {Function} Unsubscribe function
 */
export const authStateListener = (callback) => {
  return onAuthStateChanged(auth, callback);
};
