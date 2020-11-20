#Dockerfike is not working :(
FROM ubuntu:16.04
FROM node:latest



RUN apt-get clean
RUN rm -r /var/lib/apt/lists/*
RUN apt-get -qq update && apt-get -qq update



RUN sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
RUN wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add -
RUN apt-get -y install postgresql

USER postgres


RUN /etc/init.d/postgresql start &&\
    psql --command "CREATE USER docker WITH SUPERUSER PASSWORD 'docker';" &&\
    createdb -O docker docker


RUN echo "host all  all    0.0.0.0/0  md5" >> /etc/postgresql/9.6/main/pg_hba.conf
RUN echo "listen_addresses='*'" >> /etc/postgresql/9.6/main/postgresql.conf

EXPOSE 5432

VOLUME  ["/etc/postgresql", "/var/log/postgresql", "/var/lib/postgresql"]
CMD ["/usr/lib/postgresql/9.6/bin/postgres", "-D", "/var/lib/postgresql/9.6/main", "-c", "config_file=/etc/postgresql/9.6/main/postgresql.conf"]



RUN /etc/init.d/postgresql status


# USER root

# RUN mkdir -p /home/node/app/lireddit
# WORKDIR /home/node/app/lireddit


# COPY . .


# RUN npm install


# RUN npm run build

# EXPOSE 10000

# RUN ["npm", "start"]
