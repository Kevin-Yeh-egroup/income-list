// 所得清單解析工具
// 這個檔案用於從上傳的檔案中解析所得清單數據

import { IncomeItem, getFormatCodeByCategory } from './income-types';

/**
 * 從檔案內容解析所得清單
 * 這裡提供一個基本的解析框架，實際的解析邏輯需要根據檔案格式實作
 */
export async function parseIncomeFile(file: File): Promise<IncomeItem[]> {
  // 根據檔案類型選擇不同的解析方式
  const fileType = file.name.split('.').pop()?.toLowerCase();

  switch (fileType) {
    case 'pdf':
      return parsePDFFile(file);
    case 'xlsx':
    case 'xls':
      return parseExcelFile(file);
    case 'csv':
      return parseCSVFile(file);
    case 'txt':
      return parseTXTFile(file);
    default:
      throw new Error('不支援的檔案格式');
  }
}

/**
 * 解析PDF檔案
 * 注意：實際實作需要使用PDF解析庫（如pdf-parse）
 */
async function parsePDFFile(file: File): Promise<IncomeItem[]> {
  // TODO: 實作PDF解析邏輯
  // 這裡返回模擬數據作為範例
  return generateMockData();
}

/**
 * 解析Excel檔案
 * 注意：實際實作需要使用Excel解析庫（如xlsx）
 */
async function parseExcelFile(file: File): Promise<IncomeItem[]> {
  // TODO: 實作Excel解析邏輯
  return generateMockData();
}

/**
 * 解析CSV檔案
 */
async function parseCSVFile(file: File): Promise<IncomeItem[]> {
  // TODO: 實作CSV解析邏輯
  return generateMockData();
}

/**
 * 解析TXT檔案
 */
async function parseTXTFile(file: File): Promise<IncomeItem[]> {
  // TODO: 實作TXT解析邏輯
  return generateMockData();
}

/**
 * 生成模擬數據（用於測試）
 */
function generateMockData(): IncomeItem[] {
  return [
    {
      category: '固定薪資',
      formatCode: '50',
      totalAmount: 50000,
      recipientName: '王小明',
      incomeAmount: 50000,
      withholdingUnit: 'XX大學',
      withholdingTax: 4000,
      estimatedTotalIncome: 50000,
    },
    {
      category: '兼職所得',
      formatCode: '50',
      totalAmount: 30000,
      recipientName: '李美麗',
      incomeAmount: 30000,
      withholdingUnit: 'XX大學',
      withholdingTax: 2400,
      estimatedTotalIncome: 30000,
    },
    {
      category: '稿費',
      formatCode: '9B',
      totalAmount: 15000,
      recipientName: '張三',
      incomeAmount: 15000,
      withholdingUnit: 'XX出版社',
      withholdingTax: 1500,
      estimatedTotalIncome: 15000,
    },
    {
      category: '演講費',
      formatCode: '9B',
      totalAmount: 8000,
      recipientName: '陳教授',
      incomeAmount: 8000,
      withholdingUnit: 'XX學會',
      withholdingTax: 800,
      estimatedTotalIncome: 8000,
    },
    {
      category: '顧問費',
      formatCode: '50',
      totalAmount: 25000,
      recipientName: '林工程師',
      incomeAmount: 25000,
      withholdingUnit: 'XX科技公司',
      withholdingTax: 2000,
      estimatedTotalIncome: 25000,
    },
    {
      category: '租金',
      formatCode: '51',
      totalAmount: 20000,
      recipientName: '黃先生',
      incomeAmount: 20000,
      withholdingUnit: 'XX物業管理',
      withholdingTax: 2000,
      estimatedTotalIncome: 20000,
    },
    {
      category: '權利金',
      formatCode: '53',
      totalAmount: 0, // 只有扣繳稅額，沒有給付總額
      recipientName: '趙設計師',
      incomeAmount: 0,
      withholdingUnit: 'XX科技公司',
      withholdingTax: 6000, // 只有扣繳稅額
      // estimatedTotalIncome 會由系統根據稅率回推
    },
  ];
}

