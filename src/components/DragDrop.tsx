import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { MarkdownRenderer } from './MarkdownRenderer';

interface Card {
  id: string;
  content: string;
}

interface Column {
  id: string;
  title: string;
  cardIds: string[];
}

interface Board {
  id: string;
  title: string;
  columnIds: string[];
}

interface KanbanData {
  cards: { [key: string]: Card };
  columns: { [key: string]: Column };
  boards: { [key: string]: Board };
  boardOrder: string[];
}

interface KanbanDragDropProps {
  initialData?: KanbanData;
}

const initialData: KanbanData = {
  cards: {},
  columns: {},
  boards: {
    'board-1': {
      id: 'board-1',
      title: '默认看板',
      columnIds: [],
    },
  },
  boardOrder: ['board-1'],
};

export const KanbanDragDrop: React.FC<KanbanDragDropProps> = ({ initialData: propInitialData }) => {
  const [data, setData] = useState<KanbanData>(propInitialData || initialData);
  const [activeBoard, setActiveBoard] = useState<string>(data.boardOrder[0]);
  const [editingColumnId, setEditingColumnId] = useState<string | null>(null);
  const [editingCardId, setEditingCardId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>('');

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // 处理不同类型的拖拽
    switch (type) {
      case 'BOARD':
        handleBoardDrag(source.index, destination.index);
        break;
      case 'COLUMN':
        handleColumnDrag(source.index, destination.index, draggableId);
        break;
      case 'CARD':
        handleCardDrag(
          source.droppableId,
          destination.droppableId,
          source.index,
          destination.index,
          draggableId
        );
        break;
    }
  };

  const handleBoardDrag = (sourceIndex: number, destIndex: number) => {
    const newBoardOrder = Array.from(data.boardOrder);
    const [removed] = newBoardOrder.splice(sourceIndex, 1);
    newBoardOrder.splice(destIndex, 0, removed);

    setData({
      ...data,
      boardOrder: newBoardOrder,
    });
  };

  const handleColumnDrag = (sourceIndex: number, destIndex: number, columnId: string) => {
    const board = data.boards[activeBoard];
    const newColumnIds = Array.from(board.columnIds);
    const [removed] = newColumnIds.splice(sourceIndex, 1);
    newColumnIds.splice(destIndex, 0, removed);

    setData({
      ...data,
      boards: {
        ...data.boards,
        [activeBoard]: {
          ...board,
          columnIds: newColumnIds,
        },
      },
    });
  };

  const handleCardDrag = (
    sourceColumnId: string,
    destColumnId: string,
    sourceIndex: number,
    destIndex: number,
    cardId: string
  ) => {
    const sourceColumn = data.columns[sourceColumnId];
    const destColumn = data.columns[destColumnId];

    const sourceCardIds = Array.from(sourceColumn.cardIds);
    const destCardIds =
      sourceColumnId === destColumnId
        ? sourceCardIds
        : Array.from(destColumn.cardIds);

    // 从源列中移除
    sourceCardIds.splice(sourceIndex, 1);

    // 添加到目标列
    if (sourceColumnId === destColumnId) {
      sourceCardIds.splice(destIndex, 0, cardId);
    } else {
      destCardIds.splice(destIndex, 0, cardId);
    }

    setData({
      ...data,
      columns: {
        ...data.columns,
        [sourceColumnId]: {
          ...sourceColumn,
          cardIds: sourceCardIds,
        },
        [destColumnId]: {
          ...destColumn,
          cardIds: destCardIds,
        },
      },
    });
  };

  const addNewBoard = () => {
    const newBoardId = `board-${Date.now()}`;
    setData({
      ...data,
      boards: {
        ...data.boards,
        [newBoardId]: {
          id: newBoardId,
          title: '新看板',
          columnIds: [],
        },
      },
      boardOrder: [...data.boardOrder, newBoardId],
    });
  };

  const addNewColumn = (boardId: string) => {
    const newColumnId = `column-${Date.now()}`;
    const board = data.boards[boardId];

    setData({
      ...data,
      columns: {
        ...data.columns,
        [newColumnId]: {
          id: newColumnId,
          title: '新列',
          cardIds: [],
        },
      },
      boards: {
        ...data.boards,
        [boardId]: {
          ...board,
          columnIds: [...board.columnIds, newColumnId],
        },
      },
    });
  };

  const addNewCard = (columnId: string) => {
    const newCardId = `card-${Date.now()}`;
    const column = data.columns[columnId];

    setData({
      ...data,
      cards: {
        ...data.cards,
        [newCardId]: {
          id: newCardId,
          content: '新卡片',
        },
      },
      columns: {
        ...data.columns,
        [columnId]: {
          ...column,
          cardIds: [...column.cardIds, newCardId],
        },
      },
    });
  };

  const exportToMarkdown = () => {
    const board = data.boards[activeBoard];
    let markdown = `# ${board.title}\n\n`;

    board.columnIds.forEach((columnId) => {
      const column = data.columns[columnId];
      markdown += `## ${column.title}\n\n`;

      column.cardIds.forEach((cardId) => {
        const card = data.cards[cardId];
        markdown += `### 卡片\n${card.content}\n\n---\n\n`;
      });
    });

    // 创建并下载Markdown文件
    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${board.title}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="kanban-container">
      <div className="board-tabs">
        {data.boardOrder.map((boardId, index) => (
          <button
            key={boardId}
            className={`board-tab ${activeBoard === boardId ? 'active' : ''}`}
            onClick={() => setActiveBoard(boardId)}
          >
            {data.boards[boardId].title}
          </button>
        ))}
        <button onClick={addNewBoard}>+ 新建看板</button>
        <button onClick={exportToMarkdown} className="export-btn">导出为Markdown</button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={activeBoard} type="COLUMN" direction="horizontal">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="board-content"
            >
              {data.boards[activeBoard].columnIds.map((columnId, index) => {
                const column = data.columns[columnId];
                return (
                  <Draggable key={columnId} draggableId={columnId} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="column"
                      >
                        <div>
                          {editingColumnId === columnId ? (
                            <input
                              className="column-title-edit"
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              onBlur={() => {
                                setData({
                                  ...data,
                                  columns: {
                                    ...data.columns,
                                    [columnId]: {
                                      ...column,
                                      title: editValue,
                                    },
                                  },
                                });
                                setEditingColumnId(null);
                              }}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  setData({
                                    ...data,
                                    columns: {
                                      ...data.columns,
                                      [columnId]: {
                                        ...column,
                                        title: editValue,
                                      },
                                    },
                                  });
                                  setEditingColumnId(null);
                                } else if (e.key === 'Escape') {
                                  setEditingColumnId(null);
                                }
                              }}
                              autoFocus
                            />
                          ) : (
                            <h3
                              onDoubleClick={() => {
                                setEditingColumnId(columnId);
                                setEditValue(column.title);
                              }}
                            >
                              {column.title}
                            </h3>
                          )}
                        </div>
                        <Droppable droppableId={columnId} type="CARD">
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                              className={`card-list ${snapshot.isDraggingOver ? 'drag-over' : ''}`}
                            >
                              {column.cardIds.map((cardId, index) => {
                                const card = data.cards[cardId];
                                return (
                                  <Draggable
                                    key={cardId}
                                    draggableId={cardId}
                                    index={index}
                                  >
                                    {(provided, snapshot) => (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className={`card ${snapshot.isDragging ? 'dragging' : ''} ${snapshot.draggingOver ? 'drag-over' : ''}`}
                                      >
                                        {editingCardId === cardId ? (
                                          <div
                                            contentEditable
                                            className="card-edit"
                                            onBlur={(e) => {
                                              setData({
                                                ...data,
                                                cards: {
                                                  ...data.cards,
                                                  [cardId]: {
                                                    ...card,
                                                    content: e.target.innerText,
                                                  },
                                                },
                                              });
                                              setEditingCardId(null);
                                            }}
                                            onKeyDown={(e) => {
                                              if (e.key === 'Enter' && e.ctrlKey) {
                                                e.preventDefault();
                                                e.currentTarget.blur();
                                              } else if (e.key === 'Escape') {
                                                setEditingCardId(null);
                                              }
                                            }}
                                            suppressContentEditableWarning
                                            onDoubleClick={(e) => e.stopPropagation()}
                                          >
                                            {card.content}
                                          </div>
                                        ) : (
                                          <div onDoubleClick={() => setEditingCardId(cardId)}>
                                            <MarkdownRenderer content={card.content} />
                                          </div>
                                        )}
                                      </div>
                                    )}
                                  </Draggable>
                                );
                              })}
                              {provided.placeholder}
                            </div>
                          )}
                        </Droppable>
                        <button onClick={() => addNewCard(columnId)}>
                          + 添加卡片
                        </button>
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
              <button onClick={() => addNewColumn(activeBoard)}>
                + 添加列
              </button>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
