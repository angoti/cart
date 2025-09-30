# Cart - E-commerce React Native App

A React Native shopping cart application built with Expo and Firebase.

## Setup Instructions

### Prerequisites

- Node.js and npm installed
- Expo CLI installed (`npm install -g expo-cli`)
- A Firebase project

### Environment Variables

This project uses Firebase for backend services. You need to configure your Firebase credentials:

1. Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Fill in your Firebase project credentials in the `.env` file:
   - `EXPO_PUBLIC_FIREBASE_API_KEY`: Your Firebase API Key
   - `EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN`: Your Firebase Auth Domain
   - `EXPO_PUBLIC_FIREBASE_PROJECT_ID`: Your Firebase Project ID
   - `EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET`: Your Firebase Storage Bucket
   - `EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`: Your Firebase Messaging Sender ID
   - `EXPO_PUBLIC_FIREBASE_APP_ID`: Your Firebase App ID

   You can find these values in your Firebase Console under Project Settings > General > Your apps > SDK setup and configuration.

3. **Important**: Never commit the `.env` file with your actual credentials. The `.env` file is already included in `.gitignore`.

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Run on your preferred platform:
   ```bash
   npm run android  # For Android
   npm run ios      # For iOS
   npm run web      # For Web
   ```

## Security

- Firebase API keys and other sensitive credentials are stored in environment variables
- Never commit the `.env` file to version control
- If you suspect your credentials have been compromised, rotate them immediately in the Firebase Console

## Project Structure

- `src/components/` - React components
- `src/screens/` - Screen components
- `src/services/` - Service modules (Firebase, etc.)
- `src/styles/` - Styling
- `src/examples/` - Example components

## License

Private
