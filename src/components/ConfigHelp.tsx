import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, ExternalLink } from 'lucide-react';

export function ConfigHelp() {
  return (
    <Card className="w-full max-w-2xl mx-auto shadow-elevated border-warning/20">
      <CardHeader>
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-warning" />
          <CardTitle className="text-lg">Firebase Configuration Required</CardTitle>
        </div>
        <CardDescription>
          To enable full functionality, please configure Firebase in your project
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="bg-muted/50 p-4 rounded-lg">
          <h4 className="font-semibold mb-2">Setup Instructions:</h4>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Create a Firebase project at <a href="https://console.firebase.google.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">console.firebase.google.com <ExternalLink className="w-3 h-3" /></a></li>
            <li>Enable Firestore Database in your Firebase project</li>
            <li>Copy your Firebase config from Project Settings</li>
            <li>Replace the placeholder config in <code className="bg-muted px-1 rounded">src/lib/firebase.ts</code></li>
            <li>Deploy Firestore security rules for production</li>
          </ol>
        </div>
        
        <div className="text-sm text-muted-foreground">
          <p><strong>Current Status:</strong> Using mock data for demonstration</p>
          <p><strong>Features Available:</strong> UI interactions, animations, responsive design</p>
          <p><strong>Missing:</strong> Real-time data sync, persistent storage, user authentication</p>
        </div>
      </CardContent>
    </Card>
  );
}