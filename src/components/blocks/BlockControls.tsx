// src/components/blocks/BlockControls.jsx
import { useEditor } from '../../context/EditorContext';
import { BLOCK_TYPES } from '../../lib/blockTypes';

interface BlockControlsProps {
  blockId: string;
  index: number;
}

export const BlockControls = ({ blockId, index }: BlockControlsProps) => {
  const { addBlock, deleteBlock } = useEditor();

  return (
    <div className="absolute -left-10 top-0 opacity-0 group-hover:opacity-100 transition-opacity">
      <div className="flex flex-col space-y-1">
        <button
          onClick={() => addBlock(BLOCK_TYPES.HEADING, index)}
          className="p-1 bg-gray-200 rounded hover:bg-gray-300"
          title="Add heading"
        >
          H
        </button>
        <button
          onClick={() => addBlock(BLOCK_TYPES.PARAGRAPH, index)}
          className="p-1 bg-gray-200 rounded hover:bg-gray-300"
          title="Add paragraph"
        >
          P
        </button>
        <button
          onClick={() => addBlock(BLOCK_TYPES.IMAGE, index)}
          className="p-1 bg-gray-200 rounded hover:bg-gray-300"
          title="Add image"
        >
          I
        </button>
        <button
          onClick={() => addBlock(BLOCK_TYPES.VIDEO, index)}
          className="p-1 bg-gray-200 rounded hover:bg-gray-300"
          title="Add video"
        >
          V
        </button>
        <button
          onClick={() => deleteBlock(blockId)}
          className="p-1 bg-red-200 rounded hover:bg-red-300"
          title="Delete block"
        >
          ×
        </button>
      </div>
    </div>
  );
};