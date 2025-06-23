import { useState } from 'react';
import { useEditor } from '../context/EditorContext';
import { DndContext, DragOverlay, closestCenter } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

export const useDragAndDrop = () => {
  const { blocks, moveBlock } = useEditor();
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleDragStart = (index: number) => {
    setActiveId(blocks[index].id);
  };

  const handleDragEnd = () => {
    setActiveId(null);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>, index: number) => {
    event.preventDefault();
    const activeIndex = blocks.findIndex(block => block.id === activeId);
    if (activeIndex !== -1 && activeIndex !== index) {
      moveBlock(activeIndex, index);
    }
  };

  return {
    sensors: DndContext.sensors,
    handleDragStart,
    handleDragEnd,
    handleDragOver
  };
};