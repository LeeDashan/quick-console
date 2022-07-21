import * as vscode from 'vscode'

export const getConfig = (): QuickConsole.IConfig => {
  const config: vscode.WorkspaceConfiguration =
    vscode.workspace.getConfiguration('quickConsole')

  /** console key 的前缀 */
  const prefixContent = config.get<string>('prefixContent')
  /** 是否显示 console 触发的行号 */
  const showLines = config.get<boolean>('showLines')
  /** 是否显示 console 触发的文件名 */
  const showFilename = config.get<boolean>('showFilename')
  /** 是否显示调用 console 的 function name */
  const showCallFunction = config.get<boolean>('showCallFunction')

  return {
    prefixContent,
    showLines,
    showFilename,
    showCallFunction,
  }
}
