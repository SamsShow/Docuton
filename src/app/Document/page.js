'use client'

import React, { useState } from 'react';
import { QrCode, Calendar, User, Clock, X, ArrowLeft, Building } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import Navbar from '@/app/Navbar/page'

export function MyDocuments() {
  const [selectedDocument, setSelectedDocument] = useState(null);
  
  // Mock data - replace with actual blockchain data fetching
  const documents = [
    {
      id: "SBT-001",
      type: "Event Ticket",
      event: "TON Conference 2024",
      issuer: "TON Foundation",
      status: "Valid",
      issuedAt: "2024-01-15",
      expiryDate: "2024-12-31",
      metadata: {
        seat: "A12",
        venue: "Crypto Convention Center",
        ticketType: "VIP Pass",
        transferable: false,
      },
      qrData: "ton://verify/SBT-001"
    },
    {
      id: "SBT-002",
      type: "Certificate",
      event: "Blockchain Development Course",
      issuer: "TON Academy",
      status: "Valid",
      issuedAt: "2024-02-01",
      expiryDate: null,
      metadata: {
        achievement: "Advanced Developer",
        grade: "A",
        courseId: "TON-201",
        transferable: false,
      },
      qrData: "ton://verify/SBT-002"
    },
    {
      id: "SBT-003",
      type: "Event Ticket",
      event: "TON Hackathon 2024",
      issuer: "TON Community",
      status: "Expired",
      issuedAt: "2024-01-10",
      expiryDate: "2024-02-15",
      metadata: {
        role: "Participant",
        team: "Team Alpha",
        venue: "Virtual",
        transferable: false,
      },
      qrData: "ton://verify/SBT-003"
    }
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'valid':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'expired':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'revoked':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      default:
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  return (
    <div className="space-y-6">
      <Navbar />
      <h1 className="text-2xl font-bold pt-28">My Documents</h1>
      
      {/* Documents Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {documents.map((doc) => (
          <Card 
            key={doc.id}
            className="bg-gray-800/50 border-gray-700 cursor-pointer hover:border-primary transition-colors"
            onClick={() => setSelectedDocument(doc)}
          >
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <QrCode className="w-5 h-5 text-primary" />
                  {doc.type}
                </span>
                <Badge className={getStatusColor(doc.status)}>
                  {doc.status}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">{doc.event}</h3>
                  <p className="text-sm text-gray-400">{doc.id}</p>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Building className="w-4 h-4" />
                    {doc.issuer}
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Calendar className="w-4 h-4" />
                    {new Date(doc.issuedAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Document Details Dialog */}
      <Dialog open={!!selectedDocument} onOpenChange={() => setSelectedDocument(null)}>
        <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4"
                onClick={() => setSelectedDocument(null)}
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <span className="ml-8">Document Details</span>
            </DialogTitle>
          </DialogHeader>

          {selectedDocument && (
            <ScrollArea className="max-h-[80vh]">
              <div className="space-y-6 p-1">
                {/* QR Code Section */}
                <div className="flex justify-center">
                  <div className="bg-white p-4 rounded-lg">
                    <QrCode className="w-32 h-32 text-gray-900" />
                  </div>
                </div>

                {/* Basic Info */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold">{selectedDocument.event}</h3>
                    <p className="text-sm text-gray-400">{selectedDocument.type}</p>
                  </div>

                  <Badge className={`${getStatusColor(selectedDocument.status)} text-sm`}>
                    {selectedDocument.status}
                  </Badge>

                  {/* Document Details Grid */}
                  <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4 p-4 bg-gray-800/50 rounded-lg">
                      <div>
                        <p className="text-sm text-gray-400">Document ID</p>
                        <p className="font-medium">{selectedDocument.id}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Issuer</p>
                        <p className="font-medium">{selectedDocument.issuer}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Issue Date</p>
                        <p className="font-medium">
                          {new Date(selectedDocument.issuedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Expiry Date</p>
                        <p className="font-medium">
                          {selectedDocument.expiryDate 
                            ? new Date(selectedDocument.expiryDate).toLocaleDateString()
                            : 'Never'}
                        </p>
                      </div>
                    </div>

                    {/* Metadata Section */}
                    <div className="p-4 bg-gray-800/50 rounded-lg">
                      <h4 className="font-medium mb-3">Additional Details</h4>
                      <div className="grid grid-cols-2 gap-4">
                        {Object.entries(selectedDocument.metadata).map(([key, value]) => (
                          <div key={key}>
                            <p className="text-sm text-gray-400">{key}</p>
                            <p className="font-medium">
                              {typeof value === 'boolean' ? value.toString() : value}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default MyDocuments;