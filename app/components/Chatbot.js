"use client";

import { useState, Fragment } from "react";
import { FaCommentDots, FaTimes } from "react-icons/fa";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);

  const sendMessage = async () => {
    // Ignore empty submissions

    if (!input.trim()) return;
    // We use the spread operator (...) to copy existing messages into a new array

    const newMessages = [...messages, { role: "user", text: input }];

    setMessages(newMessages);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();

    setMessages([...newMessages, { role: "bot", text: data.reply }]);

    setInput("");
  };

  return (
  //   Fragment lets us return multiple elements
  //  without adding an unnecessary <div> to the DOM.
    <Fragment>

      {/* CHAT ICON */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-5 bg-green-600 text-white p-4 rounded-full shadow-lg "
      >
        {open ? <FaTimes /> : <FaCommentDots />}
      </button>

      {/* CHAT BOX */}
      {open && (
        <div className="fixed bottom-20 right-5 w-80 bg-white border rounded-lg shadow-xl p-3">
          {/* MESSAGES */}
          {/*my-1 margin on the y-axis
          i stands for the index of each item in the array.*/}
          <div className="h-64 overflow-y-auto mb-3 text-sm">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex my-1 ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <p
                  className={`px-3 py-2 rounded-md max-w-[75%] ${
                    msg.role === "user"
                      ? "bg-green-600 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  {msg.text}
                </p>
              </div>
            ))}
          </div>

          {/* INPUT */}
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="border p-2 flex-1 rounded-md text-black"
            />

            <button
              onClick={sendMessage}
              className="bg-green-600 text-white px-3 rounded-md"
            >
              Send
            </button>
          </div>
        </div>
      )}
  </Fragment>
  );
}
