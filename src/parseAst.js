import fs from 'fs';
import lodash from 'lodash';
import path from 'path';
import getParser from './parser';

// const propertyActions = [
//   {
//     name: 'body',
//     check: arg => typeof arg === 'string',
//   },
//   {
//     name: 'children',
//     check: arg => arg instanceof Array,
//   },
//   {
//     name: 'attributes',
//     check: arg => arg instanceof Object,
//   },
// ];


export default (first, second) => {
  const ext = path.extname(first);
  const parse = getParser(ext);
  const before = parse(fs.readFileSync(first, 'utf8'));
  const after = parse(fs.readFileSync(second, 'utf8'));

  const getPropertyAction = arg => find(propertyActions, ({ check }) => check(arg));

  //   const tag = (rest, root) => Object.keys(rest).reduce((acc, arg) =>
  //     //  const { name } = getPropertyAction(arg);
  //    //  console.log(acc, arg);
  //      ({ ...acc, name: arg })
  //     //  return { ...acc, [name]: arg };
  //   , root);

  const parseAst = (tree, bf, af) => {

    return Object.keys(tree).reduce((acc, val) => {
      const rest = tree[val];


      // const root = {
      //   name: val,
      //   state: '',
      //   value: '',
      // };

      if (!lodash.has(bf, val)) {
        //   console.log(val ,  af[val]);
        return [...acc, { name: val, state: '+', value: { ...af[val] } }];
        //   return { acc };
      }
      if (!lodash.has(af, val)) {
      //   console.log(val ,  af[val]);
        return [...acc, { name: val, state: '-', value: { ...bf[val] } }];
      //   return { acc };
      }
      if (tree[val] === 'string') {
        return [...acc, { name: val, state: ' ', value: tree[val] }];
      }

      if (bf[val] instanceof Object && af[val] instanceof Object) {

        return [...acc, { name: val, state: '', children: Object.keys(rest).map((i) => {
          console.log(i);
          return parseAst(tree[val], bf[val], af[val] );
        }) }];
      }

      console.log(acc);

      // if (before[val] instanceof Object && af[val] instanceof Object) {
      //   console.log(before[val], af[val]);
      //   //   return [...acc, `   ${val}: ${before[val]}`];
      // }

      // return [...acc, ` + ${val}: ${af[val]}`, ` - ${val}: ${before[val]}`];

      // if(lodash.has(before[val], val))

      // lodash.has(before[val], before[val]);

      // if(lodash.has(before, val)arg instanceof Object)

      // const node = tag(rest, root);

      // return { ...node, children: node.children.map() };
      return acc;
    }, []);
  };
  const res = parseAst({ ...before, ...after }, before, after);
  console.log(res);
};
