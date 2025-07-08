"use client";

import { useContext } from "react";
import { ModalContext } from "./ModalContext";
import Modal from "./Modal";

export default function ContentWithModal() {
  const { isOpen, closeModal } = useContext(ModalContext);

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <h2 className="text-lg mb-4">Leave a Message</h2>
      <textarea className="w-full h-50 p-2 text-black" placeholder="Type your message..." />
      <h2 className="text-lg mb-4">Leave a Message</h2>
      <h2 className="text-lg mb-4">Leave a Message</h2>
      <h2 className="text-lg mb-4">Leave a Message</h2>
    </Modal>
  );
}
