export interface TreeLike<K, V = TreeLike<K, undefined>> {
    children: V[]
    metadata: K
}

