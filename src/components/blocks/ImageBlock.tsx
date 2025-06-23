import { useState } from 'react';
import { useEditor } from '../../context/EditorContext';
import { BlockComponentProps } from '../../types/editorTypes';

export const ImageBlock = ({ block, index }: BlockComponentProps) => {
  const { updateBlock, setActiveBlockId } = useEditor();
  const [isEditing, setIsEditing] = useState(false);
console.log(index);

  return (
    <div className="mb-4" onFocus={() => setActiveBlockId(block.id)}>
      {block.data.url ? (
        <div>
          <img 
            src={block.data.url} 
            alt={block.data.caption || ''} 
            className="max-w-full rounded"
            onClick={() => setIsEditing(!isEditing)}
          />
          {block.data.caption && (
            <p className="text-sm text-gray-500 mt-1">{block.data.caption}</p>
          )}
        </div>
      ) : (
        <div 
          className="border-2 border-dashed border-gray-300 rounded p-4 text-center cursor-pointer"
          onClick={() => setIsEditing(true)}
        >
          Click to add image
        </div>
      )}
      
      {isEditing && (
        <div className="mt-2">
          <input
            type="text"
            placeholder="Image URL"
            value={block.data.url || ''}
            onChange={(e) => updateBlock(block.id, { 
              data: { ...block.data, url: e.target.value } 
            })}
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="text"
            placeholder="Caption (optional)"
            value={block.data.caption || ''}
            onChange={(e) => updateBlock(block.id, { 
              data: { ...block.data, caption: e.target.value } 
            })}
            className="w-full p-2 border rounded"
          />
          <button
            onClick={() => setIsEditing(false)}
            className="mt-2 px-3 py-1 bg-blue-500 text-white rounded"
          >
            Done
          </button>
        </div>
      )}
    </div>
  );
};