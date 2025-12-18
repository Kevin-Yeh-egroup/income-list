// 所得清單類型定義

export interface IncomeItem {
  // 類別（如：固定薪資、兼職所得等）
  category: string;
  // 格式註記/代號（如：50, 9B等）
  formatCode: string;
  // 給付總額
  totalAmount: number;
  // 所得人姓名
  recipientName: string;
  // 所得額
  incomeAmount: number;
  // 扣繳單位名稱
  withholdingUnit: string;
  // 扣繳稅額（如果有提供）
  withholdingTax?: number;
  // 預估總收入（根據稅率回推）
  estimatedTotalIncome?: number;
}

// 所得類別代號對照表
export const INCOME_CATEGORIES = {
  // 50 類：薪資所得（含兼職、鐘點、津貼、補助）
  '固定薪資': '50',
  '兼職所得': '50',
  '兼職費': '50',
  '鐘點費': '50',
  '授課鐘點費': '50',
  '工讀費': '50',
  '工讀獎助金': '50',
  '工作酬勞': '50',
  '日支費': '50',
  '出席費': '50',
  '各類津貼': '50',
  '主管津貼': '50',
  '生育補助': '50',
  '結婚補助': '50',
  '眷屬喪葬補助': '50',
  '員工健檢補助': '50',
  '助學金': '50',
  '獎助學金': '50',
  '研究津貼': '50',
  '社團指導費': '50',
  '教材編撰費': '50',
  '課程規劃費': '50',
  '顧問費': '50',
  '諮詢費': '50',
  '管理費': '50',
  '教學研究費': '50',
  'RA': '50',
  'TA': '50',
  
  // 9A 類：執行業務所得（專業人士／技藝工作者）
  '醫師費': '9A',
  '律師費': '9A',
  '會計師費': '9A',
  '建築師費': '9A',
  '技師費': '9A',
  '地政士費': '9A',
  '程式設計費': '9A',
  '工匠費': '9A',
  '版畫家': '9A',
  '書畫家': '9A',
  '公共安檢人員': '9A',
  '引水人': '9A',
  '專業表演費': '9A',
  '執行業務所得': '9A',
  
  // 9B 類：執行業務所得（稿費／演講／著作）
  '演講費': '9B',
  '演講鐘點費': '9B',
  '口譯費': '9B',
  '稿費': '9B',
  '版稅': '9B',
  '著作費': '9B',
  '樂譜': '9B',
  '漫畫': '9B',
  '編劇': '9B',
  '作曲': '9B',
  '審稿費': '9B',
  '稿件出版費': '9B',
  '論文指導費': '9B',
  '論文潤稿費': '9B',
  '論文編撰費': '9B',
  
  // 51 類：租賃所得
  '民宿租金': '51',
  '固定資產租賃': '51',
  '非固定資產租賃': '51',
  '租船費': '51',
  '參展費': '51',
  '租金': '51',
  
  // 53 類：權利金所得
  '權利金': '53',
  
  // 91 類：競技競賽／機會中獎所得
  '機會中獎': '91',
  '競技競賽獎金': '91',
  '競賽獎金': '91',
  
  // 92 類：其他所得
  '搬遷救濟金': '92',
  '和解金': '92',
  '租車費': '92',
  '贈品': '92',
  '演出費': '92',
  '其他所得': '92',
  
  // 93 類：退職所得
  '退休金': '93',
  '資遣費': '93',
  '離職金': '93',
  '退職補償金': '93',
  '退職服務獎勵金': '93',
  '撫卹金': '93',
  '養老金': '93',
  
  // 95 類：政府補助款
  '政府補助款': '95',
  '科技部補助': '95',
  '千里馬計畫': '95',
  
  // 97 類：受贈所得
  '受贈所得': '97',
  
  // 00 類：免稅項目
  '慰問金': '00',
  '急難救助金': '00',
  '獎學金': '00',
  '退費': '00',
  '體育競賽獎學金': '00',
  '免稅項目': '00',
} as const;

