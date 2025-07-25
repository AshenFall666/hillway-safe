import { AppHeader } from '@/components/AppHeader';
import { HazardReporting } from '@/components/HazardReporting';
import { SafetyMap } from '@/components/SafetyMap';
import { QuickStats } from '@/components/QuickStats';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Navigation, AlertTriangle, Users } from 'lucide-react';
import heroImage from '@/assets/hero-image.jpg';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-terrain">
      <AppHeader />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-primary">
        <div className="absolute inset-0 bg-black/20" />
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="relative container mx-auto px-4 py-12 text-center text-white">
          <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Real-time Road Safety for <span className="text-primary-glow">Hill Country</span>
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Community-powered hazard reporting and live safety maps for safer mountain travel
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button variant="hero" size="lg" className="shadow-elevated">
                <Navigation className="w-5 h-5" />
                View Safety Map
              </Button>
              <Button variant="secondary" size="lg" className="bg-white/10 hover:bg-white/20 text-white border-white/20">
                <AlertTriangle className="w-5 h-5" />
                Report Hazard
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Quick Stats */}
        <section>
          <QuickStats />
        </section>

        {/* Main Features Grid */}
        <section className="grid lg:grid-cols-2 gap-8">
          {/* Hazard Reporting */}
          <div className="space-y-4">
            <div className="text-center lg:text-left">
              <h2 className="text-2xl font-bold mb-2">Report Road Hazards</h2>
              <p className="text-muted-foreground">
                Help keep your community safe by reporting hazards with a single tap
              </p>
            </div>
            <HazardReporting />
          </div>

          {/* Safety Map */}
          <div className="space-y-4">
            <div className="text-center lg:text-left">
              <h2 className="text-2xl font-bold mb-2">Live Safety Information</h2>
              <p className="text-muted-foreground">
                Stay informed with real-time hazard locations and route safety data
              </p>
            </div>
            <SafetyMap />
          </div>
        </section>

        {/* Community Impact */}
        <section className="py-8">
          <Card className="shadow-elevated bg-gradient-primary text-white">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-bold">Community Impact</CardTitle>
              <CardDescription className="text-white/80">
                Together, we're making mountain roads safer for everyone
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="space-y-2">
                  <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                    <Users className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold">2,450+ Drivers</h3>
                  <p className="text-sm text-white/80">Active community members reporting hazards</p>
                </div>
                <div className="space-y-2">
                  <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                    <Shield className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold">89% Safer</h3>
                  <p className="text-sm text-white/80">Reduction in accident risk on monitored routes</p>
                </div>
                <div className="space-y-2">
                  <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold">Real-time</h3>
                  <p className="text-sm text-white/80">Instant hazard alerts to the community</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default Index;
