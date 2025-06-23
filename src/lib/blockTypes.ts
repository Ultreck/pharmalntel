// src/lib/blockTypes.ts
import { BlockType } from '../types/editorTypes';

export const BLOCK_TYPES: Record<string, BlockType> = {
  HEADING: 'heading',
  PARAGRAPH: 'paragraph',
  IMAGE: 'image',
  VIDEO: 'video'
};

export const DEFAULT_BLOCK_CONTENT: Record<BlockType, any> = {
  heading: '',
  paragraph: '',
  image: { url: '', caption: '' },
  video: { url: '', caption: '' }
};