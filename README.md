# MachingApp-frontend

## 開発環境でのログイン認証

### 🚀 開発用テストアカウント

開発中は以下のテストアカウントでログインできます：

| 役割 | 社員番号 | パスワード | 説明 |
|------|----------|------------|------|
| 管理者 | `admin` | `admin123` | 管理者権限 |
| ユーザー1 | `user001` | `test1234` | 一般ユーザー |
| ユーザー2 | `user002` | `test1234` | 一般ユーザー |

### ⚙️ 開発認証の設定

1. `.env.local`ファイルで`NEXT_PUBLIC_DEV_AUTH_ENABLED=true`が設定されている
2. `NODE_ENV=development`の環境で自動的に有効になります
3. ブラウザのコンソールにテストアカウント情報が表示されます

### ⚠️ 重要な注意事項

**本番環境にデプロイする前に以下のファイルを削除または無効化してください:**

- `src/lib/dev-auth.ts` - 開発用認証ファイル
- `.env.local`から`NEXT_PUBLIC_DEV_AUTH_ENABLED=true`を削除
- `src/app/login/login.tsx`から開発用認証コードを削除

### 🔧 セットアップ

```bash
npm install
npm run dev
```

開発サーバーが起動したら、ブラウザで http://localhost:3000 にアクセスしてください。