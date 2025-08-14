"use client";

import React, { useState } from "react";

// Propsで選択された求職者IDを受け取る
type ChatInterfaceProps = {
  jobSeekerId: number | null;  // 選択なしの場合はnull
};

const ChatInterface: React.FC<ChatInterfaceProps> = ({ jobSeekerId }) => {
  // チャットのメッセージ履歴をstateで管理
  const [messages, setMessages] = useState<string[]>([]);

  // 入力フォームの値を管理
  const [input, setInput] = useState("");

  // 求職者が選択されていなければメッセージを表示して終了
  if (!jobSeekerId) {
    return <p>求職者を選択してください。</p>;
  }

  // 送信ボタン押下時の処理
  const sendMessage = () => {
    // 空白だけの送信を防止
    if (!input.trim()) return;

    // メッセージを履歴に追加
    setMessages([...messages, input]);

    // 入力欄をクリア
    setInput("");

    // TODO: ここでAIチャットAPIへの送信など処理を呼び出す想定
  };

  return (
    <div className="border rounded p-4">
      <h2 className="font-semibold mb-2">AIチャット</h2>

      {/* メッセージ表示エリア。縦スクロール可能 */}
      <div className="h-40 overflow-y-auto border mb-2 p-2">
        {messages.map((msg, i) => (
          <p key={i} className="mb-1">
            {msg}
          </p>
        ))}
      </div>

      {/* 入力テキストフォーム */}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="border p-2 w-full"
        placeholder="メッセージを入力"
      />

      {/* 送信ボタン */}
      <button
        onClick={sendMessage}
        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
      >
        送信
      </button>
    </div>
  );
};

export default ChatInterface;
