import React from "react";

// コンポーネントのpropsの型定義
type ResumeAnalysisProps = {
  data: {
    summary: string;    // 履歴書の要約テキスト
    skills: string[];   // スキルの配列
    experience: string; // 経験年数（例: "5年"）
    education: string;  // 学歴情報（例: "大学卒"）
  };
};

// ResumeAnalysisコンポーネント本体
const ResumeAnalysis: React.FC<ResumeAnalysisProps> = ({ data }) => {
  return (
    // メインのセクション。白背景・角丸・影・パディング付き
    <section className="bg-white rounded-lg shadow p-6">
      {/* タイトル */}
      <h2 className="text-xl font-semibold mb-4">履歴書分析結果</h2>

      {/* summaryテキストを表示。改行を保持するためwhitespace-pre-lineを使用 */}
      <p className="mb-4 whitespace-pre-line">{data.summary}</p>

      {/* skills配列を繰り返し表示。青系の丸いバッジスタイル */}
      <div className="flex flex-wrap gap-2 mb-2">
        {data.skills.map((skill) => (
          <span
            key={skill}  // Reactのリストキー
            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* 経験年数表示 */}
      <p>
        <strong>経験年数:</strong> {data.experience}
      </p>

      {/* 学歴表示 */}
      <p>
        <strong>学歴:</strong> {data.education}
      </p>
    </section>
  );
};

// このコンポーネントを他ファイルからimport可能にする
export default ResumeAnalysis;