// 所得類別代號說明（包含稅率資訊）
export const INCOME_CATEGORY_DESCRIPTIONS: Record<string, { name: string; description: string; taxRate?: string }> = {
  '50': {
    name: '薪資所得',
    description: '受僱關係下的報酬，包括薪水、工資、津貼、鐘點費、兼職酬金、因職務發生的補助等',
    taxRate: '居住者：需查薪資所得扣繳稅額表（約5-12%，平均8%）\n非居住者：基本工資1.5倍以下(42,885元)為6%，超過為18%',
  },
  '9A': {
    name: '執行業務所得（專業人士）',
    description: '具備專業職照或以技術自營者提供專業服務的收入',
    taxRate: '扣繳率：10%',
  },
  '9B': {
    name: '執行業務所得（稿費／演講）',
    description: '以稿件、著作、創作、演講等方式提供專業內容的收入',
    taxRate: '扣繳率：10%',
  },
  '51': {
    name: '租賃所得',
    description: '出租資產取得的收入',
    taxRate: '扣繳率：10%',
  },
  '53': {
    name: '權利金所得',
    description: '授權他人使用專利、著作、商標等取得的權利金',
    taxRate: '扣繳率：20%',
  },
  '91': {
    name: '競技競賽／機會中獎所得',
    description: '抽獎、摸彩及特定競賽取得的獎金或獎品',
    taxRate: '扣繳率：10%',
  },
  '92': {
    name: '其他所得',
    description: '不屬於薪資、稿費、執行業務、租金、退職等類的其他收入',
    taxRate: '扣繳率：10%',
  },
  '93': {
    name: '退職所得',
    description: '退休金、資遣費、離職金、非保險給付之養老金等',
    taxRate: '需根據免稅額分段計算，無法直接回推',
  },
  '95': {
    name: '政府補助款',
    description: '政府計畫性補助，分為實報實銷與非實報',
    taxRate: '通常免稅或特殊處理',
  },
  '97': {
    name: '受贈所得',
    description: '無償取得的贈與或補助',
    taxRate: '通常免稅或特殊處理',
  },
  '00': {
    name: '免稅項目',
    description: '依法免稅或性質上不列入所得課稅的款項',
    taxRate: '免稅',
  },
};

// 稅率設定（114年1月1日起適用）
export const TAX_RATES = {
  // 非居住者固定薪資
  NON_RESIDENT_SALARY: {
    LOW_THRESHOLD: 42885, // 基本工資1.5倍
    LOW_RATE: 0.06, // 6%
    HIGH_RATE: 0.18, // 18%
  },
  // 居住者按薪資所得扣繳稅額表（需要查表，這裡先提供基本邏輯）
  RESIDENT_SALARY: {
    // 需要根據薪資所得扣繳稅額表計算
  },
} as const;

/**
 * 根據扣繳稅額回推預估總收入
 * @param withholdingTax 扣繳稅額
 * @param formatCode 格式代號
 * @param isResident 是否為居住者（預設為true）
 * @param totalAmount 給付總額（如果已知，可用於驗證）
 * @returns 預估總收入
 */
