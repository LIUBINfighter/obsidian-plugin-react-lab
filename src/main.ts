import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';
import { VIEW_TYPES, ReactLabSettings } from "./types";
import { ReactLabSettingTab } from "./setting-tab";


const DEFAULT_SETTINGS: ReactLabSettings = {
    setting: 'default'
}

export default class ReactLabPlugin extends Plugin {
    settings: ReactLabSettings;
    
	async onload() {
		await this.loadSettings();
		this.addSettingTab(new ReactLabSettingTab(this.app, this));

        // 注册 ReadMe 视图
        this.registerView(
            VIEW_TYPES.README,
            (leaf) => new ReadMeView(leaf, this)
        );
        // 注册一个命令
        this.addCommand({
            id: 'open-readme-view',
            name: 'Open ReadMe View',
            callback: () => {
                // 打开一个新的叶子
                this.activateView(VIEW_TYPES.README);
            },
        });
				
		// 添加 ribbon icon
		this.addRibbonIcon('dice','React Lab',
			(evt: MouseEvent) => {
            // 激活视图
            this.activateView();
            }
		);
	}

	async onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
	    // 修改 activateView 方法
		async activateView() {
			const { workspace } = this.app;
			
			let leaf = workspace.getLeavesOfType(VIEW_TYPES.README)[0];
			if (!leaf) {
				leaf = workspace.getLeaf(true);
				await leaf.setViewState({
					type: VIEW_TYPES.README,
					active: true,
				});
			}
			// 监听视图状态变化
			// 注册视图状态变化监听
			this.registerEvent(
				this.app.workspace.on('active-leaf-change', (leaf) => {
					if (leaf?.view instanceof ReadMeView) {
						// 获取 status bar
						const statusBarEl = this.app.workspace.containerEl.querySelector('.status-bar');
						if (statusBarEl) {
							statusBarEl.empty();
							
							// 创建通知按钮
							const noticeBtn = statusBarEl.createEl('button', {
								text: '显示通知',
								cls: 'status-bar-item'
							});
							
							noticeBtn.addEventListener('click', () => {
								this.app.notices.show('这是一条来自 Vue Lab 的通知！', 3000);
							});
						}
					}
				})
			);
			workspace.revealLeaf(leaf);
		}
		// 添加 activateGalleryView 方法
		async activateGalleryView() {
			const { workspace } = this.app;
			
			let leaf = workspace.getLeavesOfType(VIEW_TYPES.GALLERY)[0];
			if (!leaf) {
				leaf = workspace.getLeaf(true);
				await leaf.setViewState({
					type: VIEW_TYPES.GALLERY,
					active: true,
				});
			}
			workspace.revealLeaf(leaf);
		}
	
	
}


