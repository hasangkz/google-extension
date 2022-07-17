import { useEffect } from "react";
import { useState } from "react";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
export const useLog = () => {
  const [isLog, setIsLog] = useState(null);
  useEffect(() => {
    console.log(isLog);
    onAuthStateChanged(auth, (data) => {
      setIsLog(!!data);
    });
  }, []);

  return isLog;
};
