import React from 'react';

export default function Toast({ toast }) {
  if (!toast || !toast.visible) return null;

  return (
    <div
      id="portfolioToast"
      className="toast"
      style={{
        borderColor: toast.isError ? 'rgba(244, 63, 94, 0.5)' : 'rgba(16, 185, 129, 0.5)'
      }}
    >
      {toast.message}
    </div>
  );
}
