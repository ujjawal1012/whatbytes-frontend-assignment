import React from "react";

const RightSidebar = () => {
  const getColor = (score: number) => {
    if (score >= 80) return "bg-blue-500 text-blue-500";
    if (score >= 60) return "bg-orange-500 text-orange-500";
    if (score >= 40) return "bg-yellow-500 text-yellow-500";
    return "bg-red-500 text-red-500";
  };

  const syllabusAnalysis = [
    { topic: "HTML Tools, Forms, History", score: 80 },
    { topic: "Tags & References in HTML", score: 60 },
    { topic: "Tables & References in HTML", score: 24 },
    { topic: "Tables & CSS Basics", score: 96 },
  ];

  return (
    <div className="lg:col-span-1 border-[#eff1f5] rounded-md border-2 h-fit">
      <div className="p-6">
        <h3 className="text-lg text-black font-bold mb-6">Syllabus Wise Analysis</h3>

        <div className="space-y-9">
          {syllabusAnalysis.map((item, index) => {
            const colorClasses = getColor(item.score);
            return (
              <div key={index}>
                <div className="flex justify-between mb-2">
                  <span>{item.topic}</span>
                </div>
                <div className="flex items-center space-x-4 justify-between">
                  <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${colorClasses.split(" ")[0]}`} // Extract background color class
                      style={{ width: `${item.score}%` }}
                    ></div>
                  </div>
                  <span className={`font-bold ${colorClasses.split(" ")[1]}`}> 
                    {item.score}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
