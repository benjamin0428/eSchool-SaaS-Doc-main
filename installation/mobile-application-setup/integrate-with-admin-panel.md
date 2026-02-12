---
sidebar_position: 4
---

# 🔄 Integrate with Admin Panel

## 📋 Overview
Learn how to connect your mobile app with the e-School SaaS admin panel.

## 🔄 Integration Steps

### 1️⃣ Configure API Endpoint
1. Open `lib/config/api.dart`
2. Update the base URL with your admin panel URL
3. Ensure SSL certificate is valid

### 2️⃣ Test Connection
1. Run the app in debug mode
2. Verify API responses
3. Check error handling

## 📝 Notes
- Use HTTPS for secure communication
- Test all API endpoints
- Monitor API performance

Go to `lib/utils/constants.dart` and replace the baseUrl with your admin panel URL. Set your socket URL as well.

![e-School SaaS](../../static/images/installation/app/changeDatabaseUrl.png) 