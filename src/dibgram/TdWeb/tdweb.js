import TdClient from 'tdweb';

export function createTdClient(op) {
    return new TdClient(op);
}