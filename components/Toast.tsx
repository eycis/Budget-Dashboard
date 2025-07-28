import { useEffect } from "react";
import clsx from "clsx";

interface ToastProps {
  message: string;
  type: "success" | "error" | "info";
  onClose: () => void;
}

const Toast = ({ message, type, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={clsx(
        "px-6 py-4 my-20 rounded-lg text-white font-semibold shadow-lg",
        {
          "bg-green-600": type === "success",
          "bg-red-600": type === "error",
          "bg-blue-600": type === "info",
        }
      )}
    >
      {message}
    </div>
  );
};

export default Toast;