"use client";

import { Button } from "@/components/ui/button";
import { useCreateTermsAndConditionsMutation, useGetTermsAndConditionsQuery } from "@/features/cms/cmsApi";
import TipTapEditor from "@/TipTapEditor/TipTapEditor";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function TermsCondtions() {
  const [content, setContent] = useState("<p>Write your Terms & Conditions here...</p>");

  const [createTermsAndConditions, { isLoading: createTermsAndConditionsLoading }] = useCreateTermsAndConditionsMutation();
  const { data, isLoading: getTermsAndConditionsLoading } = useGetTermsAndConditionsQuery({});

  useEffect(() => {
    if (data?.data?.content) {
      setContent(data.data.content);
    }
  }, [data]);

  const handleSave = async () => {
    try {
      const res = await createTermsAndConditions({ content }).unwrap();
      if (res.success) {
        toast.success(res.message || "Terms and Conditions saved successfully");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || error?.message || "Failed to save terms and conditions");
      console.error("Save error:", error);
    }
  };

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-medium text-gray-900">Terms & Conditions</h1>
          <p className="text-[15px] text-gray-500 max-w-2xl">
            Manage the terms and conditions displayed to your customers.
          </p>
        </div>
        <Button
          onClick={handleSave}
          disabled={createTermsAndConditionsLoading || getTermsAndConditionsLoading}
          className="bg-[#6C63FF] hover:bg-[#6C63FF]/90 text-white rounded-xl px-8 h-12 font-medium shadow-sm transition-transform active:scale-[0.98] w-full md:w-auto overflow-hidden"
        >
          {createTermsAndConditionsLoading ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      {/* Editor Content Area */}
      <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden flex flex-col p-6">
        <div className="w-full">
          <TipTapEditor
            content={content}
            onChange={(html) => setContent(html)}
            minHeight="500px"
            placeholder="Start writing the terms and conditions..."
            showWordCount={true}
            wordLimit={5000}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}