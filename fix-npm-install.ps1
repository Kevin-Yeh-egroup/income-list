# 修復 npm 安裝問題的腳本
Write-Host "正在嘗試修復 npm 安裝問題..." -ForegroundColor Yellow

# 方法 1: 清除 npm 快取
Write-Host "`n步驟 1: 清除 npm 快取..." -ForegroundColor Cyan
npm cache clean --force

# 方法 2: 使用官方 registry
Write-Host "`n步驟 2: 設定使用官方 npm registry..." -ForegroundColor Cyan
npm config set registry https://registry.npmjs.org/

# 方法 3: 嘗試安裝
Write-Host "`n步驟 3: 安裝 Next.js 最新版本..." -ForegroundColor Cyan
npm install next@latest react@latest react-dom@latest

Write-Host "`n完成！如果仍有問題，請嘗試：" -ForegroundColor Green
Write-Host "1. 檢查網路連接" -ForegroundColor Yellow
Write-Host "2. 嘗試使用不同的網路（如 VPN）" -ForegroundColor Yellow
Write-Host "3. 使用國內鏡像（如淘寶鏡像）" -ForegroundColor Yellow
Write-Host "   npm config set registry https://registry.npmmirror.com" -ForegroundColor Gray

