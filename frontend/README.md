# Space Gateway

A modern web application that brings the wonders of space exploration to your fingertips. Space Gateway provides access to NASA's APIs, space news, interactive 3D visualizations, and more.

## Features

- 🌌 NASA's Picture of the Day
- 🪐 Interactive 3D Solar System
- 📰 Space News and Articles
- 🖼️ High-Resolution Space Image Gallery
- 🚀 Space Mission Tracking
- 📅 Astronomical Event Calendar
- 👤 User Authentication

## Tech Stack

- Frontend: React, TypeScript, Chakra UI
- 3D Visualization: Three.js
- Backend: Spring Boot (separate repository)
- APIs: NASA Open APIs, SpaceX API

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Java 17 or higher (for backend)
- Maven (for backend)

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/space-gateway.git
   cd space-gateway
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your NASA API key:
   ```
   VITE_NASA_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
space-gateway/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components
│   ├── services/      # API services
│   ├── types/         # TypeScript type definitions
│   ├── utils/         # Utility functions
│   ├── App.tsx        # Main application component
│   └── main.tsx       # Application entry point
├── public/            # Static assets
├── index.html         # HTML entry point
└── package.json       # Project dependencies
```

## API Integration

The application integrates with several space-related APIs:

- NASA APOD (Astronomy Picture of the Day)
- NASA Image and Video Library
- SpaceX API (for mission data)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- NASA for providing open APIs and space data
- SpaceX for mission information
- The open-source community for their invaluable tools and libraries 