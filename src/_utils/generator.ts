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

/**
 * console 的类型枚举
 * todo: 后期会改成读取配置
 */
const consoleMap: Record<QuickConsole.LogType, string> = {
  info: 'console.log',
  error: 'console.error',
  warn: 'console.warn',
  debug: 'console.debug',
}

/** 获取 console 的输出信息 */
export const getConsole = (
  text: string,
  textEditor: vscode.TextEditor,
  selection: vscode.Selection,
  options: {
    type?: QuickConsole.LogType
    line?: QuickConsole.LineType
    lineNum?: number
  } = {}
) => {
  const { type = 'info', line = 'current' } = options
  const config = getConfig()
  const consoleFunc = consoleMap[type]
  const consoleText = getConsoleText(text, textEditor.document.fileName, selection, line, options.lineNum ?? selection.active.line)
  const _text = text ? `, ${text.replace(/(\n+$)/,'').replace(/\n+/g, ',')}` : ''
  const callFunc = config.showCallFunction
    ? ', new Error().stack?.split("\\n")[0]'
    : ''
  const console = `${consoleFunc}('${consoleText}'${_text}${callFunc})\r\n`

  return console
}

/** 判断是否是单行光标 */
export const isSingleCursor = (selections: readonly vscode.Selection[]) => {
  return selections.length === 1
}