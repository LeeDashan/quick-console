import * as vscode from 'vscode'

export const getOrderedSelections = (textEditor: vscode.TextEditor) => {
  return textEditor.selections.map((s) => ({
    line: s.end.line,
    selection: s
  })).sort(((pre, after) => pre.line - after.line))
}

/** 保存到剪贴板 */
export const saveToClipBoard = (value: string) => {
  vscode.env.clipboard.writeText(value)
}

/** 插入到某一行 */
export const insertToLine = (
  textEditor: vscode.TextEditor,
  editor: vscode.TextEditorEdit,
  line: number,
  value: string
) => {
  let insertPosition: vscode.Position | undefined = undefined
  let whiteSpaces: string | undefined = undefined
  try {
    const targetLine = textEditor.document.lineAt(line)

    whiteSpaces = /^(\u0020)+/.exec(targetLine.text)?.[0]
    insertPosition = targetLine.range.start
  } catch (err) {
    if (line - 1 >= 0) {
      const preLine = textEditor.document.lineAt(line - 1)
      editor.insert(preLine.range.end, '\n')
    }
    insertPosition = new vscode.Position(line, 0)
  }

  editor.insert(insertPosition, (whiteSpaces ?? '') + value)
}

/** 替换目标内容 */
export const replaceText = (
  editor: vscode.TextEditorEdit,
  selection: vscode.Selection,
  value: string) => {
  editor.replace(selection, value)
}
