// ライブラリのインポート
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// APIから取得する解析結果の型定義
type AnalysisResult = {
  id: number;
  summary: string;
  skills: string[];
  experience: string;
  education: string;
  matchingJobs: {
    id: number;
    title: string;
    company: string;
    salary: string;
    location: string;
    matchRate: number;
    reason: string;
  }[];
};

const AnalysisDetailPage = () => {
  // Next.jsのルーターからURLのクエリパラメータを取得
  const router = useRouter();
  const { id } = router.query;

  // 解析結果データを格納するステート（初期はnull）
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  // ローディング状態の管理用ステート
  const [loading, setLoading] = useState(false);
  // エラー発生時のメッセージ格納用ステート
  const [error, setError] = useState<string | null>(null);

  // idが変わるたびにAPIから解析結果を取得する副作用
  useEffect(() => {
    if (!id) return; // idがまだundefinedの場合は処理を中断

    setLoading(true);  // ローディング開始
    setError(null);    // エラー情報リセット

    // APIエンドポイントにGETリクエストを送信
    fetch(`/api/analysis/${id}`)
      .then(async (res) => {
        if (!res.ok) {
          // ステータスがOKでなければ例外を投げる
          throw new Error("解析結果の取得に失敗しました");
        }
        // レスポンスをJSONとしてパース
        const data = await res.json();
        // 取得したデータをステートに保存
        setAnalysis(data);
      })
      .catch((err) => {
        // エラー発生時はエラーメッセージをセット
        setError(err.message);
      })
      .finally(() => {
        // ローディング終了
        setLoading(false);
      });
  }, [id]);

  // ローディング中は読み込み中メッセージを表示
  if (loading) {
    return <p className="p-8 text-center">読み込み中...</p>;
  }

  // エラーがあればエラーメッセージを赤文字で表示
  if (error) {
    return <p className="p-8 text-center text-red-600">エラー: {error}</p>;
  }

  // 解析結果がnullのままならデータなしメッセージを表示
  if (!analysis) {
    return <p className="p-8 text-center">解析結果が見つかりません。</p>;
  }

  // 解析結果が存在する場合に詳細表示
  return (
    <div className="max-w-4xl mx-auto p-8">
      {/* ページタイトル */}
      <h1 className="text-3xl font-bold mb-6">解析結果詳細 (ID: {analysis.id})</h1>

      {/* 職務経歴書要約セクション */}
      <section className="mb-8 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">職務経歴書要約</h2>
        {/* summaryは改行を保持して表示 */}
        <p className="mb-4 whitespace-pre-line">{analysis.summary}</p>
        {/* スキルタグを青背景で丸く表示 */}
        <div className="flex flex-wrap gap-2 mb-2">
          {analysis.skills.map((skill) => (
            <span
              key={skill}
              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
        {/* 経験年数と学歴の表示 */}
        <p><strong>経験年数:</strong> {analysis.experience}</p>
        <p><strong>学歴:</strong> {analysis.education}</p>
      </section>

      {/* マッチング求人情報セクション */}
      <section className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">マッチング求人情報</h2>
        {/* 複数求人をリスト表示 */}
        <div className="space-y-6">
          {analysis.matchingJobs.map((job) => (
            <div
              key={job.id}
              className="border border-gray-300 rounded-lg p-4"
            >
              <div className="flex justify-between items-center mb-2">
                <div>
                  {/* 求人タイトル・会社名・勤務地・給与 */}
                  <h3 className="text-lg font-semibold">{job.title}</h3>
                  <p className="text-gray-600">{job.company}</p>
                  <p className="text-gray-600">
                    {job.location} | {job.salary}
                  </p>
                </div>
                {/* マッチ率を緑の大きな文字で強調 */}
                <div className="text-green-600 font-bold text-2xl">
                  {job.matchRate}%
                </div>
              </div>
              {/* マッチング理由の説明 */}
              <p className="text-sm text-gray-700">
                <strong>マッチング理由:</strong> {job.reason}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AnalysisDetailPage;
