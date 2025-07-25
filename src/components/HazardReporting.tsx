import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Cloud, Car, MapPin, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface HazardType {
  id: string;
  name: string;
  icon: React.ReactNode;
  variant: 'warning' | 'danger' | 'emergency';
  description: string;
}

const hazardTypes: HazardType[] = [
  {
    id: 'construction',
    name: 'Construction',
    icon: <AlertTriangle className="w-6 h-6" />,
    variant: 'warning',
    description: 'Road work or construction zone'
  },
  {
    id: 'fog',
    name: 'Fog',
    icon: <Cloud className="w-6 h-6" />,
    variant: 'danger',
    description: 'Poor visibility conditions'
  },
  {
    id: 'livestock',
    name: 'Livestock',
    icon: <span className="text-2xl">🐄</span>,
    variant: 'emergency',
    description: 'Animals on roadway'
  },
  {
    id: 'traffic',
    name: 'Heavy Traffic',
    icon: <Car className="w-6 h-6" />,
    variant: 'warning',
    description: 'Traffic congestion ahead'
  }
];

export function HazardReporting() {
  const [isReporting, setIsReporting] = useState(false);
  const [selectedHazard, setSelectedHazard] = useState<string | null>(null);
  const { toast } = useToast();

  const handleHazardReport = async (hazardType: HazardType) => {
    setIsReporting(true);
    setSelectedHazard(hazardType.id);
    
    // Simulate location detection and report submission
    setTimeout(() => {
      toast({
        title: "Hazard Reported Successfully",
        description: `${hazardType.name} reported at your current location. Thank you for keeping the community safe!`,
        duration: 4000,
      });
      setIsReporting(false);
      setSelectedHazard(null);
    }, 1500);
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-elevated">
      <CardHeader className="text-center pb-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          <MapPin className="w-5 h-5 text-primary" />
          <CardTitle className="text-lg font-bold">Report Road Hazard</CardTitle>
        </div>
        <CardDescription className="text-sm">
          Tap to instantly report hazards and keep fellow travelers safe
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          {hazardTypes.map((hazard) => (
            <Button
              key={hazard.id}
              variant={hazard.variant}
              size="hazard"
              className={`relative ${
                selectedHazard === hazard.id ? 'animate-pulse-glow' : ''
              }`}
              onClick={() => handleHazardReport(hazard)}
              disabled={isReporting}
            >
              {hazard.icon}
              <span className="mt-1">{hazard.name}</span>
              {selectedHazard === hazard.id && (
                <div className="absolute inset-0 bg-black/20 rounded-xl flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </Button>
          ))}
        </div>
        
        <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2 border-t">
          <Clock className="w-4 h-4" />
          <span>Reports sync automatically when connected</span>
        </div>
      </CardContent>
    </Card>
  );
}