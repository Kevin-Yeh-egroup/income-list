<script lang="ts">
	interface IncomeEntry {
		id: string;
		date: string;
		category: string;
		categoryCode: string;
		description: string;
		amount: number;
	}

	let { incomeData = [], handleBack, handleQuickDelete } = $props<{
		incomeData: IncomeEntry[];
		handleBack: () => void;
		handleQuickDelete: () => void;
	}>();

	let sortBy = $state<'date' | 'code'>('date');

	const categoryNames: Record<string, string> = {
		'50': '薪資所得',
		'9A': '執行業務所得',
		'9B': '稿費/演講',
		'51': '租賃所得',
		'53': '權利金',
		'91': '競技競賽',
		'92': '其他所得',
		'93': '退職所得',
		'95': '政府補助',
		'97': '受贈所得',
		'00': '免稅/退款'
	};

	function getSortedData() {
		const sorted = [...incomeData];
		if (sortBy === 'date') {
			sorted.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
		} else if (sortBy === 'code') {
			sorted.sort((a, b) => a.categoryCode.localeCompare(b.categoryCode));
		}
		return sorted;
	}

	function formatDate(dateStr: string) {
		const date = new Date(dateStr);
		return date.toLocaleDateString('zh-TW', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit'
		});
	}

	function formatCurrency(amount: number) {
		return new Intl.NumberFormat('zh-TW', {
			style: 'currency',
			currency: 'TWD',
			minimumFractionDigits: 0
		}).format(amount);
	}

	function getTotalAmount() {
		return incomeData.reduce((sum, entry) => sum + entry.amount, 0);
	}

	function getCategorySummary() {
		const summary: Record<string, number> = {};
		incomeData.forEach((entry) => {
			summary[entry.categoryCode] = (summary[entry.categoryCode] || 0) + entry.amount;
		});
		return summary;
	}

	$effect(() => {
		// Sort whenever sortBy changes
		getSortedData();
	});
</script>

<div class="space-y-8">
	<!-- Summary Stats -->
	<div class="grid gap-4 md:grid-cols-3">
		<div class="rounded-lg border border-border bg-card p-6">
			<h3 class="text-sm font-medium text-muted-foreground">所得筆數</h3>
			<p class="mt-2 text-3xl font-bold text-primary">{incomeData.length}</p>
		</div>

		<div class="rounded-lg border border-border bg-card p-6">
			<h3 class="text-sm font-medium text-muted-foreground">所得總額</h3>
			<p class="mt-2 text-xl font-bold text-foreground">{formatCurrency(getTotalAmount())}</p>
		</div>

		<div class="rounded-lg border border-border bg-card p-6">
			<h3 class="text-sm font-medium text-muted-foreground">所得類別數</h3>
			<p class="mt-2 text-3xl font-bold text-primary">{Object.keys(getCategorySummary()).length}</p>
		</div>
	</div>

	<!-- Controls -->
	<div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
		<div class="flex gap-2">
			<button
				onclick={() => (sortBy = 'date')}
				class={`rounded-lg px-4 py-2 font-medium transition-all ${
					sortBy === 'date'
						? 'bg-primary text-primary-foreground'
						: 'border border-border bg-card text-foreground hover:bg-secondary'
				}`}
			>
				按日期排序
			</button>
			<button
				onclick={() => (sortBy = 'code')}
				class={`rounded-lg px-4 py-2 font-medium transition-all ${
					sortBy === 'code'
						? 'bg-primary text-primary-foreground'
						: 'border border-border bg-card text-foreground hover:bg-secondary'
				}`}
			>
				按所得代號排序
			</button>
		</div>

		<div class="flex gap-2">
			<button
				onclick={handleQuickDelete}
				class="rounded-lg border border-red-300/50 bg-red-50 px-4 py-2 font-medium text-red-700 transition-all hover:bg-red-100"
			>
				刪除所有資料
			</button>
			<button
				onclick={handleBack}
				class="rounded-lg border border-border bg-card px-4 py-2 font-medium text-foreground transition-all hover:bg-secondary"
			>
				← 返回上傳
			</button>
		</div>
	</div>

	<!-- Results Table -->
	<div class="overflow-hidden rounded-lg border border-border">
		<div class="overflow-x-auto">
			<table class="w-full">
				<thead>
					<tr class="border-b border-border bg-secondary">
						<th class="px-6 py-3 text-left text-sm font-semibold text-foreground">日期</th>
						<th class="px-6 py-3 text-left text-sm font-semibold text-foreground">所得代號</th>
						<th class="px-6 py-3 text-left text-sm font-semibold text-foreground">所得類別</th>
						<th class="px-6 py-3 text-left text-sm font-semibold text-foreground">說明</th>
						<th class="px-6 py-3 text-right text-sm font-semibold text-foreground">金額</th>
					</tr>
				</thead>
				<tbody>
					{#each getSortedData() as entry (entry.id)}
						<tr class="border-b border-border transition-colors hover:bg-secondary/50">
							<td class="px-6 py-4 text-sm text-foreground">{formatDate(entry.date)}</td>
							<td class="px-6 py-4">
								<span
									class="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm font-semibold text-primary"
								>
									{entry.categoryCode}
								</span>
							</td>
							<td class="px-6 py-4 text-sm text-foreground">{entry.category}</td>
							<td class="px-6 py-4 text-sm text-muted-foreground">{entry.description}</td>
							<td class="px-6 py-4 text-right text-sm font-semibold text-foreground">
								{formatCurrency(entry.amount)}
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>

	<!-- Category Summary -->
	<div class="rounded-lg border border-border bg-card p-6">
		<h3 class="mb-4 text-lg font-bold text-foreground">所得類別統計</h3>
		<div class="space-y-3">
			{#each Object.entries(getCategorySummary()).sort((a, b) => a[0].localeCompare(b[0])) as [code, amount]}
				<div class="flex items-center justify-between">
					<div class="flex items-center gap-3">
						<span class="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
							{code}
						</span>
						<span class="text-foreground">{categoryNames[code] || '未分類'}</span>
					</div>
					<span class="font-semibold text-foreground">{formatCurrency(amount)}</span>
				</div>
			{/each}
		</div>
	</div>
</div>