export function calculateEstimatedTotalIncome(
  withholdingTax: number,
  formatCode: string,
  isResident: boolean = true,
  totalAmount?: number
): number | null {
  if (!withholdingTax || withholdingTax <= 0) {
    return null;
  }

  // 如果已經有給付總額，直接返回
  if (totalAmount && totalAmount > 0) {
    return totalAmount;
  }

  // 如果是非居住者的固定薪資（格式代號50）
  if (!isResident && formatCode === '50') {
    const { LOW_THRESHOLD, LOW_RATE, HIGH_RATE } = TAX_RATES.NON_RESIDENT_SALARY;
    
    // 先假設是低稅率（6%）
    const estimatedLow = withholdingTax / LOW_RATE;
    
    // 如果估算金額超過閾值，則使用高稅率（18%）
    if (estimatedLow > LOW_THRESHOLD) {
      return withholdingTax / HIGH_RATE;
    }
    
    // 如果估算金額在閾值以下，但扣繳稅額可能來自累計超過閾值的情況
    // 需要考慮補扣的情況（12%的差額）
    // 這裡簡化處理，返回低稅率估算值
    return estimatedLow;
  }

  // 居住者的固定薪資（格式代號50）
  // 需要查薪資所得扣繳稅額表，這裡提供簡化估算
  // 一般來說，居住者的扣繳率較低，約在5-12%之間
  if (isResident && formatCode === '50') {
    // 使用平均扣繳率估算（約8%）
    // 實際應該查表，這裡提供粗略估算
    return withholdingTax / 0.08;
  }

  // 格式代號9A、9B（執行業務所得、稿費等）
  // 一般扣繳率為10%
  if (formatCode === '9A' || formatCode === '9B') {
    return withholdingTax / 0.10;
  }

  // 51 類租賃所得，扣繳率為10%
  if (formatCode === '51') {
    return withholdingTax / 0.10;
  }

  // 53 類權利金所得，扣繳率為20%
  if (formatCode === '53') {
    return withholdingTax / 0.20;
  }

  // 91 類競技競賽／機會中獎所得，扣繳率為10%
  if (formatCode === '91') {
    return withholdingTax / 0.10;
  }

  // 92 類其他所得，扣繳率為10%
  if (formatCode === '92') {
    return withholdingTax / 0.10;
  }

  // 93 類退職所得，需要根據免稅額計算，這裡無法準確回推
  if (formatCode === '93') {
    return null;
  }

  // 95、97、00 類通常免稅
  if (formatCode === '95' || formatCode === '97' || formatCode === '00') {
    return null;
  }

  // 其他情況，無法準確估算
  return null;
}

/**
 * 根據類別名稱查找格式代號
 * @param category 類別名稱
 * @returns 格式代號，如果找不到則返回null
 */
export function getFormatCodeByCategory(category: string): string | null {
  const code = INCOME_CATEGORIES[category as keyof typeof INCOME_CATEGORIES];
  return code || null;
}

/**
 * 根據格式代號獲取類別說明
 * @param formatCode 格式代號
 * @returns 類別說明物件（包含稅率資訊），如果找不到則返回null
 */
export function getCategoryDescription(formatCode: string): { name: string; description: string; taxRate?: string } | null {
  return INCOME_CATEGORY_DESCRIPTIONS[formatCode] || null;
}

/**
 * 獲取預估總收入的計算算法說明
 * @param formatCode 格式代號
 * @param withholdingTax 扣繳稅額
 * @param totalAmount 給付總額
 * @param estimatedTotal 預估總收入
 * @returns 計算算法說明
 */
