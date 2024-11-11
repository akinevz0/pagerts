export interface TreeLike<T> {
    children: TreeLike<T>[]
    metadata: T
}

