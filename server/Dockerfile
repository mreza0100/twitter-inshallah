FROM node:latest


WORKDIR /app


COPY . .
RUN npm install
RUN npm run build




ENV FRONT_END_URL="http://localhost:8000"


EXPOSE 10000
CMD [ "npm" , "run" , "start" ]
