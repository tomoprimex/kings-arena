"use client";
import React, { useEffect } from "react";
import { CheckCircle, XCircle, X } from "lucide-react";

const Toast = ({ type, message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const isSuccess = type === "success";

  return (
    <div className={`toast toast-${type}`}>
      <div className="toast-icon">
        {isSuccess ? <CheckCircle size={24} /> : <XCircle size={24} />}
      </div>
      <div className="toast-message">{message}</div>
      <button className="toast-close" onClick={onClose}>
        <X size={18} />
      </button>
    </div>
  );
};

export default Toast;
