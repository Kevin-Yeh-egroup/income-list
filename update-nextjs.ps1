# Next.js 安全更新腳本
Write-Host "正在更新 Next.js 到安全版本..." -ForegroundColor Yellow
npm install next@latest react@latest react-dom@latest
Write-Host "更新完成！" -ForegroundColor Green
Write-Host "請檢查 package.json 和 package-lock.json 確認版本已更新。" -ForegroundColor Cyan

