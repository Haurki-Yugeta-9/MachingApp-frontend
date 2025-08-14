// ライブラリのインポート
import { User } from "./user";

// 求職者プロフィール型（Userを継承して追加情報を付与）
export interface JobSeekerProfile extends User {
  skills: string[];                                 // スキル一覧
  experienceYears: number;                          // 実務経験年数
  desiredJobType: "full_time" | "part_time" | "contract"; // 希望する雇用形態
  resumeUrl?: string;                               // 履歴書URL（任意）
  portfolioUrl?: string;                            // ポートフォリオURL（任意）
}

// 求職者が応募した求人情報の型
export interface JobApplication {
  id: string;                                       // 応募ID
  jobId: string;                                    // 応募先求人のID
  seekerId: string;                                 // 応募者（求職者）のID
  status: "pending" | "reviewed" | "interview" | "rejected" | "hired"; 
  // 応募ステータス
  appliedAt: string;                                // 応募日時（ISO8601形式）
  updatedAt: string;                                // 最終更新日時（ISO8601形式）
}
