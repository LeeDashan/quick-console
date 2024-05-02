# Change Log

All notable changes to the "quick-console-log" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [0.2.0] - 2023.05.02
- 修复在复制内容中存在单/双引号时，输出内容未转义的问题
- 增加对于多光标（multiple cursor）的支持

## [0.1.0] - 2022.07.21

#### QuickLog 第一版开发完成
- 支持对于选中内容生成 `console.log` 到剪贴板
  - 需要使用快捷键：`ctrl+shift+c`
- 支持在光标所在行上方/下方插入 `console.log`
  - 上方插入需要使用快捷键：`ctrl+shift+u`
  - 下方插入需要使用快捷键：`ctrl+shift+b`
- 支持对于选中词替换成 `console.log` 
  - 需要使用快捷键：`ctrl+shift+v`
- 支持在指定位置插入 `console.log`
  - 需要使用快捷键：`ctrl+shift+v`

#### Feature

[ ] 支持自定义 `console.log` 方法名
[ ] 支持 `warn/error/debug` 类型的 log 输出
[x] 支持自定义单/双引号