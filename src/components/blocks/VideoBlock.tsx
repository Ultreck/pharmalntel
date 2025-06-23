// src/components/blocks/VideoBlock.jsx
import { useState } from 'react';
import { useEditor } from '../../context/EditorContext';
import ReactPlayer from 'react-player';

type VideoBlockProps = {
  block: {
    id: string;
    data: {
      url?: string;
      caption?: string;
      [key: string]: any;
    };
    [key: string]: any;
  };
  index: number;
};

export const VideoBlock = ({ block, index }: VideoBlockProps) => {
  const { updateBlock, setActiveBlockId } = useEditor();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="mb-4" onFocus={() => setActiveBlockId(block.id)}>
      {block.data.url ? (
        <div>
          <div className="aspect-video bg-black">
            <ReactPlayer
              url={block.data.url}
              width="100%"
              height="100%"
              controls
            />
          </div>
          {block.data.caption && (
            <p className="text-sm text-gray-500 mt-1">{block.data.caption}</p>
          )}
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 rounded p-4 text-center">
          No video URL provided
        </div>
      )}
      
      {isEditing && (
        <div className="mt-2">
          <input
            type="text"
            placeholder="YouTube URL"
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
        </div>
      )}
    </div>
  );
};