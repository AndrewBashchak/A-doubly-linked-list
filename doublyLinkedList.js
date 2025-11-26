class Node {
    constructor(value) {
        this.value = value;
        this.prev = null;
        this.next = null;
    };
};

class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    };

    addFirst(value) {
        const newNode = new Node(value);

        if (!this.head) {
            this.head = this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        };

        this.size++;
    };

    addLast(value) {
        const newNode = new Node(value);

        if (!this.tail) {
            this.head = this.tail = newNode;
        } else {
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
        };

        this.size++;
    };

    removeFirst() {
        if (!this.head) return null;
        const value = this.head.value;
        this.head = this.head.next;
        if (this.head) this.head.prev = null;
        else this.tail = null;
        this.size--;
        return value;
    };

    removeLast() {
        if (!this.tail) return null;
        const value = this.tail.value;
        this.tail = this.tail.prev;
        if (this.tail) this.tail.next = null;
        else this.head = null;
        this.size--;
        return value;
    };

    ifContains(value) {
        let current = this.head;

        while (current) {
            if (current.value === value) return true;
            current = current.next;
        };

        return false;
    };

    getElementByIndex(index) {
        if (index < 0 || index >= this.size) return null;

        let current = this.head;
        let i = 0;

        while (i < index) {
            current = current.next;
            i++;
        };

        return current.value;
    };

    insertIndex(index, value) {
        if (index < 0 || index > this.size) return false;
        if (index === 0) {
            this.addFirst(value);

            return true;
        };

        if (index === this.size) {
            this.addLast(value);

            return true;
        };

        const newNode = new Node(value);

        let current = this.head;
        let i = 0;

        while (i < index) {
            current = current.next;
            i++;
        };

        newNode.prev = current.prev;
        newNode.next = current;

        current.prev.next = newNode;
        current.prev = newNode;

        this.size++;

        return true;
    };

    removeIndex(index) {
        if (index < 0 || index >= this.size) return null;
        if (index === 0) return this.removeFirst();
        if (index === this.size - 1) return this.removeLast();

        let current = this.head;
        let i = 0;

        while (i < index) {
            current = current.next;
            i++;
        };

        const value = current.value;

        current.prev.next = current.next;
        current.next.prev = current.prev;

        this.size--;

        return value;
    };

    getMax() {
        if (!this.head) return null;

        let max = this.head.value;
        let current = this.head.next;

        while (current) {
            if (current.value > max) max = current.value;
            current = current.next;
        };

        return max;
    };

    getMin() {
        if (!this.head) return null;

        let min = this.head.value;
        let current = this.head.nex
        
        while (current) {
            if (current.value < min) min = current.value;
            current = current.next;
        };

        return min;
    };

    getSize() {
        return this.size;
    };

    format() {
        let result = "{";
        let current = this.head;
        let i = 0;

        while (current) {
            result += `[index:${i}; value:${current.value}]`;
            current = current.next;
            i++;

            if (current) result += " ";
        };

        result += "}";
        return result;
    };

    insertArray(index, arr) {
        if (index < 0 || index > this.size) return false;

        for (let i = 0; i < arr.length; i++) {
            this.insertIndex(index + i, arr[i]);
        };

        return true;
    };
};

const list = new DoublyLinkedList();

list.addFirst(10);
list.addLast(20);
list.addLast(30);
list.addFirst(5);
console.log("After insertion:", list.format());

list.removeFirst();
list.removeLast();
console.log("After removal:", list.format());

console.log("Is there 20?:", list.ifContains(20));
console.log("Is there 30?:", list.ifContains(30));

console.log("Index 0:", list.getElementByIndex(0));
console.log("Index 1:", list.getElementByIndex(1));

list.insertIndex(1, 15);
console.log("After insertion by index:", list.format());

list.removeIndex(0);
console.log("After removal by index:", list.format());

console.log("Min:", list.getMin());
console.log("Max:", list.getMax());
console.log("Size:", list.getSize());

list.insertArray(1, [100, 200, 300]);
console.log("After inserting an array by index:", list.format());

