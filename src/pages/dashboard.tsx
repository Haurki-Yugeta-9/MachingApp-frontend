"use client";

// ライブラリのインポート
import React, {useState, useEffect} from "react";
import {Search, Plus, Play, Send, FileText, Users, MessageSquare, RotateCcw, CheckCircle, AlertCircle, Clock, Building, MapPin, DollarSign } from "lucide-react";
import { useRouter } from 'next/router';
import Modal from './modal';

// 型定義
interface ChatMessage {
    id: number;
    type: 'user' | 'ai';
    content: string;
    timestamp: string;
}

interface JobSeeker {
    id: number;
    name: string;
    age: number;
    status: string;
}

interface ExtractedInfo {
    id: number;
    skills: { [key: string]: string[] };
    job_categories: string[];
    industries: string[];
    experience_years: number | null;
    current_company: string | null;
    desired_location: string[];
    desired_salary: { [key: string]: any };
    education: { [key: string]: string };
    languages: { language: string; level: string }[];
    certifications: string[];
    work_preferences: string[];
    summary: string | null;
}

interface ProcessingStatus {
    status: 'pending' | 'processing' | 'completed' | 'failed';
    confidence?: number;
    error_message?: string;
}

interface JobOpening {
    id: number;
    company: {
        name: string;
        industry: string;
        location: string;
    };
    position: string;
    salary: {
        min: number;
        max: number;
    };
    matchingScore: number;
    matchingReasons: string[];
    requirements: string[];
    benefits: string[];
}

