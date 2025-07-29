# 📱 Local APK Build Guide for Sambrama Mobile

## 🚀 Quick Build Commands

### For Testing (Preview APK)
```bash
# This creates an installable APK for testing
eas build --platform android --profile preview
```

### For Local Development Build
```bash
# This creates a development build
eas build --platform android --profile development
```

### For Production (Play Store)
```bash
# This creates an AAB file for Google Play Store
eas build --platform android --profile production
```

## 🔧 Local Build (Experimental)

If you want to build completely locally on your machine:

```bash
# Install Android SDK and configure environment first
eas build --platform android --profile preview --local
```

**Prerequisites for local build:**
- Android SDK installed
- Java 11 or 17
- Android Studio (recommended)
- Proper environment variables set

## 📊 Build Progress Tracking

### Check Build Status
```bash
eas build:list
```

### View Specific Build
```bash
eas build:view [BUILD_ID]
```

### Download Built APK
```bash
# APKs are automatically available for download from:
# https://expo.dev/accounts/scsannalli/projects/sambrama-mobile/builds
```

## 🎯 Build Profiles Explained

| Profile | Purpose | Output | Use Case |
|---------|---------|--------|----------|
| `development` | Dev testing | Debug APK | Development with Expo tools |
| `preview` | Testing | Release APK | Testing on devices, sharing with testers |
| `production` | Store release | AAB file | Google Play Store submission |

## 📱 Installing APK on Device

### Method 1: Direct Download
1. Open the EAS build link on your Android device
2. Download the APK directly
3. Install (enable "Install from unknown sources" if needed)

### Method 2: ADB Install
```bash
# Download APK to your computer first
adb install path/to/your-app.apk
```

### Method 3: Cloud Download
1. Go to https://expo.dev
2. Navigate to your project builds
3. Download the APK file
4. Transfer to device and install

## ⚡ Quick Tips

- **Preview builds** are perfect for testing - they create installable APKs
- **Production builds** create AAB files for Play Store
- Build times: ~5-15 minutes depending on complexity
- You'll get email notifications when builds complete
- APKs expire after 30 days on Expo's servers

## 🛠️ Troubleshooting

### Common Issues:
1. **Build fails**: Check logs in EAS dashboard
2. **APK won't install**: Enable "Unknown sources" in Android settings
3. **App crashes**: Check if all dependencies are compatible

### Debug Commands:
```bash
# View detailed logs
eas build:view [BUILD_ID] --logs

# Clear cache if issues
eas build --platform android --profile preview --clear-cache
```

## 📋 Current Build Status

Your current build command is running:
```bash
eas build --platform android --profile preview
```

This will create a **release APK** that you can install on any Android device for testing!
