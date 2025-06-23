import { useEditor } from '../context/EditorContext';
import { BlockControls } from './blocks/BlockControls';
import { HeadingBlock } from './blocks/HeadingBlock';
import { ParagraphBlock } from './blocks/ParagraphBlock';
import { ImageBlock } from './blocks/ImageBlock';
import { VideoBlock } from './blocks/VideoBlock';
import { Block } from '../types/editorTypes';
import { useDragAndDrop } from '../hooks/useDragAndDrop';

interface BlockComponentProps {
  block: Block;
  index: number;
}

export const Editor = () => {
  const { blocks } = useEditor();
  const { sensors, handleDragStart, handleDragEnd, handleDragOver } = useDragAndDrop();

  const renderBlock = (block: Block, index: number) => {
    const props: BlockComponentProps = { block, index };
    
    switch (block.type) {
      case 'heading':
        return <HeadingBlock key={block.id} {...props} />;
      case 'paragraph':
        return <ParagraphBlock key={block.id} {...props} />;
      case 'image':
        return <ImageBlock key={block.id} {...props} />;
      case 'video':
        return <VideoBlock key={block.id} {...props} />;
      default:
        return <ParagraphBlock key={block.id} {...props} />;
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      {blocks.map((block, index) => (
        <div 
          key={block.id} 
          className="relative group"
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragEnd={handleDragEnd}
          onDragOver={(e) => handleDragOver(e, index)}
        >
          {renderBlock(block, index)}
          <BlockControls index={index} blockId={block.id} />
        </div>
      ))}
      <div className="h-20" /> {/* Spacer at the bottom */}
    </div>
  );
};