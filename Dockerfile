FROM node:18



WORKDIR /usr/app
COPY package*.json ./
COPY prisma ./prisma/

# COPY ENV variable
COPY .env ./

# COPY tsconfig.json file
COPY tsconfig.json ./


RUN npm install -g npm@9.3.1
RUN npm install

COPY . .

RUN ls

EXPOSE 3303
EXPOSE 5555
CMD [ "npm", "run", "start:migrate:dev" ]