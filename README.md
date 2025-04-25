# dagswap

A web interface for a decentralized exchange (DEX) built with Next.js, React, TypeScript, and Tailwind CSS (using shadcn/ui components).

## Features

*   **Token Swapping:** Exchange cryptocurrency tokens.
*   **Liquidity Management:** Add or remove liquidity from pools.
*   **Dollar-Cost Averaging (DCA):** Set up automated, recurring token swaps/purchases.
*   **Token Information:** View lists and details of available tokens.
*   **Modern UI:** Clean interface built using shadcn/ui components.

## Getting Started

### Prerequisites

*   Node.js (Version specified in `.nvmrc` if available, otherwise latest LTS recommended)
*   npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/DagSwap/dagswap.git
    cd dagswap
    ```
2.  Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

### Running Locally

To start the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

In the project directory, you can run:

*   `npm run dev` / `yarn dev`: Runs the app in development mode.
*   `npm run build` / `yarn build`: Builds the app for production.
*   `npm run start` / `yarn start`: Starts the production server.
*   `npm run lint` / `yarn lint`: Lints the codebase using Next.js' built-in ESLint configuration.

## Tech Stack

*   **Framework:** Next.js 15
*   **Language:** TypeScript
*   **UI Library:** React 19
*   **Styling:** Tailwind CSS
*   **Component Library:** shadcn/ui
*   **Forms:** React Hook Form + Zod
*   **Charting:** Recharts
*   **UI Extras:** Sonner (Toasts), Vaul (Drawers), Lucide Icons 
