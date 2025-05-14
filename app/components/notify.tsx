"use client";

import { toast, ToastContainer } from "react-toastify";
import { useGlobalStateContext } from "../context/global-state-context";
import { useEffect } from "react";

function Notify() {
  const { winCondition } = useGlobalStateContext();

  const notify = () => {
    toast("🏆 You Win!", { position: "top-center" });
  };

  useEffect(() => {
    if (winCondition) notify();
  }, [winCondition]);

  return (
    <>
      <ToastContainer autoClose={false} />
    </>
  );
}

export default Notify;
