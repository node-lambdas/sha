import { lambda, Format } from '@node-lambdas/core';
import { createHash } from 'crypto';

const configuration = {
  version: 2,
  actions: {
    encode: {
      default: true,
      input: Format.Buffer,
      output: Format.Text,
      description:
        `Calculate a hash for any input.\nYou can specify hash type with --type option.\n\nMust be one of 1, 256 or 512`,
      options: {
        type: 'number',
      },
      handler: (input, output) => {
        const type = Number(input.options.type);

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
      },
    },
  },
};

lambda(configuration);
