export default [
  {
    children: [
      { name: 'setting1', status: ' ', value: 'Value 1' },
      { name: 'setting2', status: '-', value: '200' },
      { name: 'setting3', status: '-', value: true },
      { name: 'setting3', status: '+', value: { key: 'value' } },
      {
        children: [
          { name: 'key', status: ' ', value: 'value' },
          { name: 'ops', status: '+', value: 'vops' },
        ],
        name: 'setting6',
        status: ' ',
        value: '',
      },
      { name: 'setting4', status: '+', value: 'blah blah' },
      { name: 'setting5', status: '+', value: { key5: 'value5' } },
    ],
    name: 'common',
    status: ' ',
    value: '',
  },
  {
    children: [
      { name: 'baz', status: '-', value: 'bas' },
      { name: 'baz', status: '+', value: 'bars' },
      { name: 'foo', status: ' ', value: 'bar' },
      { name: 'nest', status: '-', value: { key: 'value' } },
      { name: 'nest', status: '+', value: 'str' },
    ],
    name: 'group1',
    status: ' ',
    value: '',
  },
  { name: 'group2', status: '-', value: { abc: '12345' } },
  { name: 'group3', status: '+', value: { fee: '100500' } },
];
