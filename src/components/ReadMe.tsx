import React from 'react';
import { useTranslation } from 'react-i18next';
import { MarkdownRenderer } from './MarkdownRenderer';
import { Counter, TodoList } from './DemoComponents';
import { DragDrop } from './DemoComponents';
import { KanbanDragDrop } from './DragDrop';
import { ThreeColumnLayout } from './ThreeColumnLayout';
import { KanbanLayout } from '../types';
import { useApp } from 'obsidian';

interface ReadMeProps {
    onLocaleChange?: (locale: string) => void;
    kanbanLayout: KanbanLayout;
    onLayoutChange: (layout: KanbanLayout) => void;
}

export const ReadMe: React.FC<ReadMeProps> = ({ onLocaleChange }) => {
    const { t, i18n } = useTranslation();

    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newLocale = e.target.value;
        i18n.changeLanguage(newLocale);
        onLocaleChange?.(newLocale);
    };

    // 使用插值来解析嵌套的翻译键
    const markdownContent = t('readme.content', {
        welcome: t('welcome'),
        'settings.title': t('settings.title'),
        'settings.content': t('settings.content'),
        'readme.features.title': t('readme.features.title'),
        'readme.features.markdown': t('readme.features.markdown'),
        'readme.features.internalLinks': t('readme.features.internalLinks'),
        'readme.features.math': t('readme.features.math'),
        'readme.features.mermaid': t('readme.features.mermaid')
    });

    const customComponents = {
        'demo-counter': Counter,
        'demo-todo': TodoList
    };

    return (
        <div className="readme-container">
            <div className="language-selector">
                <select 
                    value={i18n.language} 
                    onChange={handleLanguageChange}
                >
                    <option value="en">English</option>
                    <option value="zh">中文</option>
                </select>
            </div>
            <div className="content">
                <MarkdownRenderer 
                    content={markdownContent} 
                    customComponents={customComponents}
                />
            </div>
			<div className="demo-components">
                <Counter />
                <TodoList />
				<DragDrop />
			</div>
            <div className="kanban-section">
                <h2>看板</h2>
                <KanbanDragDrop />
            </div>
            <ThreeColumnLayout
                leftContent={<div>左侧内容区域</div>}
                centerContent={<div>中间内容区域</div>}
                rightContent={<div>右侧内容区域</div>}
            />
        </div>
    );
};
