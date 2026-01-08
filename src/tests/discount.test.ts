import { describe, it, expect } from 'vitest';
import { calculateLineDiscount, calculateLineTotal } from '../utils/discount';

describe('Discount Calculations', () => {
    it('should not apply discount if quantity is less than 3', () => {
        expect(calculateLineDiscount(10, 1)).toBe(0);
        expect(calculateLineDiscount(10, 2)).toBe(0);
    });

    it('should apply 10% discount if quantity is 3 or more', () => {

        // 10 * 3 * 0.1 = 3
        expect(calculateLineDiscount(10, 3)).toBe(3);
        // 10 * 5 * 0.1 = 5
        expect(calculateLineDiscount(10, 5)).toBe(5);
    });

    it('should calculate correct line total after discount', () => {

        expect(calculateLineTotal(10, 2)).toBe(20);

        expect(calculateLineTotal(10, 3)).toBe(27);
    });
});
