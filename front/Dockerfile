FROM node:latest


WORKDIR /app

COPY ./package*.json ./
RUN npm install


COPY . .
RUN npm run build


EXPOSE 8000
CMD [ "npx" , "serve" , "-l" , "8000" , "-s" , "build" ]
