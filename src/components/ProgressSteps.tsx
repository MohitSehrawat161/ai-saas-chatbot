"use client";
import { cn } from "@/lib/utils";

interface Step {
  id: number;
  label: string;
}

interface ProgressStepsProps {
  steps: Step[];
  currentStep: number;
}

const ProgressSteps = ({ steps, currentStep }: ProgressStepsProps) => {
  return (
    <div className="w-full flex items-center justify-between relative my-4 overflow-hidden">
      {/* Line Background */}
      <div className="absolute top-1/3 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 rounded-full"></div>

      {/* Line Progress */}
      <div
        className="absolute top-1/3 left-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 -translate-y-1/2 rounded-full transition-all duration-500 ease-in-out"
        style={{
           width: `${currentStep==1?13:currentStep==2?38:currentStep==3?62:88}%`,
        }}
      ></div>

      {/* Steps */}
      {steps.map((step, index) => {
        const isCompleted = index + 1 < currentStep;
        const isActive = index + 1 === currentStep;

        return (
          <div key={step.id} className="relative z-10 flex flex-col items-center w-full">
            {/* Circle */}
            <div
              className={cn(
                "w-10 p-2 h-10 flex items-center justify-center rounded-full text-sm font-semibold border-2 transition-all duration-300",
                isCompleted
                  ? "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white border-none shadow-lg"
                  : isActive
                  ? "bg-white text-blue-600 border-blue-500 shadow-md"
                  : "bg-white text-gray-400 border-gray-300"
              )}
            >
              {step.id}
            </div>
            {/* Label */}
            <p
              className={cn(
                "mt-2 text-xs font-medium transition-colors duration-300",
                isActive ? "text-blue-600" : "text-gray-500"
              )}
            >
              {step.label}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default ProgressSteps;
