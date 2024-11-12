export const formats = [
  'header',
  'bold',
  'italic',
  'code-block',
  'list',
  'bullet',
  'color',
  'clean',
  'underline',
  'strike',
];

export const modules = {
  toolbar: {
    container: [
      [{ header: [3, 4, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      ['code-block', 'link'],
      [{ color: [] }],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['clean'],
    ],
  },
};
