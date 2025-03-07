import React, { useEffect, useRef } from 'react';
import { MarkdownRenderer as ObsidianRenderer, MarkdownView } from 'obsidian';
import { App } from 'obsidian';
import { createRoot, Root } from 'react-dom/client';

interface MarkdownRendererProps {
    content: string;
    customComponents?: Record<string, React.ComponentType>;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, customComponents = {} }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const componentRoots = useRef<Map<HTMLElement, Root>>(new Map());

    useEffect(() => {
        if (containerRef.current) {
            // 清理之前的 React roots
            componentRoots.current.forEach(root => root.unmount());
            componentRoots.current.clear();
            
            containerRef.current.empty();
            
            const app = (window as any).app as App;
            
            ObsidianRenderer.renderMarkdown(
                content,
                containerRef.current,
                '',
                null
            );

            // 使用新的 createRoot API 渲染自定义组件
            Object.entries(customComponents).forEach(([tagName, Component]) => {
                containerRef.current?.querySelectorAll(tagName).forEach(element => {
                    const container = document.createElement('div');
                    const props = {};
                    // 获取元素的所有属性
                    Array.from(element.attributes).forEach(attr => {
                        props[attr.name] = attr.value;
                    });
                    // 获取元素的内部内容
                    props.children = element.innerHTML;
                    element.replaceWith(container);
                    const root = createRoot(container);
                    root.render(<Component {...props} />);
                    componentRoots.current.set(container, root);
                });
            });

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

        // 清理函数
        return () => {
            componentRoots.current.forEach(root => root.unmount());
            componentRoots.current.clear();
        };
    }, [content, customComponents]);

    return <div ref={containerRef} className="markdown-preview-view" />;
};