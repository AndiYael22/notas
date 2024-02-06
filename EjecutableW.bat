@ECHO OFF

REM Frontend: Instalar dependencias e iniciar
START CMD /C "cd Frontend && npm install && npm run start"

REM Esperar 5 segundos para dar tiempo a que ambos servidores inicien
timeout /t 5 /nobreak

REM Backend: Iniciar servidor y cracion de bd
START CMD /C "cd Backend && npm install && npx sequelize db:create && npx sequelize db:migrate && npm run start"

EXIT
