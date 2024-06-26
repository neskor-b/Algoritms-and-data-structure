import BinarySearchTree from '../binary-search-tree';

describe('BinarySearchTree', () => {
    it('should insert a value correctly', () => {
        const tree = new BinarySearchTree();
        tree.insert(10);
        expect(tree.root?.val).toBe(10);
        tree.insert(15);
        expect(tree.root?.right?.val).toBe(15);
        tree.insert(5);
        expect(tree.root?.left?.val).toBe(5);
        tree.insert(20);
        expect(tree.root?.right?.right?.val).toBe(20);
        tree.insert(6);
        expect(tree.root?.left?.right?.val).toBe(6);
        tree.insert(2);
        expect(tree.root?.left?.left?.val).toBe(2);
    });

    it('shoud insert value with selector correctly', () => {
        const tree = new BinarySearchTree<{ name: string; id: number }>((data) => data.id);
        tree.insert({ name: 'test', id: 10 });
        expect(tree.root?.val).toEqual({ name: 'test', id: 10 });
        tree.insert({ name: 'test', id: 15 });
        expect(tree.root?.right?.val).toEqual({ name: 'test', id: 15 });
        tree.insert({ name: 'test', id: 5 });
        expect(tree.root?.left?.val).toEqual({ name: 'test', id: 5 });
        tree.insert({ name: 'test', id: 20 });
        expect(tree.root?.right?.right?.val).toEqual({ name: 'test', id: 20 });
        tree.insert({ name: 'test', id: 6 });
        expect(tree.root?.left?.right?.val).toEqual({ name: 'test', id: 6 });
        tree.insert({ name: 'test', id: 2 });
        expect(tree.root?.left?.left?.val).toEqual({ name: 'test', id: 2 });
    });

    it('shoud increase the count of a value correctly', () => {
        const tree = new BinarySearchTree();
        tree.insert(10);
        expect(tree.root?.count).toBe(1);
        tree.insert(10);
        expect(tree.root?.count).toBe(2);
        tree.insert(15);
        expect(tree.root?.right?.count).toBe(1);
        tree.insert(15);
        expect(tree.root?.right?.count).toBe(2);
    });

    it('shoud find a value correctly', () => {
        const tree = new BinarySearchTree();
        tree.insert(10);
        tree.insert(15);
        tree.insert(5);
        expect(tree.find(5)?.val).toBe(5);
    });

    it('shoud find a value correctly with selector', () => {
        const tree = new BinarySearchTree<{ name: string; id: number }>();
        tree.insert({ name: 'test', id: 1 });
        tree.insert({ name: 'test', id: 2 });
        tree.insert({ name: 'test', id: 3 });
        tree.insert({ name: 'test', id: 4 });
        tree.insert({ name: 'test', id: 5 });
        tree.insert({ name: 'test', id: 6 });
        const result = tree.find((data) => data?.id === 6);
        expect(result?.val).toEqual({ name: 'test', id: 6 });
    });

    it('shoud remove a value correctly', () => {
        const tree = new BinarySearchTree();
        tree.insert(10);
        tree.insert(15);
        tree.insert(5);
        tree.insert(2);
        tree.remove(5);
        expect(tree.find(5)).toBeNull();
        expect(tree.root?.left?.val).toBe(2);
    });

    it('shoud remove a value correctly with selector', () => {
        const tree = new BinarySearchTree<{ name: string; id: number }>((data) => data.id);
        tree.insert({ name: 'test', id: 10 });
        tree.insert({ name: 'test', id: 15 });
        tree.insert({ name: 'test', id: 5 });
        tree.insert({ name: 'test', id: 2 });
        tree.remove((data) => data?.id === 5);
        expect(tree.find((data) => data?.id === 5)).toBeNull();
        expect(tree.root?.left?.val).toEqual({ name: 'test', id: 2 });
    });

    it('shoud run bfs correctly', () => {
        const tree = new BinarySearchTree();
        tree.insert(10);
        tree.insert(15);
        tree.insert(5);
        tree.insert(2);
        expect(tree.bfs()).toEqual([10, 5, 15, 2]);
    });

    it('shoud call callback correctly while runing bfs', () => {
        const tree = new BinarySearchTree<number>();
        const result: number[] = [];
        tree.insert(10);
        tree.insert(15);
        tree.insert(5);
        tree.insert(2);
        tree.bfs((val) => result.push(val * 2));
        expect(result).toEqual([20, 10, 30, 4]);
    });

    it('shoud run dfsPreOrder correctly', () => {
        const tree = new BinarySearchTree<number>();
        tree.insert(10);
        tree.insert(15);
        tree.insert(6);
        tree.insert(8);
        tree.insert(3);
        tree.insert(20);
        expect(tree.dfsPreOrder()).toEqual([10, 6, 3, 8, 15, 20]);
    });

    it('shoud call callback correctly while runing dfsPreOrder', () => {
        const tree = new BinarySearchTree<number>();
        const result: number[] = [];
        tree.insert(10);
        tree.insert(15);
        tree.insert(6);
        tree.insert(8);
        tree.insert(3);
        tree.insert(20);
        tree.dfsPreOrder((val) => result.push(val * 2));
        expect(result).toEqual([20, 12, 6, 16, 30, 40]);
    });

    it('shoud run dfsPostOrder correctly', () => {
        const tree = new BinarySearchTree<number>();
        tree.insert(10);
        tree.insert(15);
        tree.insert(6);
        tree.insert(8);
        tree.insert(3);
        tree.insert(20);
        expect(tree.dfsPostOrder()).toEqual([3, 8, 6, 20, 15, 10]);
    });

    it('shoud call callback correctly while runing dfsPostOrder', () => {
        const tree = new BinarySearchTree<number>();
        const result: number[] = [];
        tree.insert(10);
        tree.insert(15);
        tree.insert(6);
        tree.insert(8);
        tree.insert(3);
        tree.insert(20);
        tree.dfsPostOrder((val) => result.push(val * 2));
        expect(result).toEqual([6, 16, 12, 40, 30, 20]);
    });

    it('shoud run dfsInOrder correctly', () => {
        const tree = new BinarySearchTree<number>();
        tree.insert(10);
        tree.insert(15);
        tree.insert(6);
        tree.insert(8);
        tree.insert(3);
        tree.insert(20);
        expect(tree.dfsInOrder()).toEqual([3, 6, 8, 10, 15, 20]);
    });

    it('shoud call callback correctly while runing dfsInOrder', () => {
        const tree = new BinarySearchTree<number>();
        const result: number[] = [];
        tree.insert(10);
        tree.insert(15);
        tree.insert(6);
        tree.insert(8);
        tree.insert(3);
        tree.insert(20);
        tree.dfsInOrder((val) => result.push(val * 2));
        expect(result).toEqual([6, 12, 16, 20, 30, 40]);
    });
});