export function getEstimatedIncomeCalculationDescription(
  formatCode: string,
  withholdingTax?: number,
  totalAmount?: number,
  estimatedTotal?: number | null
): string {
  // 如果已經有給付總額，直接使用
  if (totalAmount && totalAmount > 0) {
    return `預估總收入 = 給付總額\n= ${totalAmount.toLocaleString('zh-TW')} 元`;
  }

  // 如果沒有扣繳稅額，無法計算
  if (!withholdingTax || withholdingTax <= 0) {
    return '無法計算：缺少扣繳稅額資料';
  }

  // 如果沒有預估總收入，無法計算
  if (!estimatedTotal) {
    return '無法計算：此類別需要查表或特殊計算';
  }

  // 根據格式代號顯示不同的計算方式
  switch (formatCode) {
    case '50': {
      // 居住者固定薪資
      const rate = 0.08; // 平均扣繳率
      return `預估總收入 = 扣繳稅額 ÷ 扣繳率\n= ${withholdingTax.toLocaleString('zh-TW')} ÷ ${(rate * 100).toFixed(0)}%\n= ${estimatedTotal.toLocaleString('zh-TW')} 元\n\n※ 居住者薪資所得需查薪資所得扣繳稅額表，此處使用平均扣繳率 ${(rate * 100).toFixed(0)}% 估算`;
    }
    case '9A':
    case '9B': {
      const rate = 0.10; // 10%
      return `預估總收入 = 扣繳稅額 ÷ 扣繳率\n= ${withholdingTax.toLocaleString('zh-TW')} ÷ ${(rate * 100).toFixed(0)}%\n= ${estimatedTotal.toLocaleString('zh-TW')} 元\n\n※ 執行業務所得（${formatCode === '9A' ? '專業人士' : '稿費/演講'}）扣繳率為 ${(rate * 100).toFixed(0)}%`;
    }
    case '51': {
      const rate = 0.10; // 10%
      return `預估總收入 = 扣繳稅額 ÷ 扣繳率\n= ${withholdingTax.toLocaleString('zh-TW')} ÷ ${(rate * 100).toFixed(0)}%\n= ${estimatedTotal.toLocaleString('zh-TW')} 元\n\n※ 租賃所得扣繳率為 ${(rate * 100).toFixed(0)}%`;
    }
    case '53': {
      const rate = 0.20; // 20%
      return `預估總收入 = 扣繳稅額 ÷ 扣繳率\n= ${withholdingTax.toLocaleString('zh-TW')} ÷ ${(rate * 100).toFixed(0)}%\n= ${estimatedTotal.toLocaleString('zh-TW')} 元\n\n※ 權利金所得扣繳率為 ${(rate * 100).toFixed(0)}%`;
    }
    case '91':
    case '92': {
      const rate = 0.10; // 10%
      return `預估總收入 = 扣繳稅額 ÷ 扣繳率\n= ${withholdingTax.toLocaleString('zh-TW')} ÷ ${(rate * 100).toFixed(0)}%\n= ${estimatedTotal.toLocaleString('zh-TW')} 元\n\n※ ${formatCode === '91' ? '競技競賽/機會中獎所得' : '其他所得'}扣繳率為 ${(rate * 100).toFixed(0)}%`;
    }
    case '93': {
      return '無法計算：退職所得需根據免稅額分段計算，無法直接回推';
    }
    case '95':
    case '97':
    case '00': {
      return '免稅項目：此類別通常免稅或特殊處理，無法計算預估總收入';
    }
    default: {
      return `預估總收入 = ${estimatedTotal.toLocaleString('zh-TW')} 元\n\n※ 計算方式依格式代號 ${formatCode} 而定`;
    }
  }
}

/**
 * 根據總收入和格式代號計算扣繳稅額
 * @param totalAmount 總收入
 * @param formatCode 格式代號
 * @param isResident 是否為居住者
 * @returns 扣繳稅額
 */
export function calculateWithholdingTax(
  totalAmount: number,
  formatCode: string,
  isResident: boolean = true
): number {
  if (!isResident && formatCode === '50') {
    const { LOW_THRESHOLD, LOW_RATE, HIGH_RATE } = TAX_RATES.NON_RESIDENT_SALARY;
    
    if (totalAmount <= LOW_THRESHOLD) {
      return totalAmount * LOW_RATE;
    } else {
      return totalAmount * HIGH_RATE;
    }
  }

  // 9A、9B 類執行業務所得，一般扣繳率為10%
  if (formatCode === '9A' || formatCode === '9B') {
    return totalAmount * 0.10;
  }

  // 51 類租賃所得，扣繳率為10%
  if (formatCode === '51') {
    return totalAmount * 0.10;
  }

  // 53 類權利金所得，扣繳率為20%（居住者）或20%（非居住者）
  if (formatCode === '53') {
    return totalAmount * 0.20;
  }

  // 91 類競技競賽／機會中獎所得，扣繳率為10%
  if (formatCode === '91') {
    return totalAmount * 0.10;
  }

  // 92 類其他所得，扣繳率為10%
  if (formatCode === '92') {
    return totalAmount * 0.10;
  }

  // 93 類退職所得，需要根據免稅額計算
  if (formatCode === '93') {
    // 簡化處理，實際需要根據退職所得免稅額計算
    return 0;
  }

  // 95、97、00 類通常免稅或特殊處理
  if (formatCode === '95' || formatCode === '97' || formatCode === '00') {
    return 0;
  }

  // 居住者需要查薪資所得扣繳稅額表，這裡先返回0
  return 0;
}

