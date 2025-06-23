export interface Block {
  id: string;
  type: BlockType;
  content: string;
  data: Record<string, any>;
}

export type BlockType = 'heading' | 'paragraph' | 'image' | 'video';

export interface EditorContextType {
  blocks: Block[];
  addBlock: (type: BlockType, index: number) => void;
  updateBlock: (id: string, updates: Partial<Block>) => void;
  deleteBlock: (id: string) => void;
  activeBlockId: string | null;
  setActiveBlockId: (id: string | null) => void;
  moveBlock: (dragIndex: number, hoverIndex: number) => void;
}

export interface BlockComponentProps {
  block: Block;
  index: number;
}