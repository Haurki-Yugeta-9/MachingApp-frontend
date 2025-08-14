// ユーザーの役割を定義（権限や機能分けに利用）
export type UserRole = "admin" | "employer" | "job_seeker";

// ユーザーの基本型
export interface User {
  id: string;            // ユーザーID（DBの主キー）
  name: string;          // 名前
  email: string;         // メールアドレス
  role: UserRole;        // 役割（管理者・雇用者・求職者）
  avatarUrl?: string;    // プロフィール画像URL（任意）
  createdAt: string;     // 作成日時（ISO8601形式）
  updatedAt: string;     // 更新日時（ISO8601形式）
}

// より詳細なプロフィール情報を含む型
export interface UserProfile extends User {
  bio?: string;          // 自己紹介文
  phone?: string;        // 電話番号
  address?: string;      // 住所
}
