#!/usr/bin/env node
const { execSync } = require('child_process');

// 从环境变量获取迁移用的 URL
const migrationUrl = process.env.DATABASE_URL_MIGRATION;
if (!migrationUrl) {
  console.error('DATABASE_URL_MIGRATION is not set');
  process.exit(1);
}

// 设置 DATABASE_URL 为迁移用的 URL
process.env.DATABASE_URL = migrationUrl;

// 执行传入的命令
const command = process.argv.slice(2).join(' ');
try {
  execSync(command, { stdio: 'inherit', env: process.env });
} catch (error) {
  process.exit(error.status || 1);
}
