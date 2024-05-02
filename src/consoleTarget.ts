import * as vscode from 'vscode'
import { getConfig } from './_utils/config'
import { getOrderedSelections, insertToLine, replaceText } from './_utils/editorOperator'
import { getConsole, isSingleCursor } from './_utils/generator'

export const initConsoleTarget = (context: vscode.ExtensionContext) => {
  const consoleTarget = vscode.commands.registerTextEditorCommand(
    'quick-console-code.consoleTarget',
    (textEditor) => {
      textEditor.edit((editor) => {
        getOrderedSelections(textEditor).forEach(({ selection }, index) => {
          // 获取选中的文本
          const selectedText = textEditor.document.getText(selection)
          // 生成一个新的信息插入
          const consoleText = getConsole(selectedText, textEditor, selection, {
            lineNum: selection.active.line + index
          })
          if (!consoleText) {
            return
          }
          if (selection.isEmpty) {
            insertToLine(textEditor, editor, selection.active.line, consoleText)
          } else {
            replaceText(editor, selection, consoleText)
          }
        })
      })
    }
  )
  context.subscriptions.push(consoleTarget)
}

export const initConsoleAbove = (context: vscode.ExtensionContext) => {
  const consoleAbove = vscode.commands.registerTextEditorCommand(
    'quick-console-code.consoleAbove',
    (textEditor) => {
      textEditor.edit((editor) => {
        getOrderedSelections(textEditor).forEach(({ selection }, index) => {
          const consoleText = getConsole('', textEditor, selection, {
            line: 'above',
            lineNum: selection.active.line + index
          })
          if (!consoleText) {
            return
          }
          insertToLine(textEditor, editor, selection.active.line, consoleText)
        })

      })
    }
  )
  context.subscriptions.push(consoleAbove)
}

export const initConsoleBlow = (context: vscode.ExtensionContext) => {
  const consoleBlow = vscode.commands.registerTextEditorCommand(
    'quick-console-code.consoleBlow',
    (textEditor) => {
      let lineBuff = 1
      textEditor.edit((editor) => {
        getOrderedSelections(textEditor).forEach(({ selection }, index) => {
          const consoleText = getConsole('', textEditor, selection, {
            line: 'blow',
            lineNum: selection.active.line + index
          })
          if (!consoleText) {
            return
          }
          insertToLine(
            textEditor,
            editor,
            selection.active.line + lineBuff,
            consoleText
          )
        })
      })
    }
  )
  context.subscriptions.push(consoleBlow)
}
