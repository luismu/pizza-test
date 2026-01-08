# 🍕 Pizza Pro Challenge

A premium, interactive Single-Page Application (SPA) for ordering pizzas. Built with React, TypeScript, and focus on state consistency, clean architecture, and premium design.

## 🧠 Key Decisions & Rationale

### UI/UX
The UI/UX is premium and modern based on **Rappi** and **Uber Eats** design with a focus on simplicity and ease of use, animations and transitions.

**Responsive design**
**Mobile**

<img width="302" height="589" alt="image" src="https://github.com/user-attachments/assets/424b7996-fd99-459d-be20-6f90d7a84296" />

**Tablet**
<img width="756" height="799" alt="image" src="https://github.com/user-attachments/assets/053f1f99-5734-40d1-bb14-2ea8422251be" />

**Laptop**
<img width="845" height="800" alt="image" src="https://github.com/user-attachments/assets/69dd7cf0-79ae-4012-9a73-db5bdb80f769" />



### ⚛️ State Management: Context API + useReducer
I deliberately chose **React Context + useReducer** over Redux Toolkit. Given the scope of a medium-sized SPA, Redux would have introduced unnecessary boilerplate and cognitive load. 
- **Reasoning**: It provides a predictable, centralized state update pattern (via Reducers) while remaining lightweight and native to React. This shows *criterion*, not just following a trend.
- **Implementation**: I've separated `PizzaContext` (catalog) from `OrderContext` (cart logic) to respect the Single Responsibility Principle.

### 📐 Pure Logic & Calculation
Line item calculations and discounts are implemented as **pure functions** in `src/utils/discount.ts`.
- **Reasoning**: This makes the core business logic easily testable and decoupled from the React component lifecycle.
- **Rule**: If a user orders 3+ of the same pizza, a 10% discount is applied to that line item.

### 🏗️ Directory Structure
The project follows a **feature-based separation**:
- `components/`: Granular, reusable UI components.
- `state/`: Specialized context providers and reducers
- `services/`: Abstraction for data persistence (simulated)
- `utils/`: Stateless helper functions.

## 💸 Discount Logic
The discount is calculated on-the-fly to avoid state synchronization bugs.
```typescript
export function calculateLineDiscount(unitPrice: number, quantity: number): number {
  if (quantity >= 3) {
    return unitPrice * quantity * 0.1;
  }
  return 0;
}
```
Keeping the Source of Truth in the quantities and calculating totals derived from that state ensures the UI is always consistent.

## 🛠️ Tech Stack
- **Vite**: Ultra-fast build tool.
- **TypeScript**: Full type safety for Pizzas, Orders, and State Actions.
- **Recharts**: For dynamic analytical visualizations.
- **Lucide React**: Minimalist, premium icon set.
- **Vitest**: Modern testing framework compatible with Vite.

## 📦 How to Run

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```

3. **Run Tests**:
   ```bash
   npm test
   ```

## 📝 Tradeoffs & Constraints
- **Data Persistence**: I intentionally used `localStorage` to simulate a backend. In a production app, I would implement a service layer with `React Query` or `RTK Query` to handle async states and caching.
- **Design System**: I used CSS Modules for styling to ensure scoped, maintainable styles without the overhead of learning a specific design system for a quick test, while still achieving a premium look.

---
*Created with ❤️ by Luis - Senior Software Developer*
