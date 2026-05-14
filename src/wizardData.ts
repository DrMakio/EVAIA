export interface WizardQuestion {
  id: string;
  question: string;
  type: 'select' | 'multi-select' | 'text' | 'slider';
  options?: string[];
  placeholder?: string;
  required?: boolean;
  helpText?: string;
}

export interface WizardBlock {
  id: number;
  title: string;
  intro?: string;
  questions: WizardQuestion[];
  optional?: boolean;
  decisionMessage?: string;
}

export const OUTFIT_WIZARD: WizardBlock[] = [
  {
    id: 1,
    title: 'Contexto del Evento',
    questions: [
      {
        id: 'ocasion',
        question: '¿Cuál es la ocasión?',
        type: 'select',
        options: ['Trabajo', 'Reunión casual', 'Cita', 'Boda o evento formal', 'Día a día', 'Viaje', 'Fiesta', 'Sesión de fotos', 'Graduación', 'Otro'],
        required: true
      },
      {
        id: 'momento',
        question: '¿Qué momento del día?',
        type: 'select',
        options: ['Mañana', 'Tarde', 'Noche', 'Todo el día'],
        required: true
      },
      {
        id: 'clima',
        question: '¿Qué clima predomina en tu ubicación?',
        type: 'select',
        options: ['Frío', 'Templado', 'Cálido Seco', 'Cálido Húmedo (Playa)', 'Muy Frío / Nieve', 'Otro'],
        required: true
      },
      {
        id: 'entorno',
        question: '¿Será espacio interior, exterior, o mixto?',
        type: 'select',
        options: ['Interior con aire acondicionado', 'Interior sin aire', 'Exterior', 'Mixto'],
        required: true
      },
      {
        id: 'actividad',
        question: '¿Qué vas a estar haciendo principalmente?',
        type: 'select',
        options: ['Sentada o conversando', 'De pie mucho rato', 'Caminando bastante', 'Bailando o moviéndome', 'Una mezcla de todo'],
        required: true
      },
      {
        id: 'codigo',
        question: '¿Hay código de vestimenta?',
        type: 'select',
        options: ['No', 'Casual', 'Smart casual', 'Formal', 'Black tie', 'Cocktail', 'Étnico o temático', 'No estoy segura'],
        required: true
      }
    ],
    decisionMessage: "Con esto puedo darte una recomendación general. Refinar los siguientes pasos te dará una imagen mucho más cercana a ti."
  },
  {
    id: 2,
    title: 'Sobre Ti',
    optional: true,
    intro: "Cuéntame un poco sobre ti para que la imagen del outfit se parezca más a cómo te ves tú. Toda esta información es opcional, salta lo que prefieras.",
    questions: [
      {
        id: 'estatura',
        question: '¿Cuál es tu rango de estatura?',
        type: 'select',
        options: ['Menos de 1.55 m', '1.55 - 1.62 m', '1.63 - 1.70 m', '1.71 - 1.78 m', 'Más de 1.78 m', 'Prefiero no decir']
      },
      {
        id: 'tipo_cuerpo',
        question: '¿Cómo describirías tu tipo de cuerpo?',
        type: 'select',
        options: ['Delgada', 'Atlética o tonificada', 'Curvy', 'Plus size', 'Prefiero no decir']
      },
      {
        id: 'tono_piel',
        question: '¿Cuál es tu tono de piel?',
        type: 'select',
        options: ['Muy clara', 'Clara', 'Media', 'Morena', 'Morena oscura', 'Negra', 'Prefiero no decir']
      },
      {
        id: 'pelo_color',
        question: '¿Cuál es tu color de cabello?',
        type: 'select',
        options: ['Negro', 'Castaño oscuro', 'Castaño claro', 'Rubio', 'Pelirrojo', 'Canoso o gris', 'Color fantasía', 'Prefiero no decir']
      },
      {
        id: 'pelo_largo',
        question: '¿Cuál es el largo de tu cabello?',
        type: 'select',
        options: ['Muy corto', 'Corto a la mandíbula', 'Medio a los hombros', 'Largo', 'Muy largo', 'Prefiero no decir']
      },
      {
        id: 'silueta',
        question: '¿Conoces tu silueta?',
        type: 'select',
        options: ['Reloj de arena', 'Pera', 'Manzana', 'Rectángulo', 'Triángulo invertido', 'No la conozco', 'Prefiero no decir']
      }
    ],
    decisionMessage: "Ya tengo lo esencial sobre ti. Si me cuentas tus preferencias de estilo, el resultado se siente más tuyo."
  },
  {
    id: 3,
    title: 'Tu Estilo',
    optional: true,
    questions: [
      {
        id: 'estilos_identidad',
        question: '¿Con cuál de estos estilos te identificas más? (Elige uno)',
        type: 'select',
        options: ['Clásico', 'Romántico', 'Bohemio', 'Minimalista', 'Edgy', 'Sporty', 'Glam', 'Vintage', 'Aún no lo tengo claro']
      },
      {
        id: 'comodidad_impacto',
        question: '¿Comodidad o impacto visual?',
        type: 'select',
        options: ['Máxima comodidad', 'Balanceado', 'Máximo impacto']
      },
      {
        id: 'cobertura',
        question: '¿Qué nivel de cobertura prefieres?',
        type: 'select',
        options: ['Cubrir bastante', 'Equilibrado', 'Mostrar más piel', 'Depende de la zona']
      },
      {
        id: 'referencias',
        question: '¿Hay alguna referencia que tengas en mente?',
        type: 'text',
        placeholder: 'Ej: aesthetic clean girl, estilo Sofía Vergara...'
      }
    ],
    decisionMessage: "Vamos muy bien. Los últimos detalles aterrizan el look pieza por pieza."
  },
  {
    id: 4,
    title: 'Detalles del Look',
    optional: true,
    questions: [
      {
        id: 'prenda_pref',
        question: '¿Tipo de prenda principal que prefieres?',
        type: 'select',
        options: ['Vestido', 'Falda con top', 'Pantalón con top', 'Jumpsuit o enterizo', 'Two-piece (conjunto)', 'Lo que mejor me favorezca']
      },
      {
        id: 'largo_pref',
        question: '¿Qué largo prefieres?',
        type: 'select',
        options: ['Mini', 'Midi', 'Maxi', 'Lo que mejor me favorezca', 'No aplica']
      },
      {
        id: 'calzado',
        question: '¿Qué tipo de calzado tienes pensado?',
        type: 'select',
        options: ['Tacón alto', 'Tacón medio o bajo', 'Plataforma', 'Bota o botín', 'Sandalia', 'Tenis o zapatilla', 'Plano elegante', 'Sorpréndeme']
      },
      {
        id: 'bolso',
        question: '¿Qué tipo de bolso o cartera?',
        type: 'select',
        options: ['Clutch pequeño', 'Cartera de mano', 'Bolso mediano', 'Tote grande', 'Crossbody', 'Mochila', 'No necesito', 'Sorpréndeme']
      },
      {
        id: 'presupuesto_val',
        question: '¿Cuál es tu rango de presupuesto?',
        type: 'select',
        options: ['Solo con lo que tengo', 'Hasta 150k COP', '150k-400k', '400k-800k', '800k+']
      },
      {
        id: 'evitar_val',
        question: '¿Hay algo que quieras evitar?',
        type: 'text',
        placeholder: 'Ej: no quiero mostrar los brazos, evito escotes...'
      }
    ]
  }
];

