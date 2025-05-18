# **Space Gateway**

**Space Gateway** is a modern web application that brings the wonders of space exploration to your fingertips. It provides real-time data on planets, space missions, astronomical events, and the latest space news using live APIs — all wrapped in a clean, interactive user interface.

## **Live Demo**

Coming soon...

## **Table of Contents**

Features
Pages Overview
Use Case Diagram
APIs Used
Tech Stack
Installation
Usage
Contributing
License

## **Features**

Planet Details: Browse detailed information and stunning images of all major planets and view extensive data including mass, radius, orbital stats, temperature, and composition
NASA Picture of the Day: Stay inspired with NASA's daily featured space photograph
Space Missions: Track current and upcoming space missions with full mission info, agencies, launch dates, and status
Astronomical Events: Stay informed about upcoming cosmic events
Space News: Get the latest news articles from trusted space media sources
Image Gallery: Browse through a curated collection of high-resolution space images
Search Functionality: Find specific content across articles, images, and exploration data


**Pages Overview**

**Home**

Welcome screen with NASA's Picture of the Day
Quick navigation to all major features
Featured articles and content highlights

**Planets**

Interactive grid of planets in our solar system
"View Details" modal popups for each planet
Stunning imagery for each celestial body
Detailed pop-up page showing full information on a selected planet

**Explore**
Tabbed view with:

Missions: List of upcoming launches and space missions
Events: Calendar of future and current astronomical events
News: Latest developments in space exploration

**Articles**

Curated collection of informative articles on space topics
Search functionality to find specific articles

**Images**

Gallery of high-resolution space imagery
Search functionality to find specific images

**About**

Project overview and mission statement
Credits, acknowledgments, and contact information

## **Use Case Diagram**

Below is the use case diagram that illustrates the core functionality of Space Gateway and how users interact with the system:

![Space Gateway Use Case Diagram](./assets/usecaseastroduo.png)

## **APIs Used**

Below is a table listing all the APIs used in this project, along with a brief description of their purpose.

![APIs Used Diagram](./assets/apis.png)


## **Tech Stack**

*Frontend*: React, TypeScript, Chakra UI, Axios
*Backend*: Spring Boot (Java), RestTemplate
*Build Tools*: Vite (frontend), Maven (backend)

## **Setup Instructions**

**Frontend Setup**
```bash
# Cloner le dépôt
git clone https://github.com/m-elhamlaoui/development-platform-astro-duo.git

# Naviguer vers le répertoire frontend
cd ../frontend

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev
```

**Backend Setup**
```bash
# Naviguer vers le répertoire backend
cd ../backend

# Compiler le projet
mvn clean install

# Exécuter l'application
executez ..\SpaceGatewayApplication.java
```

## **Usage**
After starting both frontend and backend servers:

Open your browser and navigate to http://localhost:3001 (the port specified in Vite config)

___________________________________________________________________________________________________
Developed with ❤️ for space enthusiasts everywhere
