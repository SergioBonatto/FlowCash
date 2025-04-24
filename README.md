<div align="center">
  <img src="assets/icon.png" alt="FlowCash Logo" width="200" />
</div>

**FlowCash** is a sophisticated mobile application designed to help users manage personal finances with elegance and efficiency. Built with **React Native** and **Expo**, FlowCash delivers a premium user experience through its modern **glassmorphism-inspired UI** and robust financial management capabilities.

---

## ✨ Features

- 💸 **Comprehensive Transaction Management**: Track income and expenses with detailed categorization
- 🌍 **Advanced Internationalization**: Support for 10 languages with dynamic locale-based formatting
- 💱 **Multi-currency Support**: Handle transactions in USD, BRL, EUR, and GBP with proper formatting
- 📊 **Transaction Analytics**: Visual breakdown of spending patterns and income sources
- 📜 **Rich Transaction History**: Chronologically sorted with customizable filtering options
- 📤 **Data Portability**: Export transactions as standardized JSON for backup or analysis
- 📥 **Seamless Import**: Import transaction data with conflict resolution handling
- ⚙️ **Personalization**: Customizable preferences for language, currency, and display options
- 💾 **Persistent Storage**: Reliable local data persistence with AsyncStorage
- 🎨 **Premium UI/UX**: Beautiful glassmorphism effects with optimized performance
- 🔒 **Data Privacy**: All financial data stays on your device, no cloud storage required

---

## 🚀 Tech Stack

- **React Native**: Cross-platform mobile framework with native performance
- **Expo**: Developer toolkit and platform for universal React applications
- **TypeScript**: Enterprise-grade static type checking
- **React Context API**: Efficient state management with provider pattern
- **AsyncStorage**: Persistent, key-value storage system
- **Expo Blur**: High-performance blur effects for glassmorphic UI
- **React Navigation**: Navigation library with native transitions
- **date-fns**: Modern JavaScript date utility library
- **Expo Document Picker & File System**: For handling file operations
- **React Hooks**: Functional component patterns for stateful logic

---

## 📱 Screenshots

<div align="center">
  <img src="./assets/Screenshot%202025-04-24%20at%2017.00.28.png" alt="Transaction Dashboard" width="300" />
  <img src="./assets/Screenshot%202025-04-24%20at%2017.00.39.png" alt="Transaction Management" width="300" />
</div>

---

## ⚙️ Installation

### Prerequisites
- Node.js (v14.0.0+)
- npm (v7.0.0+) or Yarn (v1.22.0+)
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator or Android Emulator for local development

### Setup
```bash
# Clone the repository
git clone https://github.com/sergiobonatto/flowcash.git

# Navigate to project directory
cd flowcash

# Install dependencies with Yarn (preferred for deterministic builds)
yarn install
# OR with npm
npm install

# Start the development server
yarn start
# OR
npm start
```

### Running on Physical Devices
1. Install the Expo Go app on your device
2. Scan the QR code from terminal with your camera app (iOS) or Expo Go app (Android)
3. Allow the app to open in Expo Go

---

## 🏗️ Project Architecture

FlowCash follows a feature-based architecture with clean separation of concerns:

```
.
├── assets/                 # Static assets - icons, images, fonts
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── shared/         # Generic, widely used components
│   │   └── domain/         # Feature-specific components
│   ├── context/            # React Context providers
│   │   ├── PreferencesContext.tsx  # User preferences state
│   │   └── TransactionsContext.tsx # Financial data state
│   ├── localization/       # i18n setup and translation files
│   ├── navigation/         # Navigation configuration
│   ├── screens/            # Application screens/pages
│   ├── services/           # Business logic and external services
│   │   ├── storage.ts      # Local storage operations
│   │   ├── export.ts       # Data export functionality
│   │   └── import.ts       # Data import with validation
│   ├── styles/             # Styling system
│   │   ├── theme.ts        # Design tokens and variables
│   │   └── components/     # Component-specific styles
│   ├── types/              # TypeScript type definitions
│   └── utils/              # Utility functions and helpers
│       └── formatCurrency.ts # Currency formatting
├── App.tsx                 # Application entry point
├── babel.config.js         # Babel transpilation config
└── package.json            # Dependencies and scripts
```

---

## 🧩 Core Component Architecture

FlowCash implements a robust component hierarchy:

