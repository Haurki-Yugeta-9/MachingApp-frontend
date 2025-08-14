"use client";

import React, { useState, useRef } from 'react';
import { Search, Plus, Upload, Play, FileText, Users } from 'lucide-react';

interface JobSeeker {
  id: number;
  name: string;
  age: number;
  status: string;
}

interface SidebarProps {
  onAnalysisStart?: (jobSeeker: string, file: File) => void;
  jobSeekers?: JobSeeker[];
}

const Sidebar: React.FC<SidebarProps> = ({
  onAnalysisStart,
  jobSeekers = [
    { id: 1, name: '田中 太郎', age: 28, status: '活動中' },
    { id: 2, name: '佐藤 花子', age: 32, status: '活動中' },
    { id: 3, name: '鈴木 一郎', age: 25, status: '保留中' },
    { id: 4, name: '高橋 美咲', age: 29, status: '活動中' },
    { id: 5, name: '渡辺 健太', age: 35, status: '活動停止' },
  ]
}) => {
  const [selectedJobSeeker, setSelectedJobSeeker] = useState('');
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 求職者の検索
  const filteredJobSeekers = jobSeekers.filter(jobSeeker =>
    jobSeeker.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ファイルアップローダー
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadFile(file);
    }
  };

  // マッチング分析開始
  const handleStartAnalysis = async () => {
    // エラーハンドリング
    if (!selectedJobSeeker || !uploadFile) {
      alert('求職者とファイルを選択してください。');
      return;
    }
    
    // 正常に選択、アップロードされたら分析開始
    setIsAnalyzing(true);
    
    // 親コンポーネントに通知
    if (onAnalysisStart) {
      onAnalysisStart(selectedJobSeeker, uploadFile);
    }
    
    // ここでAPI呼び出しや分析処理を行う
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 3000); // 3秒後に分析完了
  };

  return (
    <div className="p-6 h-full">
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
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* 求職者リスト */}
        <select 
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

      {/* ファイルアップローダー */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
          <FileText className="mr-2" size={20} />
          職務経歴書
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

      {/* 検索開始ボタン */}
      <button
        onClick={handleStartAnalysis}
        disabled={!selectedJobSeeker || !uploadFile || isAnalyzing}
        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
    </div>
  );
};

export default Sidebar;