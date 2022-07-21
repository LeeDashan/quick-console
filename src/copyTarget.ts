import * as vscode from 'vscode'
import { saveToClipBoard } from './_utils/editorOperator'
import { getConsole } from './_utils/generator'

/** 注册 copyTarget 命令 */
export const initCopyTarget = (context: vscode.ExtensionContext) => {
  const copyTarget = vscode.commands.registerTextEditorCommand(
    'quick-console-log.copyTarget',
    (textEditor) => {
      // 获取选中的文本
      const copyText = textEditor.document.getText(textEditor.selection)
      // 生成 console 的文本
      const consoleText = getConsole(copyText, textEditor)
      // 保存到剪贴板
      saveToClipBoard(consoleText)
    }
  )
  context.subscriptions.push(copyTarget)
}
