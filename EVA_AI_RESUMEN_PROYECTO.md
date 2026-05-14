# Eva AI — Premium Editorial Fashion Advisor
## Resumen Ejecutivo del Proyecto

Eva AI es una plataforma de asesoría de imagen y estilo de vida de alta gama, diseñada con una estética editorial inspirada en revistas de lujo como *Vogue*, *Elle* y *Harper's Bazaar*. A diferencia de un chatbot genérico, Eva ofrece una experiencia inmersiva, sofisticada y altamente personalizada.

---

## 🎨 Dirección Visual y Diseño

El proyecto sigue un lenguaje visual de **"Lujo Minimalista"**:

- **Paleta de Colores:**
  - **Fondo Principal:** Beige cálido (#F5EFE5) - Evita el blanco puro para una sensación más orgánica.
  - **Acento Primario:** Rosa empolvado (#E8D5D0) para elementos decorativos.
  - **Detalles:** Dorado champagne (#C9A77E) para íconos y separadores finos.
  - **Tipografía:** 
    - `Cormorant Garamond`: Títulos serif elegantes.
    - `Outfit`: Encabezados modernos y limpios.
    - `Inter`: Texto de lectura optimizado.

- **Activos Visuales Premium:**
  - **Avatar Personalizado:** Ícono de Eva diseñado específicamente para la marca.
  - **Fondo Animado:** Sistema de 200 fotogramas que crean una textura viva y dinámica durante la generación de respuestas.
  - **Layout:** Maquetación tipo revista con espacios generosos y jerarquía visual fuerte.

---

## ⚙️ Funcionalidades Clave

### 1. Wizard de Captura de Contexto
Flujo de 4 bloques para una precisión máxima sin fricción:
1.  **Contexto del Evento:** Ocasión, clima (generalizado) y entorno.
2.  **Sobre Ti:** Datos físicos opcionales (estatura, tono de piel, tipo de pelo).
3.  **Tu Estilo:** Identidad estética y preferencias de cobertura.
4.  **Detalles del Look:** Prendas favoritas, calzado y presupuesto.

### 2. Experiencia de Respuesta (Streaming)
- **Efecto "En Vivo":** Las respuestas se renderizan palabra por palabra con un cursor parpadeante.
- **Estados de Ánimo:** Indicadores claros de "Eva está pensando" (con avatar y dots animados).
- **Controles Avanzados:** Botón de "Detener" generación y sistema de auto-scroll inteligente con botón de retorno al final.

### 3. Arquitectura y Estabilidad
- **Motor de IA:** Google Gemini API (Modelo `gemini-2.0-flash-lite`).
- **Resiliencia:** Sistema de **Reintentos Automáticos con Backoff Exponencial** para manejar errores de cuota (429) de forma transparente para el usuario.
- **Seguridad:** Protección de llaves mediante variables de entorno (`.env`) y exclusión en Git.

---

## 🛠️ Stack Tecnológico

- **Frontend:** React 19 + TypeScript + Vite 8.
- **Estilos:** Vanilla CSS (Diseño responsivo y editorial).
- **Animaciones:** Framer Motion.
- **Iconografía:** Lucide React.
- **IA SDK:** `@google/generative-ai`.
- **Despliegue:** GitHub + Netlify.

---

## 📈 Estado Actual y Despliegue

- **Repositorio:** `https://github.com/DrMakio/EVAIA.git`
- **Despliegue:** `https://sage-hamster-a5d098.netlify.app/`
- **Estatus:** Interfaz 100% funcional. Lógica de asesoría terminada. Pendiente de reset de cuota de API por parte de Google para operación continua.

---

## 🚀 Próximos Pasos Recomendados

1.  **Generación de Imagen Real:** Integración con modelos de difusión (DALL-E 3 / Flux) para visualizar el outfit sugerido.
2.  **Persistencia:** Implementar almacenamiento local o base de datos (Supabase) para guardar perfiles de usuario.
3.  **Backend:** Migrar llamadas a la API a un servidor Node.js para ocultar la API Key del cliente final.

---
*Documento generado por Antigravity AI - 2026*
