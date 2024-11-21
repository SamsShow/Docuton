import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { motion, AnimatePresence } from 'framer-motion';

const NotificationSystem = () => {
  const [notifications, setNotifications] = useState([]);

  // Add a new notification
  const addNotification = (type, title, message) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, type, title, message }]);
    // Auto-remove notification after 5 seconds
    setTimeout(() => {
      removeNotification(id);
    }, 5000);
  };

  // Remove a notification by ID
  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  // Example of listening to document events (simulate with timeout for demo)
  useEffect(() => {
    // Simulate receiving different types of notifications
    const demoNotifications = [
      {
        type: 'success',
        title: 'Document Verified',
        message: 'The document has been successfully verified.',
        delay: 1000
      },
      {
        type: 'warning',
        title: 'Document Expiring',
        message: 'Document #A123 will expire in 7 days.',
        delay: 3000
      },
      {
        type: 'info',
        title: 'Verification Attempt',
        message: 'Someone attempted to verify document #B456.',
        delay: 5000
      }
    ];

    demoNotifications.forEach(({ type, title, message, delay }) => {
      setTimeout(() => {
        addNotification(type, title, message);
      }, delay);
    });
  }, []);

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const getAlertClass = (type) => {
    switch (type) {
      case 'success':
        return 'border-green-500 bg-green-500/10';
      case 'warning':
        return 'border-yellow-500 bg-yellow-500/10';
      case 'error':
        return 'border-red-500 bg-red-500/10';
      default:
        return 'border-blue-500 bg-blue-500/10';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-4 min-w-[320px] max-w-md">
      <AnimatePresence>
        {notifications.map(({ id, type, title, message }) => (
          <motion.div
            key={id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="relative"
          >
            <Alert className={`${getAlertClass(type)} border`}>
              <div className="flex items-start gap-3">
                {getIcon(type)}
                <div className="flex-1">
                  <AlertTitle className="text-foreground">{title}</AlertTitle>
                  <AlertDescription className="text-muted-foreground">
                    {message}
                  </AlertDescription>
                </div>
                <button
                  onClick={() => removeNotification(id)}
                  className="text-foreground/60 hover:text-foreground"
                >
                  <XCircle className="h-4 w-4" />
                </button>
              </div>
            </Alert>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default NotificationSystem;