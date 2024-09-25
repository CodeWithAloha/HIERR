import React, { useState } from "react";

interface InfoModalProps {
  children: React.ReactNode;
  title: string;
}

const InfoModal = ({ children, title }: InfoModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <button className="btn-info btn" onClick={() => setIsModalOpen(true)}>
        {title}
      </button>
      {isModalOpen && (
        <dialog className="modal" open>
          <div className="modal-box bg-white">
            <button
              className="btn-ghost btn-sm btn-circle btn absolute right-2 top-2 text-primary-content"
              onClick={() => setIsModalOpen(false)}
            >
              ✕
            </button>
            {children}
            <div className="modal-action">
              <button className="btn" onClick={() => setIsModalOpen(false)}>
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
};

export default InfoModal;
