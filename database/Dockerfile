FROM postgres:11.2-alpine
ADD . /docker-entrypoint-initdb.d/init.sql
RUN mkdir -p /docker-entrypoint-initdb.d
ADD /docker-entrypoint-initdb.d/init.sql /docker-entrypoint-initdb.d/
RUN chmod 744 /docker-entrypoint-initdb.d/init.sql
