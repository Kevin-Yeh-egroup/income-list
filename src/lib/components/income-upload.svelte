<script lang="ts">
	let { handleUpload } = $props<{ handleUpload: () => void }>();
	let isDragging = $state(false);
	const supportedFormats = ['.pdf', '.xlsx', '.xls', '.csv', '.json'];
	const formatDisplay = 'PDF、Excel、CSV、JSON';

	function handleDragOver(e: DragEvent) {
		e.preventDefault();
		isDragging = true;
	}

	function handleDragLeave() {
		isDragging = false;
	}

	function handleDrop(e: DragEvent) {
		e.preventDefault();
		isDragging = false;
		if (e.dataTransfer?.files) {
			const file = e.dataTransfer.files[0];
			if (isValidFormat(file.name)) {
				handleUpload();
			}
		}
	}

	function handleFileSelect() {
		handleUpload();
	}

	function isValidFormat(filename: string): boolean {
		const ext = filename.substring(filename.lastIndexOf('.')).toLowerCase();
		return supportedFormats.includes(ext);
	}
</script>

<div class="mx-auto max-w-2xl">
	<div class="space-y-8">
		<!-- Upload Section -->
		<div class="rounded-xl border-2 border-primary/20 bg-card p-8">
			<div class="mb-6">
				<h2 class="mb-2 text-2xl font-bold text-foreground">第一步：上傳所得清單</h2>
				<p class="text-muted-foreground">選擇或拖放您的所得清單文件，支持 {formatDisplay} 格式</p>
			</div>

			<div class="space-y-4">
				<!-- File Input Button -->
				<button
					onclick={handleFileSelect}
					class="w-full rounded-lg border-2 border-dashed border-primary/40 bg-background px-6 py-8 text-center transition-all duration-200 hover:border-primary hover:bg-secondary/50"
				>
					<div class="flex flex-col items-center gap-2">
						<svg
							class="h-8 w-8 text-primary"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M12 4v16m8-8H4"
							/>
						</svg>
						<p class="font-semibold text-foreground">選擇檔案</p>
					</div>
				</button>

				<!-- Drag and Drop Area -->
				<button
					onmouseenter={() => (isDragging = false)}
					ondragover={handleDragOver}
					ondragleave={handleDragLeave}
					ondrop={handleDrop}
					class={`w-full rounded-lg border-2 border-dashed px-6 py-8 text-center transition-all duration-200 ${
						isDragging
							? 'border-primary bg-primary/5'
							: 'border-muted bg-secondary/30 hover:border-primary/40 hover:bg-secondary/50'
					}`}
				>
					<div class="flex flex-col items-center gap-2">
						<svg
							class="h-8 w-8 text-muted-foreground"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3v-6"
							/>
						</svg>
						<p class="font-semibold text-foreground">或將檔案拖放到此處</p>
						<p class="text-sm text-muted-foreground">支持 {formatDisplay} 格式</p>
					</div>
				</button>
			</div>
		</div>
	</div>
</div>
