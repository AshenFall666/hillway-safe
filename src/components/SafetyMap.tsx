import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Navigation, AlertTriangle, Shield, RefreshCw } from 'lucide-react';
import L from 'leaflet';
import { subscribeToHazards } from '@/lib/hazardService';
import { Hazard } from '@/types/hazard';

// Import Leaflet CSS
import 'leaflet/dist/leaflet.css';

// Fix for default markers in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export function SafetyMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hazards, setHazards] = useState<Hazard[]>([]);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);

  useEffect(() => {
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(location);
          initializeMap(location);
        },
        () => {
          // Default to Kathmandu area if location fails
          const defaultLocation = { lat: 27.7172, lng: 85.3240 };
          setUserLocation(defaultLocation);
          initializeMap(defaultLocation);
        }
      );
    } else {
      const defaultLocation = { lat: 27.7172, lng: 85.3240 };
      setUserLocation(defaultLocation);
      initializeMap(defaultLocation);
    }

    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
      }
    };
  }, []);

  useEffect(() => {
    // Subscribe to hazards from Firebase
    const unsubscribe = subscribeToHazards((newHazards) => {
      setHazards(newHazards);
      updateMapMarkers(newHazards);
    });

    return () => unsubscribe();
  }, []);

  const initializeMap = (location: {lat: number, lng: number}) => {
    if (!mapRef.current) return;

    try {
      const map = L.map(mapRef.current).setView([location.lat, location.lng], 13);
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      // Add user location marker
      L.marker([location.lat, location.lng])
        .addTo(map)
        .bindPopup('Your Location')
        .openPopup();

      leafletMapRef.current = map;
      setIsLoading(false);
    } catch (error) {
      console.error('Error initializing map:', error);
      setIsLoading(false);
    }
  };

  const updateMapMarkers = (hazards: Hazard[]) => {
    if (!leafletMapRef.current) return;

    // Clear existing hazard markers
    markersRef.current.forEach(marker => {
      leafletMapRef.current?.removeLayer(marker);
    });
    markersRef.current = [];

    // Add new hazard markers
    hazards.forEach(hazard => {
      const marker = L.marker([hazard.location.lat, hazard.location.lng])
        .addTo(leafletMapRef.current!)
        .bindPopup(`
          <strong>${hazard.type.toUpperCase()}</strong><br/>
          Severity: ${hazard.severity}<br/>
          Reported: ${hazard.reportedAt.toLocaleTimeString()}<br/>
          By: ${hazard.reportedBy}
        `);
      
      markersRef.current.push(marker);
    });
  };

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
    if (leafletMapRef.current && userLocation) {
      leafletMapRef.current.setView([userLocation.lat, userLocation.lng], 13);
    }
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
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-muted/50 z-10">
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                <span className="text-sm">Loading map...</span>
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