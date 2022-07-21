import * as vscode from 'vscode'
import { getConfig } from './_utils/config'
import { insertToLine, replaceText } from './_utils/editorOperator'
import { getConsole } from './_utils/generator'

export const initConsoleTarget = (context: vscode.ExtensionContext) => {
  const consoleTarget = vscode.commands.registerTextEditorCommand(
    'quick-console-code.consoleTarget',
    async (textEditor) => {
      // 获取选中的文本
      const selectedText = textEditor.document.getText(textEditor.selection)
      // 生成一个新的信息插入
      let consoleText = getConsole(selectedText, textEditor)
      if (!selectedText) {
        const _text = await vscode.env.clipboard.readText()
        const config = getConfig()
        if (config.prefixContent && _text.startsWith(config.prefixContent)) {
          // 在剪贴板里已经找到信息，则使用剪贴板信息直接插入
          consoleText = _text
        }
        insertToLine(textEditor, consoleText, textEditor.selection.active.line)
      } else {
        replaceText(textEditor, consoleText)
      }
    }
  )
  context.subscriptions.push(consoleTarget)
}

export const initConsoleAbove = (context: vscode.ExtensionContext) => {
  const consoleAbove = vscode.commands.registerTextEditorCommand(
    'quick-console-code.consoleAbove',
    (textEditor) => {
      const consoleText = getConsole('', textEditor, {
        line: 'above',
      })
      insertToLine(textEditor, consoleText, textEditor.selection.active.line)
    }
  )
  context.subscriptions.push(consoleAbove)
}

export const initConsoleBlow = (context: vscode.ExtensionContext) => {
  const consoleBlow = vscode.commands.registerTextEditorCommand(
    'quick-console-code.consoleBlow',
    (textEditor) => {
      const consoleText = getConsole('', textEditor, {
        line: 'blow',
      })
      insertToLine(
        textEditor,
        consoleText,
        textEditor.selection.active.line + 1
      )
    }
  )
  context.subscriptions.push(consoleBlow)
}
