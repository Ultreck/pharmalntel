import { useEditor } from '../../context/EditorContext';
import { BlockComponentProps } from '../../types/editorTypes';

export const HeadingBlock = ({ block, index }: BlockComponentProps) => {
  const { updateBlock, setActiveBlockId } = useEditor();

  return (
    <h2
      className="text-2xl font-bold mb-4 outline-none"
      contentEditable
      suppressContentEditableWarning
      onInput={(e) => updateBlock(block.id, { content: e.currentTarget.textContent || '' })}
      onFocus={() => setActiveBlockId(block.id)}
      dangerouslySetInnerHTML={{ __html: block.content }}
    />
  );
};