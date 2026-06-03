<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

  <p align="center">企业级 NestJS 框架，集成 Supabase，优化用于 Vercel 部署。</p>

## 项目简介

这是一个企业级 NestJS 框架启动模板，具有以下特性：

- **NestJS** - 渐进式 Node.js 框架
- **Supabase** - PostgreSQL 数据库、认证和存储
- **Prisma** - 类型安全的数据库 ORM
- **JWT 认证** - 基于 Passport 的安全令牌认证
- **Vitest** - 快速的单元测试和 E2E 测试
- **Swagger** - 自动生成 API 文档
- **Vercel** - 优化用于无服务器部署
- **代码质量** - ESLint、Prettier、Husky、lint-staged

## 项目结构

```
src/
├── common/              # 共享工具
│   ├── decorators/     # 自定义装饰器 (@CurrentUser, @Roles)
│   ├── filters/        # 全局异常过滤器
│   ├── guards/         # 认证和授权守卫
│   ├── interceptors/   # 请求/响应拦截器
│   └── pipes/          # 验证管道
├── config/             # 配置管理
├── database/           # Prisma 服务和模块
├── modules/            # 功能模块
│   ├── auth/           # 认证模块
│   ├── users/          # 用户管理模块
│   └── health/         # 健康检查模块
├── app.module.ts       # 根模块
└── main.ts             # 应用入口
```

## 环境变量

复制 `.env.example` 为 `.env` 并配置以下变量：

```bash
DATABASE_URL=postgresql://user:password@host:port/database
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
JWT_SECRET=your-jwt-secret
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

## 安装

```bash
$ npm install
```

## 数据库设置

```bash
# 生成 Prisma 客户端
$ npx prisma generate

# 运行迁移
$ npx prisma migrate dev
```

## 运行应用

```bash
# 开发模式
$ npm run start:dev

# 生产模式
$ npm run build
$ npm run start:prod
```

API 将在 `http://localhost:3000/api` 访问
Swagger 文档在 `http://localhost:3000/api/docs`

## 测试

```bash
# 单元测试
$ npm run test

# 监听模式
$ npm run test:watch

# 覆盖率
$ npm run test:cov

# E2E 测试
$ npm run test:e2e
```

## 代码质量

```bash
# 代码检查
$ npm run lint

# 代码格式化
$ npm run format
```

## 部署到 Vercel

1. 将仓库连接到 Vercel
2. 在 Vercel 控制台配置环境变量
3. 部署 - Vercel 将自动检测 `vercel.json` 配置

## API 端点

### 认证
- `POST /api/auth/register` - 注册新用户
- `POST /api/auth/login` - 登录并获取 JWT 令牌

### 用户
- `GET /api/users` - 获取所有用户（需认证）
- `GET /api/users/:id` - 根据 ID 获取用户（需认证）
- `POST /api/users` - 创建用户（需认证）
- `PATCH /api/users/:id` - 更新用户（需认证）
- `DELETE /api/users/:id` - 删除用户（需认证）

### 健康检查
- `GET /api/health` - 健康检查端点

## 许可证

MIT
