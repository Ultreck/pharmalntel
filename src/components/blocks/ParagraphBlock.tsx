// src/components/blocks/ParagraphBlock.tsx
import { useEditor } from '../../context/EditorContext';
import { BlockComponentProps } from '../../types/editorTypes';

export const ParagraphBlock = ({ block, index }: BlockComponentProps) => {
  const { updateBlock, setActiveBlockId } = useEditor();

  return (
    <p
      className="mb-4 outline-none"
      contentEditable
      suppressContentEditableWarning
      onInput={(e) => updateBlock(block.id, { content: e.currentTarget.textContent || '' })}
      onFocus={() => setActiveBlockId(block.id)}
      dangerouslySetInnerHTML={{ __html: block.content }}
    />
  );
};