import TdClient from '@dibgram/tdweb';

// This file is created to workaround a TypeScript error.

export function createTdClient(op) {
    return new TdClient(op);
}