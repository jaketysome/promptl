"use client";

import { toast, ToastContainer } from "react-toastify";
import { useGlobalStateContext } from "../context/global-state-context";
import { useEffect } from "react";

function Message({ data }: { data: { title: string } }) {
  return (
    <div className='msg-container'>
      <p className='msg-title'>{data.title}</p>
    </div>
  );
}

function Notify() {
  const { winCondition, loseCondition } = useGlobalStateContext();

  const notifyWin = () => {
    toast(Message, {
      position: "top-center",
      data: { title: "🏆 You Win!" },
    });
  };

  const notifyLose = () => {
    toast(Message, {
      position: "top-center",
      data: { title: "😞 You Lose!" },
    });
  };

  useEffect(() => {
    if (winCondition) notifyWin();
  }, [winCondition]);

  useEffect(() => {
    if (loseCondition) notifyLose();
  }, [loseCondition]);

  return (
    <>
      <ToastContainer autoClose={false} />
    </>
  );
}

export default Notify;
