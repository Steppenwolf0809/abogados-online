'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

/**
 * Higher-Order Component (HOC) para proteger rutas que requieren autenticación
 * @param Component Componente a proteger
 * @param requirePremium Si se requiere que el usuario sea premium
 * @returns Componente protegido
 */
export function withAuth(Component: React.ComponentType<any>, requirePremium: boolean = false) {
  return function ProtectedRoute(props: any) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      // Si no está cargando y no hay usuario, redirigir a login
      if (!loading && !user) {
        router.push(`/iniciar-sesion?redirect=${encodeURIComponent(window.location.pathname)}`);
      }
      
      // Si se requiere premium y el usuario no es premium ni admin, redirigir a suscripción
      if (!loading && user && requirePremium && user.userType !== 'PREMIUM' && user.userType !== 'ADMIN') {
        router.push('/suscripcion');
      }
    }, [loading, user, router]);

    // Mostrar nada mientras se carga o si no hay usuario
    if (loading || !user) {
      return (
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      );
    }

    // Si se requiere premium y el usuario no es premium ni admin, mostrar nada
    if (requirePremium && user.userType !== 'PREMIUM' && user.userType !== 'ADMIN') {
      return null;
    }

    // Si todo está bien, mostrar el componente
    return <Component {...props} />;
  };
}
