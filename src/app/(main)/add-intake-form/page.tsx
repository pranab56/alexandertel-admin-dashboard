"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
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
  ArrowLeft,
  Briefcase,
  ChevronRight,
  Edit2,
  Plus,
  Search,
  Trash2,
  Users,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner"; // Assuming sonner is available

// --- Types ---
type FieldType = "Short Text" | "Long Text" | "Number" | "Date" | "Select";

interface FormField {
  id: string;
  label: string;
  type: FieldType;
  required: boolean;
}

// --- Mock Data ---
const INITIAL_CLIENT_FIELDS: FormField[] = [
  { id: "1", label: "Legal Full Name", type: "Short Text", required: true },
  { id: "2", label: "Preferred Pronouns", type: "Short Text", required: false },
  { id: "3", label: "Reason for Seeking Therapy", type: "Short Text", required: true },
];

const INITIAL_PROVIDER_FIELDS: FormField[] = [
  { id: "1", label: "Professional Title", type: "Short Text", required: true },
  { id: "2", label: "Years of Experience", type: "Number", required: true },
];

export default function IntakeFormManagement() {
  const [view, setView] = useState<"home" | "client" | "provider">("home");
  const [clientFields, setClientFields] = useState<FormField[]>(INITIAL_CLIENT_FIELDS);
  const [providerFields, setProviderFields] = useState<FormField[]>(INITIAL_PROVIDER_FIELDS);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingField, setEditingField] = useState<FormField | null>(null);
  const [tempField, setTempField] = useState<Partial<FormField>>({
    label: "",
    type: "Short Text",
    required: false,
  });

  // Delete Confirmation State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [fieldToDelete, setFieldToDelete] = useState<string | null>(null);

  const activeFields = view === "client" ? clientFields : providerFields;
  const setActiveFields = view === "client" ? setClientFields : setProviderFields;

  const handleOpenModal = (field?: FormField) => {
    if (field) {
      setEditingField(field);
      setTempField({ ...field });
    } else {
      setEditingField(null);
      setTempField({ label: "", type: "Short Text", required: false });
    }
    setIsModalOpen(true);
  };

  const handleSaveField = () => {
    if (!tempField.label) {
      toast.error("Field label is required");
      return;
    }

    if (editingField) {
      // Update existing
      setActiveFields((prev) =>
        prev.map((f) => (f.id === editingField.id ? ({ ...f, ...tempField } as FormField) : f))
      );
      toast.success("Field updated successfully");
    } else {
      // Create new
      const newField: FormField = {
        id: Math.random().toString(36).substr(2, 9),
        label: tempField.label!,
        type: tempField.type as FieldType,
        required: tempField.required || false,
      };
      setActiveFields((prev) => [...prev, newField]);
      toast.success("New field created successfully");
    }
    setIsModalOpen(false);
  };

  const handleDeleteField = (id: string) => {
    setFieldToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (fieldToDelete) {
      setActiveFields((prev) => prev.filter((f) => f.id !== fieldToDelete));
      toast.success("Field deleted");
      setFieldToDelete(null);
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <AnimatePresence mode="wait">
        {view === "home" ? (
          <SelectionView key="home" onViewSelect={setView} />
        ) : (
          <BuilderView
            key="builder"
            type={view}
            fields={activeFields}
            onBack={() => setView("home")}
            onAdd={() => handleOpenModal()}
            onEdit={handleOpenModal}
            onDelete={handleDeleteField}
          />
        )}
      </AnimatePresence>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden rounded-2xl gap-0">
          <DialogHeader className="p-6 bg-white border-b">
            <DialogTitle className="flex items-center gap-2 text-xl font-bold text-gray-900">
              {editingField ? "Edit Field" : "Add Field"}
            </DialogTitle>
          </DialogHeader>

          <div className="p-8 space-y-6 bg-white">
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-gray-700">Field Label</Label>
              <Input
                placeholder="e.g. Birth Date"
                value={tempField.label}
                onChange={(e) => setTempField({ ...tempField, label: e.target.value })}
                className="h-12 rounded-xl bg-[#FAFAFA] border-none focus-visible:ring-1 focus-visible:ring-[#9D84B7]"
              />
            </div>

            <div className="flex items-center gap-6 w-full">
              <div className="flex-1 space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Field Type</Label>
                <Select
                  value={tempField.type}
                  onValueChange={(val) => setTempField({ ...tempField, type: val as FieldType })}
                >
                  <SelectTrigger className="h-12 rounded-xl bg-[#FAFAFA] w-full py-6 border-none focus:ring-1 focus:ring-[#9D84B7]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Short Text">Short Text</SelectItem>
                    <SelectItem value="Long Text">Long Text</SelectItem>
                    <SelectItem value="Number">Number</SelectItem>
                    <SelectItem value="Date">Date</SelectItem>
                    <SelectItem value="Select">Dropdown</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700 mb-2 block">Required</Label>
                <div className="flex items-center h-12">
                  <Switch
                    checked={tempField.required}
                    onCheckedChange={(checked) => setTempField({ ...tempField, required: checked })}
                    className="data-[state=checked]:bg-[#6BB9BA]" // Teal for active switch
                  />
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="p-6 bg-[#F9FAFB] gap-3">
            <Button
              variant="outline"
              onClick={() => setIsModalOpen(false)}
              className="h-12 px-8 rounded-xl border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600 font-medium"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveField}
              className="h-12 px-8 rounded-xl bg-[#9D84B7] hover:bg-[#8B7BB5] text-white font-medium"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <AlertDialogContent className="rounded-2xl border-none p-8 max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl font-bold text-gray-900">Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-500 text-base mt-2">
              This action cannot be undone. This will permanently delete the intake field
              from this form.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-3 mt-8">
            <AlertDialogCancel className="h-12 px-6 rounded-xl border-gray-200 text-gray-600 hover:bg-gray-50 font-medium">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="h-12 px-6 rounded-xl bg-red-500 hover:bg-red-600 text-white font-medium border-none"
            >
              Delete Field
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

// --- Views ---

function SelectionView({ onViewSelect }: { onViewSelect: (view: "client" | "provider") => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-8 max-w-5xl  py-10"
    >
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-gray-900">Intake Form Management</h1>
        <p className="text-gray-500 max-w-2xl">
          Configure and customize intake forms for clients and providers, manage shared
          clinical fields, and define global option sets for the entire platform.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Client Card */}
        <Card className="border-none shadow-sm hover:shadow-md p-0 transition-shadow group cursor-pointer" onClick={() => onViewSelect("client")}>
          <div className="h-48 bg-[#E9F7F7] flex items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-2xl bg-[#D0EBEB] flex items-center justify-center text-[#6BB9BA]">
                <Users className="w-8 h-8" />
              </div>
              <span className="text-[#6BB9BA] font-bold text-lg">CLIENT</span>
            </div>
          </div>
          <CardHeader>
            <CardTitle className="text-xl">Client Intake Form</CardTitle>
            <CardDescription className="text-gray-500 mt-2">
              Manage client-side questions, diagnostic assessments, and patient onboarding workflows.
            </CardDescription>
          </CardHeader>
          <CardFooter className="pt-0 pb-6">
            <span className="text-[#9D84B7] font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
              Manage Form <ChevronRight className="w-4 h-4" />
            </span>
          </CardFooter>
        </Card>

        {/* Provider Card */}
        <Card className="border-none shadow-sm p-0 hover:shadow-md transition-shadow group cursor-pointer" onClick={() => onViewSelect("provider")}>
          <div className="h-48 bg-[#F3EFF8] flex items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-2xl bg-[#E6DEEF] flex items-center justify-center text-[#9D84B7]">
                <Briefcase className="w-8 h-8" />
              </div>
            </div>
          </div>
          <CardHeader>
            <CardTitle className="text-xl">Provider Intake Form</CardTitle>
            <CardDescription className="text-gray-500 mt-2">
              Manage provider-side questions, credentialing requirements, and specialization fields.
            </CardDescription>
          </CardHeader>
          <CardFooter className="pt-0 pb-6">
            <span className="text-[#9D84B7] font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
              Manage Form <ChevronRight className="w-4 h-4" />
            </span>
          </CardFooter>
        </Card>
      </div>
    </motion.div>
  );
}

