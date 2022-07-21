declare namespace QuickConsole {
  /** Quick console 的系统配置 */
  interface IConfig {
    /**
     * console key 的前缀
     */
    prefixContent?: string
    /**
     * 是否显示 console 触发的行号
     */
    showLines?: boolean
    /**
     * 是否显示 console 触发的文件名
     */
    showFilename?: boolean
    /**
     * 是否显示调用 console 的 function name
     */
    showCallFunction?: boolean
  }

  /** 日志类型 */
  type LogType = "info" | "error" | "warn" | "debug"

  /** 插入行类型 */
  type LineType = "current" | "above" | "blow"
}
