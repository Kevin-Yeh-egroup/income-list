# 完整的 Next.js 安全更新腳本
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Next.js 安全更新腳本" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# 步驟 1: 備份當前的 package-lock.json
Write-Host "`n步驟 1: 備份 package-lock.json..." -ForegroundColor Yellow
if (Test-Path "package-lock.json") {
    Copy-Item "package-lock.json" "package-lock.json.backup" -Force
    Write-Host "已備份 package-lock.json" -ForegroundColor Green
}

# 步驟 2: 清除 npm 快取
Write-Host "`n步驟 2: 清除 npm 快取..." -ForegroundColor Yellow
npm cache clean --force
Write-Host "快取已清除" -ForegroundColor Green

# 步驟 3: 檢查並設定 registry
Write-Host "`n步驟 3: 檢查 npm registry 設定..." -ForegroundColor Yellow
$currentRegistry = npm config get registry
Write-Host "當前 registry: $currentRegistry" -ForegroundColor Cyan

# 嘗試多個 registry
$registries = @(
    "https://registry.npmjs.org/",
    "https://registry.npmmirror.com/"
)

$success = $false
foreach ($registry in $registries) {
    Write-Host "`n嘗試使用 registry: $registry" -ForegroundColor Cyan
    npm config set registry $registry
    
    # 步驟 4: 刪除 package-lock.json 和 node_modules
    Write-Host "`n步驟 4: 清理舊的鎖定文件和依賴..." -ForegroundColor Yellow
    if (Test-Path "package-lock.json") {
        Remove-Item "package-lock.json" -Force
        Write-Host "已刪除 package-lock.json" -ForegroundColor Green
    }
    
    # 步驟 5: 安裝依賴
    Write-Host "`n步驟 5: 安裝 Next.js 安全版本..." -ForegroundColor Yellow
    Write-Host "這可能需要幾分鐘時間..." -ForegroundColor Gray
    
    try {
        npm install next@16.0.7 react@latest react-dom@latest --legacy-peer-deps
        if ($LASTEXITCODE -eq 0) {
            Write-Host "`n✓ 安裝成功！" -ForegroundColor Green
            $success = $true
            break
        }
    } catch {
        Write-Host "安裝失敗，嘗試下一個 registry..." -ForegroundColor Red
    }
}

if (-not $success) {
    Write-Host "`n所有 registry 都失敗了。請嘗試：" -ForegroundColor Red
    Write-Host "1. 檢查網路連接" -ForegroundColor Yellow
    Write-Host "2. 使用 VPN 或不同的網路" -ForegroundColor Yellow
    Write-Host "3. 手動執行: npm install next@16.0.7 --legacy-peer-deps" -ForegroundColor Yellow
} else {
    # 步驟 6: 驗證安裝
    Write-Host "`n步驟 6: 驗證安裝..." -ForegroundColor Yellow
    $nextVersion = npm list next 2>&1 | Select-String "next@"
    Write-Host "安裝的 Next.js 版本: $nextVersion" -ForegroundColor Cyan
    
    Write-Host "`n========================================" -ForegroundColor Green
    Write-Host "更新完成！" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "`n重要提醒：" -ForegroundColor Yellow
    Write-Host "- 如果您的應用在 2025-12-04 前曾上線，請輪換所有密鑰" -ForegroundColor Yellow
    Write-Host "- 請重新建置應用: npm run build" -ForegroundColor Yellow
    Write-Host "- 測試應用確保一切正常" -ForegroundColor Yellow
}

