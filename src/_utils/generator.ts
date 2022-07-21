import { getConfig } from './config'
import * as vscode from 'vscode'

const lineTypeMap: Record<QuickConsole.LineType, number> = {
  above: 1,
  current: 1,
  blow: 2,
}

/**
 * 获取 console.log 的文字部分
 * @param text 选中的文字
 * @param textEditor 文本编辑器
 * @returns
 */
export const getConsoleText = (
  text: string,
  textEditor: vscode.TextEditor,
  lineType: QuickConsole.LineType
) => {
  const config = getConfig()
  const fileName = config.showFilename
    ? `- FileName: ${textEditor.document.fileName}`
    : ''
  const lineNumber = config.showLines
    ? `- Line: ${
        (!text || textEditor.selection.isEmpty
          ? textEditor.selection.active.line
          : textEditor.selection.start.line) + lineTypeMap[lineType]
      }`
    : ''
  const textContent = text ? `- ${text}: ` : ''
  const content = `${config.prefixContent} ${fileName} ${lineNumber} ${textContent}`

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
  options: {
    type?: QuickConsole.LogType
    line?: QuickConsole.LineType
  } = {}
) => {
  const { type = 'info', line = 'current' } = options
  const config = getConfig()
  const consoleFunc = consoleMap[type]
  const consoleText = getConsoleText(text, textEditor, line)
  const _text = text ? `, ${text}` : ''
  const callFunc = config.showCallFunction
    ? ', new Error().stack?.split("\\n")[0]'
    : ''
  // console.log(xxxx - [text], text, 'called function')
  const console = `${consoleFunc}('${consoleText}'${_text}${callFunc})\r\n`

  return console
}
