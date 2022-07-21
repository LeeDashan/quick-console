/// <reference path="./extension.d.ts" />
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode'
import {
  initConsoleAbove,
  initConsoleBlow,
  initConsoleTarget,
} from './consoleTarget'
import { initCopyTarget } from './copyTarget'

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // 注册命令
  initCopyTarget(context)
  initConsoleTarget(context)
  initConsoleAbove(context)
  initConsoleBlow(context)
}

// this method is called when your extension is deactivated
export function deactivate() {}
