'use client'

import { motion } from 'framer-motion';
import DocumentVerification from '@/components/verify/DocumentVerification';
import { FileUpload } from '@/components/verify/FileUpload';
import NotificationSystem from '@/components/verify/NotificationSystem';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { QrCode, Upload } from 'lucide-react';
import Navbar from '@/app/Navbar/page'

export default function VerifyPage() {
  return (
    <div className="min-h-screen pt-20 pb-10 bg-gradient-to-b from-gray-900 to-black">
      <Navbar />
      <NotificationSystem />
      <div className="container mx-auto px-4 py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold text-center mb-8 text-primary">Document Verification</h1>
          
          <Tabs defaultValue="scan" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="scan" className="flex items-center gap-2">
                <QrCode className="w-4 h-4" />
                Scan QR Code
              </TabsTrigger>
              <TabsTrigger value="upload" className="flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Upload Document
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="scan">
              <DocumentVerification />
            </TabsContent>
            
            <TabsContent value="upload">
              <FileUpload />
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}