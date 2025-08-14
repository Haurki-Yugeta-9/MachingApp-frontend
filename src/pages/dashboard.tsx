"use client";

// ライブラリのインポート
import React, {useState, useRef} from "react";
import {Search, Plus, Upload, Play, Send, FileText, Users, MessageSquare, RotateCcw } from "lucide-react";

// チャットメッセージの型定義
interface ChatMessage {
    id: number;
    type: 'user' | 'ai';
    content: string;
    timestamp: string;
}

// ダッシュボードの定義
const Dashboard = () => {
    const [selectedJobSeeker, setSelectedJobSeeker] = useState('');
    const [uploadFile, setUploadFile] = useState<File | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisComplete, setAnalysisComplete] = useState(false);
    const [chatMessage, setChatMessage] = useState('');
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // ダミーデータ
    // 求職者のリスト
    const jobSeekers = [
    { id: 1, name: '田中 太郎', age: 28, status: '活動中' },
    { id: 2, name: '佐藤 花子', age: 32, status: '活動中' },
    { id: 3, name: '鈴木 一郎', age: 25, status: '保留中' },
    { id: 4, name: '高橋 美咲', age: 29, status: '活動中' },
    { id: 5, name: '渡辺 健太', age: 35, status: '活動停止' },
    ];

    // 求人の分析結果
    const analysisResult = {
        summary: '経験豊富なWebエンジニアとして、React、Node.js、Python等の技術スタックに精通。3年間のフロントエンド開発経験と2年間のフルスタック開発経験を持つ。チームリーダーとしての経験もあり、プロジェクト管理能力も備えている。',
        skills: ['React', 'Node.js', 'Python', 'フロントエンド開発', 'プロジェクト管理'],
        experience: '5年間',
        education: '情報工学科卒業'
    };

    // マッチング求人情報
    const matchingJobs = [
        {
            id: 1,
            title: 'フロントエンドエンジニア',
            company: '株式会社テックイノベーション',
            salary: '500-700万円',
            location: '東京都渋谷区',
            matchRate: 92,
            reason: '求職者のReact・TypeScript経験と、現代的なフロントエンド開発への関心が、当求人の技術要件と完全に一致しています。また、リモートワーク可能な環境も希望条件に合致しています。'
        },
        {
            id: 2,
            title: 'フルスタックエンジニア',
            company: '株式会社クリエイティブソリューション',
            salary: '600-900万円',
            location: '東京都港区',
            matchRate: 85,
            reason: 'バックエンド経験も豊富で、求職者のキャリアアップ志向と企業の成長フェーズが合致。技術的挑戦を求める姿勢も評価されます。'
        },
        {
            id: 3,
            title: 'UI/UXエンジニア',
            company: '株式会社クリエイティブラボ',
            salary: '450-650万円',
            location: '東京都新宿区',
            matchRate: 78,
            reason: 'デザインへの理解と実装スキルの両方を持つ求職者の特性が、UI/UXとエンジニアリングの橋渡し役として最適です。'
        }
    ];

    // 求職者の検索
    const filteredJobSeekers = jobSeekers.filter(jobSeeker =>
        jobSeeker.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // ファイルアップローダー
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setUploadFile(file);
        }
    };

    
    // マッチング分析開始
    const handleStartAnalysis = async() => {
        // エラーハンドリング
        if (!selectedJobSeeker || !uploadFile) {
            alert('求職者とファイルを選択してください。');
            return;
        }
        // 正常に選択、アップロードされたら分析開始
        setIsAnalyzing(true);
        // ここでAPI呼び出しや分析処理を行う
        setTimeout(() => {
            setIsAnalyzing(false);
            setAnalysisComplete(true);
        }, 3000); // 3秒後に分析完了
    };

    // チャットメッセージ送信
    const handleSendMessage = () => {
        if (!chatMessage.trim()) return; // 空のメッセージは送信しない

        const newMessage: ChatMessage = {
            id: Date.now(),
            type: 'user',
            content: chatMessage,
            timestamp: new Date().toLocaleTimeString('ja-JP')
        };

        setChatHistory(prev => [...prev, newMessage]);
        setChatMessage('');

        // 返答（本来はAPI呼び出しで取得）
        setTimeout(() => {
            const responseMessage: ChatMessage = {
                id: Date.now() + 1,
                type: 'ai',
                content: `${chatMessage}について詳しく説明いたします。求職者の経験と希望条件を考慮すると、以下の点が重要になります：\n\n1. 技術スキルの適合性\n2. キャリア成長の可能性\n3. 企業文化との親和性\n\n追加でお知りになりたい情報はございますか？`,
                timestamp: new Date().toLocaleTimeString('ja-JP')
            };
            setChatHistory(prev => [...prev, responseMessage]);
        }, 1000); // 1秒後にAIの返答を追加
    };

    // サイドバーの選択内容をリセット
    const handleReset = () => {
        setSelectedJobSeeker('');
        setUploadFile(null);
        setSearchTerm('');
        setAnalysisComplete(false);
        setChatHistory([]);
        setChatMessage('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* サイドバーの設定 */}
            <div className="w-80 bg-white shadow-lg p-6">
                {/* ヘッダー */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">BizReach</h1>
                    <p className="text-gray-600">マッチング支援システム</p>
                </div>

                {/* 求職者選択 */}
                <div className="mb-6">
                    {/* タイトル */}
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-semibold text-gray-700 flex items-center">
                            <Users className="mr-2" size={20} />
                            求職者選択
                        </h3>
                        <button className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                            <Plus size={16} />
                        </button>
                    </div>

                    {/* 検索バー */}
                    <div className="relative mb-3">
                        <Search className="absolute left-3 top-3 text-gray-400" size={16} />
                        <input 
                            type="text" 
                            placeholder="求職者を検索..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* 求職者リスト */}
                    <select 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                        value={selectedJobSeeker}
                        onChange={(e) => setSelectedJobSeeker(e.target.value)}
                    >
                        <option value="">求職者を選択してください</option>
                        {filteredJobSeekers.map(jobSeeker => (
                            <option key={jobSeeker.id} value={jobSeeker.name}>
                                {jobSeeker.name} ({jobSeeker.age}歳) - {jobSeeker.status}
                            </option>
                        ))}
                    </select>
                </div>

                {/*ファイルアップローダー  */}
                <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
                        <FileText className="mr-2" size={20} />
                            履歴書・職務経歴書
                    </h3>
                    <div 
                        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <Upload className="mx-auto mb-2 text-gray-400" size={32} />
                        <p className="text-gray-600 mb-2">
                        {uploadFile ? uploadFile.name : "ファイルをアップロード"}
                        </p>
                        <p className="text-sm text-gray-500">PDF, DOCX, JPG, PNG対応</p>
                        <input
                        ref={fileInputRef}
                        type="file"
                        className="hidden"
                        accept=".pdf,.docx,.jpg,.jpeg,.png"
                        onChange={handleFileUpload}
                        />
                    </div>
                </div>

               

                {/* 検索開始ボタンとリセットボタン */}
                <div className="flex space-x-2">
                    <button
                        onClick={handleStartAnalysis}
                        disabled={!selectedJobSeeker || !uploadFile || isAnalyzing}
                        className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isAnalyzing ? (
                            <>
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                検索中...
                            </>
                        ) : (
                            <>
                                <Play className="mr-2" size={18} />
                                検索開始
                            </>
                        )}
                    </button>
                    <button
                        onClick={handleReset}
                        className="bg-gray-500 text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center hover:bg-gray-600 transition-colors"
                        title="選択内容をリセット"
                    >
                        <RotateCcw size={18} />
                    </button>
                </div>
            </div>

            {/* メインコンテンツ */}
            <div className="flex-1 p-8">
                {/* 初期状態 */}
                {!analysisComplete ? (
                    <div className="h-full flex items-center justify-center">
                        <div className="text-center">
                            <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                                <FileText size={48} className="text-gray-400" />
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                                検索結果を表示
                            </h2>
                            <p className="text-gray-500">求職者を選択し、職務経歴書をアップロードしてください</p>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {/* 職務経歴要約 */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">職務経歴書要約</h2>
                            <div className="bg-blue-50 p-4 rounded-lg mb-4">
                                <p className="text-gray-700">{analysisResult.summary}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <h3 className="font-semibold text-gray-700 mb-2">スキル</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {analysisResult.skills.map(skill => (
                                            <span key={skill} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-700 mb-2">経験年数</h3>
                                    <p className="text-gray-700">{analysisResult.experience}</p>
                                </div>
                            </div>
                        </div>

                        {/* マッチング結果 */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">マッチング結果</h2>
                            <div className="space-y-6">
                                {matchingJobs.map(job => (
                                    <div key={job.id} className="border border-gray-200 rounded-lg p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-800">{job.title}</h3>
                                                <p className="text-gray-600">{job.company}</p>
                                                <p className="text-gray-600">{job.location} | {job.salary}</p>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-2xl font-bold text-green-600">
                                                    {job.matchRate}%
                                                </div>
                                                <div className="text-sm text-gray-500">マッチング度</div>
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <div className="font-semibold text-gray-700 mb-2">マッチング理由</div>
                                            <p className="text-sm text-gray-600">{job.reason}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        {/* チャット機能 */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                                <MessageSquare className="mr-2" size={24} />
                                チャット機能
                            </h2>

                            <div className="h-64 border border-gray-200 rounded-lg p-4 overflow-y-auto mb-4 bg-gray-50">
                                {chatHistory.length === 0 ? (
                                    <p className="text-gray-500 text-center mt-20">追加で気になることについて質問してください</p>
                                ) : (
                                    <div className="space-y-3">
                                        {chatHistory.map(msg => (
                                            <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                                                    msg.type === 'user'
                                                    ? 'bg-blue-500 text-white'
                                                    : 'bg-gray-200 text-gray-800'
                                                }`}>
                                                    <p className="text-sm whitespace-pre-line">{msg.content}</p>
                                                    <p className="text-xs opacity-70 mt-1">{msg.timestamp}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="flex space-x-2">
                                <input
                                    type="text"
                                    value={chatMessage}
                                    onChange={(e) => setChatMessage(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                    placeholder="メッセージを入力..."
                                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <button
                                    onClick={handleSendMessage}
                                    className="bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 transition-colors"
                                >
                                    <Send size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;