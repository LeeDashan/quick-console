import * as vscode from 'vscode'
import { getOrderedSelections, insertToLine, saveToClipBoard } from './_utils/editorOperator'
import { getConsole } from './_utils/generator'
import { getConfig } from './_utils/config'

/** 注册 secondLogTarget 命令 */
export const initSecondLogTarget = (context: vscode.ExtensionContext) => {
    const secondLogTarget = vscode.commands.registerTextEditorCommand(
        'quick-console-code.secondLogTarget',
        (textEditor) => {
            const config = getConfig()
            if (!config.secondLogFunction) {
                vscode.window.showErrorMessage('Please set the second log function param in the settings.')
                return
            }
            textEditor.edit((editor) => {
                getOrderedSelections(textEditor).forEach(({ selection }, index) => {
                    // 获取选中的文本
                    const selectedText = textEditor.document.getText(selection)
                    // 生成一个新的信息插入下方
                    const consoleText = getConsole(selectedText, textEditor, selection, {
                        consoleFunc: config.secondLogFunction,
                        line: 'blow',
                        lineNum: selection.active.line + index
                    })
                    if (!consoleText) {
                        return
                    }
                    insertToLine(textEditor, editor, selection.active.line + 1, consoleText)
                })
            })
        }
    )
    context.subscriptions.push(secondLogTarget)
}
