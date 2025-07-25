import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Navigation, AlertTriangle, Shield, RefreshCw } from 'lucide-react';

// Mock hazard data - in real app this would come from Firebase
const mockHazards = [
  {
    id: '1',
    type: 'fog',
    location: { lat: 27.7172, lng: 85.3240 },
    severity: 'high',
    reportedAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    reportedBy: 'Truck Driver #247'
  },
  {
    id: '2',
    type: 'construction',
    location: { lat: 27.7272, lng: 85.3340 },
    severity: 'medium',
    reportedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    reportedBy: 'Bus Driver #089'
  },
  {
    id: '3',
    type: 'livestock',
    location: { lat: 27.7072, lng: 85.3140 },
    severity: 'critical',
    reportedAt: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
    reportedBy: 'Local Resident'
  }
];

export function SafetyMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hazards, setHazards] = useState(mockHazards);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    // Simulate getting user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        () => {
          // Default to Kathmandu area if location fails
          setUserLocation({ lat: 27.7172, lng: 85.3240 });
        }
      );
    }

    return () => clearTimeout(timer);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-danger';
      case 'high': return 'text-warning';
      case 'medium': return 'text-primary';
      default: return 'text-muted-foreground';
    }
  };

  const getHazardIcon = (type: string) => {
    switch (type) {
      case 'fog': return '🌫️';
      case 'construction': return '🚧';
      case 'livestock': return '🐄';
      case 'traffic': return '🚗';
      default: return '⚠️';
    }
  };

  const refreshHazards = () => {
    setIsLoading(true);
    // Simulate refresh
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Card className="w-full shadow-elevated">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-accent" />
            <CardTitle className="text-lg font-bold">Live Safety Map</CardTitle>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={refreshHazards}
            disabled={isLoading}
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
        <CardDescription className="text-sm">
          Real-time hazard locations and route safety information
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Map Container */}
        <div 
          ref={mapRef} 
          className="h-64 bg-gradient-terrain rounded-lg border relative overflow-hidden"
        >
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-muted/50">
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                <span className="text-sm">Loading map...</span>
              </div>
            </div>
          ) : (
            <div className="absolute inset-0 p-4">
              {/* Simulated map with hazard markers */}
              <div className="w-full h-full bg-muted/20 rounded border-2 border-dashed border-muted-foreground/30 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <MapPin className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-sm">Interactive map will load here</p>
                  <p className="text-xs">Leaflet.js integration</p>
                </div>
              </div>
              
              {/* Hazard markers overlay */}
              <div className="absolute top-6 left-6">
                <div className="bg-primary/90 text-white px-2 py-1 rounded text-xs font-medium">
                  📍 Your Location
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Hazard List */}
        <div className="space-y-2">
          <h4 className="font-semibold text-sm flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-warning" />
            Active Hazards Nearby
          </h4>
          
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {hazards.map((hazard) => (
              <div
                key={hazard.id}
                className="flex items-center justify-between p-2 bg-muted/50 rounded border"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{getHazardIcon(hazard.type)}</span>
                  <div>
                    <p className="text-sm font-medium capitalize">{hazard.type}</p>
                    <p className="text-xs text-muted-foreground">
                      {hazard.reportedAt.toLocaleTimeString()} • {hazard.reportedBy}
                    </p>
                  </div>
                </div>
                <span className={`text-xs font-medium ${getSeverityColor(hazard.severity)}`}>
                  {hazard.severity.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Route Safety Status */}
        <div className="flex items-center justify-between p-3 bg-accent/10 rounded border border-accent/20">
          <div className="flex items-center gap-2">
            <Navigation className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium">Current Route Status</span>
          </div>
          <span className="text-sm font-medium text-accent">MODERATE RISK</span>
        </div>
      </CardContent>
    </Card>
  );
}