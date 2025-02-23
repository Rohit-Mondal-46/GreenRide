import { auth } from "./firebaseConfig";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  sendPasswordResetEmail, 
  onAuthStateChanged 
} from "firebase/auth";

// 🔹 Sign Up User
export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    return { error: error.message };
  }
};

// 🔹 Log In User
export const logIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    return { error: error.message };
  }
};

// 🔹 Log Out User
export const logOut = async () => {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    return { error: error.message };
  }
};

// 🔹 Reset Password
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return true;
  } catch (error) {
    return { error: error.message };
  }
};

// 🔹 Listen for Auth State Changes
export const authStateListener = (callback) => {
  return onAuthStateChanged(auth, callback);
};
