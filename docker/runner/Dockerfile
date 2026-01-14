FROM node:20-alpine

WORKDIR /app

# --- Backend Setup ---
COPY backend/package*.json ./backend/
# Install prod dependencies
RUN cd backend && npm ci
COPY backend ./backend
RUN cd backend && npm run build

# --- Frontend Setup ---
COPY frontend/package*.json ./frontend/
RUN cd frontend && npm ci
COPY frontend ./frontend
RUN cd frontend && npm run build

# --- Runtime Script ---
COPY docker/runner/start.sh .
RUN chmod +x start.sh

# Expose ports: 3000 (Front), 3001 (Back)
EXPOSE 3000 3001

ENV NODE_ENV=production
ENV PORT=3001

CMD ["./start.sh"]
