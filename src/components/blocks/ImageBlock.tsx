// src/components/blocks/ImageBlock.tsx
import { useState } from 'react';
import { useEditor } from '../../context/EditorContext';
import { BlockComponentProps } from '../../types/editorTypes';

export const ImageBlock = ({ block, index }: BlockComponentProps) => {
  const { updateBlock, setActiveBlockId } = useEditor();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="mb-4" onFocus={() => setActiveBlockId(block.id)}>
      {block.data.url ? (
        <div>
          <img 
            src={block.data.url} 
            alt={block.data.caption || ''} 
            className="max-w-full rounded"
          />
          {block.data.caption && (
            <p className="text-sm text-gray-500 mt-1">{block.data.caption}</p>
          )}
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 rounded p-4 text-center">
          No image selected
        </div>
      )}
      
      {isEditing && (
        <div className="mt-2">
          <input