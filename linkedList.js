class Node {
	constructor(value, prev, next) {
        this.value = value;
        this.prev = prev;
        this.next = next;
	}
}

class LinkedList {
	constructor() {
        this.head = null;
        this.tail = null;
	}

	addToHead(value) {
        const node = new Node(value, null, this.head);
        (this.head)? this.head.prev = node : (this.tail = node);
        this.head = node;
	}

	addToTail(value) {
        const node = new Node(value, this.tail, null);
        this.tail? this.tail.next = node : this.head = node;
        this.tail = node;
	}

	removeHead() {
        if(!this.head) return null;
        const value = this.head.value;
        this.head = this.head.next;
        this.head? this.head.prev = null : this.tail = null;
        return value;
	}

	removeTail() {
        if(!this.tail) return null;
        const value = this.tail.value;
        this.tail = this.tail.prev;
        this.tail? this.tail.next = null : this.head = null;
        return value;
	}

	search(value) {
        let current = this.head;
        while(current) {
            if (current === value) return value;
            current = current.next;
        }
        return null;
	}

	indexOf(value) {
        const indexes = [];
        let current = this.head;
        let index = 0;
        while(current) {
            (current === value) && indexes.push(index);
            index ++;
            current = current.next;
        }
        return indexes;
	}
}

mocha.setup("bdd");
const { assert } = chai;

describe("Linked List", () => {
	it("Should add to head", () => {
		const list = new LinkedList();
		list.addToHead(1);
		list.addToHead(2);
		list.addToHead(3);
		assert.equal(list.head.prev, null);
		assert.equal(list.head.value, 3);
		assert.equal(list.head.next.value, 2);
		assert.equal(list.tail.prev.value, 1);
		assert.equal(list.tail.value, 1);
		assert.equal(list.tail.next, null);
		assert.equal(list.tail.prev.prev.value, 3);
		assert.equal(list.head.next.next.value, 1);
	});

	it("Should add to tail", () => {
		const list = new LinkedList();
		list.addToTail(1);
		list.addToTail(2);
		list.addToTail(3);
		assert.equal(list.head.prev, null);
		assert.equal(list.head.value, 1);
		assert.equal(list.head.next.value, 2);
		assert.equal(list.tail.prev.value, 2);
		assert.equal(list.tail.value, 3);
		assert.equal(list.tail.next, null);
		assert.equal(list.tail.prev.prev.value, 1);
		assert.equal(list.head.next.next.value, 3);
	});

	it("Should remove head", () => {
		const list = new LinkedList();
		list.addToHead(1);
		list.addToHead(2);
		list.addToHead(3);
		assert.equal(list.removeHead(), 3);
		assert.equal(list.head.value, 2);
		assert.equal(list.tail.value, 1);
		assert.equal(list.tail.next.value, null);
		assert.equal(list.head.next.value, 1);
		assert.equal(list.head.prev, null);
		assert.equal(list.removeHead(), 2);
		assert.equal(list.head.value, 1);
		assert.equal(list.tail.value, 1);
		assert.equal(list.tail.next, null);
		assert.equal(list.head.prev, null);
		assert.equal(list.head.next, null);
		assert.equal(list.removeHead(), 1);
		assert.equal(list.head, null);
		assert.equal(list.tail, null);
	});

	it("Should remove tail", () => {
		const list = new LinkedList();
		list.addToTail(1);
		list.addToTail(2);
		list.addToTail(3);
		assert.equal(list.removeTail(), 3);
		assert.equal(list.head.value, 1);
		assert.equal(list.tail.value, 2);
		assert.equal(list.tail.next.value, 1);
		assert.equal(list.head.prev.value, 2);
		assert.equal(list.tail.prev, null);
		assert.equal(list.removeTail(), 2);
		assert.equal(list.head.value, 1);
		assert.equal(list.tail.value, 1);
		assert.equal(list.tail.next, null);
		assert.equal(list.head.prev, null);
		assert.equal(list.tail.prev, null);
		assert.equal(list.removeTail(), 1);
		assert.equal(list.head, null);
		assert.equal(list.tail, null);
	});

	it("Should search for value", () => {
		const list = new LinkedList();
		list.addToHead(1);
		list.addToHead(2);
		list.addToHead(3);
		assert.equal(list.search(1), 1);
		assert.equal(list.search(2), 2);
		assert.equal(list.search(3), 3);
		assert.equal(list.search(4), null);
	});

	it("Should search for indexes of value", () => {
		const list = new LinkedList();
		list.addToTail(1);
		list.addToTail(2);
		list.addToTail(3);
		list.addToTail(3);
		list.addToTail(1);
		assert.deepEqual(list.indexOf(1), [0, 4]);
		assert.deepEqual(list.indexOf(2), [3]);
		assert.deepEqual(list.indexOf(3), [1, 2]);
		assert.deepEqual(list.indexOf(4), []);
	});
});

mocha.run();
