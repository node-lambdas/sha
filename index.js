import { lambda } from 'node-lambdas';

lambda((input, output) => input.pipe(output));
