import { useEditor } from '../context/EditorContext';
import { BLOCK_TYPES } from '../lib/constants';

export const Toolbar = () => {
  const { addBlock, blocks } = useEditor();

  return (
    <div className="bg-gray-100 p-4 sticky top-0 z-10">
      <div className="flex space-x-2">
        <button
          onClick={() => addBlock(BLOCK_TYPES.HEADING, blocks.length - 1)}
          className="px-3 py-1 bg-white border rounded hover:bg-gray-50"
        >
          Add Heading
        </button>
        <button
          onClick={() => addBlock(BLOCK_TYPES.PARAGRAPH, blocks.length - 1)}
          className="px-3 py-1 bg-white border rounded hover:bg-gray-50"
        >
          Add Paragraph
        </button>
        <button
          onClick={() => addBlock(BLOCK_TYPES.IMAGE, blocks.length - 1)}
          className="px-3 py-1 bg-white border rounded hover:bg-gray-50"
        >
          Add Image
        </button>
        <button
          onClick={() => addBlock(BLOCK_TYPES.VIDEO, blocks.length - 1)}
          className="px-3 py-1 bg-white border rounded hover:bg-gray-50"
        >
          Add Video
        </button>
      </div>
    </div>
  );
};