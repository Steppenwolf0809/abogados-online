import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import Button from './ui/button';

const AppointmentForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    tipoServicio: 'transferenciaDominio',
    mensaje: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  useEffect(() => {
    emailjs.init("Tn5EZ3QzZ25qIpTbi");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const templateParams = {
      to_name: "Abogados Online Ecuador",
      from_name: formData.nombre,
      reply_to: formData.email,
      telefono: formData.telefono,
      tipo_servicio: formData.tipoServicio,
      mensaje: formData.mensaje,
      to_email: "info@abogadosonlineecuador.com"
    };

    console.log('Enviando formulario con datos:', templateParams);

    try {
      const result = await emailjs.send(
        "service_iof7r68",
        "template_xl5oqwp",
        templateParams
      );

      console.log('Respuesta de EmailJS:', result);
      alert('Formulario enviado correctamente');
      onClose();
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      setSubmitError('Hubo un error al enviar el formulario. Por favor, intenta de nuevo.');
      alert('Error al enviar el formulario: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Cerrar"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Solicitar Consulta Gratuita</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre completo
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Correo electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div>
              <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-1">
                Teléfono
              </label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div>
              <label htmlFor="tipoServicio" className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de servicio
              </label>
              <select
                id="tipoServicio"
                name="tipoServicio"
                value={formData.tipoServicio}
                onChange={handleChange}
                className="form-input"
              >
                <option value="transferenciaDominio">Transferencia de Dominio</option>
                <option value="hipotecas">Hipoteca</option>
                <option value="promesas">Promesa de Compraventa</option>
                <option value="poderes">Poderes</option>
                <option value="declaraciones">Declaraciones Juramentadas</option>
                <option value="otros">Otros servicios</option>
              </select>
            </div>

            <div>
              <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 mb-1">
                Mensaje
              </label>
              <textarea
                id="mensaje"
                name="mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                rows={4}
                className="form-input"
                placeholder="Describe brevemente tu consulta..."
              />
            </div>

            <div className="flex justify-end space-x-4 mt-6">
              <Button
                onClick={onClose}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg"
              >
                Cancelar
              </Button>
              {submitError && (
                <div className="text-red-600 text-sm mb-4">
                  {submitError}
                </div>
              )}
              <Button
                type="submit"
                disabled={isSubmitting}
                className={`px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AppointmentForm;
