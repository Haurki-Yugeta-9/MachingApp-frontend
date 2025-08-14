"use client";

import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
  sidebarWidth?: string;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  showSidebar = true,
  sidebarWidth = 'w-80'
}) => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* サイドバー */}
      {showSidebar && (
        <div className={`${sidebarWidth} bg-white shadow-lg`}>
          <Sidebar />
        </div>
      )}
      
      {/* メインコンテンツエリア */}
      <div className="flex-1 flex flex-col">
        {/* ヘッダー */}
        <Header />
        
        {/* メインコンテンツ */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;