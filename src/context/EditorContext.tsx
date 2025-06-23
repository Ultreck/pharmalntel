import { createContext, useContext, useState, useMemo, ReactNode, useCallback } from 'react';
import { Block, BlockType, EditorContextType } from '../types/editorTypes';

const EditorContext = createContext<EditorContextType | undefined>(undefined);

interface EditorProviderProps {
  children: ReactNode;
}

export const EditorProvider = ({ children }: EditorProviderProps) => {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [activeBlockId, setActiveBlockId] = useState<string | null>(null);

  // Stable function references using useCallback
  const addBlock = useCallback((type: BlockType, index: number) => {
    const newBlock: Block = {
      id: Date.now().toString(),
      type,
      content: '',
      data: {}
    };
    
    setBlocks(prev => {
      const updatedBlocks = [...prev];
      updatedBlocks.splice(index + 1, 0, newBlock);
      return updatedBlocks;
    });
    setActiveBlockId(newBlock.id);
  }, []);

  const updateBlock = useCallback((id: string, updates: Partial<Block>) => {
    setBlocks(prev => 
      prev.map(block => 
        block.id === id ? { ...block, ...updates } : block
      )
    );
  }, []);

  const deleteBlock = useCallback((id: string) => {
    setBlocks(prev => prev.filter(block => block.id !== id));
  }, []);

  const moveBlock = useCallback((dragIndex: number, hoverIndex: number) => {
    setBlocks(prevBlocks => {
      const draggedBlock = prevBlocks[dragIndex];
      const updatedBlocks = [...prevBlocks];
      updatedBlocks.splice(dragIndex, 1);
      updatedBlocks.splice(hoverIndex, 0, draggedBlock);
      return updatedBlocks;
    });
  }, []);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    blocks,
    addBlock,
    updateBlock,
    deleteBlock,
    activeBlockId,
    setActiveBlockId,
    moveBlock
  }), [blocks, activeBlockId, addBlock, updateBlock, deleteBlock, moveBlock]);

  return (
    <EditorContext.Provider value={contextValue}>
      {children}
    </EditorContext.Provider>
  );
};

// Regular context hook
export const useEditor = (): EditorContextType => {
  const context = useContext(EditorContext);
  if (context === undefined) {
    throw new Error('useEditor must be used within an EditorProvider');
  }
  return context;
};

// Optimized selector hook
export const useEditorSelector = <T,>(selector: (context: EditorContextType) => T): T => {
  const context = useContext(EditorContext);
  if (context === undefined) {
    throw new Error('useEditorSelector must be used within an EditorProvider');
  }
  return selector(context);
};