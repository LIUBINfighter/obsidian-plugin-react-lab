import { App, PluginSettingTab, Setting } from "obsidian";
import ReactLabPlugin from "./main";

export class ReactLabSettingTab extends PluginSettingTab {
    plugin: ReactLabPlugin;

    constructor(app: App, plugin: ReactLabPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const {containerEl} = this;

        containerEl.empty();

        new Setting(containerEl)
            .setName('Setting #1')
            .setDesc('It\'s a secret')
            .addText(text => text
                .setPlaceholder('Enter your secret')
                .setValue(this.plugin.settings.setting)
                .onChange(async (value) => {
                    this.plugin.settings.setting = value;
                    await this.plugin.saveSettings();
                }));
    }
}
