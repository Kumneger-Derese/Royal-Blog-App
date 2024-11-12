import QuillEditor from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { formats, modules } from './EditorTools';

export default function BlogEditor({ content, setContent, editorRef }) {
  return (
    <div className='text-white '>
      <QuillEditor
        ref={(el) => (editorRef.current = el)}
        formats={formats}
        modules={modules}
        value={content}
        onChange={(content) => setContent(content)}
        placeholder='Create awesome content...'
        theme='snow'
        className='h-72 text-white font-semibold placeholder:text-white'
      />
    </div>
  );
}
