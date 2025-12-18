'use client';

import { useState } from 'react';
import UploadPage from '@/components/upload-page';
import LoadingPage from '@/components/loading-page';
import ResultPage from '@/components/result-page';
import { IncomeItem } from '@/lib/income-types';
import { parseIncomeFile } from '@/lib/income-parser';

type AppStep = 'upload' | 'loading' | 'result';

export default function Home() {
  const [step, setStep] = useState<AppStep>('upload');
  const [incomeItems, setIncomeItems] = useState<IncomeItem[]>([]);

  const handleFileSelect = async (file: File | null) => {
    setStep('loading');

    try {
      let parsedItems;
      
      if (file) {
        // 如果有檔案，解析檔案
        parsedItems = await parseIncomeFile(file);
      } else {
        // 如果沒有檔案，直接使用模擬數據
        // 這裡可以替換為實際的預設檔案處理邏輯
        const mockFile = new File([''], 'default-income-list.xlsx', { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        parsedItems = await parseIncomeFile(mockFile);
      }
      
      // 模擬處理時間（實際解析可能需要一些時間）
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      setIncomeItems(parsedItems);
      setStep('result');
    } catch (error) {
      console.error('檔案解析錯誤:', error);
      alert('檔案解析失敗，請檢查檔案格式');
      setStep('upload');
    }
  };

  return (
    <main className="min-h-screen bg-background">
      {step === 'upload' && <UploadPage onFileSelect={handleFileSelect} />}
      {step === 'loading' && <LoadingPage />}
      {step === 'result' && (
        <ResultPage
          incomeItems={incomeItems}
          onReset={() => {
            setStep('upload');
            setIncomeItems([]);
          }}
        />
      )}
    </main>
  );
}
