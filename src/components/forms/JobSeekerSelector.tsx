import React from "react";

// 親コンポーネントから渡されるpropsの型定義
type JobSeekerSelectorProps = {
  // 選択された求職者のIDを親に通知するコールバック関数
  onSelect: (id: number) => void;
};

// 仮の求職者データ（IDと名前の配列）
const dummyJobSeekers = [
  { id: 1, name: "山田 太郎" },
  { id: 2, name: "佐藤 花子" },
];

// 求職者を選択するドロップダウンのコンポーネント
const JobSeekerSelector: React.FC<JobSeekerSelectorProps> = ({ onSelect }) => {
  return (
    <select
      // ユーザーが選択肢を変えた時に呼ばれるイベントハンドラ
      onChange={(e) => onSelect(Number(e.target.value))}
      className="border p-2 rounded"  // Tailwind CSSで枠線・パディング・角丸を設定
      defaultValue=""  // 初期選択は空（選択してください表示）
    >
      {/* 初期選択肢（選択してください） */}
      <option value="" disabled>
        求職者を選択してください
      </option>

      {/* 求職者リストをoption要素として展開 */}
      {dummyJobSeekers.map((js) => (
        <option key={js.id} value={js.id}>
          {js.name}
        </option>
      ))}
    </select>
  );
};

export default JobSeekerSelector;
