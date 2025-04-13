
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { InnovaEdSidebar } from "@/components/InnovaEdSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  BarChart2, 
  BookMarked, 
  Calendar, 
  Clock, 
  TrendingUp,
  Medal
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

const Dashboard = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [userName, setUserName] = useState("Carlos Rodríguez");
  const [progressValue, setProgressValue] = useState(0);
  
  // Animate progress bar on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgressValue(78);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-innovaed-light">
      {/* Sidebar */}
      <InnovaEdSidebar activePath={location.pathname} />
      
      {/* Main content */}
      <main className={cn(
        "transition-all duration-300 pt-16 md:pt-8 pb-8",
        isMobile ? "pl-6 pr-6" : "pl-72 pr-6"
      )}>
        {/* Header with greeting */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-2xl md:text-3xl font-bold text-innovaed-dark">
            ¡Hola, <span className="text-innovaed-primary">{userName}</span>!
          </h1>
          <p className="text-gray-600">
            Bienvenido a tu panel de InnovaEd. Aquí puedes ver un resumen de tu progreso.
          </p>
        </div>
        
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Current Study Plan Card */}
          <Card className="innovaed-card animate-fade-in overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg font-bold flex items-center">
                  <BookOpen className="mr-2 h-5 w-5 text-innovaed-secondary" />
                  Plan de estudio actual
                </CardTitle>
                <span className="text-xs bg-innovaed-primary/10 text-innovaed-primary rounded-full px-2 py-1">
                  Activo
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <h3 className="text-xl font-medium mb-2">Matemáticas Avanzadas</h3>
              <div className="flex items-center text-sm text-gray-500 mb-3">
                <Clock className="h-4 w-4 mr-1" />
                <span>15 hrs/semana</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progreso del plan</span>
                  <span className="font-medium">{progressValue}%</span>
                </div>
                <Progress value={progressValue} className="h-2" />
              </div>
              <div className="mt-4 flex justify-between">
                <Button variant="outline" size="sm" className="text-innovaed-secondary border-innovaed-secondary">
                  Ver detalles
                </Button>
                <Button size="sm" className="bg-innovaed-secondary hover:bg-innovaed-secondary/90">
                  Continuar
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Weekly Progress Card */}
          <Card className="innovaed-card animate-fade-in overflow-hidden">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-bold flex items-center">
                <BarChart2 className="mr-2 h-5 w-5 text-innovaed-primary" />
                Progreso semanal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-xl font-medium">5 de 7 días</h3>
                  <p className="text-sm text-gray-500">Has estudiado esta semana</p>
                </div>
                <div className="h-16 w-16 rounded-full bg-innovaed-primary/10 flex items-center justify-center">
                  <span className="text-xl font-bold text-innovaed-primary">71%</span>
                </div>
              </div>
              
              <div className="flex justify-between gap-1 mb-4">
                {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map((day, index) => (
                  <div 
                    key={day} 
                    className={cn(
                      "flex-1 h-16 rounded-md flex items-center justify-center",
                      index < 5 
                        ? "bg-innovaed-primary text-white" 
                        : index === 5 
                          ? "bg-gray-100 text-gray-400"
                          : "bg-gray-100 text-gray-400 relative"
                    )}
                  >
                    {day}
                    {index === 6 && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs">Hoy</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="flex items-center text-sm">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-500 font-medium mr-1">+12%</span>
                <span className="text-gray-500">comparado con la semana anterior</span>
              </div>
            </CardContent>
          </Card>
          
          {/* Last Recommendation Card */}
          <Card className="innovaed-card animate-fade-in overflow-hidden">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-bold flex items-center">
                <BookMarked className="mr-2 h-5 w-5 text-innovaed-accent" />
                Último recurso recomendado
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-innovaed-accent/10 rounded-lg p-3 mb-4">
                <div className="flex items-center mb-2">
                  <Medal className="h-5 w-5 text-innovaed-accent mr-2" />
                  <h3 className="font-medium">Recomendado para ti</h3>
                </div>
                <h4 className="text-lg font-medium mb-1">
                  Técnicas de Memorización Avanzada
                </h4>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  Aprende métodos efectivos para memorizar fórmulas y conceptos complejos
                </p>
                <div className="flex justify-between text-sm">
                  <span className="flex items-center text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    20 minutos
                  </span>
                  <span className="flex items-center text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    Añadido ayer
                  </span>
                </div>
              </div>
              
              <Button className="w-full bg-innovaed-accent hover:bg-innovaed-accent/90">
                Explorar recursos
              </Button>
            </CardContent>
          </Card>
        </div>
        
        {/* Additional Content Section */}
        <div className="animate-fade-in">
          <h2 className="text-xl font-bold mb-4">Actividades sugeridas para hoy</h2>
          <div className="space-y-3">
            <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex justify-between items-center">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-innovaed-secondary/10 flex items-center justify-center mr-3">
                  <BookOpen className="h-5 w-5 text-innovaed-secondary" />
                </div>
                <div>
                  <h3 className="font-medium">Repasar lección de Cálculo Diferencial</h3>
                  <p className="text-sm text-gray-500">Estimado: 45 minutos</p>
                </div>
              </div>
              <Button size="sm" variant="outline">
                Iniciar
              </Button>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex justify-between items-center">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-innovaed-primary/10 flex items-center justify-center mr-3">
                  <BarChart2 className="h-5 w-5 text-innovaed-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Realizar quiz de práctica</h3>
                  <p className="text-sm text-gray-500">Estimado: 20 minutos</p>
                </div>
              </div>
              <Button size="sm" variant="outline">
                Iniciar
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
