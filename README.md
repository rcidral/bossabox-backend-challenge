# 💻 BossaBox Backend Challenge

- The challenge is to create a simple API that allows the user to manage a list of tools with their respective names, links, descriptions and tags.

### 📁 Prerequisites

- [Node.js 18^](https://nodejs.org/dist/v18.12.0/node-v18.12.0-x64.msi)
- [Docker](https://docs.docker.com/docker-for-windows/install/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### 📑 Commands

```bash
# Clone the repository
git clone https://github.com/rcidral/bossabox-backend-challenge.git

# Create the .env file based on .env.example
cp .env.example .env

# Install the dependencies
npm install

# Start the container
docker-compose up -d

# Run migrations
npx prisma migrate dev

# Start the application
npm run dev
```

🙎 Developed by [Ricardo Cidral](https://www.linkedin.com/in/ricardo-cidral-machado/)
