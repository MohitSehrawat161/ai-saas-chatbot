import api from "@/lib/axios";
import { AlertCircle, CheckCircle, HelpCircle, Loader2, Upload, X, FileText, ChevronLeft, ChevronRight } from "lucide-react"
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { setSteps } from "@/store/slices/customChatbotSlice";
import { useDispatch, useSelector } from "react-redux";
import { useCreateBotMutation, useGetUserQuery } from "@/store/api/botsApi";
import { useRouter } from "next/navigation";

const ChatbotSetupStep3 = () => {
    const dispatch = useDispatch();
    const [isDragOver, setIsDragOver] = useState(false);
    const router = useRouter();
    const [uploadedFiles, setUploadedFiles] = useState<Array<{
        id: string;
        name: string;
        size: string;
        status: "uploading" | "processing" | "processed" | "error";
        file: File;
    }>>([]);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedRag, setSelectedRag] = useState("pinecone");
    const [selectedVectorDB, setSelectedVectorDB] = useState("pinecone");
    const [vectorApiKey, setVectorApiKey] = useState("");
    const [showVectorApiKey, setShowVectorApiKey] = useState(false);
    const [indexName, setIndexName] = useState("my-chatbot-knowledge");
    const [isCreatingBot, setIsCreatingBot] = useState(false);
    const [isFileUploading, setIsFileUploading] = useState(false);
    const { planType } = useSelector((state: any) => state.user);
    const [createBot, { isLoading, error }] = useCreateBotMutation();
    const { botName, botAvatar, color, description, domain, systemPrompt, role, personality } = useSelector((state: any) => state.customChatbot);
    

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragOver(false);
        handleFileInputChange(e as unknown as React.ChangeEvent<HTMLInputElement>);
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (uploadedFiles?.length > 0) {
            toast.error("Only one file is allowed");
            e.target.value = "";
            return;
        }
        if (files) {
            setUploadedFiles(Array.from(files).map(file => ({
                id: file.name,
                name: file.name,
                size: formatFileSize(file.size),
                status: "processed",
                file: file
            })));
        }
        e.target.value = "";
    };

    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const handleSave = async () => {
        try {
            setIsFileUploading(true);
            if (uploadedFiles.length === 0) {
                toast.error("Please upload Knowledge Base");
                return;
            }
            const formData = new FormData();
            formData.append("file", uploadedFiles[0].file);
            const response = await api.post("/documents/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            toast.success("File uploaded successfully");
            dispatch(setSteps(4));
        } catch (error: any) {
            console.log(error);
            if (error.response?.data?.error) {
                toast.error(error.response.data.error);
            } else {
                toast.error("File upload failed");
            }
        } finally {
            setIsFileUploading(false);
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleNext = async () => {
        try {
            await handleSave();
        } catch (error) {
            console.log(error);
        }
    };

    const handleRemoveFile = (id: string) => {
        setUploadedFiles(uploadedFiles.filter(file => file.id !== id));
    };

    return (
        <div className="bg-gradient-to-br from-[#F9FAFB] to-[#EEF2FF] dark:from-[#111827] dark:to-[#1F2937] max-h-[calc(100vh-200px)] overflow-auto">
            <div className="mx-auto">
                {/* Main Upload Card */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700/50 p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/20 rounded-xl flex items-center justify-center">
                                <Upload className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            Upload Your Knowledge Base
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">
                            Add documents to train your chatbot with specific information
                        </p>
                    </div>

                    {/* Upload Area */}
                    {uploadedFiles.length === 0 && (
                        <div
                            className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-200 cursor-pointer ${
                                isDragOver
                                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 scale-105'
                                    : 'border-gray-300 dark:border-gray-600 hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                            }`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onClick={handleUploadClick}
                        >
                            <input
                                ref={fileInputRef}
                                type="file"
                                multiple
                                accept=".pdf,.docx,.csv"
                                onChange={handleFileInputChange}
                                className="hidden"
                            />
                            
                            <Upload className={`h-16 w-16 mx-auto mb-6 transition-colors duration-200 ${
                                isDragOver ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400 dark:text-gray-500'
                            }`} />
                            
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                                {isDragOver ? "Drop files here" : "Drag files here or click to browse"}
                            </h3>
                            
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                Supported formats: PDF, DOCX, CSV
                            </p>
                            
                            {/* Plan Limits */}
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full">
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                    {planType === "free" ? (
                                        "Free Plan: 1 file · 2MB limit"
                                    ) : (
                                        "Pro Plan: Multiple files · 2MB per file"
                                    )}
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Upload Error */}
                    {uploadError && (
                        <div className="mt-6 flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                            <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                            <span className="text-red-700 dark:text-red-300 text-sm">{uploadError}</span>
                        </div>
                    )}

                    {/* Uploaded Files */}
                    {uploadedFiles.length > 0 && (
                        <div className="mt-6">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-4 text-lg">
                                Uploaded Files
                            </h3>
                            <div className="space-y-3">
                                {uploadedFiles.map((file) => (
                                    <div key={file.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600">
                                        <div className="flex items-center gap-4">
                                            {/* File Icon & Status */}
                                            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white dark:bg-gray-600 border border-gray-200 dark:border-gray-500">
                                                {file.status === "processed" ? (
                                                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                                                ) : file.status === "error" ? (
                                                    <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                                                ) : (
                                                    <Loader2 className="h-5 w-5 text-blue-600 dark:text-blue-400 animate-spin" />
                                                )}
                                            </div>
                                            
                                            {/* File Info */}
                                            <div className="flex-1 min-w-0">
                                                <div className="font-medium text-gray-900 dark:text-white truncate max-w-[300px]">
                                                    {file.name}
                                                </div>
                                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                                    {file.size}
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {/* Status & Actions */}
                                        <div className="flex items-center gap-3">
                                            <div className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                                                {file.status === "uploading" && "Uploading..."}
                                                {file.status === "processing" && "Processing..."}
                                                {file.status === "processed" && "Attached"}
                                                {file.status === "error" && "Error"}
                                            </div>
                                            <button
                                                onClick={() => handleRemoveFile(file.id)}
                                                className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200"
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Tips Section */}
                    <div className="mt-8 bg-amber-50 dark:bg-amber-900/20 rounded-xl p-6 border border-amber-200 dark:border-amber-800">
                        <div className="flex items-start gap-4">
                            <div className="w-8 h-8 bg-amber-100 dark:bg-amber-800 rounded-lg flex items-center justify-center flex-shrink-0">
                                <HelpCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-3">
                                    💡 Tips for better results
                                </h4>
                                <ul className="text-sm text-amber-800 dark:text-amber-200 space-y-2">
                                    <li className="flex items-start gap-2">
                                        <span className="text-amber-600 dark:text-amber-400 mt-1">•</span>
                                        Use clear, well-structured documents with proper formatting
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-amber-600 dark:text-amber-400 mt-1">•</span>
                                        Include FAQs and common questions in your documents
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-amber-600 dark:text-amber-400 mt-1">•</span>
                                        Avoid image-only PDFs as they can't be processed effectively
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Footer */}
                    <div className="flex justify-between items-center pt-8 mt-8 border-t border-gray-100 dark:border-gray-700/50">
                        <Button
                            variant="outline"
                            className="px-6 py-3 rounded-xl border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
                            onClick={() => dispatch(setSteps(2))}
                        >
                            <ChevronLeft className="w-4 h-4" />
                            Back
                        </Button>
                        
                        <Button
                            className="px-8 py-5 rounded-xl font-semibold text-lg transition-all duration-200 hover:scale-105 shadow-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                            onClick={handleNext}
                            disabled={isFileUploading}
                        >
                            {isFileUploading ? (
                                <div className="flex items-center gap-2">
                                    <Loader2 className="animate-spin w-5 h-5" />
                                    <span>Processing...</span>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <span>Continue</span>
                                    <ChevronRight className="w-5 h-5" />
                                </div>
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatbotSetupStep3;
