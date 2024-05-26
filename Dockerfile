# Usa una imagen oficial de Node.js como imagen base
FROM node:18

# Establece el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copia el archivo package.json y package-lock.json al directorio de trabajo
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto del código de la aplicación al directorio de trabajo
COPY . .



# Expone el puerto en el que tu aplicación escucha, si es necesario
# EXPOSE 3000

# Comando para ejecutar tu aplicación
CMD [ "node", "index.js" ]
