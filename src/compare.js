import _ from 'lodash';

const joinKeys = (prev, curr) => prev === '' ? curr : `${prev}.${curr}`;

const hasChildren = (value) => value && typeof value === 'object' && !Array.isArray(value);

const getChildren = (node) => Object.getOwnPropertyNames(node).sort();


export default (json1, json2) => {
    const iter = (node, ancestry) => {
        const keys = getChildren(node).map((key) => {
            const path = joinKeys(ancestry, key);
            const value = node[key];

            if (_.has(json1, path) && _.has(json2, path)) {
                const before = _.get(json1, path);
                const after = _.get(json2, path);
                if (hasChildren(before) && hasChildren(after)) {
                    return { key, path, type: 'children', children: iter(value, path) };
                };
                if (before === after) {
                    return { key, path, type: 'same', value };
                } else {
                    return { key, path, type: 'changed', before, after };
                }
            } else if (_.has(json1, path) && !_.has(json2, path)) {
                return { key, path, type: 'removed', value };
            } else {
                return { key, path, type: 'added', value }
            };
        });
        return keys;
    };

    const data1 = { ...json1 };
    const data2 = { ...json2 };
    const merged = _.merge({}, data1, data2);
    const nodes = iter(merged, '');

    return nodes;
}
