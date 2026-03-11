"use client";

import { Button } from "@/components/ui/button";
import TipTapEditor from "@/TipTapEditor/TipTapEditor";
import { useState } from "react";

export default function PrivacyPolicy() {
  const [content, setContent] = useState("<p>Write your Privacy Policy here...</p>");

  const handleSave = () => {
    // Implement save logic here
    console.log("Saving privacy policy:", content);
  };

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-gray-900">Privacy Policy</h1>
          <p className="text-[15px] text-gray-500 max-w-2xl">
            Manage the privacy policy content displayed to your customers.
          </p>
        </div>
        <Button
          onClick={handleSave}
          className="bg-[#6C63FF] hover:bg-[#6C63FF]/90 text-white rounded-xl px-8 h-12 font-medium shadow-sm transition-transform active:scale-[0.98] w-full md:w-auto"
        >
          Save Changes
        </Button>
      </div>

      {/* Editor Content Area */}
      <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden flex flex-col p-6">
        <div className="w-full">
          <TipTapEditor
            content={content}
            onChange={(html) => setContent(html)}
            minHeight="500px"
            placeholder="Start writing the privacy policy..."
            showWordCount={true}
            wordLimit={5000}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}