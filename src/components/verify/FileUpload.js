import React, { useState } from 'react';
import { Upload, File, X } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertTitle } from '@/components/ui/alert';

export function FileUpload() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [notification, setNotification] = useState(null);

  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setNotification(null); // Clear any previous notifications
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setProgress(0);
    setNotification(null);

    try {
      // Simulate file upload with progress
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 200));
        setProgress(i);
      }

      setNotification({
        type: 'success',
        message: 'Your document has been uploaded and is being processed.'
      });
    } catch (error) {
      setNotification({
        type: 'error',
        message: error.message || 'Upload failed. Please try again.'
      });
    } finally {
      setUploading(false);
      setProgress(0);
      setFile(null);
    }
  };

  return (
    <Card className="bg-gray-800/50 border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="w-6 h-6 text-primary" />
          Upload Document
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Notification Alert */}
          {notification && (
            <Alert className={`${
              notification.type === 'success' 
                ? 'bg-green-900/20 border-green-900' 
                : 'bg-red-900/20 border-red-900'
            }`}>
              <AlertTitle className={`${
                notification.type === 'success' ? 'text-green-500' : 'text-red-500'
              }`}>
                {notification.message}
              </AlertTitle>
            </Alert>
          )}

          <div 
            className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-primary transition-colors"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const droppedFile = e.dataTransfer.files[0];
              if (droppedFile) {
                setFile(droppedFile);
                setNotification(null);
              }
            }}
          >
            <input
              type="file"
              id="file-upload"
              className="hidden"
              onChange={handleFileSelect}
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            />
            <label 
              htmlFor="file-upload"
              className="cursor-pointer"
            >
              {file ? (
                <div className="flex items-center justify-center gap-2">
                  <File className="w-8 h-8 text-primary" />
                  <div className="text-left">
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-gray-400">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="ml-2"
                    onClick={(e) => {
                      e.preventDefault();
                      setFile(null);
                      setNotification(null);
                    }}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Upload className="w-8 h-8 mx-auto text-gray-400" />
                  <p className="text-gray-400">
                    Drag and drop your file here, or click to browse
                  </p>
                  <p className="text-sm text-gray-500">
                    Supported formats: PDF, DOC, DOCX, JPG, PNG
                  </p>
                </div>
              )}
            </label>
          </div>

          {uploading && (
            <div className="space-y-2">
              <Progress value={progress} className="h-2" />
              <p className="text-sm text-gray-400 text-center">
                Uploading... {progress}%
              </p>
            </div>
          )}

          <Button
            onClick={handleUpload}
            disabled={!file || uploading}
            className="w-full bg-primary hover:bg-primary/90"
          >
            {uploading ? "Uploading..." : "Upload Document"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default FileUpload;