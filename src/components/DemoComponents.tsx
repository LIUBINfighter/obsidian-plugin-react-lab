import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const Counter: React.FC = () => {
    const [count, setCount] = useState(0);
    const { t } = useTranslation();

    return (
        <div className="demo-counter">
            <p>{t('demos.counter.value', { count })}</p>
            <button onClick={() => setCount(count + 1)}>
                {t('demos.counter.increment')}
            </button>
        </div>
    );
};

export const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<string[]>([]);
    const [input, setInput] = useState('');
    const { t } = useTranslation();

    const addTodo = () => {
        if (input.trim()) {
            setTodos([...todos, input.trim()]);
            setInput('');
        }
    };

    return (
        <div className="demo-todo">
            <div>
                <input 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={t('demos.todo.placeholder')}
                />
                <button onClick={addTodo}>{t('demos.todo.add')}</button>
            </div>
            <ul>
                {todos.map((todo, index) => (
                    <li key={index}>{todo}</li>
                ))}
            </ul>
        </div>
    );
};

export const DragDrop: React.FC = () => {
    const [isDragging, setIsDragging] = useState(false);
    const [isOver, setIsOver] = useState(false);
    const [droppedItem, setDroppedItem] = useState<string | null>(null);
    const [dragText, setDragText] = useState('');
    const { t } = useTranslation();

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        setIsDragging(true);
        e.dataTransfer.setData('text/plain', dragText || t('demos.dragdrop.drag'));
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsOver(true);
    };

    const handleDragLeave = () => {
        setIsOver(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const data = e.dataTransfer.getData('text/plain');
        setDroppedItem(data);
        setIsOver(false);
        setIsDragging(false);
    };

    return (
        <div className="demo-dragdrop">
            <div>
                <input
                    value={dragText}
                    onChange={(e) => setDragText(e.target.value)}
                    placeholder={t('demos.dragdrop.enterText')}
                />
            </div>
            <div
                className={`draggable-item ${isDragging ? 'dragging' : ''}`}
                draggable
                onDragStart={handleDragStart}
            >
                {dragText || t('demos.dragdrop.drag')}
            </div>
            <div
                className={`drop-zone ${isOver ? 'over' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                {droppedItem || t('demos.dragdrop.dropHere')}
            </div>
        </div>
    );
};
