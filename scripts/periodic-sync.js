#!/usr/bin/env node

import { exec } from "node:child_process";
import { promisify } from "node:util";

const execAsync = promisify(exec);

const args = process.argv.slice(2);
const separatorIndex = args.indexOf("--");

if (separatorIndex === -1 || separatorIndex === args.length - 1) {
  console.error(
    "Usage: node <nodeScriptPath> [--interval=<milliseconds>] -- <bashScriptPath> [bashArgs...]",
  );
  process.exit(1);
}

const nodeArgs = args.slice(0, separatorIndex);
const bashArgs = args.slice(separatorIndex + 1);

// Extract interval from Node.js arguments
const intervalArg = nodeArgs.find((arg) => arg.startsWith("--interval="));
const interval = intervalArg ? Number.parseInt(intervalArg.split("=")[1], 10) : 600_000;

const bashScriptPath = bashArgs[0];
const bashScriptArgs = bashArgs.slice(1).join(" ");

/** @type AbortController | undefined */
let controller = undefined;

const runBashScript = async () => {
  try {
    if (controller) {
      console.log("Aborting previous command...");
      controller.abort();
    }

    controller = new AbortController();
    const { signal } = controller;

    console.log(`Running command: ${bashScriptPath} ${bashScriptArgs}`);

    const { stdout, stderr } = await execAsync(`${bashScriptPath} ${bashScriptArgs}`, {
      signal,
    });

    if (stdout) console.log(`Bash script output:\n${stdout}`);
    if (stderr) console.error(`Bash script error:\n${stderr}`);
  } catch (error) {
    if ("AbortError" === error.name) {
      console.warn("Command aborted");
    } else {
      console.error(`Error executing bash script: ${error.message}`);
    }
  }
};

// Run immediately
runBashScript();

// Schedule periodic execution
const intervalId = setInterval(runBashScript, interval);

process.on("SIGINT", () => {
  console.log("Stopping periodic execution...");
  controller?.abort();
  clearInterval(intervalId);
  process.exit();
});
