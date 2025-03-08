import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface SidebarProps {
    isOpen: boolean;
    onToggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
    const { t } = useTranslation();
    const [width, setWidth] = useState(250);
    const [isDragging, setIsDragging] = useState(false);
    const dragHandleRef = useRef<HTMLDivElement>(null);

    const handleDragStart = useCallback((e: React.MouseEvent) => {
        setIsDragging(true);
        e.preventDefault();
    }, []);

    const handleDrag = useCallback((e: MouseEvent) => {
        if (isDragging) {
            const newWidth = window.innerWidth - e.clientX;
            setWidth(Math.max(200, Math.min(600, newWidth)));
        }
    }, [isDragging]);

    const handleDragEnd = useCallback(() => {
        setIsDragging(false);
    }, []);

    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleDrag);
            document.addEventListener('mouseup', handleDragEnd);
        }
        return () => {
            document.removeEventListener('mousemove', handleDrag);
            document.removeEventListener('mouseup', handleDragEnd);
        };
    }, [isDragging, handleDrag, handleDragEnd]);

    return (
        <div 
            className={`sidebar-container ${isOpen ? 'open' : 'closed'}`}
            style={{ width: isOpen ? `${width}px` : undefined }}
        >
            <button 
                className="sidebar-toggle"
                onClick={onToggle}
                aria-label={isOpen ? '收起边栏' : '展开边栏'}
            >
                {isOpen ? '→' : '←'}
            </button>
            <div 
                ref={dragHandleRef}
                className="sidebar-drag-handle"
                onMouseDown={handleDragStart}
            />
            <div className="sidebar-content">
                <h3>{t('sidebar.title')}</h3>
                <p>{t('sidebar.content')}</p>
            </div>
        </div>
    );
};