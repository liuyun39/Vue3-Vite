'use strict';

module.exports = {

  types: [
    {
      value: ':construction: WIP',
      name : '🚧 WIP: 工作正在进行中'
    },
    {
      value: ':sparkles: feat',
      name : '✨ feat: 新功能'
    },
    {
      value: ':bug: fix',
      name : '🐛 fix: 修复bug'
    },
    {
      value: ':recycle: refactor',
      name : '♻️ refactor: 重构'
    },
    {
      value: ':memo: docs',
      name : '📝 docs: 添加或更新文档'
    },
    {
      value: ':test_tube: test',
      name : '🧪  test: 添加测试'
    },
    {
      value: ':package: chore',
      name : '📦️ chore: 构建/工程依赖/工具'
    },
    {
      value: ':lipstick: style',
      name : '💄 style: 修改样式'
    },
    {
      value: ':rewind: revert',
      name : '⏪️ revert: 还原更改'
    }
  ],

  messages: {
    type: '请选择提交类型(必填)',
    customScope: '请输入文件修改范围(可选)',
    subject: '请简要描述提交(必填)',
    body: '请输入详细描述(可选)',
    breaking: '列出任何BREAKING CHANGES(可选)',
    footer: '请输入要关闭的issue(可选)',
    confirmCommit: '确定提交此说明吗？'
  },
  allowCustomScopes: true,
  allowBreakingChanges: ["feat", "fix"],
  subjectLimit: 100
};
