FROM node:14-alpine

RUN npm i -g @nestjs/cli@7.5.1 && \
    mkdir -p /home/backend/app

WORKDIR /home/backend/app

COPY ./entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENV PATH=/home/bin:${PATH}

ENTRYPOINT [ "/entrypoint.sh" ]
