"use client";

import Image from "next/image";
import { Cell, Pie, PieChart } from "recharts";

interface TestData {
  correctAnswers: number;
  totalQuestions: number;
}

export function CircularProgress({ testData }: { testData: TestData }) {
  const data = [
    { name: "Correct", value: testData.correctAnswers },
    {
      name: "Remaining",
      value: testData.totalQuestions - testData.correctAnswers,
    },
  ];

  const COLORS = ["#2F80ED", "#E0E0E0"];
  return (
    <div className="p-6 border-[#eff1f5] rounded-md border-2 my-6">
      <div className="flex justify-between mb-2">
        <h3 className="text-lg font-bold text-black">Question Analysis</h3>
        <span className="text-blue-600 font-bold">
          {testData.correctAnswers}/{testData.totalQuestions}
        </span>
      </div>

      <div>
        <div>
          <p className="text-[#525d6b]">
            <span className="font-bold text-sm">
              You scored {testData.correctAnswers} question correct out of{" "}
              {testData.totalQuestions}.
            </span>{" "}
            However it still needs some improvements
          </p>
        </div>

        <div className="flex items-center justify-center">
          <div className="relative w-full flex items-center justify-center h-full mt-4">
            <PieChart width={200} height={200}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={85}
                startAngle={0}
                endAngle={360}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
            </PieChart>

            {/* Target Icon in Center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src="https://cdn-icons-png.flaticon.com/512/9119/9119230.png"
                alt="Target"
                width={30}
                height={30}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
