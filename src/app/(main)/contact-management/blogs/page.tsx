"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlignLeft,
  Bold,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  Italic,
  Link as LinkIcon,
  List,
  Plus,
  Search,
  Strikethrough,
  Underline
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner"; // Assuming sonner is installed

// --- Types ---
type BlogStatus = "Published" | "Scheduled";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  author: string;
  category: string;
  date: string;
  status: BlogStatus;
}

// --- Mock Data ---
const INITIAL_BLOGS: BlogPost[] = [
  {
    id: "1",
    title: "Managing Anxiety in Modern Times",
    slug: "mental-health-basics-2024",
    author: "Dr. Sarah Smith",
    category: "Therapy",
    date: "Oct 24, 2023",
    status: "Published",
  },
  {
    id: "2",
    title: "Understanding Depression Symptoms",
    slug: "depression-symptoms-guide",
    author: "Dr. Sarah Smith",
    category: "Therapy",
    date: "Oct 24, 2023",
    status: "Scheduled",
  },
  {
    id: "3",
    title: "The Benefits of Mindfulness",
    slug: "mindfulness-benefits-2024",
    author: "Dr. Sarah Smith",
    category: "Therapy",
    date: "Oct 24, 2023",
    status: "Published",
  },
  {
    id: "4",
    title: "Coping with Stress at Work",
    slug: "work-stress-management",
    author: "Dr. Sarah Smith",
    category: "Therapy",
    date: "Oct 24, 2023",
    status: "Published",
  },
  {
    id: "5",
    title: "Healthy Sleep Habits",
    slug: "better-sleep-guide",
    author: "Dr. Sarah Smith",
    category: "Therapy",
    date: "Oct 24, 2023",
    status: "Scheduled",
  },
];

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>(INITIAL_BLOGS);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Blog Content State for Modal
  const [editorContent, setEditorContent] = useState("");

  const handleCreateBlog = () => {
    // In a real app, you'd gather more fields (title, etc.). 
    // Here we simulate adding a new entry based on the design which mostly shows the content editor.
    // I will auto-generate title/slug for demo purposes or we could add fields to the modal.
    // The design only showed the rich text editor in the modal, but usually you need a title.
    // I'll assume the modal might have more fields or just focused on content in the screenshot.
    // I'll add a simple simulation.

    const newBlog: BlogPost = {
      id: Math.random().toString(36).substr(2, 9),
      title: "New Blog Post Entry",
      slug: "new-blog-post-entry",
      author: "Dr. Sarah Smith", // Default
      category: "Therapy", // Default
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      status: "Scheduled"
    };

    setBlogs([newBlog, ...blogs]);
    setIsModalOpen(false);
    setEditorContent("");
    toast.success("Blog post created successfully");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-[1600px] mx-auto">
      {/* Top Filter Bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-4 flex flex-col md:flex-row items-center gap-4 shadow-sm"
      >
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search Client or Provider name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-11 h-12 bg-[#F9FAFB] border-none rounded-xl focus-visible:ring-1 focus-visible:ring-[#6BB9BA]"
          />
        </div>

        <div className="flex flex-col sm:flex-row w-full md:w-auto items-stretch sm:items-center gap-4">
          <Select defaultValue="all">
            <SelectTrigger className="w-full sm:w-[180px] h-12 bg-white py-6 border-[#E5E7EB] text-gray-600 rounded-xl">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Status</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
            </SelectContent>
          </Select>

          <Button
            onClick={() => setIsModalOpen(true)}
            className="h-12 bg-[#9D84B7] hover:bg-[#8B7BB5] text-white rounded-xl px-6 font-medium shadow-md transition-all whitespace-nowrap w-full sm:w-auto"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create New Blog
          </Button>
        </div>
      </motion.div>

      {/* Table Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.99 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl shadow-sm overflow-hidden"
      >
        <div className="overflow-x-auto">
          <Table className="min-w-[1000px] lg:min-w-full">
            <TableHeader className="bg-[#E9F2F2] border-none">
              <TableRow className="border-none hover:bg-transparent">
                {/* Note: Design header says DATE & TIME but content is Title/Slug. I will stick to columns that matches content visually.
                    Actually, I'll use the headers from the image even if they seem weirdly named, to be "same to same". 
                    Image Headers: DATE & TIME, AUTHOR, CATEGORY, DATE, STATUS
                */}
                <TableHead className="py-5 px-6 font-semibold text-gray-600 text-[13px] uppercase tracking-wider w-[400px]">Date & Time</TableHead>
                <TableHead className="py-5 px-6 font-semibold text-gray-600 text-[13px] uppercase tracking-wider">Author</TableHead>
                <TableHead className="py-5 px-6 font-semibold text-gray-600 text-[13px] uppercase tracking-wider">Category</TableHead>
                <TableHead className="py-5 px-6 font-semibold text-gray-600 text-[13px] uppercase tracking-wider">Date</TableHead>
                <TableHead className="py-5 px-6 font-semibold text-gray-600 text-[13px] uppercase tracking-wider">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blogs.map((blog) => (
                <TableRow key={blog.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <TableCell className="py-5 px-6">
                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-800 text-[15px]">{blog.title}</span>
                      <span className="text-sm text-gray-400 font-medium">{blog.slug}</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-5 px-6 font-medium text-gray-800">{blog.author}</TableCell>
                  <TableCell className="py-5 px-6 font-medium text-gray-800">{blog.category}</TableCell>
                  <TableCell className="py-5 px-6 font-medium text-gray-800">{blog.date}</TableCell>
                  <TableCell className="py-5 px-6">
                    <Badge
                      className={cn(
                        "px-4 py-1.5 rounded-full font-medium text-[12px] border-none shadow-none",
                        blog.status === "Published"
                          ? "bg-[#E9F7F7] text-[#6BB9BA] hover:bg-[#E9F7F7]"
                          : "bg-[#FFF8E6] text-[#FBBF24] hover:bg-[#FFF8E6]" // Yellow/Orange for scheduled
                      )}
                    >
                      {blog.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination (Hardcoded for visual match) */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 py-6 border-t border-gray-50">
          <Button variant="ghost" size="icon" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white shadow-sm hover:shadow transition-shadow">
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
          </Button>

          <Button className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#6BB9BA] text-white hover:bg-[#5aa8a9] shadow-md text-xs sm:text-sm">
            1
          </Button>

          <Button variant="ghost" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white text-gray-500 shadow-sm hover:shadow hover:bg-gray-50 text-xs sm:text-sm">
            2
          </Button>
          <Button variant="ghost" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white text-gray-500 shadow-sm hover:shadow hover:bg-gray-50 text-xs sm:text-sm">
            3
          </Button>

          <span className="text-gray-400 px-1 text-xs sm:text-sm text-center">...</span>

          <Button variant="ghost" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white text-gray-500 shadow-sm hover:shadow hover:bg-gray-50 text-xs sm:text-sm">
            12
          </Button>

          <Button variant="ghost" size="icon" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white shadow-sm hover:shadow transition-shadow">
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
          </Button>
        </div>
      </motion.div>

      {/* Editor Modal */}
      <AnimatePresence>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="w-[95vw] sm:max-w-[800px] p-0 overflow-hidden rounded-2xl gap-0 h-[90vh] sm:h-auto flex flex-col">
            <DialogHeader className="p-6 bg-white border-b flex flex-row items-center justify-between shrink-0">
              <DialogTitle className="text-2xl font-normal text-center w-full">Blog</DialogTitle>
            </DialogHeader>

            <ScrollArea className="flex-1 overflow-y-auto">
              <div className="p-4 sm:p-6 bg-white">
                {/* Toolbar */}
                <div className="flex flex-wrap items-center gap-1 bg-[#6BB9BA] p-2 rounded-t-xl text-white">
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 h-8 w-8 p-0">
                    <span className="font-medium text-xs">14</span>
                  </Button>
                  <div className="h-4 w-px bg-white/30 mx-1" />
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 h-8 w-8 p-0">
                    <Bold className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 h-8 w-8 p-0">
                    <Italic className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 h-8 w-8 p-0">
                    <Underline className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 h-8 w-8 p-0">
                    <Strikethrough className="w-4 h-4" />
                  </Button>
                  <div className="h-4 w-px bg-white/30 mx-1 md:block hidden" />
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 h-8 w-8 p-0">
                    <AlignLeft className="w-4 h-4" />
                  </Button>
                  <div className="h-4 w-px bg-white/30 mx-1 md:block hidden" />
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 h-8 w-8 p-0">
                    <LinkIcon className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 h-8 w-8 p-0">
                    <List className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 h-8 w-8 p-0">
                    <ImageIcon className="w-4 h-4" />
                  </Button>
                </div>

                {/* Editor Area */}
                <div className="border border-t-0 border-gray-200 rounded-b-xl min-h-[300px] sm:min-h-[400px] p-4 bg-white relative">
                  <textarea
                    value={editorContent}
                    onChange={(e) => setEditorContent(e.target.value)}
                    placeholder="Lorem ipsum dolor sit amet consectetur. Fringilla a cras vitae orci. Egestas duis id nisl sed ante congue scelerisque..."
                    className="w-full h-[280px] sm:h-[380px] resize-none border-none outline-none text-gray-600 leading-relaxed CustomScrollbar"
                  />
                </div>
              </div>
            </ScrollArea>

            <DialogFooter className="p-4 sm:p-6 bg-white border-t gap-3 flex flex-col sm:flex-row justify-end shrink-0">
              <Button
                variant="outline"
                onClick={() => setIsModalOpen(false)}
                className="h-12 px-8 rounded-xl border-gray-200 text-gray-500 hover:bg-gray-50 font-medium w-full sm:w-[120px]"
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreateBlog}
                className="h-12 px-8 rounded-xl bg-[#9D84B7] hover:bg-[#8B7BB5] text-white font-medium w-full sm:w-[120px]"
              >
                Create
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </AnimatePresence>
    </div>
  );
}
