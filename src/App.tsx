import { EditorProvider } from './context/EditorContext';
import { Toolbar } from './components/Toolbar';
import { Editor } from './components/Editor';

function App() {
  return (
    <EditorProvider>
      <div className="min-h-screen bg-white">
        <Toolbar />
        <Editor />
      </div>
    </EditorProvider>
  );
}

export default App;