---
sidebar_position: 10
---

# 🌍 Change App Language

## 📋 Overview
Learn how to customize and add new languages to your app's localization system.

## 🔄 Steps to Change Language

### 1️⃣ Add New Language
1. Navigate to `lib/l10n/`
2. Create a new language file (e.g., `app_es.arb` for Spanish)
3. Add translations for all strings

### 2️⃣ Configure Language Support
1. Update `l10n.yaml` to include new language
2. Run `flutter gen-l10n` to generate language files
3. Rebuild the app to see changes

## 📝 Notes
- Keep translations consistent
- Test all screens with new language
- Maintain language files updated

## 🔧 Example Language File
```arb
{
    "appName": "e-School",
    "welcome": "Welcome to e-School",
    "login": "Login",
    "logout": "Logout"
}
```

1. By default, the application language is English. If you want to change the default language, go to `lib/utils/appLanguages.dart` and add your respective language's code shown in below image. Get your language code from here: [https://developers.google.com/admin-sdk/directory/v1/languages](https://developers.google.com/admin-sdk/directory/v1/languages).

   ![e-School SaaS](../../static/images/installation/app/changeDefaultLanguage.png)

2. If your default language code is not in app language list, add language details in list as shown in below image. Go to `lib/utils/appLanguages.dart`:

   ![e-School SaaS](../../static/images/installation/app/addLanguage.png)

3. If your default language is not in `assets/languages/[language-code].json` then create new file in same folder with `[language-code].json`. Add all the labels from en.json and convert label values in your respective language:

   ![e-School SaaS](../../static/images/installation/app/addNewLanguage.jpg)

4. Copy all the labels from en.json file in your `[language-code].json` file:

   ![e-School SaaS](../../static/images/installation/app/addNewLanguage2.jpg)

5. If you want to add new language then follow the steps 2, 3 and 4. 