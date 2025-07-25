export interface Hazard {
  id: string;
  type: 'fog' | 'construction' | 'livestock' | 'traffic';
  location: {
    lat: number;
    lng: number;
  };
  severity: 'low' | 'medium' | 'high' | 'critical';
  reportedAt: Date;
  reportedBy: string;
  description?: string;
  isActive: boolean;
}

export interface HazardReport {
  type: 'fog' | 'construction' | 'livestock' | 'traffic';
  location: {
    lat: number;
    lng: number;
  };
  severity: 'low' | 'medium' | 'high' | 'critical';
  reportedBy: string;
  description?: string;
}