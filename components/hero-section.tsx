import { Button, Tooltip } from "@heroui/react";
import Image from "next/image";
import React from "react";
import { PerformanceChart } from "./performance-chart";
import { CircularProgress } from "./circular-progress";
import {
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  CartesianGrid,
} from "recharts";
interface HeroSectionProps {
  testData: {
    title: string;
    questions: number;
    duration: number;
    submittedDate: string;
    rank: number;
    percentile: number;
    correctAnswers: number;
    totalQuestions: number;
  };
  setShowUpdateDialog: (show: boolean) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  testData,
  setShowUpdateDialog,
}) => {
  return (
    <div className="lg:col-span-2 space-y-6">
      {/* HTML Test Card */}
      <div className="pl-4 py-6 pr-6 border-[#eff1f5] rounded-lg border-2 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 flex-shrink-0">
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg"
              alt="HTML5"
              width={64}
              height={64}
              className="object-contain"
            />
          </div>
          <div>
            <h3 className="text-xl font-bold">{testData.title}</h3>
            <p className="text-gray-500 text-sm">
              Questions: {String(testData.questions).padStart(2, "0")} |
              Duration: {testData.duration} mins | Submitted on{" "}
              {testData.submittedDate}
            </p>
          </div>
        </div>
        <Button
          className="bg-[#122279] rounded-[10px] border-[3px] border-black font-medium text-[14px] py-[23px] px-[35px]  text-white"
          onClick={() => setShowUpdateDialog(true)}
        >
          Update
        </Button>
      </div>

      {/* Quick Statistics */}
      <div className="p-4 border-[#eff1f5] rounded-lg border-2">
        <h3 className="text-lg font-bold ">Quick Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-4 p-4 ">
            <div className="inset-0 bg-black/10  z-40 p-4 rounded-full ">
              {/* <CheckSquare className="h-8 w-8" /> */}
              <Image
                src={"https://cdn-icons-png.flaticon.com/512/2827/2827957.png"}
                alt="HTML5"
                width={25}
                height={25}
                className="object-contain"
              />
            </div>
            <div>
              <div className="text-2xl font-bold">{testData.rank}</div>
              <div className="text-gray-500 text-sm">YOUR RANK</div>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 border-[#eff1f5] rounded-md border-l-2">
            <div className="inset-0 bg-black/10  z-40 p-4 rounded-full ">
              {/* <CheckSquare className="h-8 w-8" /> */}
              <Image
                src={"https://cdn-icons-png.flaticon.com/512/2370/2370279.png"}
                alt="HTML5"
                width={25}
                height={25}
                className="object-contain"
              />
            </div>

            <div>
              <div className="text-2xl font-bold flex items-center">
                {testData.percentile}%
                {/* <ArrowUp className="h-4 w-4 text-green-500 ml-1" /> */}
              </div>
              <div className="text-gray-500 text-sm">PERCENTILE</div>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 border-[#eff1f5] rounded-md border-l-2">
            <div className="inset-0 bg-black/10  z-40 p-4 rounded-full ">
              {/* <CheckSquare className="h-8 w-8" /> */}
              <Image
                src={
                  "https://cdn-icons-png.flaticon.com/512/12503/12503615.png"
                }
                alt="HTML5"
                width={25}
                height={25}
                className="object-contain"
              />
            </div>
            <div>
              <div className="text-2xl font-bold">
                {testData.correctAnswers} / {testData.totalQuestions}
              </div>
              <div className="text-gray-500 text-sm">CORRECT ANSWERS</div>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Graph */}

      <ComparisonGraph percentile={testData.percentile} />
    </div>
  );
};

const data = [
  { percentile: 0, students: 1 },
  { percentile: 10, students: 3 },
  { percentile: 20, students: 7 },
  { percentile: 30, students: 12 },
  { percentile: 40, students: 18 },
  { percentile: 50, students: 25 },
  { percentile: 60, students: 20 },
  { percentile: 70, students: 15 },
  { percentile: 80, students: 10 },
  { percentile: 90, students: 4 },
  { percentile: 100, students: 2 },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border shadow-md rounded-md p-2">
        <p className="text-sm font-semibold">{`Percentile: ${payload[0].payload.percentile}%`}</p>
        <p className="text-sm">{`Students: ${payload[0].payload.students}`}</p>
      </div>
    );
  }
  return null;
};

const ComparisonGraph = (testData: any) => {
  console.log("🚀 ~ ComparisonGraph ~ testData:", testData.testData);
  const userPoint = data.find((d) => d.percentile === testData.percentile);

  return (
    <div className="p-6  border-[#eff1f5] rounded-md border-2">
      <h2 className="text-lg font-bold ">Comparison Graph</h2>
      <div className="flex justify-between items-center ">
        <p className="text-gray-600">
          <strong>You scored {testData.percentile}% percentile</strong> which is
          lower than the <br /> average percentile <strong>72%</strong> of all
          the engineers who took this assessment.
        </p>
        <div className="inset-0 bg-black/10  z-40 p-5 rounded-full ">
          <Image
            src={"/icons/graph-icon.png"}
            alt="HTML5"
            width={25}
            height={25}
            className="object-contain"
          />
        </div>
      </div>

      <div className="relative w-full h-[300px]">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <XAxis
              dataKey="percentile"
              type="number"
              domain={[0, 100]}
              ticks={[0, 25, 50, 75, 100]}
              allowDataOverflow={true}
              padding={{ left: 10, right: 10 }}
              axisLine={true}
              tickLine={true}
            />

            <YAxis hide />

            <Line
              type="monotone"
              dataKey="students"
              stroke="#6b46c1"
              dot={{ r: 4, fill: "white", stroke: "#6366f1", strokeWidth: 2 }}
              activeDot={{ r: 9, fill: "#6366f1" }}
            />

            <ReferenceLine
              x={testData.percentile}
              stroke="gray"
              strokeDasharray="3 3"
              label={{
                value: "Your Percentile",
                position: "center",
                fill: "gray",
                fontSize: 14
              }}
            />

            {userPoint && (
              <div
                className="absolute text-gray-600 text-xs font-semibold"
                style={{
                  left: `${(testData.percentile / 100) * 100}%`,
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  whiteSpace: "nowrap",
                }}
              >
                <p className="bg-white px-2 py-1 border rounded-md shadow-sm">
                  Your Percentile <br />
                  {testData.percentile}%
                </p>
              </div>
            )}

            <RechartsTooltip content={<CustomTooltip />} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default HeroSection;
