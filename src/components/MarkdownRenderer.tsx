import React, { useEffect, useRef } from 'react';
import { MarkdownRenderer as ObsidianRenderer, MarkdownView } from 'obsidian';
import { App } from 'obsidian';

interface MarkdownRendererProps {
    content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.empty();
            
            const app = (window as any).app as App;
            
            ObsidianRenderer.renderMarkdown(
                content,
                containerRef.current,
                '',  // 由于这是插件视图，我们可以使用空字符串作为源路径
                null  // 不需要传入 MarkdownView 实例
            );

            // 添加内部链接点击事件处理
            containerRef.current.addEventListener('click', (event) => {
                const target = event.target as HTMLElement;
                if (target.hasClass('internal-link')) {
                    event.preventDefault();
                    const href = target.getAttribute('href');
                    if (href) {
                        app.workspace.openLinkText(
                            href,
                            app.workspace.getActiveFile()?.path || '',
                            true
                        );
                    }
                }
            });
        }
    }, [content]);

    return <div ref={containerRef} className="markdown-preview-view" />;
};