#!/bin/bash
# Frontend: Instalar dependencias e iniciar el servidor
(cd Frontend && npm install && npm run start) &

# Esperar unos segundos para dar tiempo a que el servidor backend inicie
sleep 5

# Backend: Crear y migrar la base de datos, e iniciar el servidor
(cd Backend && npm install && npx sequelize db:create && npx sequelize db:migrate && npm run start) &

# Esperar a que ambos procesos terminen
wait
