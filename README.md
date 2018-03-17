# Sidebar-Info
## Purpose
This service forms a part of the WeGot food review website. It renders basic information about a restaurant, including the opening hours, address, phone number, and links to website and to google maps for directions. In addition, the service renders a map centered on the location of the restaurant, with a labeled marker.

## Description
The service is composed of a server, a client, and a database.
### Server API
- A request to the root will redirect to the /restaurants/:id path with a default restaurant id
- Serves static client files in response to a GET request to the /restaurants/:id path
- It also serves json formatted restaurant data in response to a GET request to the /api/restaurants/:id/sidebar endpoint.
### Database
Two options exist to compare: 
 - A MongoDB database that holds restaurant information.
 - A PostgreSQL database that holds restaurant information.
### Client
Takes in a restaurant ID and requests restaurant information from the server. Renders the information.

## Getting Started
### Prerequisites
- npm
- node
- jest
- webpack
- MongoDB
- PostgreSQL

### Installation
1. Install dependencies: `npm install`
2. Build client files: `npm run react-dev`
3. Start database server:
 - Start MongoDB: `npm run nosql-db`
 - Start PostgreSQL: `npm run sql-db` 
4. Seed database:
 - With FEC data: `npm run OG-seed`
 - With SDC data: `npm run seed`
5. Start server: 
 - In dev mode: `npm run server:watch`
 - In production mode: `npm run start`

To start, in your browser navigate to: [http://localhost:3003](http://localhost:3003)

## Tests
Run: `npm test`
