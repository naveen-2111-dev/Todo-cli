# taskify-cli

`taskify-cli` is a command-line interface (CLI) tool to manage your to-do list with SQL-like syntax. With this tool, you can create, fetch, and manage your taskifys directly from the terminal using commands inspired by SQL queries.

## Table of Contents

- [taskify-cli](#taskify-cli)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Commands](#commands)
  - [Contributing](#contributing)
    - [Ideas for Contribution](#ideas-for-contribution)
    - [How to Contribute](#how-to-contribute)

## Installation

To install `taskify-cli` globally on your system, run the following command:

```bash
npm install -g taskify-cli
```

```bash
pnpm add -g taskify-cli
```

## Usage

Once installed, you can use the taskify-cli to manage your to-do list. Below are the available commands:

### Commands

### **creates a new todo**
create-todo <taskifyName> <headers> <values>
Creates a new to-do item with the specified headers and values.

taskifyName (string): The name of the to-do list.<br/>
headers (comma-separated list): The column headers (e.g., "title, description, dueDate").<br/>
values (comma-separated list): The corresponding values for the headers (e.g., "Buy groceries, Milk, 2025-01-30").<br/>

```bash
taskify-cli create-todo "Buy Groceries" "title, description, dueDate" "Buy vegetables, Milk, 2025-01-30"
```

This will create a new to-do item with the provided headers and values.

### **fetches from a particular todo**<br/>
Fetches a particular to-do by its name from the Local database.
todo-name/title (string): The name of the to-do you want to fetch.

```bash
taskify-cli select "Buy Groceries" from cli
```

### **fetch all**
choose $ from cli

```bash
taskify-cli choose $ from cli
```

## Contributing

We welcome contributions from developers! The `taskify-cli` project is actively evolving, and there are many features that can still be added. If you're an interested developer, you can help by adding new features, fixing bugs, improving documentation, or enhancing existing functionalities.

### Ideas for Contribution

Here are a few areas where contributions are welcome:

- **Enhanced taskify Commands**: Add more commands such as `update-todo`, `delete-todo`, etc., for better to-do list management.
- **Data Persistence**: Implement options for saving to-dos in different formats, such as JSON or a cloud-based database.
- **Error Handling**: Improve error messages and handling for a more robust user experience.
- **Help and Documentation**: Improve the documentation by adding more examples and better explanations for new users.

### How to Contribute

1. **Fork the repository**  
   Click the "Fork" button in the top right corner of the repository to create a copy of the project under your own GitHub account.

   ![Fork Repository](https://github.com/naveen-2111-dev/taskify-cli.git)  
   *Illustration showing how to fork the repository.*

2. **Clone your fork**  
   Use the following command to clone your fork to your local machine:
   
   ```bash
   git clone https://github.com/your-username/taskify-cli.git
