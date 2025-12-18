# 快速修復 404 錯誤
Write-Host "快速修復 Next.js 安裝問題..." -ForegroundColor Cyan

# 刪除鎖定文件
Write-Host "`n刪除舊的鎖定文件..." -ForegroundColor Yellow
if (Test-Path "package-lock.json") { Remove-Item "package-lock.json" -Force }
if (Test-Path "pnpm-lock.yaml") { Remove-Item "pnpm-lock.yaml" -Force }

# 清除快取
Write-Host "清除 npm 快取..." -ForegroundColor Yellow
npm cache clean --force

# 使用淘寶鏡像（通常更穩定）
Write-Host "`n設定使用淘寶 npm 鏡像..." -ForegroundColor Yellow
npm config set registry https://registry.npmmirror.com

# 安裝
Write-Host "`n安裝 Next.js 16.0.7..." -ForegroundColor Yellow
npm install next@16.0.7 --save --legacy-peer-deps

Write-Host "`n完成！" -ForegroundColor Green

