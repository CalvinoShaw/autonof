# 🚀 下一步：部署完整的NOFX交易系统

## 当前状态

✅ **已完成**：
- 前端已部署到GitHub Pages：https://CalvinoShaw.github.io/autonof/
- 可以查看项目介绍、功能说明
- TA-Lib已安装
- 配置文件已准备

❌ **无法使用**：
- 注册/登录功能（需要后端API）
- AI交易功能（需要后端服务）
- 交易所连接（需要后端处理）
- 实时数据（需要后端WebSocket）

## 🎯 三种部署方案

### 方案一：云服务器部署（推荐）⭐⭐⭐⭐⭐

最简单且最适合长期运行的方案。

#### 1. 选择云服务商
- **阿里云**：https://www.aliyun.com/
- **腾讯云**：https://cloud.tencent.com/
- **AWS**：https://aws.amazon.com/
- **Vultr**：https://www.vultr.com/

#### 2. 服务器配置要求
```
- CPU: 2核或以上
- 内存: 4GB或以上
- 存储: 20GB SSD
- 操作系统: Ubuntu 22.04 LTS
- 网络: 至少5Mbps带宽
```

#### 3. 快速部署步骤

**步骤1：连接服务器**
```bash
ssh root@your-server-ip
```

**步骤2：安装Docker（推荐）**
```bash
# 安装Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# 安装Docker Compose
sudo apt-get update
sudo apt-get install docker-compose-plugin
```

**步骤3：部署NOFX**
```bash
# 克隆项目
git clone https://github.com/NoFxAiOS/nofx.git
cd nofx

# 配置文件
cp config.json.example config.json
# 编辑config.json，配置基本设置

# 启动服务
./start.sh start --build

# 查看日志
./start.sh logs
```

**步骤4：配置防火墙**
```bash
# 开放端口
sudo ufw allow 3000   # 前端
sudo ufw allow 8080   # 后端API
sudo ufw enable
```

**步骤5：访问系统**
```
前端：http://your-server-ip:3000
后端：http://your-server-ip:8080
```

#### 4. 配置域名（可选）
- 在域名提供商处添加A记录指向服务器IP
- 使用Nginx反向代理
- 配置SSL证书（Let's Encrypt）

---

### 方案二：本地服务器部署 ⭐⭐⭐⭐

适合在本地电脑或内网服务器上运行。

#### 问题：Go版本不兼容
当前系统：Go 1.24.7
项目要求：Go 1.25.0+

#### 解决方案A：升级Go版本

```bash
# 1. 下载Go 1.25.3
cd /tmp
wget https://go.dev/dl/go1.25.3.linux-amd64.tar.gz

# 2. 删除旧版本并安装新版本
sudo rm -rf /usr/local/go
sudo tar -C /usr/local -xzf go1.25.3.linux-amd64.tar.gz

# 3. 验证安装
go version  # 应该显示 go1.25.3

# 4. 返回项目目录
cd /home/user/autonof/nofx

# 5. 安装依赖
go mod download

# 6. 构建后端
CGO_ENABLED=1 go build -o nofx-server .

# 7. 构建前端
cd web
npm install
npm run build
cd ..

# 8. 启动后端
./nofx-server &

# 9. 启动前端（开发模式）
cd web
npm run dev
```

#### 解决方案B：使用Docker

```bash
cd /home/user/autonof/nofx

# 安装Docker（如果网络允许）
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# 使用Docker部署
./start.sh start --build

# 访问
# 前端：http://localhost:3000
# 后端：http://localhost:8080
```

---

### 方案三：仅本地后端 + GitHub Pages前端 ⭐⭐⭐

将后端运行在本地，前端继续使用GitHub Pages。

#### 步骤1：修改前端API配置

需要修改前端代码，让它连接到本地后端：

```bash
cd /home/user/autonof/nofx/web/src/lib
```

编辑 `api.ts`：
```typescript
// 修改这一行
const API_BASE = '/api';

// 改为
const API_BASE = 'http://localhost:8080/api';
```

#### 步骤2：配置CORS

编辑后端，允许跨域请求（从GitHub Pages访问）。

#### 步骤3：启动本地后端

```bash
cd /home/user/autonof/nofx
# 升级Go后
./nofx-server
```

#### 步骤4：访问

- 前端：https://CalvinoShaw.github.io/autonof/
- 后端：http://localhost:8080

**注意**：这个方案只适合本地测试，外网无法访问。

---

## 🔧 配置交易系统

无论选择哪个方案，部署后都需要进行以下配置：

### 1. 访问Web界面

首次访问会看到配置向导：

```
http://your-server:3000
或
http://localhost:3000
```

