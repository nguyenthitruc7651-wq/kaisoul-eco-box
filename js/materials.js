/**
 * KAISOUL ECO BOX — Material System Definitions
 */
const MATERIALS = {
    EMPTY: 0,
    SOIL: 1,
    WATER: 2,
    STONE: 3,
    WOOD: 4
};

const MATERIAL_PROPS = {
    [MATERIALS.EMPTY]: { name: 'Khí', color: null, type: 'gas' },
    [MATERIALS.SOIL]: { name: 'Đất', color: [139, 90, 43], density: 10, type: 'solid_powder' },
    [MATERIALS.WATER]: { name: 'Nước', color: [56, 189, 248], density: 5, dispersionRate: 4, type: 'liquid' },
    [MATERIALS.STONE]: { name: 'Đá', color: [100, 116, 139], density: 100, type: 'solid_immovable' },
    [MATERIALS.WOOD]: { name: 'Gỗ', color: [217, 119, 6], density: 3, type: 'solid_immovable', buoyant: true }
};
