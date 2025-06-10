# F1 Standings POC

A proof-of-concept React application that displays live Formula 1 driver standings using the [f1-live-pulse](https://rapidapi.com/pt-br/f1-live-pulse-f1-live-pulse-default/api/f1-live-pulse/) API. The UI is styled with [Bulma](https://bulma.io/) for a modern, responsive look.

## Screenshot
<img width="1308" alt="image" src="https://github.com/user-attachments/assets/8e5202fe-00cb-4369-830f-0d063fb9ff0f" />


## Features

- Live F1 driver standings fetched from RapidAPI
- Team color indicators and driver avatars
- Bulma-powered responsive table with hover effects
- Progress bars showing points relative to the leader
- Last updated timestamp

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/f1-standings-poc.git
   cd f1-standings-poc/f1-standings-frontend
   ```

2. **Install dependencies:**
   ```sh
   npm install
   # or
   yarn install
   ```

3. **Set up your RapidAPI key:**
   - Create a `.env` file in the `f1-standings-frontend` directory:
     ```
     VITE_RAPIDAPI_KEY=your_rapidapi_key_here
     ```

### Running the App

```sh
npm run dev
# or
yarn dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to view the app.

## Project Structure

```
f1-standings-frontend/
├── public/
├── src/
│   ├── DriverStandings.jsx
│   └── main.jsx
├── .env
├── package.json
├── vite.config.js
└── ...
```

## Customization

- **Styling:** Uses [Bulma](https://bulma.io/) for CSS. You can further customize components in `DriverStandings.jsx`.
- **API:** The API endpoint and headers are set in the fetch call inside `DriverStandings.jsx`.

## License

This project is for demonstration purposes only.

---

*Made with ❤️ for F1 fans!*

