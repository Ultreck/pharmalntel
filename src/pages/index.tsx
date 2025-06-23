// src/pages/index.js
import { EditorProvider } from '../context/EditorContext';
import { Editor } from '../components/Editor';
import { Toolbar } from '../components/Toolbar';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Notion-style Editor</title>
        <meta name="description" content="A Notion-style content editor" />
      </Head>
      
      <EditorProvider>
        <div className="min-h-screen bg-white">
          <Toolbar />
          <Editor />
        </div>
      </EditorProvider>
    </>
  );
}