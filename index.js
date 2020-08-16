import { lambda } from '@node-lambdas/core';
import { createHash } from 'crypto';

const configuration = {
  version: 1,
  readBody: true,
};

lambda(configuration, (input, output) => {
  const type = Number(input.url.slice(1));

  switch (type) {
    case 1:
    case 256:
    case 512:
      const hash = createHash('sha' + type);
      output.send(hash.update(input.body).digest('hex'));
      break;

    default:
      output.reject('Invalid hash type. Must be one of 1, 256 or 512');
      return;
  }
});
