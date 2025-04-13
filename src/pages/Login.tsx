
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { BookOpen, Brain } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('student');
  const [errors, setErrors] = useState({ email: '', password: '' });
  
  const navigate = useNavigate();

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = re.test(email);
    setErrors(prev => ({...prev, email: isValid ? '' : 'Por favor ingresa un email válido'}));
    return isValid;
  };

  const validatePassword = (password: string): boolean => {
    const isValid = password.length >= 6;
    setErrors(prev => ({...prev, password: isValid ? '' : 'La contraseña debe tener al menos 6 caracteres'}));
    return isValid;
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    
    if (isEmailValid && isPasswordValid) {
      // In a real app, we would authenticate with a backend here
      toast.success(`Bienvenido a InnovaEd (${userType === 'student' ? 'Estudiante' : 'Administrador'})`);
      
      // Redirect to dashboard
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-innovaed-light p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Brain className="h-12 w-12 text-innovaed-primary" />
          </div>
          <h1 className="text-3xl font-bold text-innovaed-primary">InnovaEd</h1>
          <p className="text-innovaed-dark/70">Sistema de Asistencia Académica Inteligente</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold">Iniciar sesión</CardTitle>
            <CardDescription>
              Ingresa tus datos para acceder a tu cuenta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="tu@email.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => validateEmail(email)}
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => validatePassword(password)}
                  className={errors.password ? "border-red-500" : ""}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>
              
              <div className="space-y-3">
                <Label>Tipo de usuario</Label>
                <RadioGroup 
                  defaultValue="student" 
                  value={userType} 
                  onValueChange={setUserType}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="student" id="student" />
                    <Label htmlFor="student" className="cursor-pointer">Estudiante</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="admin" id="admin" />
                    <Label htmlFor="admin" className="cursor-pointer">Administrador</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <Button type="submit" className="w-full bg-innovaed-primary hover:bg-innovaed-primary/90">
                Iniciar sesión
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="link" className="text-innovaed-secondary">
              ¿Olvidaste tu contraseña?
            </Button>
            <Button variant="link" className="text-innovaed-primary">
              Registrarse
            </Button>
          </CardFooter>
        </Card>
        
        <div className="text-center mt-4 text-sm text-gray-600">
          <p>© 2025 InnovaEd - Todos los derechos reservados</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
