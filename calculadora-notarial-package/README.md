# Calculadora Notarial Ecuador

Un componente React para calcular tarifas notariales en Ecuador.

## Instalación

```bash
npm install @abogados-online/calculadora-notarial
```

## Uso

### Uso Básico

```jsx
import { CalculadoraNotarial } from '@abogados-online/calculadora-notarial';

function App() {
  return (
    <div>
      <h1>Calculadora de Tarifas Notariales</h1>
      <CalculadoraNotarial />
    </div>
  );
}
```

### Con Manejo de Resultados

```jsx
import { CalculadoraNotarial } from '@abogados-online/calculadora-notarial';

function App() {
  const handleResultadoChange = (resultado) => {
    if (resultado) {
      console.log('Subtotal:', resultado.subtotal);
      console.log('IVA:', resultado.iva);
      console.log('Total:', resultado.total);
    }
  };

  return (
    <div>
      <h1>Calculadora de Tarifas Notariales</h1>
      <CalculadoraNotarial 
        onResultadoChange={handleResultadoChange}
        className="mi-clase-personalizada"
        showResultados={false} // Si quieres manejar la visualización de resultados por tu cuenta
      />
    </div>
  );
}
```

### Acceso a Tarifas y Tipos

```typescript
import { tarifas, TipoServicio, esTipoServicioConCuantia } from '@abogados-online/calculadora-notarial';

// Acceder a las tarifas directamente
console.log('Remuneración Básica:', tarifas.remuneracionBasica);

// Usar tipos en tus componentes
const miTipoServicio: TipoServicio = 'transferenciaDominio';

// Verificar si un servicio es con cuantía
if (esTipoServicioConCuantia(miTipoServicio)) {
  console.log('Este servicio requiere un monto');
}
```

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| onResultadoChange | `(resultado: Resultado \| null) => void` | undefined | Callback que se ejecuta cuando cambia el resultado del cálculo |
| className | string | '' | Clase CSS para personalizar el contenedor principal |
| showResultados | boolean | true | Controla si se muestran los resultados en el componente |

## Tipos de Datos

### Resultado

```typescript
interface Resultado {
  subtotal: string;
  iva: string;
  total: string;
}
```

### TipoServicio

```typescript
type TipoServicio =
  | 'transferenciaDominio'
  | 'promesas'
  | 'hipotecas'
  | 'contratos_arriendo'
  | 'poderes'
  | 'declaracionesJuramentadas'
  | 'testamentoAbierto'
  | 'disolucionSociedadConyugal'
  | 'unionHecho'
  | 'autorizacionSalidaPais'
  | 'reconocimientoFirma'
  | 'copiaCertificada'
  | 'materializacion'
  | 'posesionEfectiva'
  | 'protocolizacion'
  | 'compraventaVehiculos';
```

## Estilos

El componente usa Tailwind CSS para los estilos. Asegúrate de tener Tailwind CSS configurado en tu proyecto.

## Licencia

MIT
