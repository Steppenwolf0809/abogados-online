'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { withAuth } from './withAuth';
import { UserUpdateData } from '@/models/User';

function ProfilePage() {
  const { user, updateProfile, logout, error } = useAuth();
  
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validaciones básicas
    if (!fullName) {
      setErrorMessage('El nombre completo es requerido');
      return;
    }
    
    // Validar contraseñas si se está editando
    if (isEditingPassword) {
      if (!currentPassword) {
        setErrorMessage('La contraseña actual es requerida para cambiar la contraseña');
        return;
      }
      
      if (!newPassword || !confirmPassword) {
        setErrorMessage('La nueva contraseña y su confirmación son requeridas');
        return;
      }
      
      if (newPassword !== confirmPassword) {
        setErrorMessage('Las contraseñas no coinciden');
        return;
      }
      
      if (newPassword.length < 8) {
        setErrorMessage('La contraseña debe tener al menos 8 caracteres');
        return;
      }
    }
    
    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');
    
    try {
      const updateData: UserUpdateData = {
        fullName,
        phoneNumber,
      };
      
      // Añadir contraseñas si se está editando
      if (isEditingPassword) {
        updateData.currentPassword = currentPassword;
        updateData.password = newPassword;
      }
      
      await updateProfile(updateData);
      
      setSuccessMessage('Perfil actualizado correctamente');
      
      // Limpiar campos de contraseña
      if (isEditingPassword) {
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setIsEditingPassword(false);
      }
    } catch (error) {
      setErrorMessage((error as Error).message || 'Error al actualizar perfil');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      // No es necesario redirigir, el middleware lo hará automáticamente
    } catch (error) {
      setErrorMessage((error as Error).message || 'Error al cerrar sesión');
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Mi Perfil</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Información del usuario */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Información de la cuenta</h2>
            
            <div className="mb-4">
              <p className="text-gray-600 text-sm">Correo electrónico</p>
              <p className="font-medium">{user.email}</p>
            </div>
            
            <div className="mb-4">
              <p className="text-gray-600 text-sm">Tipo de cuenta</p>
              <p className="font-medium">
                {user.userType === 'PREMIUM' ? 'Premium' : 'Gratuita'}
              </p>
            </div>
            
            <div className="mb-4">
              <p className="text-gray-600 text-sm">Fecha de registro</p>
              <p className="font-medium">
                {new Date(user.registrationDate).toLocaleDateString('es-ES', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            </div>
            
            {user.userType !== 'PREMIUM' && (
              <div className="mt-6">
                <a
                  href="/suscripcion"
                  className="block w-full py-2 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-center rounded-lg hover:from-purple-700 hover:to-indigo-700 transition duration-300"
                >
                  Actualizar a Premium
                </a>
              </div>
            )}
            
            <div className="mt-4">
              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-800 text-sm font-medium"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
        
        {/* Formulario de actualización */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Editar perfil</h2>
            
            {(errorMessage || error) && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {errorMessage || error}
              </div>
            )}
            
            {successMessage && (
              <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                {successMessage}
              </div>
            )}
            
            <form onSubmit={handleUpdateProfile}>
              <div className="mb-4">
                <label htmlFor="fullName" className="block text-gray-700 font-medium mb-2">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="phoneNumber" className="block text-gray-700 font-medium mb-2">
                  Número de Teléfono
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="mb-4">
                <button
                  type="button"
                  onClick={() => setIsEditingPassword(!isEditingPassword)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  {isEditingPassword ? 'Cancelar cambio de contraseña' : 'Cambiar contraseña'}
                </button>
              </div>
              
              {isEditingPassword && (
                <>
                  <div className="mb-4">
                    <label htmlFor="currentPassword" className="block text-gray-700 font-medium mb-2">
                      Contraseña Actual *
                    </label>
                    <input
                      type="password"
                      id="currentPassword"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required={isEditingPassword}
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="newPassword" className="block text-gray-700 font-medium mb-2">
                      Nueva Contraseña *
                    </label>
                    <input
                      type="password"
                      id="newPassword"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required={isEditingPassword}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      La contraseña debe tener al menos 8 caracteres, incluir mayúsculas, minúsculas, números y caracteres especiales.
                    </p>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">
                      Confirmar Nueva Contraseña *
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required={isEditingPassword}
                    />
                  </div>
                </>
              )}
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

// Exportar el componente con el HOC de autenticación
export default withAuth(ProfilePage);