// ダッシュボードコンポーネント
const Dashboard = () => {
    const [selectedJobSeeker, setSelectedJobSeeker] = useState('');
    const [selectedJobSeekerData, setSelectedJobSeekerData] = useState<JobSeeker | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisComplete, setAnalysisComplete] = useState(false);
    const [chatMessage, setChatMessage] = useState('');
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();

    // マッチング関連の状態
    const [processingStatus, setProcessingStatus] = useState<ProcessingStatus>({ status: 'pending' });
    const [extractedInfo, setExtractedInfo] = useState<ExtractedInfo | null>(null);
    const [matchedJobs, setMatchedJobs] = useState<JobOpening[]>([]);
    

    // 求職者データ
    const [jobSeekers, setJobSeekers] = useState<JobSeeker[]>([]);

    // モーダルの成功コールバック
    const handleModalSuccess = () => {
        // 求職者データを再取得
        fetchJobSeekers();
    };

    // APIベースURL
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

    // 求職者データを取得
    const fetchJobSeekers = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/job-seekers`);
            if (response.ok) {
                const data = await response.json();
                setJobSeekers(data);
                console.log('求職者データ取得成功:', data);
            } else {
                console.error('求職者データ取得エラー:', response.status);
                // フォールバックとしてハードコーディングされたデータを使用
                setJobSeekers([
                    { id: 1, name: '田中 太郎', age: 28, status: '活動中' },
                    { id: 2, name: '佐藤 花子', age: 32, status: '活動中' },
                    { id: 3, name: '鈴木 一郎', age: 25, status: '保留中' },
                    { id: 4, name: '高橋 美咲', age: 29, status: '活動中' },
                    { id: 5, name: '渡辺 健太', age: 35, status: '活動停止' },
                ]);
            }
        } catch (error) {
            console.error('求職者データ取得失敗:', error);
            // フォールバックとしてハードコーディングされたデータを使用
            setJobSeekers([
                { id: 1, name: '田中 太郎', age: 28, status: '活動中' },
                { id: 2, name: '佐藤 花子', age: 32, status: '活動中' },
                { id: 3, name: '鈴木 一郎', age: 25, status: '保留中' },
                { id: 4, name: '高橋 美咲', age: 29, status: '活動中' },
                { id: 5, name: '渡辺 健太', age: 35, status: '活動停止' },
            ]);
        }
    };

    // コンポーネントマウント時に求職者データを取得
    useEffect(() => {
        fetchJobSeekers();
    }, []);

    // ダミーの求人データ生成
    const generateDummyJobs = (jobSeekerInfo: ExtractedInfo): JobOpening[] => {
        const companies = [
            {
                name: "株式会社テクノロジー革新",
                industry: "IT・ソフトウェア",
                positions: ["フロントエンドエンジニア", "システムエンジニア", "プロジェクトマネージャー"],
                salary: { min: 450, max: 800 },
                location: "東京都渋谷区",
                benefits: ["リモートワーク可", "フレックス制", "年収査定制度"]
            },
            {
                name: "グローバル商事株式会社",
                industry: "商社・貿易",
                positions: ["営業企画", "海外事業企画", "マーケティング"],
                salary: { min: 400, max: 650 },
                location: "東京都千代田区",
                benefits: ["海外研修制度", "語学支援", "住宅手当"]
            },
            {
                name: "株式会社データアナリティクス",
                industry: "データサイエンス",
                positions: ["データサイエンティスト", "機械学習エンジニア", "データアナリスト"],
                salary: { min: 500, max: 900 },
                location: "東京都港区",
                benefits: ["研修制度充実", "書籍購入支援", "カンファレンス参加支援"]
            },
            {
                name: "コンサルティングパートナーズ",
                industry: "コンサルティング",
                positions: ["戦略コンサルタント", "ITコンサルタント", "業務改善コンサルタント"],
                salary: { min: 600, max: 1000 },
                location: "東京都新宿区",
                benefits: ["成果報酬制", "MBA支援制度", "海外プロジェクト参加機会"]
            },
            {
                name: "株式会社クリエイティブソリューション",
                industry: "広告・マーケティング",
                positions: ["Webディレクター", "UI/UXデザイナー", "デジタルマーケッター"],
                salary: { min: 380, max: 600 },
                location: "東京都品川区",
                benefits: ["クリエイティブ環境", "副業OK", "スキルアップ支援"]
            }
        ];

        return companies.map((company, index) => {
            const position = company.positions[Math.floor(Math.random() * company.positions.length)];
            const matchingScore = Math.floor(Math.random() * 20) + 80; // 80-99の範囲
            
            // マッチング理由の生成
            const reasons = [];
            if (jobSeekerInfo.skills && Object.keys(jobSeekerInfo.skills).length > 0) {
                const skillCategories = Object.keys(jobSeekerInfo.skills);
                const randomCategory = skillCategories[Math.floor(Math.random() * skillCategories.length)];
                const skills = jobSeekerInfo.skills[randomCategory];
                if (skills && skills.length > 0) {
                    const skill = skills[Math.floor(Math.random() * skills.length)];
                    reasons.push(`${skill}のスキルが職務要件と合致`);
                }
            }
            if (jobSeekerInfo.experience_years && jobSeekerInfo.experience_years > 0) {
                reasons.push(`${jobSeekerInfo.experience_years}年の経験が求められるレベルに適合`);
            }
            reasons.push(`${company.industry}分野への転職希望と合致`);
            reasons.push(`希望勤務地と勤務地が一致`);

            return {
                id: index + 1,
                company: {
                    name: company.name,
                    industry: company.industry,
                    location: company.location
                },
                position: position,
                salary: company.salary,
                matchingScore: matchingScore,
                matchingReasons: reasons.slice(0, Math.floor(Math.random() * 2) + 2), // 2-3個の理由
                requirements: [
                    `${position}として3年以上の経験`,
                    "チームワークを重視する方",
                    "新しい技術への学習意欲がある方"
                ],
                benefits: company.benefits
            };
        }).sort((a, b) => b.matchingScore - a.matchingScore).slice(0, 3); // マッチング度順でトップ3
    };


    // 求職者の検索
    const filteredJobSeekers = jobSeekers.filter(jobSeeker =>
        jobSeeker.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // 求職者選択処理
    const handleJobSeekerChange = (value: string) => {
        setSelectedJobSeeker(value);
        // まず名前で検索し、見つからない場合はIDで検索
        let jobSeeker = jobSeekers.find(js => js.name === value);
        if (!jobSeeker) {
            // もしかするとIDが渡されている可能性があるので、IDでも検索
            const id = parseInt(value);
            if (!isNaN(id)) {
                jobSeeker = jobSeekers.find(js => js.id === id);
            }
        }
        setSelectedJobSeekerData(jobSeeker || null);
        console.log('選択された求職者:', jobSeeker);
    };

    // マッチング処理開始
    const handleStartMatching = async () => {
        if (!selectedJobSeekerData) {
            alert('求職者を選択してください。');
            return;
        }

        setIsAnalyzing(true);
        setProcessingStatus({ status: 'processing' });

        try {
            console.log('マッチング開始:', selectedJobSeekerData);
            
            // マッチング処理のシミュレーション
            setTimeout(() => {
                // サンプルの抽出情報を設定
                const sampleExtractedInfo: ExtractedInfo = {
                    id: selectedJobSeekerData.id,
                    skills: {
                        'プログラミング言語': ['Python', 'JavaScript', 'TypeScript'],
                        'フレームワーク': ['React', 'FastAPI', 'Node.js'],
                        'データベース': ['MySQL', 'PostgreSQL']
                    },
                    job_categories: ['エンジニア', 'フルスタック開発者'],
                    industries: ['IT・通信', 'Webサービス'],
                    experience_years: 3,
                    current_company: 'サンプル株式会社',
                    desired_location: ['東京', '神奈川'],
                    desired_salary: {
                        type: 'range',
                        min_amount: 400,
                        max_amount: 600
                    },
                    education: {
                        university: 'サンプル大学',
                        degree: '情報工学科'
                    },
                    languages: [
                        { language: '日本語', level: 'ネイティブ' },
                        { language: '英語', level: '日常会話' }
                    ],
                    certifications: ['基本情報技術者', 'AWS認定ソリューションアーキテクト'],
                    work_preferences: ['リモートワーク', 'フレックス制'],
                    summary: `${selectedJobSeekerData.name}さんのプロフィールをまとめました。`
                };
                
                setExtractedInfo(sampleExtractedInfo);
                
                // ダミー求人データを生成
                const dummyJobs = generateDummyJobs(sampleExtractedInfo);
                setMatchedJobs(dummyJobs);
                
                setProcessingStatus({ status: 'completed', confidence: 0.85 });
                setAnalysisComplete(true);
                setIsAnalyzing(false);
            }, 2000); // 2秒後にマッチング完了

        } catch (error) {
            console.error('マッチング処理エラー:', error);
            const errorMessage = error instanceof Error ? error.message : '不明なエラーが発生しました';
            setProcessingStatus({ 
                status: 'failed', 
                error_message: errorMessage
            });
            alert(`エラー: ${errorMessage}`);
            setIsAnalyzing(false);
        }
    };

    // チャットメッセージ送信
    const handleSendMessage = () => {
        if (!chatMessage.trim()) return;

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
        }, 1000);
    };

    // リセット処理
    const handleReset = () => {
        setSelectedJobSeeker('');
        setSelectedJobSeekerData(null);
        setSearchTerm('');
        setAnalysisComplete(false);
        setChatHistory([]);
        setChatMessage('');
        setProcessingStatus({ status: 'pending' });
        setExtractedInfo(null);
    };

    // ステータス表示コンポーネント
    const StatusIndicator = ({ status, confidence, error_message }: ProcessingStatus) => {
        switch (status) {
            case 'pending':
                return (
                    <div className="flex items-center text-gray-500">
                        <Clock className="mr-2" size={16} />
                        待機中
                    </div>
                );
            case 'processing':
                return (
                    <div className="flex items-center text-blue-500">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500 mr-2"></div>
                        処理中...
                    </div>
                );
            case 'completed':
                return (
                    <div className="flex items-center text-green-500">
                        <CheckCircle className="mr-2" size={16} />
                        完了 {confidence && `(マッチング度: ${Math.round(confidence * 100)}%)`}
                    </div>
                );
            case 'failed':
                return (
                    <div className="flex items-center text-red-500">
                        <AlertCircle className="mr-2" size={16} />
                        エラー: {error_message}
                    </div>
                );
            default:
                return null;
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
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-semibold text-gray-700 flex items-center">
                            <Users className="mr-2" size={20} />
                            求職者選択
                        </h3>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            <Plus size={16} />
                        </button>
                        <Modal
                            isOpen={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                            onSuccess={handleModalSuccess}
                        />
                    </div>

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

                    <select 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                        value={selectedJobSeeker}
                        onChange={(e) => handleJobSeekerChange(e.target.value)}
                    >
                        <option value="">求職者を選択してください</option>
                        {filteredJobSeekers.map(jobSeeker => (
                            <option key={jobSeeker.id} value={jobSeeker.name}>
                                {jobSeeker.name} ({jobSeeker.age}歳) - {jobSeeker.status}
                            </option>
                        ))}
                    </select>
                </div>

                

                {/* マッチング開始ボタンとリセットボタン */}
                <div className="flex flex-col space-y-2">
                    <div className="flex space-x-2">
                        <button
                            onClick={handleStartMatching}
                            disabled={!selectedJobSeeker || isAnalyzing || processingStatus.status === 'processing'}
                            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isAnalyzing || processingStatus.status === 'processing' ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                    処理中...
                                </>
                            ) : (
                                <>
                                    <Play className="mr-2" size={18} />
                                    マッチング
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
            </div>

            {/* メインコンテンツ */}
            <div className="flex-1 p-8">
                {!analysisComplete ? (
                    <div className="h-full flex items-center justify-center">
                        <div className="text-center">
                            <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                                <FileText size={48} className="text-gray-400" />
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                                マッチング結果を表示
                            </h2>
                            <p className="text-gray-500">求職者を選択し、マッチングを開始してください</p>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {/* OCR処理結果 */}
                        {extractedInfo && (
                            <>
                                <div className="bg-white rounded-lg shadow-md p-6">
                                    <h2 className="text-xl font-bold text-gray-800 mb-4">
                                        {selectedJobSeekerData ? `${selectedJobSeekerData.name}さんのマッチング結果` : 'マッチング結果'}
                                    </h2>
                                    
                                    {/* 要約 */}
                                    <div className="bg-blue-50 p-4 rounded-lg mb-6">
                                        <h3 className="font-semibold text-gray-700 mb-2">プロフィール要約</h3>
                                        <p className="text-gray-700">{extractedInfo.summary || '要約情報なし'}</p>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        {/* 左列 */}
                                        <div className="space-y-4">
                                            {/* 基本情報 */}
                                            <div>
                                                <h3 className="font-semibold text-gray-700 mb-2">基本情報</h3>
                                                <div className="space-y-1 text-sm">
                                                    <p><span className="font-medium">現職:</span> {extractedInfo.current_company || '不明'}</p>
                                                    <p><span className="font-medium">経験年数:</span> {extractedInfo.experience_years ? `${extractedInfo.experience_years}年` : '不明'}</p>
                                                    {extractedInfo.education.university && (
                                                        <p><span className="font-medium">学歴:</span> {extractedInfo.education.university}</p>
                                                    )}
                                                </div>
                                            </div>

                                            {/* 経験職種 */}
                                            <div>
                                                <h3 className="font-semibold text-gray-700 mb-2">経験職種</h3>
                                                <div className="flex flex-wrap gap-2">
                                                    {extractedInfo.job_categories.length > 0 ? (
                                                        extractedInfo.job_categories.map((category, index) => (
                                                            <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                                                                {category}
                                                            </span>
                                                        ))
                                                    ) : (
                                                        <span className="text-gray-500 text-sm">情報なし</span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* 経験業界 */}
                                            <div>
                                                <h3 className="font-semibold text-gray-700 mb-2">経験業界</h3>
                                                <div className="flex flex-wrap gap-2">
                                                    {extractedInfo.industries.length > 0 ? (
                                                        extractedInfo.industries.map((industry, index) => (
                                                            <span key={index} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                                                                {industry}
                                                            </span>
                                                        ))
                                                    ) : (
                                                        <span className="text-gray-500 text-sm">情報なし</span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* 語学スキル */}
                                            <div>
                                                <h3 className="font-semibold text-gray-700 mb-2">語学スキル</h3>
                                                <div className="space-y-1">
                                                    {extractedInfo.languages.length > 0 ? (
                                                        extractedInfo.languages.map((lang, index) => (
                                                            <div key={index} className="flex justify-between text-sm">
                                                                <span>{lang.language}</span>
                                                                <span className="text-gray-600">{lang.level}</span>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <span className="text-gray-500 text-sm">情報なし</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* 右列 */}
                                        <div className="space-y-4">
                                            {/* スキル */}
                                            <div>
                                                <h3 className="font-semibold text-gray-700 mb-2">技術スキル</h3>
                                                <div className="space-y-3">
                                                    {Object.keys(extractedInfo.skills).length > 0 ? (
                                                        Object.entries(extractedInfo.skills).map(([category, skills]) => (
                                                            <div key={category}>
                                                                <h4 className="text-sm font-medium text-gray-600 mb-1">{category}</h4>
                                                                <div className="flex flex-wrap gap-1">
                                                                    {skills.map((skill, index) => (
                                                                        <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                                                                            {skill}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <span className="text-gray-500 text-sm">スキル情報なし</span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* 希望条件 */}
                                            <div>
                                                <h3 className="font-semibold text-gray-700 mb-2">希望条件</h3>
                                                <div className="space-y-2 text-sm">
                                                    {/* 希望年収 */}
                                                    {extractedInfo.desired_salary && Object.keys(extractedInfo.desired_salary).length > 0 && (
                                                        <div>
                                                            <span className="font-medium">年収:</span>
                                                            {extractedInfo.desired_salary.type === 'range' ? (
                                                                <span className="ml-1">{extractedInfo.desired_salary.min_amount}～{extractedInfo.desired_salary.max_amount}万円</span>
                                                            ) : (
                                                                <span className="ml-1">{extractedInfo.desired_salary.amount}万円{extractedInfo.desired_salary.type === 'minimum' ? '以上' : ''}</span>
                                                            )}
                                                        </div>
                                                    )}
                                                    
                                                    {/* 希望勤務地 */}
                                                    {extractedInfo.desired_location.length > 0 && (
                                                        <div>
                                                            <span className="font-medium">勤務地:</span>
                                                            <span className="ml-1">{extractedInfo.desired_location.join('、')}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* 働き方の希望 */}
                                            <div>
                                                <h3 className="font-semibold text-gray-700 mb-2">働き方の希望</h3>
                                                <div className="flex flex-wrap gap-2">
                                                    {extractedInfo.work_preferences.length > 0 ? (
                                                        extractedInfo.work_preferences.map((pref, index) => (
                                                            <span key={index} className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                                                                {pref}
                                                            </span>
                                                        ))
                                                    ) : (
                                                        <span className="text-gray-500 text-sm">情報なし</span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* 資格 */}
                                            <div>
                                                <h3 className="font-semibold text-gray-700 mb-2">資格・認定</h3>
                                                <div className="flex flex-wrap gap-2">
                                                    {extractedInfo.certifications.length > 0 ? (
                                                        extractedInfo.certifications.map((cert, index) => (
                                                            <span key={index} className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                                                                {cert}
                                                            </span>
                                                        ))
                                                    ) : (
                                                        <span className="text-gray-500 text-sm">情報なし</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                   
                                    
                                    {/* マッチング結果 - 求人情報 */}
                                    {matchedJobs.length > 0 && (
                                        <div className="mt-8">
                                            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                                                <Building className="mr-2" size={20} />
                                                マッチング求人（上位3社）
                                            </h3>
                                            <div className="space-y-4">
                                                {matchedJobs.map((job, index) => (
                                                    <div 
                                                        key={job.id}
                                                        className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6"
                                                        onClick={() => router.push(`/chat?company=${job.company.name}`)}
                                                    >
                                                        <div className="flex justify-between items-start mb-4">
                                                            <div className="flex-1">
                                                                <div className="flex items-center mb-2">
                                                                    <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium mr-3">
                                                                        {index + 1}位
                                                                    </span>
                                                                    <h4 className="text-lg font-bold text-gray-900">{job.company.name}</h4>
                                                                    <span className="ml-3 bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                                                                        {job.company.industry}
                                                                    </span>
                                                                </div>
                                                                <p className="text-blue-700 font-semibold text-lg mb-1">{job.position}</p>
                                                                <div className="flex items-center text-gray-600 text-sm mb-3">
                                                                    <MapPin size={14} className="mr-1" />
                                                                    <span className="mr-4">{job.company.location}</span>
                                                                    <DollarSign size={14} className="mr-1" />
                                                                    <span>{job.salary.min}～{job.salary.max}万円</span>
                                                                </div>
                                                            </div>
                                                            <div className="text-right">
                                                                <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold mb-2">
                                                                    マッチング度 {job.matchingScore}%
                                                                </div>
                                                            </div>
                                                        </div>
                                                        
                                                        {/* マッチング理由 */}
                                                        <div className="bg-white bg-opacity-80 rounded-lg p-4 mb-4">
                                                            <h5 className="font-semibold text-gray-800 mb-2 flex items-center">
                                                                <CheckCircle size={16} className="mr-2 text-green-500" />
                                                                マッチング理由
                                                            </h5>
                                                            <ul className="space-y-1">
                                                                {job.matchingReasons.map((reason, idx) => (
                                                                    <li key={idx} className="text-sm text-gray-700 flex items-start">
                                                                        <span className="text-green-500 mr-2 mt-0.5">•</span>
                                                                        {reason}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                        
                                                        {/* 求人要件と福利厚生 */}
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                            <div className="bg-white bg-opacity-80 rounded-lg p-3">
                                                                <h6 className="font-medium text-gray-800 mb-2 text-sm">求められるスキル・経験</h6>
                                                                <ul className="space-y-1">
                                                                    {job.requirements.map((req, idx) => (
                                                                        <li key={idx} className="text-xs text-gray-600 flex items-start">
                                                                            <span className="text-blue-400 mr-1 mt-0.5">▪</span>
                                                                            {req}
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                            <div className="bg-white bg-opacity-80 rounded-lg p-3">
                                                                <h6 className="font-medium text-gray-800 mb-2 text-sm">福利厚生・特徴</h6>
                                                                <div className="flex flex-wrap gap-1">
                                                                    {job.benefits.map((benefit, idx) => (
                                                                        <span key={idx} className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full text-xs">
                                                                            {benefit}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div> 
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;