### Context Providers
- **PreferencesContext**: Manages user preferences with AsyncStorage persistence
  - Language selection with dynamic locale switching
  - Currency preference with appropriate formatting
  - Theme and display options

- **TransactionsContext**: Financial transaction state management
  - CRUD operations for transaction data
  - Optimized state updates with React hooks
  - Data persistence with AsyncStorage

### Component Design
- **Container/Presenter Pattern**: Separation of logic and UI
- **Component Composition**: Building complex UIs from smaller, focused components
- **Prop Drilling Avoidance**: Using context for cross-cutting concerns
- **Performance Optimization**: Strategic memoization with React.memo and useMemo

---

## 📊 State Management Strategy

FlowCash implements a sophisticated state management approach:

1. **Local Component State**: UI-specific state using useState
2. **Context API**: For shared state across component hierarchies
3. **Persistent Storage**: AsyncStorage for data that survives app restarts
4. **State Normalization**: Avoiding nested state for better performance
5. **Optimistic Updates**: Immediate UI updates before persistence completes

Key principles:
- Single source of truth for each data domain
- Minimal component re-renders through careful state design
- Clear separation of UI state and domain state

---

## 🌐 Internationalization Architecture

FlowCash features a comprehensive i18n solution:

- **Dynamic Language Switching**: Real-time UI updates on language change
- **Locale-aware Formatting**: Numbers, currencies, and dates formatted per locale
- **Translation Management**: Structured key-based translation system
- **String Interpolation**: Support for variables within translations
- **RTL Support**: Ready for right-to-left languages

Languages supported with full translation coverage:
- English (en)
- Portuguese - Brazil (pt-BR)
- Portuguese - Portugal (pt-PT)
- Spanish (es)
- French (fr)
- German (de)
- Italian (it)
- Japanese (ja)
- Chinese - Simplified (zh-CN)
- Russian (ru)

---

## 💾 Data Persistence Strategy

FlowCash employs a robust persistence strategy:

1. **Serialization**: Clean conversion between application models and storage format
2. **Storage Abstraction**: Interface-based approach to storage operations
3. **Error Handling**: Comprehensive error recovery for storage failures
4. **Migration Support**: Version-aware data structure for future schema changes
5. **Backup & Recovery**: Export/import functionality for data protection

Data integrity is ensured through:
- Transaction-like operations where appropriate
- Data validation before storage
- Conflict resolution during import operations

---

## 🔧 Development Workflow

### Environment Setup

```bash
# Install development tools
npm install -g expo-cli

# Install project dependencies
yarn install
```

### Development Scripts

```bash
# Start development server
yarn start

# Run on iOS simulator
yarn ios

# Run on Android emulator
yarn android

# Run type checking
yarn typescript

# Run linting
yarn lint
```

### Best Practices

- **Commit Style**: Follow conventional commits (feat, fix, chore, etc.)
- **Code Reviews**: Required for all changes with a focus on:
  - Type safety
  - Component reusability
  - Performance considerations
  - Adherence to project architecture
- **Testing**: Unit tests for critical business logic

---

## 🔍 Future Roadmap

- [ ] **Cloud Sync**: Optional sync across devices
- [ ] **Budget Planning**: Set and track financial goals
- [ ] **Receipt Scanning**: OCR for automated transaction entry
- [ ] **Recurring Transactions**: Support for regular financial events
- [ ] **Financial Reports**: Advanced analytics and visualizations
- [ ] **Categories Management**: Custom transaction categorization
- [ ] **Dark Mode**: Full theme support with auto-switching
- [ ] **Biometric Authentication**: Extra security for sensitive data
- [ ] **Widgets**: Home screen quick access on supported platforms

---

## 🤝 Contributing

We welcome contributions from the community! Here's how to get started:

1. **Fork the repository**
2. **Create a feature branch**:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes** following our code style
4. **Write tests** for new functionality
5. **Submit a pull request** with a comprehensive description

Please review our Contributing Guidelines for detailed information.

---

## 📄 License

This project is licensed under the **MIT License** - see the LICENSE file for details.

---

## 👥 Development Team

- **Sergio Bonatto** - Lead Developer & Designer

---

## 📬 Contact & Support

Have questions, feedback, or issues? Open an issue on the [GitHub repository](https://github.com/sergiobonatto/flowcash).

For security concerns, please email directly rather than opening public issues.

---

<p align="center">
Built with ❤️ using React Native, TypeScript, and modern development practices.
</p>
