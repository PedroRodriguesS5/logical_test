class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.height = 1;
    }
}

class AVLTree {
    constructor() {
        this.root = null;
    }

    height(node) {
        return node ? node.height : -1; // A altura de um nó nulo é -1
    }

    updateHeight(node) {
        node.height = 1 + Math.max(this.height(node.left), this.height(node.right));
    }

    balanceFactor(node) {
        return this.height(node.left) - this.height(node.right);
    }

    rightRotate(y) {
        const x = y.left;
        const T2 = x.right;

        x.right = y;
        y.left = T2;

        this.updateHeight(y);
        this.updateHeight(x);

        return x;
    }

    leftRotate(x) {
        const y = x.right;
        const T2 = y.left;

        y.left = x;
        x.right = T2;

        this.updateHeight(x);
        this.updateHeight(y);

        return y;
    }

    insert(value) {
        this.root = this._insert(this.root, value);
    }

    _insert(root, new_val) {
        if (root === null) {
            // Cria um novo nó com o valor fornecido
            return new TreeNode(new_val);
        }

        if (new_val < root.value) {
            root.left = this._insert(root.left, new_val);
        } else if (new_val > root.value) {
            root.right = this._insert(root.right, new_val);
        } else {
            // Duplicatas não são permitidas (depende da sua implementação)
            return root;
        }

        // Atualiza a altura do nó atual
        this.updateHeight(root);

        // Verifica o fator de balanceamento e realiza rotações se necessário
        const balance = this.balanceFactor(root);

        // Caso Direita Direita
        if (balance > 1 && new_val < root.left.value) {
            return this.rightRotate(root);
        }
        // Caso Esquerda Esquerda
        if (balance < -1 && new_val > root.right.value) {
            return this.leftRotate(root);
        }
        // Caso Direita Esquerda
        if (balance > 1 && new_val > root.left.value) {
            root.left = this.leftRotate(root.left);
            return this.rightRotate(root);
        }
        // Caso Esquerda Direita
        if (balance < -1 && new_val < root.right.value) {
            root.right = this.rightRotate(root.right);
            return this.leftRotate(root);
        }

        return root;
    }
}

// Exemplo de Uso
const avlTree = new AVLTree();
avlTree.insert(3);
avlTree.insert(2);
avlTree.insert(4);
avlTree.insert(5);
avlTree.insert(6);

// Exibindo a árvore resultante
console.log(avlTree.root);