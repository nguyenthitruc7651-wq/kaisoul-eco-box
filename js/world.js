/**
 * KAISOUL ECO BOX — Falling-Sand World Grid Logic
 */
class World {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.grid = new Uint8Array(width * height);
        this.updatedFrame = new Uint8Array(width * height);
        this.activeParticlesCount = 0;
    }

    getIndex(x, y) {
        return y * this.width + x;
    }

    inBounds(x, y) {
        return x >= 0 && x < this.width && y >= 0 && y < this.height;
    }

    getMat(x, y) {
        if (!this.inBounds(x, y)) return MATERIALS.STONE;
        return this.grid[this.getIndex(x, y)];
    }

    setMat(x, y, mat) {
        if (this.inBounds(x, y)) {
            this.grid[this.getIndex(x, y)] = mat;
        }
    }

    clear() {
        this.grid.fill(MATERIALS.EMPTY);
        this.updatedFrame.fill(0);
        this.activeParticlesCount = 0;
    }

    swap(x1, y1, x2, y2) {
        const idx1 = this.getIndex(x1, y1);
        const idx2 = this.getIndex(x2, y2);
        const temp = this.grid[idx1];
        this.grid[idx1] = this.grid[idx2];
        this.grid[idx2] = temp;
        this.updatedFrame[idx2] = 1;
    }

    update() {
        this.updatedFrame.fill(0);
        let count = 0;

        for (let y = this.height - 1; y >= 0; y--) {
            const scanLeftToRight = Math.random() < 0.5;
            for (let i = 0; i < this.width; i++) {
                const x = scanLeftToRight ? i : (this.width - 1 - i);
                const idx = this.getIndex(x, y);
                const mat = this.grid[idx];

                if (mat === MATERIALS.EMPTY) continue;
                count++;

                if (this.updatedFrame[idx] === 1) continue;

                this.updateCell(x, y, mat);
            }
        }
        this.activeParticlesCount = count;
    }

    updateCell(x, y, mat) {
        // Đất (Soil)
        if (mat === MATERIALS.SOIL) {
            const below = this.getMat(x, y + 1);
            if (below === MATERIALS.EMPTY || below === MATERIALS.WATER) {
                this.swap(x, y, x, y + 1);
                return;
            }
            const dir = Math.random() < 0.5 ? -1 : 1;
            if (this.getMat(x + dir, y + 1) === MATERIALS.EMPTY) {
                this.swap(x, y, x + dir, y + 1);
                return;
            }
            if (this.getMat(x - dir, y + 1) === MATERIALS.EMPTY) {
                this.swap(x, y, x - dir, y + 1);
                return;
            }
        }

        // Nước (Water)
        else if (mat === MATERIALS.WATER) {
            const below = this.getMat(x, y + 1);
            if (below === MATERIALS.EMPTY) {
                this.swap(x, y, x, y + 1);
                return;
            }
            if (below === MATERIALS.WOOD) { // Gỗ nổi lên
                this.swap(x, y, x, y + 1);
                return;
            }

            const dir = Math.random() < 0.5 ? -1 : 1;
            if (this.getMat(x + dir, y + 1) === MATERIALS.EMPTY) {
                this.swap(x, y, x + dir, y + 1);
                return;
            }
            if (this.getMat(x - dir, y + 1) === MATERIALS.EMPTY) {
                this.swap(x, y, x - dir, y + 1);
                return;
            }

            const dispRate = MATERIAL_PROPS[MATERIALS.WATER].dispersionRate;
            for (let i = 1; i <= dispRate; i++) {
                const side = this.getMat(x + dir * i, y);
                if (side === MATERIALS.EMPTY) {
                    this.swap(x, y, x + dir * i, y);
                    return;
                } else if (side !== MATERIALS.WATER) {
                    break;
                }
            }
        }

        // Đá (Stone)
        else if (mat === MATERIALS.STONE) {
            const below = this.getMat(x, y + 1);
            if (below === MATERIALS.EMPTY || below === MATERIALS.WATER) {
                this.swap(x, y, x, y + 1);
            }
        }

        // Gỗ (Wood)
        else if (mat === MATERIALS.WOOD) {
            const below = this.getMat(x, y + 1);
            if (below === MATERIALS.EMPTY) {
                this.swap(x, y, x, y + 1);
            }
        }
    }
}
