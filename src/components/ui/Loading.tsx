import React from "react";

type LoadingProps = {
  text?: string;
};

export default function Loading({ text = "読み込み中..." }: LoadingProps) {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-gray-600">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
      <p className="mt-2 text-sm">{text}</p>
    </div>
  );
}
