# Usar imagen base de Node.js
FROM node:18-alpine AS builder

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de configuración de dependencias
COPY package.json package-lock.json* ./

# Instalar pnpm globalmente
#RUN npm install -g pnpm

# Instalar dependencias
#RUN pnpm install --force
RUN npm install --force

# Copiar código fuente
COPY . .

# Construir la aplicación para producción
# RUN pnpm run build
RUN npm run build

# Etapa de producción con Nginx
FROM nginx:alpine AS production

# Copiar archivos construidos desde la etapa anterior
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Exponer puerto 80
EXPOSE 3000

# Comando por defecto
CMD ["nginx", "-g", "daemon off;"]