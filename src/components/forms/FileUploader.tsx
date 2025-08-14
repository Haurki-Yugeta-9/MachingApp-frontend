import React, { useState } from "react";

// 親コンポーネントからアップロード結果を受け取るためのコールバック関数をpropsに指定
type FileUploaderProps = {
  onUpload: (data: any) => void;  // ファイル解析結果などを返す関数
};

const FileUploader: React.FC<FileUploaderProps> = ({ onUpload }) => {
  // 選択されたファイルをstateで管理（初期はnull）
  const [file, setFile] = useState<File | null>(null);

  // ファイル選択時のイベントハンドラ
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;      // ファイルが選択されていなければ何もしない
    setFile(e.target.files[0]);       // 選択した最初のファイルをstateに保存
  };

  // アップロードボタン押下時の処理
  const handleUpload = () => {
    if (!file) return;                // ファイルがなければ処理を止める

    // ここにAPI送信やファイル解析のロジックを実装予定
    // 今回はダミーの解析結果を用意して、親コンポーネントに渡す例
    const dummyResult = {
      summary: "職務経歴書要約の例",
      skills: ["React", "TypeScript", "API設計"],
      experience: "5年",
      education: "大学卒",
    };
    onUpload(dummyResult);  // 親に解析結果を渡す
  };

  return (
    <div>
      {/* ファイル選択用インプット */}
      <input type="file" onChange={handleChange} />

      {/* アップロードボタン。ファイルが未選択時はdisabled */}
      <button
        onClick={handleUpload}
        disabled={!file}
        className="ml-2 px-4 py-2 bg-blue-600 text-white rounded"
      >
        アップロード
      </button>
    </div>
  );
};

export default FileUploader;
