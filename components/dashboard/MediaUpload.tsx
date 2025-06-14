'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Upload, FileVideo, FileImage, X, CheckCircle } from 'lucide-react';

interface UploadedFile {
  id: string;
  name: string;
  type: 'image' | 'video';
  url: string;
  analysis?: string;
}

export const MediaUpload = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (!selectedFiles) return;

    setError('');
    setUploading(true);
    setUploadProgress(0);

    try {
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        
        // Validate file type
        if (!file.type.match(/^(image|video)\//)) {
          setError('Please select only image or video files');
          continue;
        }

        // Validate file size (max 50MB)
        if (file.size > 50 * 1024 * 1024) {
          setError('File size must be less than 50MB');
          continue;
        }

        // Create a local URL for preview
        const url = URL.createObjectURL(file);
        const fileType = file.type.startsWith('image/') ? 'image' : 'video';
        
        const newFile: UploadedFile = {
          id: Date.now().toString() + i,
          name: file.name,
          type: fileType,
          url,
          analysis: generateMockAnalysis(fileType),
        };

        setFiles(prev => [...prev, newFile]);
        setUploadProgress(((i + 1) / selectedFiles.length) * 100);

        // Simulate upload delay
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    } catch (err) {
      setError('Failed to upload files');
    } finally {
      setUploading(false);
      setUploadProgress(0);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const generateMockAnalysis = (type: 'image' | 'video'): string => {
    const analyses = {
      image: [
        "Good form detected! Your squat depth is excellent. Consider engaging your core more.",
        "Your deadlift form shows proper spine alignment. Focus on driving through your heels.",
        "Great plank position! Try to maintain a straight line from head to heels.",
        "Your push-up form is solid. Consider slowing down the movement for better muscle engagement.",
      ],
      video: [
        "Excellent workout consistency! Your form remains stable throughout the set.",
        "Good tempo control. Consider adding a pause at the bottom of each rep.",
        "Your breathing pattern is well-synchronized with the movement.",
        "Strong finish! Your form stayed consistent even when fatigue set in.",
      ]
    };
    
    const options = analyses[type];
    return options[Math.floor(Math.random() * options.length)];
  };

  const removeFile = (id: string) => {
    setFiles(prev => {
      const fileToRemove = prev.find(f => f.id === id);
      if (fileToRemove) {
        URL.revokeObjectURL(fileToRemove.url);
      }
      return prev.filter(f => f.id !== id);
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5 text-purple-600" />
          Form Analysis Upload
        </CardTitle>
        <CardDescription>
          Upload photos or videos of your workouts for AI-powered form analysis
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Upload Area */}
        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-muted-foreground/50 transition-colors">
          <div className="space-y-4">
            <div className="mx-auto w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Upload className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold">Upload your workout media</h3>
              <p className="text-sm text-muted-foreground">
                Drag and drop files here, or click to select
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Supports images and videos up to 50MB
              </p>
            </div>
            <Button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Select Files
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,video/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        </div>

        {/* Upload Progress */}
        {uploading && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Uploading...</span>
              <span>{Math.round(uploadProgress)}%</span>
            </div>
            <Progress value={uploadProgress} />
          </div>
        )}

        {/* Uploaded Files */}
        {files.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Uploaded Media</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {files.map((file) => (
                <div key={file.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {file.type === 'image' ? (
                        <FileImage className="h-5 w-5 text-blue-600" />
                      ) : (
                        <FileVideo className="h-5 w-5 text-red-600" />
                      )}
                      <span className="font-medium text-sm truncate">{file.name}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(file.id)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Media Preview */}
                  <div className="aspect-video bg-muted rounded overflow-hidden">
                    {file.type === 'image' ? (
                      <img
                        src={file.url}
                        alt={file.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <video
                        src={file.url}
                        controls
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>

                  {/* AI Analysis */}
                  {file.analysis && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-green-800">Form Analysis</p>
                          <p className="text-sm text-green-700">{file.analysis}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};