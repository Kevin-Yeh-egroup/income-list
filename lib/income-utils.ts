// 所得清單工具函數

import { IncomeItem, getFormatCodeByCategory, INCOME_CATEGORIES } from './income-types';

/**
 * 根據類別名稱自動匹配格式代號
 * 如果找不到完全匹配，會嘗試模糊匹配
 */
export function autoMatchFormatCode(category: string): string | null {
  // 先嘗試完全匹配
  const exactMatch = getFormatCodeByCategory(category);
  if (exactMatch) {
    return exactMatch;
  }

  // 嘗試模糊匹配（包含關鍵字）
  const categoryLower = category.toLowerCase();
  
  // 50類關鍵字
  if (
    categoryLower.includes('薪資') ||
    categoryLower.includes('工資') ||
    categoryLower.includes('鐘點') ||
    categoryLower.includes('兼職') ||
    categoryLower.includes('工讀') ||
    categoryLower.includes('津貼') ||
    categoryLower.includes('補助') ||
    categoryLower.includes('顧問') ||
    categoryLower.includes('諮詢') ||
    categoryLower.includes('助學金') ||
    categoryLower.includes('獎助學金')
  ) {
    return '50';
  }

  // 9A類關鍵字
  if (
    categoryLower.includes('醫師') ||
    categoryLower.includes('律師') ||
    categoryLower.includes('會計師') ||
    categoryLower.includes('建築師') ||
    categoryLower.includes('技師') ||
    categoryLower.includes('程式設計') ||
    categoryLower.includes('執行業務') ||
    categoryLower.includes('專業')
  ) {
    return '9A';
  }

  // 9B類關鍵字
  if (
    categoryLower.includes('稿費') ||
    categoryLower.includes('演講') ||
    categoryLower.includes('口譯') ||
    categoryLower.includes('著作') ||
    categoryLower.includes('版稅') ||
    categoryLower.includes('審稿') ||
    categoryLower.includes('論文')
  ) {
    return '9B';
  }

  // 51類關鍵字
  if (
    categoryLower.includes('租金') ||
    categoryLower.includes('租賃') ||
    categoryLower.includes('租船')
  ) {
    return '51';
  }

  // 53類關鍵字
  if (categoryLower.includes('權利金')) {
    return '53';
  }

  // 91類關鍵字
  if (
    categoryLower.includes('中獎') ||
    categoryLower.includes('競技') ||
    categoryLower.includes('競賽')
  ) {
    return '91';
  }

  // 92類關鍵字
  if (
    categoryLower.includes('其他所得') ||
    categoryLower.includes('和解金') ||
    categoryLower.includes('贈品')
  ) {
    return '92';
  }

  // 93類關鍵字
  if (
    categoryLower.includes('退休') ||
    categoryLower.includes('資遣') ||
    categoryLower.includes('離職') ||
    categoryLower.includes('退職')
  ) {
    return '93';
  }

  // 95類關鍵字
  if (
    categoryLower.includes('政府補助') ||
    categoryLower.includes('科技部') ||
    categoryLower.includes('補助款')
  ) {
    return '95';
  }

  // 97類關鍵字
  if (categoryLower.includes('受贈')) {
    return '97';
  }

  // 00類關鍵字
  if (
    categoryLower.includes('免稅') ||
    categoryLower.includes('慰問') ||
    categoryLower.includes('急難') ||
    categoryLower.includes('獎學金') ||
    categoryLower.includes('退費')
  ) {
    return '00';
  }

  return null;
}

/**
 * 驗證並補全所得項目數據
 * 如果缺少格式代號，會嘗試根據類別自動匹配
 */
export function validateAndCompleteIncomeItem(item: Partial<IncomeItem>): IncomeItem | null {
  // 檢查必要欄位
  if (!item.category || !item.recipientName || !item.withholdingUnit) {
    return null;
  }

  // 如果沒有格式代號，嘗試自動匹配
  let formatCode = item.formatCode;
  if (!formatCode) {
    formatCode = autoMatchFormatCode(item.category) || '92'; // 預設為其他所得
  }

  // 確保數值欄位有預設值
  const totalAmount = item.totalAmount || 0;
  const incomeAmount = item.incomeAmount || totalAmount;

  return {
    category: item.category,
    formatCode,
    totalAmount,
    recipientName: item.recipientName,
    incomeAmount,
    withholdingUnit: item.withholdingUnit,
    withholdingTax: item.withholdingTax,
    estimatedTotalIncome: item.estimatedTotalIncome,
  };
}

