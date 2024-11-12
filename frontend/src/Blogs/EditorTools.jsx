export const formats = [
  'header',
  'bold',
  'italic',
  'code-block',
  'list',
  'bullet',
  'indent',
  'link',
  'color',
  'clean',
  'blockquote',
  'underline',
  'strike',
  'size',
  'font',
  'align',
  'background',
];

export const modules = {
  toolbar: {
    container: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'blockquote', 'underline', 'strike'],
      ['code-block', 'link'],
      [{ background: [] }, { color: [] }],
      [{ size: [] }],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      [{ font: [] }],
      [{ align: [] }],
      ['clean'],
    ],
  },
};
