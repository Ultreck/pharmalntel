// src/hooks/useDragAndDrop.ts
import { useState } from 'react';
import { useEditor } from '../context/EditorContext';
import {
  DndContext,
  DragOverlay,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
  UniqueIdentifier
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

export const useDragAndDrop = () => {
  const { blocks, moveBlock } = useEditor();
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event: DragEndEvent) => {
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
    closestCenter,
    activeId,
    activeBlock: activeId ? blocks.find(block => block.id === activeId) : null
  };
};