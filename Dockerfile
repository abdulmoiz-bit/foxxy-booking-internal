#FROM node:16.13.1-alpine3.13
FROM node:22-alpine
RUN addgroup app && adduser -S -G app app
USER app
WORKDIR /app
RUN mkdir data
#chown(change owner) app(applied)
COPY --chown=app:app package*.json .
#COPY package*.json .
RUN npm install
COPY --chown=app:app . .
#COPY . . 
EXPOSE 5173
#CMD ["npm", "run", "dev"]
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"] 
 