export const WIZARD_THEMES = [
  { id: 1, title: 'Recomendación de Outfit', description: 'Te armo un look para una ocasión específica', icon: '👗' },
  { id: 2, title: 'Recomendación de Maquillaje', description: 'Te guío con el maquillaje ideal para tu momento', icon: '💄' },
  { id: 3, title: 'Cuidados y Tips de Belleza', description: 'Asesoría para tu rutina de skincare o bienestar', icon: '🌿' }
];

// Mantenemos los datos antiguos para no romper los otros wizards por ahora
export const WIZARD_DATA: { [key: number]: any } = {
  2: [
    { id: 'ocasion_make', question: '¿Para qué ocasión es el maquillaje?', type: 'select', options: ['Trabajo', 'Cita', 'Evento formal', 'Fiesta', 'Otro'], required: true },
    { id: 'tipo_piel', question: '¿Qué tipo de piel tienes?', type: 'select', options: ['Grasa', 'Mixta', 'Seca', 'Normal'], required: true }
  ],
  3: [
    { id: 'enfoque', question: '¿En qué área quieres enfocarte?', type: 'select', options: ['Piel del rostro', 'Cabello', 'Bienestar general'], required: true },
    { id: 'preocupacion', question: '¿Cuál es tu meta?', type: 'text', placeholder: 'Ej: rutina anti-edad...', required: true }
  ]
};
