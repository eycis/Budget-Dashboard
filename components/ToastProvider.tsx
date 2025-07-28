'use client'

import{createContext, useContext, useState, ReactNode} from "react";
import Toast from "./Toast";

type ToastConextType = {
    showToast: (message: string, type?: "success"| "error" | "info") => void;
};

const ToastContext = createContext<ToastConextType | undefined> (undefined);

export const useToast = () => {
    const context = useContext(ToastContext);
    if(!context) throw new Error("toast provider missing");
    return context;
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);
  
    const showToast = (message: string, type: "success" | "error" | "info" = "info") => {
      setToast({ message, type });
    };

    return (
      <ToastContext.Provider value={{ showToast }}>
        {children}
        {toast && (
          <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-[9999]">
            <Toast
              message={toast.message}
              type={toast.type}
              onClose={() => setToast(null)}
            />
          </div>
        )}
      </ToastContext.Provider>
    );
  };