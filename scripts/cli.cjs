#!/usr/bin/env node

const { Command } = require("commander");
const { InserData, FetchData, FetchAllData } = require("../lib/connect.cjs");
const { log } = require("console");
var count = 0;

const program = new Command();

/**
 * CLI Setup for todo-cli
 * @description Initializes the todo-cli program with commands and versions
 * @returns {void}
 */
program
  .name("todo-cli")
  .description("A CLI for managing a to-do list with SQL-like syntax")
  .version("1.0.0");

/**
 * Creates a new to-do in the database.
 * @command create-todo <todoName> <headers> <values>
 * @param {string} todoName - The name of the to-do to create.
 * @param {string} headers - A comma-separated list of headers (e.g., "priority, dueDate").
 * @param {string} values - A comma-separated list of values corresponding to the headers (e.g., "high, tomorrow").
 * @returns {void} Logs success or error messages.
 */
program
  .command("create-todo <todoName> <headers> <values>")
  .description("Creates a new todo")
  .action(async (todoName, headers, values) => {
    count++;
    const chalk = await import("chalk");

    if (!headers.trim() || !values.trim()) {
      log(chalk.default.red("Error: Headers or values cannot be empty."));
      return;
    }

    headers = headers.split(",").map((item) => item.trim());
    values = values.split(",").map((item) => item.trim());

    // Check for mismatch in header and value lengths
    if (headers.length !== values.length) {
      log(
        chalk.default.red(
          "Error: The number of headers does not match the number of values."
        )
      );
      return;
    }

    // Check for empty headers or values
    if (headers.length === 0 || values.length === 0) {
      log(chalk.default.red("Error: Headers or values cannot be empty."));
      return;
    }

    // Create new to-do object
    let newTodo = { todoName };
    headers.forEach((header, index) => {
      newTodo[header] = values[index];
    });

    // Insert data into the database
    InserData(newTodo);

    // Log success message with count
    log(chalk.default.blue(`Todo created ${count} at home/todo-cli`));
  });

/**
 * Fetches a particular to-do by name.
 * @command select <todoname> from cli
 * @param {string} todoName - The name of the to-do to fetch from the database.
 * @returns {void} Logs the fetched data or an error message if no data is found.
 */
program
  .command("select <todoname> from cli")
  .description("fetches a particular todo")
  .action(async (todoName) => {
    const chalk = await import("chalk");

    // Ensure todoName is provided
    if (!todoName) {
      log(chalk.default.red("Error: Todo name cannot be empty."));
      return;
    }
    try {
      // Fetch data from the database
      const res = await FetchData(todoName);
      if (res) {
        console.table(res); // Log data if found
      } else {
        log(chalk.default.red(`No todo found with the name: ${todoName}`));
      }
      log(chalk.default.yellowBright(`Data fetched successfully`));
    } catch (err) {
      log(chalk.default.red(`Error fetching data: ${err.message}`)); // Handle errors
    }
  });

/**
 * Fetches all to-dos from the database.
 * @command choose $ from cli
 * @returns {void} Logs all to-dos or an error message if no data is found.
 */
program
  .command("choose $ from cli")
  .description("fetches a particular todo")
  .action(async () => {
    const chalk = await import("chalk");
    try {
      // Fetch all data from the database
      const res = await FetchAllData();
      if (res) {
        console.table(res); // Log data if found
      } else {
        log(chalk.default.red("No todos found in the database."));
      }
      log(chalk.default.yellowBright(`Data fetched successfully`));
    } catch (err) {
      log(chalk.default.red(`Error fetching data: ${err.message}`)); // Handle errors
    }
  });

/**
 * Parses the command-line arguments and runs the CLI commands.
 * @returns {void}
 */
program.parse(process.argv);
