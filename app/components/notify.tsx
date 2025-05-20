"use client";

import { toast, ToastContainer } from "react-toastify";
import { useGlobalStateContext } from "../context/global-state-context";
import { useEffect } from "react";

function Message({ data }: { data: { title: string; text: string } }) {
  return (
    <div className='msg-container'>
      <p className='msg-title'>{data.title}</p>
      <p className='msg-description mt-2 font-bold'>{data.text}</p>
    </div>
  );
}

function Notify() {
  const { prompt, winCondition, loseCondition } = useGlobalStateContext();

  const notifyWin = () => {
    toast(Message, {
      position: "top-center",
      data: { title: "🏆 You Win!", text: prompt },
    });
  };

  const notifyLose = () => {
    toast(Message, {
      position: "top-center",
      data: { title: "😞 You Lose!", text: prompt },
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
