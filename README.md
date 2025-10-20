# Trust Seguros - Frontend

Frontend de la aplicación web para Trust Correduría de Seguros desarrollado con Next.js 14, React 19 y TypeScript.

## 🚀 Características

- **Next.js 14** con App Router
- **React 19** con Server Components
- **TypeScript** para type safety
- **Tailwind CSS** para estilos
- **shadcn/ui** para componentes
- **Autenticación JWT** integrada
- **Responsive Design** completo

## 📋 Requisitos

- Node.js 18+
- npm o yarn
- API Backend corriendo en puerto 3001

## 🛠️ Instalación

1. **Clonar el repositorio**
\`\`\`bash
git clone <repository-url>
cd trust-seguros-frontend
\`\`\`

2. **Instalar dependencias**
\`\`\`bash
npm install
\`\`\`

3. **Configurar variables de entorno**
\`\`\`bash
cp .env.example .env.local
# Editar .env.local con la URL de tu API
\`\`\`

4. **Iniciar en desarrollo**
\`\`\`bash
npm run dev
\`\`\`

## 🌐 Variables de Entorno

\`\`\`env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
\`\`\`

## 📱 Funcionalidades

### 🔐 Autenticación
- Login/logout con JWT
- Protección de rutas
- Verificación automática de sesión

### 📊 Dashboard
- Estadísticas en tiempo real
- Resumen de actividad
- Accesos rápidos

### 🚗 Cotizaciones
- Stepper modal para cotizar seguros
- Validación completa de formularios
- Integración con API

### 🛡️ Gestión de Seguros
- Lista de pólizas activas
- Filtros por tipo
- Detalles de cobertura

### 🚨 Siniestros
- Reporte de siniestros
- Seguimiento de estados
- Documentación

### 👥 Recomendados
- Sistema de referidos
- Seguimiento de conversiones
- Bonificaciones

## 🏗️ Estructura del Proyecto

\`\`\`
src/
├── app/                    # App Router de Next.js
│   ├── dashboard/         # Páginas del dashboard
│   ├── globals.css        # Estilos globales
│   ├── layout.tsx         # Layout principal
│   └── page.tsx          # Página de login
├── components/            # Componentes reutilizables
│   ├── ui/               # Componentes de shadcn/ui
│   └── app-sidebar.tsx   # Sidebar principal
├── hooks/                # Custom hooks
│   └── useAuth.tsx       # Hook de autenticación
└── lib/                  # Utilidades
    └── api.ts            # Cliente API
\`\`\`

## 🔧 Scripts Disponibles

\`\`\`bash
npm run dev      # Desarrollo
npm run build    # Construcción para producción
npm run start    # Iniciar en producción
npm run lint     # Linter
\`\`\`

## 🎨 Componentes UI

El proyecto utiliza **shadcn/ui** para componentes consistentes:

- Buttons, Cards, Dialogs
- Forms, Inputs, Selects
- Tables, Badges, Tooltips
- Sidebar, Navigation
- Y muchos más...

## 🔗 Integración con API

El frontend se conecta al backend a través de:

- **Cliente HTTP** personalizado
- **Manejo de tokens JWT** automático
- **Tipos TypeScript** para todas las respuestas
- **Manejo de errores** robusto

## 📱 Responsive Design

- **Mobile First** approach
- **Breakpoints** de Tailwind CSS
- **Sidebar colapsible** en móviles
- **Componentes adaptativos**

## 🚀 Despliegue

### Vercel (Recomendado)
\`\`\`bash
npm run build
# Conectar con Vercel CLI o GitHub
\`\`\`

### Docker
\`\`\`dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
\`\`\`

## 🤝 Contribución

1. Fork el proyecto
2. Crear rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.
