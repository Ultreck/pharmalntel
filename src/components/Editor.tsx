// src/components/Editor.tsx
import { useEditor } from '../context/EditorContext';
import { BlockControls } from './blocks/BlockControls';
import { HeadingBlock } from './blocks/HeadingBlock';
import { ParagraphBlock } from './blocks/ParagraphBlock';
import { ImageBlock } from './blocks/ImageBlock';
import { VideoBlock } from './blocks/VideoBlock';
import { Block } from '../types/editorTypes';
import { useDragAndDrop } from '../hooks/useDragAndDrop';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableBlock } from './SortableBlock';

interface BlockComponentProps {
  block: Block;
  index: number;
}

export const Editor = () => {
  const { blocks } = useEditor();
  const {
    sensors,
    handleDragStart,
    handleDragEnd,
    activeId
  } = useDragAndDrop();

  const activeBlock = activeId ? blocks.find(block => block.id === activeId) : null;

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
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={blocks.map(block => block.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="max-w-3xl mx-auto p-4">
          {blocks.map((block, index) => (
            <SortableBlock key={block.id} id={block.id}>
              <div className="relative group">
                {renderBlock(block, index)}
                <BlockControls index={index} blockId={block.id} />
              </div>
            </SortableBlock>
          ))}
          <div className="h-20" /> {/* Spacer at the bottom */}
        </div>
      </SortableContext>

      <DragOverlay>
        {activeBlock ? (
          <div className="opacity-50">
            {renderBlock(activeBlock, blocks.findIndex(block => block.id === activeId)!)}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};