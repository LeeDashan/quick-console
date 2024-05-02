import { getConfig } from './config'
import * as vscode from 'vscode'

const lineTypeMap: Record<QuickConsole.LineType, number> = {
  above: 1,
  current: 1,
  blow: 2,
}

export const getSafeText = (text: string) => {
  if (!text) { return '' }
  text = text.replace(/'/g, '\\\'').replace(/"/g, '\\\"').replace(/\n+/g, ' ').replace(/\s{2,}/g, ' ')
  return `- ${text}: `
}

/**
 * 获取 console.log 的文字部分
 * @param text 选中的文字
 * @param textEditor 文本编辑器
 * @returns
 */
export const getConsoleText = (
  text: string,
  fileName: string,
  selection: vscode.Selection,
  lineType: QuickConsole.LineType,
  lineNum: number
) => {
  const config = getConfig()
  const fileNameText = config.showFilename
    ? `- FileName: ${fileName}`
    : ''
  const lineNumber = config.showLines
    ? `- Line: ${(!text || selection.isEmpty
      ? lineNum
      : selection.start.line) + lineTypeMap[lineType]
    }`
    : ''
  const textContent = getSafeText(text)
  const content = `${config.prefixContent} ${fileNameText} ${lineNumber} ${textContent}`

  return content
}


/** 获取 console 的输出信息 */
export const getConsole = (
  text: string,
  textEditor: vscode.TextEditor,
  selection: vscode.Selection,
  options: {
    consoleFunc?: string
    line?: QuickConsole.LineType
    lineNum?: number
  } = {}
) => {
  const { consoleFunc, line = 'current', lineNum } = options
  const config = getConfig()
  const consoleFunction = consoleFunc ?? config.logFunction
  console.log('👉🏼👉🏼👉🏼 Look at this  - Line: 59 - consoleFunction: ', consoleFunction, consoleFunc, config.logFunction, config)

  if(!consoleFunction) {
    vscode.window.showErrorMessage('please set log function param in the settings.')
    return
  }
  const consoleText = getConsoleText(text, textEditor.document.fileName, selection, line, lineNum ?? selection.active.line)
  const _text = text ? `, ${text.replace(/(\n+$)/,'').replace(/\n+/g, ',')}` : ''
  const callFunc = config.showCallFunction
    ? ', new Error().stack?.split("\\n")[0]'
    : ''
  const consoleCmdText = `${consoleFunction}('${consoleText}'${_text}${callFunc})\r\n`

  return consoleCmdText
}

/** 判断是否是单行光标 */
export const isSingleCursor = (selections: readonly vscode.Selection[]) => {
  return selections.length === 1
}