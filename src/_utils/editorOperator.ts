import * as vscode from 'vscode'

/** 保存到剪贴板 */
export const saveToClipBoard = (value: string) => {
  vscode.env.clipboard.writeText(value)
}

/** 插入到某一行 */
export const insertToLine = (
  textEditor: vscode.TextEditor,
  value: string,
  line: number
) => {
  const targetLine = textEditor.document.lineAt(line)

  const whiteSpaces = /^(\u0020)+/.exec(targetLine.text)?.[0]

  // targetLine.firstNonWhitespaceCharacterIndex
  // const start = targetLine.firstNonWhitespaceCharacterIndex
  // const newLinePos = textEditor.document.

  // vscode.window.showInformationMessage("newLinePos：" )

  textEditor.edit((editor) => {
    editor.insert(targetLine.range.start, (whiteSpaces ?? '') + value)
  })
}

/** 替换目标内容 */
export const replaceText = (textEditor: vscode.TextEditor, value: string) => {
  textEditor.edit((editor) => {
    editor.replace(textEditor.selection, value)
  })
}
