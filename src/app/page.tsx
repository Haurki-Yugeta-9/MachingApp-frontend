"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import Dashboard from "./dashboard/dashboard";
import Chat from "./chat/chat";

function AppContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const view = searchParams.get('view');
  const jobId = searchParams.get('jobId');

  if (view === 'chat') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Chat onBackToDashboard={() => router.push('/')} />
      </div>
    );
  }

  return <Dashboard />;
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AppContent />
    </Suspense>
  );
}
