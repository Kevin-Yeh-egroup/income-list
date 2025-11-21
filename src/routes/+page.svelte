<script lang="ts">
	import IncomeUpload from '$lib/components/income-upload.svelte';
	import IncomeResults from '$lib/components/income-results.svelte';

	let uploadState = $state<'upload' | 'loading' | 'results'>('upload');
	let incomeData = $state<IncomeEntry[]>([]);

	interface IncomeEntry {
		id: string;
		date: string;
		category: string;
		categoryCode: string;
		description: string;
		amount: number;
	}

	function handleUpload() {
		uploadState = 'loading';
		// Simulate 5-second loading animation
		setTimeout(() => {
			// Mock data - in real app, this would come from file parsing
			incomeData = [
				{
					id: '1',
					date: '2024-01-15',
					category: '薪資所得',
					categoryCode: '50',
					description: '固定薪資',
					amount: 50000
				},
				{
					id: '2',
					date: '2024-01-20',
					category: '執行業務所得',
					categoryCode: '9A',
					description: '諮詢費',
					amount: 15000
				},
				{
					id: '3',
					date: '2024-02-01',
					category: '薪資所得',
					categoryCode: '50',
					description: '兼職鐘點費',
					amount: 8000
				},
				{
					id: '4',
					date: '2024-02-10',
					category: '稿費/演講',
					categoryCode: '9B',
					description: '演講費',
					amount: 12000
				},
				{
					id: '5',
					date: '2024-02-15',
					category: '租賃所得',
					categoryCode: '51',
					description: '房屋租金',
					amount: 25000
				}
			];
			uploadState = 'results';
		}, 5000);
	}

	function handleBack() {
		uploadState = 'upload';
		incomeData = [];
	}

	function handleQuickDelete() {
		uploadState = 'upload';
		incomeData = [];
	}
</script>

<main class="min-h-screen bg-gradient-to-br from-background via-background to-secondary">
	<div class="mx-auto max-w-7xl px-4 py-12">
		<!-- Header -->
		<div class="mb-12">
			<h1 class="text-4xl font-bold text-foreground">所得清單辨識系統</h1>
			<p class="mt-2 text-lg text-muted-foreground">智能識別和管理您的所得類別</p>
		</div>

		<!-- Content -->
		{#if uploadState === 'upload'}
			<IncomeUpload {handleUpload} />
		{:else if uploadState === 'loading'}
			<div class="flex items-center justify-center">
				<div class="w-full max-w-md">
					<div class="mb-8 flex justify-center">
						<div class="relative h-32 w-32">
							<!-- Animated loader -->
							<div class="absolute inset-0 rounded-full border-4 border-secondary border-t-primary animate-spin"></div>
							<div class="absolute inset-0 flex items-center justify-center">
								<div class="text-center">
									<p class="text-sm font-semibold text-muted-foreground">正在識別中...</p>
								</div>
							</div>
						</div>
					</div>
					<p class="text-center text-muted-foreground">
						正在分析您的所得清單，請稍候...
					</p>
				</div>
			</div>
		{:else if uploadState === 'results'}
			<IncomeResults {incomeData} {handleBack} {handleQuickDelete} />
		{/if}
	</div>
</main>

<style>
	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	:global(.animate-spin) {
		animation: spin 1s linear infinite;
	}
</style>
