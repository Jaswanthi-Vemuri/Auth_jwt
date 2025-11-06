# SlotSwapper

Peer-to-peer calendar slot swapping app. Built with TypeScript, React, Express, MongoDB.

## Features

- Secure JWT authentication
- Calendar events CRUD
- Swappable slot marketplace
- Swap requests and responses
- Real-time state update

## Setup

1. **Clone the repo**
2. **Backend**  
   - `cd backend`
   - `npm install`
   - Set up `.env`:
     ```
     MONGO_URI=mongodb://localhost:27017/slotswapper
     JWT_SECRET=your_secret
     ```
   - `docker-compose up`
3. **Frontend**  
   - `cd frontend`
   - `npm install`
   - `npm start`

## API Endpoints

| Method | Endpoint                     | Description                       |
|--------|------------------------------|-----------------------------------|
| POST   | /auth/register               | Register new user                 |
| POST   | /auth/login                  | Login user                        |
| GET    | /events                      | List my events                    |
| POST   | /events                      | Create new event                  |
| PATCH  | /events/:id                  | Update (status, etc)              |
| GET    | /swappable-slots             | List swappable slots (others)     |
| POST   | /swap-request                | Request a swap                    |
| POST   | /swap-response/:requestId    | Accept/Reject swap request        |

## Design Choices
- Modular backend
- Atomic swap transaction
- Simple, minimal frontend

## Assumptions
- Only users with `SWAPPABLE` slots can initiate swaps.
- Swaps are always 1-for-1.
- Notifications are poll-based unless real-time added.

