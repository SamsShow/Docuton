import React, { useState, useEffect, useCallback, useRef } from 'react';
import { QrCode, Check, X, Camera } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const DocumentVerification = () => {
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [notification, setNotification] = useState(null);
  const [stream, setStream] = useState(null);
  const [cameraError, setCameraError] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const startCamera = async () => {
    try {
      setCameraError(null);
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        await new Promise((resolve) => {
          videoRef.current.onloadedmetadata = () => {
            videoRef.current.play()
              .then(resolve)
              .catch(error => {
                console.error('Video play error:', error);
                setCameraError('Failed to start video preview');
              });
          };
        });
      }
      
      setStream(mediaStream);
      setIsScanning(true);
      setNotification({
        type: 'success',
        message: 'Camera accessed successfully. Point at a QR code.'
      });
    } catch (error) {
      console.error('Camera access error:', error);
      setCameraError('Unable to access camera. Please ensure you have granted camera permissions.');
      setNotification({
        type: 'error',
        message: 'Camera access denied. Please check your permissions.'
      });
    }
  };

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      setStream(null);
    }
    setIsScanning(false);
  }, [stream]);

  const handleScan = async () => {
    if (!isScanning) {
      await startCamera();
    } else {
      stopCamera();
    }
  };

  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Draw the current video frame to canvas
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Mock verification with captured image
    mockVerification();
  };

  const mockVerification = async () => {
    setNotification({
      type: 'success',
      message: 'Processing document...'
    });

    // Simulate API verification delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    setVerificationStatus({
      isValid: true,
      metadata: {
        'Document Type': 'ID Card',
        'Issue Date': '2024-01-15',
        'Expiry Date': '2029-01-14',
        'Document ID': 'DOC123456'
      }
    });
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  return (
    <Card className="w-full max-w-lg mx-auto bg-gray-800/50 border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <QrCode className="w-6 h-6 text-primary" />
          Scan Document QR Code
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {notification && (
          <Alert className={`${
            notification.type === 'success' 
              ? 'bg-green-900/20 border-green-900' 
              : 'bg-red-900/20 border-red-900'
          }`}>
            <AlertTitle className="flex items-center gap-2">
              {notification.type === 'success' ? (
                <Check className="w-5 h-5 text-green-500" />
              ) : (
                <X className="w-5 h-5 text-red-500" />
              )}
              {notification.message}
            </AlertTitle>
          </Alert>
        )}

        <div className="flex flex-col items-center gap-4">
          <div className="w-64 h-64 bg-gray-700/50 rounded-lg border-2 border-dashed border-gray-600 overflow-hidden relative">
            {isScanning ? (
              <div className="relative w-full h-full">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <canvas
                  ref={canvasRef}
                  className="hidden"
                />
                <div className="absolute inset-0 border-2 border-primary/50">
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary"></div>
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary"></div>
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary"></div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary"></div>
                </div>
                <Button 
                  className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-primary/90 hover:bg-primary"
                  onClick={captureImage}
                >
                  Capture
                </Button>
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Camera className="w-12 h-12 text-gray-500" />
              </div>
            )}
          </div>
          <Button 
            onClick={handleScan}
            className="bg-primary hover:bg-primary/90 w-full max-w-xs"
          >
            {isScanning ? "Stop Camera" : "Start Camera"}
          </Button>
        </div>

        {cameraError && (
          <Alert className="bg-red-900/20 border-red-900">
            <AlertTitle className="flex items-center gap-2">
              <X className="w-5 h-5 text-red-500" />
              Camera Error
            </AlertTitle>
            <AlertDescription>{cameraError}</AlertDescription>
          </Alert>
        )}

        {verificationStatus && verificationStatus.isValid && (
          <Alert className="bg-green-900/20 border-green-900">
            <div className="flex items-center gap-2 mb-2">
              <Check className="w-5 h-5 text-green-500" />
              <AlertTitle>Document Verified</AlertTitle>
            </div>
            <AlertDescription>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {Object.entries(verificationStatus.metadata).map(([key, value]) => (
                  <div key={key}>
                    <span className="text-gray-400">{key}:</span>
                    <span className="ml-2 font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default DocumentVerification