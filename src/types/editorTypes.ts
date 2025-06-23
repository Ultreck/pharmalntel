// src/types/editorTypes.ts
import { UniqueIdentifier } from '@dnd-kit/core';

// Add this to your existing types
export type BlockId = string; // Ensure all block IDs are strings

export interface Block {
  id: string;
  type: BlockType;
  content: string;
  data: Record<string, any>;
}

export type BlockType = 'heading' | 'paragraph' | 'image' | 'video';

// In your editorTypes.ts
export interface EditorContextType {
  blocks: Block[];
  addBlock: (type: BlockType, index: number) => void;
  updateBlock: (id: string, updates: Partial<Block>) => void;
  deleteBlock: (id: string) => void;
  activeBlockId: string | null;
  setActiveBlockId: (id: string | null) => void;
  moveBlock: (fromIndex: number, toIndex: number) => void; // Add this line
}

export interface BlockComponentProps {
  block: Block;
  index: number;
}