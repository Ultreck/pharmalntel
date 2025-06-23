// src/lib/dragAndDrop.js
import { useCallback } from 'react';
import { useEditor } from '../context/EditorContext';

export const useDragAndDrop = () => {
  const { blocks, setBlocks } = useEditor();
console.log(blocks);

interface Block {
    // Define the properties of a block as needed, for example:
    id: string;
    [key: string]: any;
}

interface MoveBlock {
    (dragIndex: number, hoverIndex: number): void;
}

const moveBlock: MoveBlock = useCallback((dragIndex: number, hoverIndex: number) => {
    setBlocks((prevBlocks: Block[]) => {
        const draggedBlock = prevBlocks[dragIndex];
        const updatedBlocks = [...prevBlocks];
        updatedBlocks.splice(dragIndex, 1);
        updatedBlocks.splice(hoverIndex, 0, draggedBlock);
        return updatedBlocks;
    });
}, [setBlocks]);

  return { moveBlock };
};