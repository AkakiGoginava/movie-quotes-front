# Movie Quotes Front-end

A modern Next.js application for sharing movie quotes.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development](#development)
  - [Environment Variables](#environment-variables)
  - [Production Build](#production-build)
- [Deployment](#deployment)
- [Backend](#backend)

## Features

- Next.js 15
- Tailwind CSS & DaisyUI for styling
- React Hook Form for forms and validation
- i18next for localization (English & Georgian)
- Google authentication (OAuth)
- Axios for API requests
- PM2 for process management
- Custom error pages (404, 403)
- Responsive design

## Getting Started

### Prerequisites

- Node.js (v20 recommended)
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

- The app will run at http://localhost:3000
- API requests use the URL in `.env` (`NEXT_PUBLIC_API_URL`)

### Environment Variables

- `.env` — for development

Example:

```
NEXT_PUBLIC_API_URL=http://api.local.test:8000
```

### Production Build

```bash
npm run build
```

- Output is in the `.next/` folder

## Deployment

Build the app: `npm run build`

Start with PM2: `pm2 start npm --name movie-quotes -- run start`

## Backend

- **Backend repository:** [movie-quotes-back-end](https://github.com/RedberryInternship/back-movie-quotes-akaki-goginava.git)
- **API URL:** https://api.movie-quotes.akaki-goginava.redberryinternship.ge
