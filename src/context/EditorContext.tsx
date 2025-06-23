// src/context/EditorContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';
import { Block, BlockType, EditorContextType } from '../types/editorTypes';

const EditorContext = createContext<EditorContextType | undefined>(undefined);

interface EditorProviderProps {
  children: ReactNode;
}

export const EditorProvider = ({ children }: EditorProviderProps) => {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [activeBlockId, setActiveBlockId] = useState<string | null>(null);

  const addBlock = (type: BlockType, index: number) => {
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
  };

  const updateBlock = (id: string, updates: Partial<Block>) => {
    setBlocks(prev => 
      prev.map(block => 
        block.id === id ? { ...block, ...updates } : block
      )
    );
  };

  const deleteBlock = (id: string) => {
    setBlocks(prev => prev.filter(block => block.id !== id));
  };

  return (
    <EditorContext.Provider
      value={{
        blocks,
        addBlock,
        updateBlock,
        deleteBlock,
        activeBlockId,
        setActiveBlockId
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export const useEditor = (): EditorContextType => {
  const context = useContext(EditorContext);
  if (context === undefined) {
    throw new Error('useEditor must be used within an EditorProvider');
  }
  return context;
};