function BuilderView({
  fields,
  onBack,
  onAdd,
  onEdit,
  onDelete,
}: {
  type: "client" | "provider";
  fields: FormField[];
  onBack: () => void;
  onAdd: () => void;
  onEdit: (f: FormField) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-xl shadow-sm">
        <div className="flex items-center gap-4 flex-1">
          <Button variant="ghost" size="icon" onClick={onBack} className="shrink-0">
            <ArrowLeft className="w-5 h-5 text-gray-500" />
          </Button>
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search Client or Provider name"
              className="pl-10 bg-[#F9FAFB] border-none rounded-xl"
            />
          </div>
          <Select defaultValue="status">
            <SelectTrigger className="w-[140px] bg-white border-gray-200">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="status">Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={onAdd}
          className="bg-[#9D84B7] hover:bg-[#8B7BB5] text-white rounded-xl px-6"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create New Field
        </Button>
      </div>

      {/* Table */}
      <div className="bg-[#EDF2F6] rounded-xl overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-[#EDF2F6]">
            <TableRow className="border-none hover:bg-transparent">
              <TableHead className="font-semibold text-gray-600 uppercase text-[12px] tracking-wider pl-6 py-4">Author</TableHead>
              <TableHead className="font-semibold text-gray-600 uppercase text-[12px] tracking-wider py-4">Field Type</TableHead>
              <TableHead className="font-semibold text-gray-600 uppercase text-[12px] tracking-wider py-4">Requirement</TableHead>
              <TableHead className="font-semibold text-gray-600 uppercase text-[12px] tracking-wider text-right pr-6 py-4">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white">
            {fields.map((field) => (
              <TableRow key={field.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                <TableCell className="font-semibold text-gray-900 pl-6 py-5">
                  {field.label}
                </TableCell>
                <TableCell className="font-semibold text-gray-900 py-5">
                  {field.type}
                </TableCell>
                <TableCell className="py-5">
                  <span className={cn(
                    "font-medium",
                    field.required ? "text-[#FF6B6B]" : "text-gray-400"
                  )}>
                    {field.required ? "Required" : "Optional"}
                  </span>
                </TableCell>
                <TableCell className="text-right pr-6 py-5">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      onClick={() => onEdit(field)}
                      variant="ghost"
                      size="icon"
                      className="w-10 h-10 rounded-full bg-[#E9F7F7] text-[#6BB9BA] hover:bg-[#D0EBEB] hover:text-[#5aa8a9]"
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => onDelete(field.id)}
                      variant="ghost"
                      size="icon"
                      className="w-10 h-10 rounded-full bg-[#FFE9E9] text-[#FF6B6B] hover:bg-[#FFD0D0] hover:text-[#fa5252]"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {fields.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="h-32 text-center text-gray-500">
                  No fields found. Click &quot;Create New Field&quot; to add one.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </motion.div>
  );
}
