import { useState, useCallback, memo } from "react";
import ReactPlayer from "react-player";
import { useEditorSelector } from "../../context/EditorContext";
import { BlockComponentProps } from "../../types/editorTypes";

export const VideoBlock = memo(({ block }: BlockComponentProps) => {
  //   const { updateBlock, setActiveBlockId } = useEditor();
  const updateBlock = useEditorSelector((state) => state.updateBlock);
  const setActiveBlockId = useEditorSelector((state) => state.setActiveBlockId);
  const [isEditing, setIsEditing] = useState(true);

  //   const handleSetIsEditing = useCallback(() => {
  //     setIsEditing(true);
  //   }, []);
  console.log(block);
  

  console.log(isEditing);

  const toggleEditing = useCallback(() => {
    setIsEditing((prev) => !prev);
  }, []);

  const handleDone = useCallback(() => {
    setIsEditing(false);
  }, []);

  const handleUpdateUrl = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value) {
        updateBlock(block.id, {
          data: { ...block.data, url: e.target.value },
        });
      }
    },
    [block.id, block.data, updateBlock]
  );

  const handleUpdateCaption = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value) {
        updateBlock(block.id, {
          data: { ...block.data, caption: e.target.value },
        });
      }
    },
    [block.id, block.data, updateBlock]
  );

  const handleFocus = useCallback(() => {
    setActiveBlockId(block.id);
  }, [block.id, setActiveBlockId]);

  return (
    <div className="mb-4" 
    onFocus={handleFocus}
    >
      {block.data.url ? (
        <div>
          <div className="aspect-video bg-black">
            <ReactPlayer
              url={block.data.url}
              width="100%"
              height="100%"
              controls
              onClick={toggleEditing}
            />
          </div>
          {block.data.caption && (
            <p className="text-sm text-gray-500 mt-1">{block.data.caption}</p>
          )}
        </div>
      ) : (
        <div
          className="border-2 border-dashed border-gray-300 rounded p-4 text-center cursor-pointer"
          onClick={() => {
            setIsEditing(true);
            console.log("Clicked to add video");
          }}
        >
          Click to add video
        </div>
      )}

      {isEditing && (
        <div className="mt-2">
          <input
            type="text"
            placeholder="YouTube URL"
            value={block?.data?.url || ""}
            onChange={handleUpdateUrl}
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="text"
            placeholder="Caption (optional)"
            value={block?.data?.caption || ""}
            onChange={handleUpdateCaption}
            className="w-full p-2 border rounded"
          />
          <button
            onClick={handleDone}
            className="mt-2 px-3 py-1 bg-blue-500 text-white rounded"
          >
            Done
          </button>
        </div>
      )}
    </div>
  );
});

VideoBlock.displayName = "VideoBlock"; // Useful for React DevTools
