"use client";

import { useState } from "react";
import { UpdateScoresDialog } from "@/components/update-scores-dialog";
import { CircularProgress } from "@/components/circular-progress";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import HeroSection from "@/components/hero-section";
import RightSidebar from "@/components/right-sidebar";

export default function Dashboard() {
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [testData, setTestData] = useState({
    title: "Hyper Text Markup Language",
    questions: 8,
    duration: 15,
    submittedDate: "5 June 2021",
    rank: 4,
    percentile: 90,
    correctAnswers: 12,
    totalQuestions: 15,
  });

  const handleUpdateScores = (newData: any) => {
    setTestData({
      ...testData,
      ...newData,
    });
    setShowUpdateDialog(false);
  };

  const data = [
    { name: "Correct", value: 12 },
    { name: "Remaining", value: 3 },
  ];

  const COLORS = ["#2F80ED", "#E0E0E0"]; 
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />

        {/* Content Area */}
        <main className="flex-1 p-6">
          <h2 className="text-base font-medium text-gray-700 mb-[25px] mt-[5px]">
            Skill Test
          </h2>

          {/* Main content and right sidebar layout */}

          <div className="grid grid-cols-12 gap-6">
            {/* Main content (spanning 7.5 columns) */}
            <div className="col-span-12 lg:col-span-7">
              <HeroSection
                testData={testData}
                setShowUpdateDialog={setShowUpdateDialog}
              />
            </div>

            {/* Right Sidebar (spanning 4.5 columns) */}
            <div className="col-span-12 lg:col-span-5 space-x-2">
              <RightSidebar />
              <CircularProgress testData={testData} />
            </div>
          </div>
        </main>
      </div>

      {/* Update Scores Dialog */}
      <UpdateScoresDialog
        open={showUpdateDialog}
        onOpenChange={setShowUpdateDialog}
        testData={testData}
        onUpdate={handleUpdateScores}
      />
    </div>
  );
}
