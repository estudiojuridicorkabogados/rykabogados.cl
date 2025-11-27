# R&K Abogados

The official website for **R&K Abogados**, a premier law firm based in Santiago, Chile.

🌐 **Live Site:** [rkabogados.cl](https://rkabogados.cl)

## 🚀 Getting Started

### Prerequisites

- Node.js v22.9.0+ (specified in [.nvmrc](.nvmrc))
- npm v11.3.0+

### Installation

1. **Set up environment variables**
   ```bash
   cp .env.template .env
   ```
   Then populate the `.env` file with the correct Contentful credentials.

2. **Install dependencies**
   ```bash
   nvm use
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

   1. **Set up environment variables**
   ```bash
   cp .env.template .env
   ```
   Then populate the `.env` file with the correct Contentful credentials.

2. **Install dependencies**
   ```bash
   nvm use
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **View the application**
   
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠️ Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors automatically
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run typecheck` - Run TypeScript type checking

## 🚀 Deployment

This website is automatically deployed to [Vercel](https://vercel.com) on every push to the `main` branch.

## 🏗️ Built With

- **Framework:** Next.js 15
- **Styling:** Tailwind CSS v4
- **Content Management:** Contentful
- **Language:** TypeScript
- **Deployment:** Vercel

## 📝 Development Notes

- Uses Next.js App Router
- Configured with ESLint and Prettier for code quality
- Tailwind CSS for styling with custom theme configuration
- Environment-specific configurations available

