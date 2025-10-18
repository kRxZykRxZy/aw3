FROM node:20-alpine

# Set working directory
WORKDIR /main-app


COPY package*.json ./

# Install deps
RUN npm install

# Copy the rest of your source code
COPY . .

# Run Commands Concurrently
RUN npm install -g concurrently

EXPOSE 5173

# Start both the DB and the dev server concurrently
CMD ["concurrently", "\"npm run db:start\"", "\"npm run dev\""]
