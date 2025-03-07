import React, { useEffect, useRef } from 'react';
import { MarkdownRenderer as ObsidianRenderer } from 'obsidian';

interface MarkdownRendererProps {
    content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            // 清空容器
            containerRef.current.empty();
            // 使用 Obsidian 的 MarkdownRenderer 渲染内容
            ObsidianRenderer.renderMarkdown(
                content,
                containerRef.current,
                '',
                null
            );
        }
    }, [content]);

    return <div ref={containerRef} className="markdown-preview-view" />;
};