# 🎉 Sambrama Mobile App

A modern React Native/Expo app for venue booking and event planning with a sleek dark navy theme and glassmorphism design.

## 📱 Features

- **Modern Dark Navy UI** - Professional dark theme with navy blue accents
- **Venue Discovery** - Browse venues by city with beautiful image galleries
- **Booking System** - Complete booking flow with form validation
- **Responsive Design** - Optimized for all mobile screen sizes
- **Glassmorphism Effects** - Modern glass effects and semi-transparent overlays
- **Smooth Navigation** - Integrated back buttons and seamless transitions

## 🛠️ Tech Stack

- **React Native** 0.79.3
- **Expo** 53.0.11
- **React Navigation** 6.x
- **Expo Linear Gradient** - For beautiful gradient effects
- **React Native DateTimePicker** - Enhanced date selection
- **React Native Picker** - Modern dropdown components

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm** or **yarn**
- **Expo CLI** - Install globally: `npm install -g @expo/cli`
- **Git**

### For Physical Device Testing
- **Expo Go app** on your iOS/Android device
- Download from [App Store](https://apps.apple.com/app/expo-go/id982107779) or [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)

### For Simulator Testing
- **iOS Simulator** (macOS only) - Included with Xcode
- **Android Studio** with Android Emulator

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/scsannalli/sambrama-mobile.git
cd sambrama-mobile
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Start Development Server
```bash
npx expo start
# or
yarn expo start
```

### 4. Run on Device/Simulator

#### Option A: Physical Device
1. Open **Expo Go** app on your phone
2. Scan the QR code displayed in terminal
3. App will load automatically

#### Option B: iOS Simulator (macOS only)
```bash
npx expo start --ios
# or press 'i' in the terminal after starting expo
```

#### Option C: Android Emulator
```bash
npx expo start --android
# or press 'a' in the terminal after starting expo
```

#### Option D: Web Browser
```bash
npx expo start --web
# or press 'w' in the terminal after starting expo
```

## 🏗️ Build for Production

### Prerequisites for Building
- **Expo Account** - Sign up at [expo.dev](https://expo.dev)
- **EAS CLI** - Install: `npm install -g eas-cli`

### 1. Login to Expo
```bash
eas login
```

### 2. Configure EAS Build
```bash
eas build:configure
```

### 3. Build for Android (APK)
```bash
# Development build
eas build --platform android --profile development

# Preview build (APK for testing)
eas build --platform android --profile preview

# Production build (AAB for Play Store)
eas build --platform android --profile production

# Local APK build (build locally without EAS servers)
eas build --platform android --profile preview --local --clear-cache
```

### 4. Build for iOS
```bash
# Development build
eas build --platform ios --profile development

# Preview build (for testing)
eas build --platform ios --profile preview

# Production build (for App Store)
eas build --platform ios --profile production
```

### 5. Build for Both Platforms
```bash
eas build --platform all --profile preview
```

## 📁 Project Structure

```
sambrama-mobile/
├── App.js                 # Main app entry point
├── app.json              # Expo configuration
├── eas.json              # EAS Build configuration
├── package.json          # Dependencies and scripts
├── assets/               # Images and static assets
│   ├── glossy_bg.png    # Background image
│   ├── icon.png         # App icon
│   └── venues/          # Venue images
└── src/
    ├── components/       # Reusable UI components
    │   ├── ModernButton.js
    │   ├── ModernHeader.js
    │   ├── ModernInput.js
    │   └── VenueCard.js
    ├── screens/         # App screens
    │   ├── HomePage.js
    │   ├── VenuesPage.js
    │   ├── VenueDetails.js
    │   └── VenueBookingPage.js
    └── theme/           # Theme and styling
        ├── Colors.js
        └── GlobalStyles.js
```

## 🎨 Customization

### Updating Colors
Edit `src/theme/Colors.js` to customize the app's color scheme:

```javascript
export const Colors = {
  primary: '#1E3A8A', // Change primary color
  // ... other colors
};
```

### Adding New Venues
Update the venues array in `src/screens/VenuesPage.js`:

```javascript
const venues = [
  {
    name: "Your Venue Name",
    city: "Your City",
    images: [require('../../assets/venues/your-image.jpg')],
    description: "Your venue description",
    cost: "Your price",
  },
  // ... other venues
];
```

## 🔧 Development Commands

```bash
# Start development server
npm start

# Start with cache cleared
npx expo start --clear

# Type check (if using TypeScript)
npx tsc --noEmit

# Lint code (if ESLint is configured)
npx eslint src/

# Install new dependency
npx expo install package-name
```

## 📱 Testing

### Testing on Different Devices
1. **iPhone**: Use iOS Simulator or physical device via Expo Go
2. **Android**: Use Android Emulator or physical device via Expo Go
3. **Web**: Test responsive design in browser

### Performance Testing
- Use **Flipper** for React Native debugging
- Enable **Performance Monitor** in Expo DevTools
- Test on older devices for performance validation

## 🚀 Deployment

### App Store (iOS)
1. Build production version: `eas build --platform ios --profile production`
2. Download `.ipa` file from EAS dashboard
3. Upload to App Store Connect via Xcode or Transporter
4. Submit for review

### Google Play Store (Android)
1. Build production version: `eas build --platform android --profile production`
2. Download `.aab` file from EAS dashboard
3. Upload to Google Play Console
4. Submit for review

### Over-the-Air Updates
```bash
# Publish update
eas update --branch production --message "Your update message"
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -am 'Add your feature'`
4. Push to branch: `git push origin feature/your-feature`
5. Submit a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support or questions:
- **Email**: support@sambrama.com
- **GitHub Issues**: [Create an issue](https://github.com/scsannalli/sambrama-mobile/issues)

## 🙏 Acknowledgments

- **Expo Team** - For the amazing development platform
- **React Native Community** - For the robust framework
- **Contributors** - Thank you for your contributions

---

**Made with ❤️ for event planning and venue booking**
