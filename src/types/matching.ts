// ライブラリのインポート
import { JobSeekerProfile } from "./jobSeeker";
import { User } from "./user";

// 求人情報型
export interface Job {
  id: string;                                       // 求人ID
  title: string;                                    // 求人タイトル
  description: string;                              // 求人の詳細説明
  requiredSkills: string[];                         // 必須スキル
  location: string;                                 // 勤務地
  employmentType: "full_time" | "part_time" | "contract"; // 雇用形態
  postedBy: User;                                   // 求人を投稿した雇用者情報
  postedAt: string;                                 // 投稿日時（ISO8601形式）
}

// マッチング結果型
export interface Match {
  id: string;                                       // マッチング結果ID
  job: Job;                                         // 対象の求人情報
  seeker: JobSeekerProfile;                         // マッチした求職者情報
  score: number;                                    // マッチングスコア（0〜100）
  matchedAt: string;                                // マッチング日時（ISO8601形式）
}

// 複数マッチング結果のレスポンス型
export interface MatchResult {
  matches: Match[];                                 // マッチ一覧
  total: number;                                    // 全マッチ数
}
