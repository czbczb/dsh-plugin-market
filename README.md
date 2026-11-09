# dsh-plugin-market · czbczb 的 DSH 插件索引

[DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) 的社区插件市场索引（format 1）。
DSH 没有去中心化的官方市场：任何人都可以发布一个索引源，用户自行添加。本仓库就是 czbczb 的索引源。

## 用户：添加这个索引源

DSH → 侧边栏「设置」→「插件」→「发现（Discover）」→「索引源」→ 添加：

```
https://raw.githubusercontent.com/czbczb/dsh-plugin-market/main/index.json
```

注意：Host 拒绝重定向，请填最终 URL（raw.githubusercontent.com 直连可用；jsDelivr 也可以，但缓存刷新慢）。

添加后在「发现」里即可搜索、查看并一键安装本索引收录的插件。

## 收录的插件

| 插件 | 说明 |
|---|---|
| [dsh-wechat](https://github.com/czbczb/dsh-wechat-plugin) | 微信接入：官方 ClawBot 通道（iLink Bot API），扫码绑定后把微信消息路由到 agent 会话并回复 |

## 维护者：发布流程

### 收录新插件 / 发布新版本

1. 插件仓库侧：确认 `package.json` 的 `name`/`version` 合法（精确 SemVer），`dsh.bundle.patch` 指向有效，commit 并 push。
2. 编辑本仓库 `index.json`，在该插件的 `versions` 数组里**追加**一条（不要改旧条目）：
   - `version`：精确 SemVer，不带 `v` 前缀
   - `publishTimestamp`：Unix **秒**（`git log -1 --format=%ct <commit>`）
   - `source`：`{ "type": "git", "url": "https://github.com/<owner>/<repo>", "commit": "<40 位小写 SHA>" }`
   - `engines.dsh`：SemVer range，如 `>=0.2.1-0 <0.3.0`
3. 校验：

   ```sh
   npm install
   npm run validate
   ```

4. push 到 main。用户端在「发现」里刷新即可看到（索引缓存 10 分钟）。

### 格式要点（官方校验器规则）

- `format` 是**数字** `1`；索引级 `title` 必填，`title`/`description` 的对象形式必须含 `en`
- 同一索引里插件 `name` 不得重复；`metadata.category`/`labels` 必须引用索引级 `metadata` 里声明过的 id
- `source.type: "git"` 的 `url` 必须是规范化 https（无 query/fragment、至少两段路径、非 tarball）
- `icon` 可用 `data:` URL（解码后 ≤ 32 KiB）、相对索引 URL 的引用，或 https 绝对 URL

规则实现见官方包 [`@deepseek-ai/dsh-plugin-market-index`](https://www.npmjs.com/package/@deepseek-ai/dsh-plugin-market-index)。

## License

[MIT](./LICENSE)
