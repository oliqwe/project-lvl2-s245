const jsonRender = (ast) => {
  const res = JSON.stringify(ast, null, ' ');
  return res;
};

export default jsonRender;
