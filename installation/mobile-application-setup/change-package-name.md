# 📦 Change Package Name

## 📋 Overview
Learn how to customize your app's package name for both Android and iOS platforms.

## 🔄 Steps to Change Package Name

### 1️⃣ Android Package Name
1. Open `android/app/build.gradle`
2. Update `applicationId` with your new package name
3. Update package name in `AndroidManifest.xml`

### 2️⃣ iOS Bundle Identifier
1. Open `ios/Runner.xcodeproj`
2. Update Bundle Identifier in project settings
3. Update `Info.plist` if needed

## ⚠️ Important Notes
- Package name must be unique
- Follow platform naming conventions
- Update all references to old package name
- Test app thoroughly after changes

## 🔧 Example Package Names
- Android: `com.yourcompany.eschool`
- iOS: `com.yourcompany.eschool` 