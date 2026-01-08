/**
 * Calculates the discount for a single line item.
 * Rule: If quantity is 3 or more, apply a 10% discount.
 */
export function calculateLineDiscount(unitPrice: number, quantity: number): number {
    if (quantity >= 3) {
        return unitPrice * quantity * 0.1;
    }
    return 0;
}

/**
 * Calculates the total for a line item after discount.
 */
export function calculateLineTotal(unitPrice: number, quantity: number): number {
    const subtotal = unitPrice * quantity;
    const discount = calculateLineDiscount(unitPrice, quantity);
    return subtotal - discount;
}
