import api from "@/lib/axios";
import { AlertCircle, CheckCircle, HelpCircle, Loader2, Upload, X } from "lucide-react"
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { setSteps } from "@/store/slices/customChatbotSlice";
import { useDispatch, useSelector } from "react-redux";
import { useCreateBotMutation, useGetUserQuery } from "@/store/api/botsApi";
import { Loader } from "lucide-react";
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
        console.log(files);
        if (uploadedFiles?.length > 0) {
            console.log(uploadedFiles);
            toast.error("Only one file is allowed");
            e.target.value = ""
            return;
        }
        if (files) {
            setUploadedFiles(Array.from(files).map(file => ({
                id: file.name,
                name: file.name,
                size: file.size.toString(),
                status: "processed",
                file: file
            })));
        }
        e.target.value = ""
    };



    const handleSave = async () => {
        try {
            // dispatch(setSteps(4));
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
            if (error.response.data.error) {
                toast.error(error.response.data.error);
            }
            else {
                toast.error("File upload failed");
            }
        } finally {
            setIsFileUploading(false);
        }

    }
    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleNext = async () => {
        try {
            await handleSave();
           
        } catch (error) {
            console.log(error);
        }
    }



    const handleRemoveFile = (id: string) => {
        setUploadedFiles(uploadedFiles.filter(file => file.id !== id));
    };

    return (
        <div className=" mx-auto w-full p-8 bg-white rounded-2xl shadow-lg border border-gray-100 flex flex-col min-h-[calc(100vh-8rem)]">

            <div className="flex items-center gap-2 mb-6 text-lg font-semibold text-indigo-700 mt-4">
                <Upload className="h-6 w-6" />
                Upload Your Knowledge Base
            </div>

            <div className="space-y-6">
            
          {uploadedFiles.length === 0 &&      <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${isDragOver
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-300 hover:border-indigo-400'
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
                    <Upload className={`h-12 w-12 mx-auto mb-4 ${isDragOver ? 'text-indigo-500' : 'text-gray-400'}`} />
                    <p className="text-lg font-medium text-gray-700 mb-2">
                        {isDragOver ? "Drop files here" : "📁 Drag files here"}
                    </p>
                    <p className="text-gray-600 mb-4">or click to browse</p>
                    <div className="text-sm text-gray-500">
                        <p>Supported: PDF, DOCX, CSV</p>
                        {planType === "free" ? (
                            <p className="ml-2">Max size: 2MB · 1 file limit (Free Plan)</p>
                        ) : (
                            <p className="ml-2">Max size: 2MB per file</p>
                        )}
                    </div>
                </div>}

                {/* Upload Error */}
                {uploadError && (
                    <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <AlertCircle className="h-5 w-5 text-red-600" />
                        <span className="text-red-700 text-sm">{uploadError}</span>
                    </div>
                )}

                {/* Uploaded Files */}
                {uploadedFiles.length > 0 && (
                    <div>
                        <h3 className="font-medium text-gray-900 mb-3">Uploaded Files:</h3>
                        <div className="space-y-2">
                            {uploadedFiles.map((file) => (
                                <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        {file.status === "processed" ? (
                                            <CheckCircle className="h-5 w-5 text-green-600" />
                                        ) : file.status === "error" ? (
                                            <AlertCircle className="h-5 w-5 text-red-600" />
                                        ) : (
                                            <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />
                                        )}
                                        <div>
                                            <div className="font-medium text-gray-900 truncate max-w-[200px]">{file.name}</div>
                                            <div className="text-sm text-gray-600">{file.size}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="text-sm text-gray-500 capitalize">
                                            {file.status === "uploading" && "Uploading..."}
                                            {file.status === "processing" && "Processing..."}
                                            {file.status === "processed" && "Attached"}
                                            {file.status === "error" && "Error"}
                                        </div>
                                        <button
                                            onClick={() => handleRemoveFile(file.id)}
                                            className="text-gray-400 hover:text-red-600 transition-colors"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Knowledge Base Stats */}
                {/* {uploadedFiles.filter(f => f.status === "processed").length > 0 && (
                        <div className="bg-indigo-50 rounded-lg p-4">
                            <h3 className="font-medium text-indigo-900 mb-3">Knowledge Base Stats:</h3>
                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div>
                                    <div className="text-2xl font-bold text-indigo-600">
                                        {uploadedFiles.filter(f => f.status === "processed").length}
                                    </div>
                                    <div className="text-sm text-indigo-700">Documents</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-indigo-600">
                                        {uploadedFiles.filter(f => f.status === "processed").length * 78}
                                    </div>
                                    <div className="text-sm text-indigo-700">Chunks</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-indigo-600">
                                        {uploadedFiles.filter(f => f.status === "processed").length * 78}
                                    </div>
                                    <div className="text-sm text-indigo-700">Vectors</div>
                                </div>
                            </div>
                        </div>
                    )} */}

                {/* Tips */}
                <div className="bg-yellow-50 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                        <HelpCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                        <div>
                            <h4 className="font-medium text-yellow-900 mb-1">💡 Tips for better results:</h4>
                            <ul className="text-sm text-yellow-700 space-y-1">
                                <li>• Use clear, well-structured documents</li>
                                <li>• Include FAQs and common questions</li>
                                <li>• Avoid images-only PDFs</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-auto self-end flex items-center">
                <Button className="mr-2 bg-gray-700 text-white" onClick={() => dispatch(setSteps(2))}>Back</Button>
                <Button className="w-28" onClick={handleNext} disabled={isFileUploading}>{isFileUploading ? <Loader className="animate-spin" /> : "Next"}</Button>
            </div>
        </div>
    )
}

export default ChatbotSetupStep3
