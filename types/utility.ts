/**
 * 配列のように与えて、Unionを作成するUtility
 * @example
 * type T = UnionFromTypeArray<[1, 2, 3]> // 1 | 2 | 3
 */
export type UnionFromTypeArray<T extends any[]> = T[number];
