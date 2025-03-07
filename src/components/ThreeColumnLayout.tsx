import React, { useState, useRef, useEffect } from 'react';

interface ThreeColumnLayoutProps {
    leftContent?: React.ReactNode;
    centerContent?: React.ReactNode;
    rightContent?: React.ReactNode;
}

export const ThreeColumnLayout: React.FC<ThreeColumnLayoutProps> = ({
    leftContent,
    centerContent,
    rightContent
}) => {
    const [leftWidth, setLeftWidth] = useState(250);
    const [rightWidth, setRightWidth] = useState(250);
    const [isLeftCollapsed, setIsLeftCollapsed] = useState(false);
    const [isRightCollapsed, setIsRightCollapsed] = useState(false);
    const [isDraggingLeft, setIsDraggingLeft] = useState(false);
    const [isDraggingRight, setIsDraggingRight] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const leftResizerRef = useRef<HTMLDivElement>(null);
    const rightResizerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;

            if (isDraggingLeft) {
                const containerRect = containerRef.current.getBoundingClientRect();
                const newWidth = e.clientX - containerRect.left;
                setLeftWidth(Math.min(Math.max(newWidth, 200), 400));
            }

            if (isDraggingRight) {
                const containerRect = containerRef.current.getBoundingClientRect();
                const newWidth = containerRect.right - e.clientX;
                setRightWidth(Math.min(Math.max(newWidth, 200), 400));
            }
        };

        const handleMouseUp = () => {
            setIsDraggingLeft(false);
            setIsDraggingRight(false);
        };

        if (isDraggingLeft || isDraggingRight) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDraggingLeft, isDraggingRight]);

    return (
        <div className="three-column-layout" ref={containerRef}>
            <div
                className={`column-left ${isLeftCollapsed ? 'collapsed' : ''}`}
                style={{ width: isLeftCollapsed ? 0 : leftWidth }}
            >
                {leftContent}
                <div
                    className={`resizer resizer-left ${isDraggingLeft ? 'dragging' : ''}`}
                    ref={leftResizerRef}
                    onMouseDown={() => setIsDraggingLeft(true)}
                />
                <button
                    className="column-toggle column-toggle-left"
                    onClick={() => setIsLeftCollapsed(!isLeftCollapsed)}
                    title={isLeftCollapsed ? '展开左侧栏' : '收起左侧栏'}
                >
                    {isLeftCollapsed ? '→' : '←'}
                </button>
            </div>
            <div className="column-center">{centerContent}</div>
            <div
                className={`column-right ${isRightCollapsed ? 'collapsed' : ''}`}
                style={{ width: isRightCollapsed ? 0 : rightWidth }}
            >
                <div
                    className={`resizer resizer-right ${isDraggingRight ? 'dragging' : ''}`}
                    ref={rightResizerRef}
                    onMouseDown={() => setIsDraggingRight(true)}
                />
                <button
                    className="column-toggle column-toggle-right"
                    onClick={() => setIsRightCollapsed(!isRightCollapsed)}
                    title={isRightCollapsed ? '展开右侧栏' : '收起右侧栏'}
                >
                    {isRightCollapsed ? '←' : '→'}
                </button>
                {rightContent}
            </div>
        </div>
    );
};