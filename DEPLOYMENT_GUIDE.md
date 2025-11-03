# NOFX 本地部署指南

## 项目概述
- **项目名称**: NOFX - AI Trading Operating System
- **源仓库**: https://github.com/NoFxAiOS/nofx
- **项目位置**: `/home/user/autonof/nofx`

## 系统环境检查结果

### ✅ 已安装组件
- **Go版本**: 1.24.7 (系统需要 1.25.0+)
- **Node.js版本**: v22.21.0 ✅
- **TA-Lib**: 0.4.0 ✅ (已成功编译安装)
- **编译工具**: gcc, make ✅

### ❌ 缺少/问题组件
- **Docker**: 未安装
- **Go版本**: 低于项目要求

## 遇到的问题

### 1. Go版本不兼容
**问题**:
- 项目要求: Go 1.25.0+
- 当前版本: Go 1.24.7
- 依赖包 `github.com/sonirico/go-hyperliquid@v0.17.0` 需要 Go 1.25.0

**临时解决方案**:
已修改 `go.mod` 文件，但仍有依赖包要求更高版本。

### 2. 网络访问限制
无法从 storage.googleapis.com 下载 Go toolchain 更新。

## 推荐的部署方案

### 方案 A: 使用 Docker（推荐）

Docker部署是项目官方推荐的方式，可以避免环境依赖问题。

#### 安装Docker:
```bash
# Ubuntu/Debian
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# 安装Docker Compose
sudo apt-get install docker-compose-plugin
```

#### 使用Docker启动项目:
```bash
cd /home/user/autonof/nofx

# 复制配置文件
cp config.json.example config.json

# 使用启动脚本
./start.sh start --build

# 访问服务
# Web界面: http://localhost:3000
# API端点: http://localhost:8080
```

### 方案 B: 升级 Go 版本（手动部署）

#### 1. 升级 Go 到 1.25.0+:
```bash
# 下载并安装最新的Go
wget https://go.dev/dl/go1.25.3.linux-amd64.tar.gz
sudo rm -rf /usr/local/go
sudo tar -C /usr/local -xzf go1.25.3.linux-amd64.tar.gz

# 验证安装
go version  # 应该显示 go1.25.3
```

#### 2. 安装Go依赖:
```bash
cd /home/user/autonof/nofx
go mod download
```

#### 3. 构建后端:
```bash
CGO_ENABLED=1 go build -o nofx-server .
```

#### 4. 安装前端依赖并构建:
```bash
cd web
npm install
npm run build
cd ..
```

#### 5. 启动服务:
```bash
# 启动后端
./nofx-server &

# 启动前端开发服务器（或使用nginx提供dist目录）
cd web
npm run dev
```

### 方案 C: 仅禁用 Hyperliquid 支持

如果只想使用 Binance 交易所，可以移除 Hyperliquid 依赖：

1. 编辑 `go.mod`，移除 `github.com/sonirico/go-hyperliquid` 依赖
2. 注释或删除 `trader/hyperliquid_trader.go` 文件
3. 修改相关导入和注册代码
4. 重新编译

## 配置说明

### 配置文件
- `config.json`: 基础配置（杠杆、币种、端口等）
- Web界面配置:
  - AI模型API密钥（DeepSeek/Qwen/Claude）
  - 交易所凭证（Binance/Hyperliquid）
  - 交易员组合配置

### 重要配置项
```json
{
  "admin_mode": true,
  "api_server_port": 8080,
  "leverage": {
    "btc_eth_leverage": 5,
    "altcoin_leverage": 5
  },
  "max_daily_loss": 10.0,
  "max_drawdown": 20.0
}
```

## 访问地址
- **Web界面**: http://localhost:3000
- **API后端**: http://localhost:8080
- **健康检查**: http://localhost:8080/api/health

## 后续步骤

1. **安装Docker** 或 **升级Go版本**
2. 使用上述相应方案启动项目
3. 通过Web界面配置:
   - 添加AI模型API密钥
   - 配置交易所凭证
   - 创建交易员组合
   - 启动交易

## 风险警告

⚠️ **重要**:
- 这是一个实验性的AI自动交易系统
- 自动交易存在重大风险
- 强烈建议仅用于学习/研究或小额测试
- 请勿使用真实资金进行大规模交易

## 已完成的工作

✅ 项目已克隆到本地
✅ TA-Lib库已成功编译安装
✅ 配置文件已复制
✅ 环境依赖已检查
✅ 问题已诊断

## 参考资源

- 项目文档: `/home/user/autonof/nofx/docs/`
- README: `/home/user/autonof/nofx/README.md`
- Docker配置: `/home/user/autonof/nofx/docker-compose.yml`
- 启动脚本: `/home/user/autonof/nofx/start.sh`

---

**创建时间**: 2025-11-03
**项目位置**: /home/user/autonof/nofx
