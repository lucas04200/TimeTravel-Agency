# Étape 1 : Build
FROM node:20-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Récupération de la clé API depuis les arguments de build (docker-compose)
ARG VITE_MISTRAL_API_KEY
ENV VITE_MISTRAL_API_KEY=$VITE_MISTRAL_API_KEY

RUN npm run build

# Étape 2 : Production avec Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
# Copie de la config nginx personnalisée (optionnel mais recommandé pour React Router)
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]