<img src="./app-icon.png" alt="Lunar Icon" style="width: 100px; height: 100px;"/>

# Lunar: Your AI Desktop Companion 🚀

Lunar is your personal AI assistant, designed to bring the power of AI models right to your desktop. 🤖 It provides a seamless and intuitive interface for interacting with AI, making it easier than ever to harness their capabilities.

**Created by:** Tawananyasha Mukoriwo, Software Engineer

**Fun Fact:** Lunar is named after my first AI assistant project, built when I was just 17! This is Lunar 2.0, a complete reimagining with a focus on simplicity and user experience. ✨

## Concept

Lunar is designed to be your personal AI companion, with Ollama models acting as the engine. 🧠 It provides a user-friendly interface to interact with these models, abstracting away the complexities of running AI locally.

## Key Features

* **Intuitive Interface:** A user-friendly design for effortless interaction with AI models. 🖱️
* **Offline Functionality:** Lunar operates entirely offline, ensuring your data stays private and secure. 🔒
* **Ollama Integration:** Seamlessly integrates with Ollama to run AI models locally. 🤝

## Tech Stack

* **React:** A JavaScript library for building user interfaces. ⚛️
* **TypeScript:** A superset of JavaScript that adds static typing. ⌨️
* **Vite:** A build tool that provides a fast and efficient development experience. ⚡
* **Tauri:** A framework for building desktop applications using web technologies. 🖥️

## Prerequisites

Before using Lunar, ensure you have the following installed:

* **Ollama:** Lunar relies on Ollama to run AI models. Download and install it from [https://ollama.com/](https://ollama.com/). 🐳

## Installation and Usage

### Releases

Download the latest pre-built releases for your operating system from [insert link to releases here].

### Building from Source

1. Clone the repository:

    ```bash
    git clone https://github.com/TawanaState/lunar
    cd lunar
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Run the app in development mode:

    ```bash
    npm run tauri dev
    ```

4. Build the app for production:

    ```bash
    npm run tauri build
    ```

    The built application will be available in the `src-tauri/target/release/bundle` directory.

## Using Models

Lunar automatically detects models pulled by Ollama([https://ollama.com/library/](https://ollama.com/library/)). To get started, pull models like `gemma`, `phi`, or `deepseek` using Ollama:

```bash
ollama pull gemma3:1b
ollama pull phi4-mini
ollama pull deepseek-r1:1.5b
```

These models will then be available within the Lunar interface. 🚀

**Future Feature** : In future versions, you'll be able to pull models directly from within the Lunar app! 🤩

## Contributing

Lunar is an open-source project, and contributions are welcome! 🎉 If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them with descriptive messages.
4. Submit a pull request.

## License

Lunar is released under the MIT License. 📜
