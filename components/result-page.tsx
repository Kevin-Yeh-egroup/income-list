'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileText, RotateCcw, Download } from 'lucide-react';
import { IncomeItem, calculateEstimatedTotalIncome, getCategoryDescription, getEstimatedIncomeCalculationDescription } from '@/lib/income-types';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface ResultPageProps {
  incomeItems: IncomeItem[];
  onReset: () => void;
}

export default function ResultPage({ incomeItems, onReset }: ResultPageProps) {
  const totalAmount = incomeItems.reduce((sum, item) => sum + item.totalAmount, 0);
  const totalIncome = incomeItems.reduce((sum, item) => sum + item.incomeAmount, 0);
  const totalWithholdingTax = incomeItems.reduce(
    (sum, item) => sum + (item.withholdingTax || 0),
    0
  );

  // 格式化金額顯示
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('zh-TW', {
      style: 'currency',
      currency: 'TWD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-8">
      <div className="w-full max-w-6xl space-y-6">
        {/* Header Card */}
        <Card className="p-8 border border-border shadow-lg bg-card">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-2">所得清單辨識結果</h1>
            <p className="text-muted-foreground">掃描完成，以下為您的所得清單資訊</p>
          </div>
        </Card>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Total Items Card */}
          <Card className="p-6 border border-border shadow-md bg-primary/5">
            <div className="text-center">
              <p className="text-sm text-muted-foreground font-medium mb-2">所得項目總數</p>
              <p className="text-4xl font-bold text-primary">{incomeItems.length}</p>
              <p className="text-xs text-muted-foreground mt-2">筆</p>
            </div>
          </Card>

          {/* Total Amount Card */}
          <Card className="p-6 border border-border shadow-md bg-blue-50 dark:bg-blue-950/20">
            <div className="flex flex-col items-center gap-2">
              <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              <div className="text-center">
                <p className="text-sm text-muted-foreground font-medium mb-1">給付總額</p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {formatCurrency(totalAmount)}
                </p>
              </div>
            </div>
          </Card>

          {/* Total Income Card */}
          <Card className="p-6 border border-border shadow-md bg-green-50 dark:bg-green-950/20">
            <div className="text-center">
              <p className="text-sm text-muted-foreground font-medium mb-2">所得總額</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {formatCurrency(totalIncome)}
              </p>
            </div>
          </Card>

          {/* Total Tax Card */}
          <Card className="p-6 border border-border shadow-md bg-amber-50 dark:bg-amber-950/20">
            <div className="text-center">
              <p className="text-sm text-muted-foreground font-medium mb-2">扣繳稅額</p>
              <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                {formatCurrency(totalWithholdingTax)}
              </p>
            </div>
          </Card>
        </div>

        {/* Details Table */}
        <Card className="p-6 border border-border shadow-md">
          <h2 className="text-lg font-semibold text-foreground mb-4">所得清單詳情</h2>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>所得人姓名</TableHead>
                  <TableHead>類別</TableHead>
                  <TableHead>格式代號</TableHead>
                  <TableHead className="text-right">給付總額</TableHead>
                  <TableHead className="text-right">所得額</TableHead>
                  <TableHead>扣繳單位</TableHead>
                  <TableHead className="text-right">扣繳稅額</TableHead>
                  <TableHead className="text-right">預估總收入</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {incomeItems.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center text-muted-foreground">
                      無所得資料
                    </TableCell>
                  </TableRow>
                ) : (
                  incomeItems.map((item, index) => {
                    // 如果有扣繳稅額，計算預估總收入
                    // 如果沒有給付總額（totalAmount為0或undefined），則根據扣繳稅額回推
                    const estimatedTotal =
                      item.withholdingTax && item.formatCode
                        ? calculateEstimatedTotalIncome(
                            item.withholdingTax,
                            item.formatCode,
                            true,
                            item.totalAmount && item.totalAmount > 0 ? item.totalAmount : undefined
                          )
                        : item.totalAmount && item.totalAmount > 0 ? item.totalAmount : null;

                    const categoryDesc = getCategoryDescription(item.formatCode);
                    
                    // 判斷是否為只有扣繳稅額的案例
                    const isTaxOnlyCase = item.withholdingTax && item.withholdingTax > 0 && (!item.totalAmount || item.totalAmount === 0);

                    return (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{item.recipientName}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className="cursor-help underline decoration-dotted">
                                {item.formatCode}
                              </span>
                            </TooltipTrigger>
                            <TooltipContent className="max-w-xs">
                              {categoryDesc ? (
                                <div className="space-y-2">
                                  <div>
                                    <p className="font-semibold mb-1">{categoryDesc.name}</p>
                                    <p className="text-xs">{categoryDesc.description}</p>
                                  </div>
                                  {categoryDesc.taxRate && (
                                    <div className="pt-2 border-t border-border/50">
                                      <p className="text-xs font-semibold mb-1">可能稅率：</p>
                                      <p className="text-xs whitespace-pre-line font-mono bg-muted/50 p-2 rounded">
                                        {categoryDesc.taxRate}
                                      </p>
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <p>格式代號：{item.formatCode}</p>
                              )}
                            </TooltipContent>
                          </Tooltip>
                        </TableCell>
                        <TableCell className="text-right">
                          {item.totalAmount && item.totalAmount > 0 ? (
                            formatCurrency(item.totalAmount)
                          ) : (
                            <span className="text-muted-foreground italic">未提供</span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(item.incomeAmount)}
                        </TableCell>
                        <TableCell>{item.withholdingUnit}</TableCell>
                        <TableCell className="text-right">
                          {item.withholdingTax
                            ? formatCurrency(item.withholdingTax)
                            : '-'}
                        </TableCell>
                        <TableCell className="text-right">
                          {estimatedTotal ? (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <span className="cursor-help underline decoration-dotted">
                                  {formatCurrency(estimatedTotal)}
                                </span>
                              </TooltipTrigger>
                              <TooltipContent className="max-w-sm">
                                <div className="space-y-2">
                                  <p className="font-semibold mb-2">預估總收入計算方式</p>
                                  <div className="text-xs whitespace-pre-line font-mono bg-muted/50 p-2 rounded">
                                    {getEstimatedIncomeCalculationDescription(
                                      item.formatCode,
                                      item.withholdingTax,
                                      item.totalAmount,
                                      estimatedTotal
                                    )}
                                  </div>
                                </div>
                              </TooltipContent>
                            </Tooltip>
                          ) : (
                            '-'
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </Card>

        {/* Summary Card */}
        <Card className="p-6 border border-border shadow-md">
          <h2 className="text-lg font-semibold text-foreground mb-4">統計摘要</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
              <span className="text-foreground flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                給付總額
              </span>
              <span className="font-bold text-lg text-foreground">
                {formatCurrency(totalAmount)}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
              <span className="text-foreground">所得總額</span>
              <span className="font-bold text-lg text-green-600 dark:text-green-400">
                {formatCurrency(totalIncome)}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
              <span className="text-foreground">扣繳稅額</span>
              <span className="font-bold text-lg text-amber-600 dark:text-amber-400">
                {formatCurrency(totalWithholdingTax)}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-primary/10 rounded-lg">
              <span className="text-foreground font-medium">所得項目總數</span>
              <span className="font-bold text-lg text-primary">{incomeItems.length} 筆</span>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4">
          <Button
            onClick={onReset}
            variant="outline"
            size="lg"
            className="flex-1"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            重新上傳
          </Button>
          <Button
            size="lg"
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Download className="w-4 h-4 mr-2" />
            匯出資料
          </Button>
        </div>
      </div>
    </div>
  );
}

