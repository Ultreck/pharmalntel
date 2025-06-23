// src/hooks/useDragAndDrop.ts
import { useState } from 'react';
import { useEditor } from '../context/EditorContext';
import { DndContext, DragOverlay, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

export const useDragAndDrop = () => {
  const { blocks, moveBlock } = useEditor();
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const handleDragStart = (event: { active: { id: string } }) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event: { active: { id: string }; over: { id: string } | null }) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = blocks.findIndex(block => block.id === active.id);
      const newIndex = blocks.findIndex(block => block.id === over.id);
      moveBlock(oldIndex, newIndex);
    }
    
    setActiveId(null);
  };

  return {
    sensors,
    handleDragStart,
    handleDragEnd,
    activeId,
    blocks
  };
};