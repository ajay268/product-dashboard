# Product Dashboard

A modern product dashboard built with React, Redux Toolkit, and Testing Libraries.

## Features

- Product listing with responsive grid layout
- Real-time search with debouncing
- Filter by category
- Sort by price (low-high, high-low)
- Product detail view
- Favorites management
- Fully responsive design
- Unit and integration tests

## Tech Stack

- React 18
- Redux Toolkit
- React Router 6
- Axios for API calls
- Tailwind CSS for styling
- Jest & React Testing Library for testing

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ajay268/product-dashboard.git
cd product-dashboard 
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## Project Structure
```
product-dashboard/
├── public/
├── src/
│   ├── components/      # Reusable components
│   ├── pages/           # Page components
│   ├── store/           # Redux store and slices
│   ├── hooks/           # Custom hooks
│   ├── utils/           # Helper functions and API
│   └── __tests__/       # Test files
└── package.json
```

## Testing

Run tests with:
```bash
npm test
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).