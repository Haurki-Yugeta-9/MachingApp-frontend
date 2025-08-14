import React from "react";

// JobMatchingコンポーネントのprops型定義
type JobMatchingProps = {
  data: {
    id: number;          // 求人の一意識別子（キーとして利用）
    title: string;       // 求人タイトル
    company: string;     // 会社名
    salary: string;      // 給与情報（例: "年収500万〜700万"）
    location: string;    // 勤務地
    matchRate: number;   // マッチング率（%）
    reason: string;      // マッチング理由の説明文
  }[];
};

// 求人情報をリスト表示するReactコンポーネント
const JobMatching: React.FC<JobMatchingProps> = ({ data }) => {
  return (
    // 全体のセクション。白背景・角丸・影・パディングを適用
    <section className="bg-white rounded-lg shadow p-6">
      {/* セクションタイトル */}
      <h2 className="text-xl font-semibold mb-4">マッチング求人情報</h2>

      {/* 求人リスト全体の縦間隔を設定 */}
      <div className="space-y-6">
        {/* data配列をmapで繰り返し描画 */}
        {data.map((job) => (
          // 各求人カード。キーはidで一意
          <div key={job.id} className="border border-gray-300 rounded-lg p-4">
            {/* 求人タイトル・会社名・勤務地・給与・マッチング率を横並びに配置 */}
            <div className="flex justify-between items-center mb-2">
              <div>
                <h3 className="text-lg font-semibold">{job.title}</h3>
                <p className="text-gray-600">{job.company}</p>
                <p className="text-gray-600">
                  {job.location} | {job.salary}
                </p>
              </div>

              {/* マッチング率（%）を緑色で強調表示 */}
              <div className="text-green-600 font-bold text-2xl">
                {job.matchRate}%
              </div>
            </div>

            {/* マッチング理由を小さい字で表示 */}
            <p className="text-sm text-gray-700">
              <strong>マッチング理由:</strong> {job.reason}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default JobMatching;
