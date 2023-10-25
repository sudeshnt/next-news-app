# Build stage
FROM node:18-alpine as build

WORKDIR /app

RUN npm install -g pnpm

COPY package*.json ./

# Install only the dependencies needed for building the project
RUN pnpm i

# Copy local code to the container image.
COPY . .

# Build the application
RUN pnpm build

# Run stage
FROM node:18-alpine

WORKDIR /app

RUN npm install -g pnpm

# Copy only the dependencies installation from the 1st stage image
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public

EXPOSE 3000

CMD [ "pnpm", "start" ]