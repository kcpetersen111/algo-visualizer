This project was build for a 24 hour hackathon.  We built this to give students a graphical representation of some common graph exploration algorithms. We do this by allowing users to create nodes and add connections between them. Then users can run the algorithms and the nodes will light up based on where the active node is currently.

## Getting Started

First, run the development frontend server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

To run the backend service go to the `src/app/backend`:

```bash
make
# or
go build && ./algoVis
```

This will start a server with defaults og 0.0.0.0 and port 3410.

## Tech Used

### Frontend 
    - React.js
    - Next.js
    - Tailwind css
### Backend
    - go
    - gorilla/websockets