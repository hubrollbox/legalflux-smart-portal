
import { Button } from '@/components/ui/button';

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter = ({ categories, activeCategory, onCategoryChange }: CategoryFilterProps) => {
  return (
    <div className="mb-8">
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((categoria) => (
          <Button
            key={categoria}
            variant={activeCategory === categoria ? "default" : "outline"}
            onClick={() => onCategoryChange(categoria)}
            className={activeCategory === categoria ? "bg-primary-800 hover:bg-primary-700" : ""}
          >
            {categoria}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
