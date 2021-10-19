import TdClient from '@dibgram/tdweb';

export function createTdClient(op) {
    return new TdClient(op);
}