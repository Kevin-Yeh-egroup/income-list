'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Upload, FileText, Calculator, User } from 'lucide-react';

interface UploadPageProps {
  onFileSelect: (file: File | null) => void;
}

export default function UploadPage({ onFileSelect }: UploadPageProps) {
  const handleClick = () => {
    // 直接執行，不需要選擇檔案
    onFileSelect(null);
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-8">
      <div className="w-full max-w-2xl space-y-6">
        {/* Main Card */}
        <Card className="w-full p-8 border border-border shadow-lg">
          <div className="flex flex-col items-center gap-6">
            {/* Header */}
            <div className="text-center">
              <h1 className="text-3xl font-bold text-foreground mb-2">所得清單辨識</h1>
              <p className="text-muted-foreground">自動辨識所得清單並計算稅務資訊</p>
            </div>

            {/* Icon */}
            <div className="bg-primary/10 p-6 rounded-full">
              <Upload className="w-12 h-12 text-primary" />
            </div>

            {/* Description */}
            <div className="text-center space-y-2">
              <p className="text-foreground font-medium">所得清單辨識系統</p>
              <p className="text-sm text-muted-foreground">
                點選下方按鈕開始辨識所得清單，系統將自動解析並計算稅務資訊
              </p>
            </div>

            {/* Upload Button */}
            <Button
              onClick={handleClick}
              size="lg"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              開始辨識
            </Button>

            {/* Info */}
            <div className="text-xs text-muted-foreground text-center p-4 bg-muted/30 rounded-lg">
              <p>支援格式：PDF、Excel、CSV、TXT</p>
              <p>檔案大小：不超過 50MB</p>
            </div>
          </div>
        </Card>

        {/* Case Examples Card */}
        <Card className="w-full p-6 border border-border shadow-lg">
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">案例簡述</h2>
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="example">
                <AccordionTrigger className="text-left">
                  系統辨識範例：7 筆所得項目（含稅率回推案例）
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pt-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {/* Example 1 */}
                      <div className="p-3 bg-muted/30 rounded-lg border border-border">
                        <div className="flex items-start gap-2 mb-2">
                          <User className="w-4 h-4 text-primary mt-0.5" />
                          <div className="flex-1">
                            <p className="font-semibold text-sm">王小明</p>
                            <p className="text-xs text-muted-foreground">固定薪資 (50)</p>
                          </div>
                        </div>
                        <div className="text-xs space-y-1">
                          <p>給付總額：<span className="font-medium">$50,000</span></p>
                          <p>扣繳稅額：<span className="font-medium">$4,000</span></p>
                          <p className="text-muted-foreground">扣繳單位：XX大學</p>
                        </div>
                      </div>

                      {/* Example 2 */}
                      <div className="p-3 bg-muted/30 rounded-lg border border-border">
                        <div className="flex items-start gap-2 mb-2">
                          <User className="w-4 h-4 text-primary mt-0.5" />
                          <div className="flex-1">
                            <p className="font-semibold text-sm">李美麗</p>
                            <p className="text-xs text-muted-foreground">兼職所得 (50)</p>
                          </div>
                        </div>
                        <div className="text-xs space-y-1">
                          <p>給付總額：<span className="font-medium">$30,000</span></p>
                          <p>扣繳稅額：<span className="font-medium">$2,400</span></p>
                          <p className="text-muted-foreground">扣繳單位：XX大學</p>
                        </div>
                      </div>

                      {/* Example 3 */}
                      <div className="p-3 bg-muted/30 rounded-lg border border-border">
                        <div className="flex items-start gap-2 mb-2">
                          <User className="w-4 h-4 text-primary mt-0.5" />
                          <div className="flex-1">
                            <p className="font-semibold text-sm">張三</p>
                            <p className="text-xs text-muted-foreground">稿費 (9B)</p>
                          </div>
                        </div>
                        <div className="text-xs space-y-1">
                          <p>給付總額：<span className="font-medium">$15,000</span></p>
                          <p>扣繳稅額：<span className="font-medium">$1,500</span></p>
                          <p className="text-muted-foreground">扣繳單位：XX出版社</p>
                        </div>
                      </div>

                      {/* Example 4 */}
                      <div className="p-3 bg-muted/30 rounded-lg border border-border">
                        <div className="flex items-start gap-2 mb-2">
                          <User className="w-4 h-4 text-primary mt-0.5" />
                          <div className="flex-1">
                            <p className="font-semibold text-sm">陳教授</p>
                            <p className="text-xs text-muted-foreground">演講費 (9B)</p>
                          </div>
                        </div>
                        <div className="text-xs space-y-1">
                          <p>給付總額：<span className="font-medium">$8,000</span></p>
                          <p>扣繳稅額：<span className="font-medium">$800</span></p>
                          <p className="text-muted-foreground">扣繳單位：XX學會</p>
                        </div>
                      </div>

                      {/* Example 5 */}
                      <div className="p-3 bg-muted/30 rounded-lg border border-border">
                        <div className="flex items-start gap-2 mb-2">
                          <User className="w-4 h-4 text-primary mt-0.5" />
                          <div className="flex-1">
                            <p className="font-semibold text-sm">林工程師</p>
                            <p className="text-xs text-muted-foreground">顧問費 (50)</p>
                          </div>
                        </div>
                        <div className="text-xs space-y-1">
                          <p>給付總額：<span className="font-medium">$25,000</span></p>
                          <p>扣繳稅額：<span className="font-medium">$2,000</span></p>
                          <p className="text-muted-foreground">扣繳單位：XX科技公司</p>
                        </div>
                      </div>

                      {/* Example 6 */}
                      <div className="p-3 bg-muted/30 rounded-lg border border-border">
                        <div className="flex items-start gap-2 mb-2">
                          <User className="w-4 h-4 text-primary mt-0.5" />
                          <div className="flex-1">
                            <p className="font-semibold text-sm">黃先生</p>
                            <p className="text-xs text-muted-foreground">租金 (51)</p>
                          </div>
                        </div>
                        <div className="text-xs space-y-1">
                          <p>給付總額：<span className="font-medium">$20,000</span></p>
                          <p>扣繳稅額：<span className="font-medium">$2,000</span></p>
                          <p className="text-muted-foreground">扣繳單位：XX物業管理</p>
                        </div>
                      </div>

                      {/* Example 7 - 只有扣繳稅額的案例 */}
                      <div className="p-3 bg-amber-50 dark:bg-amber-950/20 rounded-lg border-2 border-amber-300 dark:border-amber-700">
                        <div className="flex items-start gap-2 mb-2">
                          <User className="w-4 h-4 text-amber-600 dark:text-amber-400 mt-0.5" />
                          <div className="flex-1">
                            <p className="font-semibold text-sm">趙設計師</p>
                            <p className="text-xs text-muted-foreground">權利金 (53)</p>
                            <p className="text-xs text-amber-600 dark:text-amber-400 font-medium mt-1">
                              ⚠️ 僅有扣繳稅額
                            </p>
                          </div>
                        </div>
                        <div className="text-xs space-y-1">
                          <p>給付總額：<span className="font-medium text-muted-foreground">未提供</span></p>
                          <p>扣繳稅額：<span className="font-medium">$6,000</span></p>
                          <p className="text-amber-600 dark:text-amber-400 font-medium">
                            預估總收入：$30,000
                            <span className="text-xs text-muted-foreground ml-1">(由稅率回推)</span>
                          </p>
                          <p className="text-muted-foreground">扣繳單位：XX科技公司</p>
                          <p className="text-xs text-muted-foreground mt-1 italic">
                            計算：$6,000 ÷ 20% = $30,000
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-primary/5 rounded-lg border border-primary/20">
                      <div className="flex items-start gap-2">
                        <Calculator className="w-4 h-4 text-primary mt-0.5" />
                        <div className="flex-1 text-xs">
                          <p className="font-semibold mb-1">系統功能：</p>
                          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                            <li>自動辨識所得類別與格式代號</li>
                            <li>計算扣繳稅額與預估總收入</li>
                            <li>支援多種所得類型（薪資、稿費、租金等）</li>
                            <li>根據稅率表自動回推預估收入</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </Card>
      </div>
    </div>
  );
}
