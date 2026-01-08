import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, ArrowLeft, Save } from 'lucide-react';
import { usePizzas } from '../state/PizzaContext';
import styles from './AddPizza.module.css';

const AddPizza = () => {
    const navigate = useNavigate();
    const { addPizza } = usePizzas();

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category: 'Classic',
        description: '',
    });

    const [ingredients, setIngredients] = useState<string[]>(['']);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleIngredientChange = (index: number, value: string) => {
        const newIngredients = [...ingredients];
        newIngredients[index] = value;
        setIngredients(newIngredients);
    };

    const addIngredientField = () => setIngredients([...ingredients, '']);
    const removeIngredientField = (index: number) => {
        if (ingredients.length > 1) {
            setIngredients(ingredients.filter((_, i) => i !== index));
        }
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.price || parseFloat(formData.price) <= 0) {
            newErrors.price = 'Please enter a valid price';
        }
        if (ingredients.every((i) => !i.trim())) {
            newErrors.ingredients = 'At least one ingredient is required';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (validate()) {
            const newPizza = {
                id: Date.now().toString(),
                name: formData.name,
                price: parseFloat(formData.price),
                ingredients: ingredients.filter((i) => i.trim() !== ''),
                description: formData.description,
                category: formData.category,
            };
            addPizza(newPizza);
            navigate('/');
        }
    };

    return (
        <div className={styles.container}>
            <button onClick={() => navigate(-1)} className={styles.backBtn}>
                <ArrowLeft size={18} />
                <span>Back to Menu</span>
            </button>

            <div className={styles.formCard}>
                <header className={styles.header}>
                    <h1>Add New Pizza</h1>
                    <p>Expand the catalog with a new delicious creation.</p>
                </header>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.field}>
                        <label>Pizza Name *</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className={errors.name ? styles.errorInput : ''}
                            placeholder="e.g. Pepperoni Passion"
                        />
                        {errors.name && <span className={styles.errorText}>{errors.name}</span>}
                    </div>

                    <div className={styles.row}>
                        <div className={styles.field}>
                            <label>Price ($) *</label>
                            <input
                                type="number"
                                min="0"
                                step="0.01"
                                value={formData.price}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    if (parseFloat(val) < 0) return; 
                                    setFormData({ ...formData, price: val });
                                }}
                                onKeyDown={(e) => {
                                    if (['-', 'e', 'E', '+'].includes(e.key)) {
                                        e.preventDefault();
                                    }
                                }}
                                className={errors.price ? styles.errorInput : ''}
                                placeholder="0.00"
                            />
                            {errors.price && <span className={styles.errorText}>{errors.price}</span>}
                        </div>

                        <div className={styles.field}>
                            <label>Category</label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            >
                                <option value="Classic">Classic</option>
                                <option value="Vegetarian">Vegetarian</option>
                                <option value="Exotic">Exotic</option>
                                <option value="Premium">Premium</option>
                            </select>
                        </div>
                    </div>

                    <div className={styles.field}>
                        <label>Ingredients *</label>
                        <div className={styles.ingredientsList}>
                            {ingredients.map((ing, index) => (
                                <div key={index} className={styles.ingredientRow}>
                                    <input
                                        type="text"
                                        value={ing}
                                        onChange={(e) => handleIngredientChange(index, e.target.value)}
                                        placeholder={`Ingredient ${index + 1}`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeIngredientField(index)}
                                        className={styles.removeIngBtn}
                                        disabled={ingredients.length === 1}
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                        {errors.ingredients && <span className={styles.errorText}>{errors.ingredients}</span>}
                        <button type="button" onClick={addIngredientField} className={styles.addIngBtn}>
                            <Plus size={16} />
                            <span>Add Ingredient</span>
                        </button>
                    </div>

                    <div className={styles.field}>
                        <label>Description</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Briefly describe the pizza..."
                            rows={3}
                        />
                    </div>

                    <button type="submit" className={styles.submitBtn}>
                        <Save size={20} />
                        <span>Save Pizza to Menu</span>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddPizza;