### 2. 配置AI模型

需要至少一个AI模型的API密钥：

**DeepSeek**（推荐，性价比高）
- 官网：https://platform.deepseek.com/
- 注册并获取API Key
- 价格：约 ¥1/百万tokens

**通义千问 (Qwen)**
- 官网：https://dashscope.aliyun.com/
- 阿里云账号注册
- 有免费额度

**Claude**（可选）
- 官网：https://console.anthropic.com/
- 需要信用卡

### 3. 配置交易所

**Binance**（推荐新手）
- 注册：https://www.binance.com/
- 创建API密钥
- 启用合约交易
- **重要**：先使用模拟盘测试！

**Hyperliquid**（去中心化）
- 只需要以太坊钱包私钥
- 支持主网和测试网

### 4. 创建交易员

在Web界面中：
1. 点击"AI交易员"标签
2. 点击"创建新交易员"
3. 选择AI模型 + 交易所组合
4. 配置交易参数：
   - 杠杆倍数
   - 最大持仓
   - 风险限制
5. 启动交易员

### 5. 监控和调整

- 查看实时权益曲线
- 监控AI决策日志
- 调整风险参数
- 随时停止/启动交易

---

## ⚠️ 重要提示

### 资金安全

1. **先用模拟盘**：熟悉系统后再用真金
2. **小额测试**：初期只投入可以承受的损失金额
3. **风控设置**：
   - 设置每日最大亏损
   - 设置最大回撤限制
   - 限制单笔交易金额

### 系统安全

1. **API密钥管理**：
   - 不要分享给他人
   - 定期更换
   - 限制IP白名单

2. **服务器安全**：
   - 使用防火墙
   - 定期更新系统
   - 使用SSH密钥认证

3. **数据备份**：
   - 定期备份 `config.db`
   - 保存重要配置

---

## 📊 性能优化

### 1. 系统资源

```bash
# 查看系统资源使用
docker stats  # Docker方式
top           # 直接运行

# 如果内存不足，考虑：
- 减少同时运行的交易员数量
- 增加服务器内存
```

### 2. 网络优化

```bash
# 测试到交易所的延迟
ping api.binance.com
ping api.hyperliquid.xyz

# 延迟建议：
- < 50ms：优秀
- 50-100ms：良好
- > 100ms：考虑更换服务器位置
```

### 3. 数据库优化

```bash
# 定期清理旧数据
sqlite3 config.db "DELETE FROM decisions WHERE timestamp < datetime('now', '-30 days');"
```

---

## 🎓 学习资源

### 官方文档
- 项目README：`/home/user/autonof/nofx/README.md`
- 架构文档：`/home/user/autonof/nofx/docs/architecture/`
- 部署指南：`/home/user/autonof/DEPLOYMENT_GUIDE.md`

### 社区
- Telegram开发者群：https://t.me/nofx_dev_community
- GitHub Issues：https://github.com/NoFxAiOS/nofx/issues
- Twitter：[@nofx_ai](https://x.com/nofx_ai)

---

## 🚦 推荐的学习路线

### 阶段1：熟悉系统（1-3天）
1. 部署到本地或云服务器
2. 配置模拟账户
3. 创建测试交易员
4. 观察AI决策过程

### 阶段2：小额实盘（1-2周）
1. 使用真实账户
2. 投入100-500 USDT
3. 测试不同AI模型
4. 调整风险参数

### 阶段3：正式运行（持续）
1. 根据表现逐步增加资金
2. 优化交易策略
3. 监控系统稳定性
4. 定期回顾和调整

---

## 💡 常见问题

### Q: 需要多少启动资金？
A: 建议至少100 USDT用于测试，1000+ USDT用于正式交易。

### Q: 能保证盈利吗？
A: 不能。这是实验性系统，存在亏损风险。

### Q: 需要一直开着电脑吗？
A: 使用云服务器可以24/7运行；本地部署需要电脑保持运行。

### Q: 支持哪些交易品种？
A: 目前支持加密货币合约交易（BTC、ETH、SOL等）。

### Q: AI会学习和改进吗？
A: 是的，系统会从历史表现中学习，自动优化决策。

---

## 📞 获取帮助

如果遇到问题：

1. 查看日志：
   ```bash
   ./start.sh logs           # Docker方式
   tail -f nofx-server.log   # 直接运行
   ```

2. 检查配置：
   ```bash
   cat config.json
   sqlite3 config.db ".tables"
   ```

3. 寻求帮助：
   - GitHub Issues
   - Telegram群
   - 查看文档

---

**创建时间**：2025-11-03
**当前状态**：前端已部署，等待后端部署
**推荐方案**：云服务器 + Docker部署
