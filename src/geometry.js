import THREE from 'three';

export class DiceBase extends THREE.BufferGeometry {
    /**
     * DiceBase constructor
     * @param{number} size - Size of dice
     * @param{array} vertices - Array of vertices
     * @param{array} indices - Array of indices (optional)
     */
    constructor(size, vertices, indices = null) {
        super();

        const scaled = vertices.map((v) => v * size);
        const positions = indices
            ? indices
                .map((index) =>
                    scaled.slice(index * 3, index * 3 + 3)
                )
                .reduce((result, position) => result.concat(position), [])
            : scaled;

        this.addAttribute(
            'position',
            new THREE.BufferAttribute(new Float32Array(positions), 3)
        );

        this.computeVertexNormals();
    }
}

export class Dice4 extends DiceBase {
    constructor(size) {
        super(size / 2, [
            1,1,1,
            1,-1,-1,
            -1,1,-1,
            -1,-1,1,
        ], [
            0, 1, 2,
            0, 3, 1,
            1, 3, 2,
            2, 3, 0,
        ]);
    }
}

export class Dice6 extends THREE.BoxGeometry {
    constructor(size) {
        super(size, size, size);
    }
}

export class Dice8 extends DiceBase {
    constructor(size) {
        super( size / 1.5, [
             1,  0,  0, // 0:Right
            -1,  0,  0, // 1:Left
             0,  1,  0, // 2:Top
             0, -1,  0, // 3:Bottom
             0,  0,  1, // 4:Front
             0,  0, -1, // 5:Back
        ], [
            0, 2, 4,
            0, 4, 3,
            0, 5, 2,
            0, 3, 5,
            1, 4, 2,
            1, 3, 4,
            1, 2, 5,
            1, 5, 3,
        ]);
    }
}

export class Dice10 extends DiceBase {
    constructor(size) {
        const sp = (1 - Math.cos(36 * Math.PI / 180)) / 2;

        const upper = [];
        const lower = [];
        for (let i = 0; i < 5; i++) {
            const ru = i * Math.PI * 2 / 5;
            upper.push(Math.sin(ru), sp, Math.cos(ru));

            const rl = (i + 0.5) * Math.PI * 2 / 5;
            lower.push(Math.sin(rl), -sp, Math.cos(rl));
        }

        const faces = [];
        for (let i = 0; i < 5; i++) {
            faces.push(10, i, (i + 1) % 5);
            faces.push(i, i + 5, (i + 1) % 5);
            faces.push(i + 5, 11, (i + 1) % 5 + 5);
            faces.push(i + 5, (i + 1) % 5 + 5, (i + 1) % 5);
        }

        super(size, [
            ...upper, // 0...4
            ...lower, // 5...9
            0,  1 + sp,  0, // 10:t
            0, -1 - sp,  0, // 11:b
        ], faces);
    }
}

export class Dice20 extends DiceBase {
    constructor(size) {
        super(size, [
            0.0, -0.50, -0.0,
            0.36180, -0.223608, 0.262860,
            -0.138193, -0.223608, 0.425320,
            -0.447212, -0.223608, -0.0,
            -0.138193, -0.223608, -0.425320,
            0.36180, -0.223608, -0.262860,
            0.138193, 0.223607, 0.425320,
            -0.36180, 0.223607, 0.262860,
            -0.36180, 0.223607, -0.262860,
            0.138193, 0.223607, -0.425320,
            0.447212, 0.223607, -0.0,
            0.0, 0.50, -0.0,
        ], [
            0, 1, 2,
            1, 0, 5,
            0, 2, 3,
            0, 3, 4,
            0, 4, 5,
            1, 5, 10,
            2, 1, 6,
            3, 2, 8,
            4, 3, 8,
            5, 4, 9,
            1, 10, 6,
            2, 6, 8,
            3, 8, 8,
            4, 8, 9,
            5, 9, 10,
            6, 10, 11,
            8, 6, 11,
            8, 8, 11,
            9, 8, 11,
            10, 9, 11,
        ]);
    }
}
