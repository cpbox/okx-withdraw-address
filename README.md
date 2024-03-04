# OKX 批量添加白名单提现地址

对比其他 CEX，目前 OKX 支持直接提现的链确实很多，方便好用。

😳 但有个问题，每次提现（不论手工还是 API），都需要繁琐的邮箱+SMS 认证，费时费力

如果在页面添加白名单提现地址，并勾选免认证，则可以实现无须认证、快速提现。

## 💡 使用方法:

- 修改代码中的 wallet_address_csv 部分为你自己的地址和对应备注信息
- 打开 [Okx 提币地址页面](https://www.okx.com/cn/balance/withdrawal-address/eth/2)（这里以 eth 地址举例）
- 点击新增提币地址的按钮，弹出框出现
- 复制粘贴修改后的代码
- Okx 限定每次最多增加 20 个地址，如果你需要添加 50 地址，需要手动刷新页面，修改 address 列表，重复 3 次操作
- 等待脚本运行完毕后手动输入验证码完成后续动作

## ❗️ 提醒：

- 注意安全
- 请自行查看源代码，确保你理解代码在做什么
