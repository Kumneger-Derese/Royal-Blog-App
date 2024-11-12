import QuillEditor from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { formats, modules } from '../Comments/EditorTool';

const CommentEditor = ({ content, setContent, editorRef, placeholder }) => {
  return (
    <div className=' text-white pb-12 '>
      <QuillEditor
        ref={(el) => (editorRef.current = el)}
        formats={formats}
        modules={modules}
        value={content}
        onChange={(content) => setContent(content)}
        placeholder={placeholder}
        theme='snow'
        style={{ height: '64px' }}
        className='min-h-64 text-white font-semibold placeholder:text-primary'
      />
    </div>
  );
};

export default CommentEditor;
