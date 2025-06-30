
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface FoodItem {
  id: number;
  name: string;
  nameEn: string;
  price: number;
  image: string;
  category: string;
  description: string;
  popular: boolean;
  recommended: boolean;
}

interface FoodCardProps {
  item: FoodItem;
  onAddToCart: () => void;
}

const FoodCard = ({ item, onAddToCart }: FoodCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group relative bg-gray-900/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50 hover:border-neon-blue/50 transition-all duration-300 glow-hover"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {item.recommended && (
            <Badge className="bg-neon-green/20 text-neon-green border-neon-green/30 text-xs font-orbitron">
              แนะนำ
            </Badge>
          )}
          {item.popular && (
            <Badge className="bg-neon-pink/20 text-neon-pink border-neon-pink/30 text-xs font-orbitron">
              ยอดนิยม
            </Badge>
          )}
        </div>

        {/* Glowing border effect on hover */}
        <div className={`
          absolute inset-0 border-2 border-transparent transition-all duration-300
          ${isHovered ? 'border-gradient-to-r from-neon-blue via-neon-pink to-neon-green shadow-[0_0_20px_rgba(0,255,255,0.3)]' : ''}
        `} />
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-orbitron font-semibold text-white text-lg mb-1 group-hover:text-neon transition-colors">
            {item.name}
          </h3>
          <p className="text-gray-400 text-sm font-exo">
            {item.nameEn}
          </p>
        </div>

        <p className="text-gray-300 text-sm line-clamp-2 font-exo">
          {item.description}
        </p>

        <div className="flex items-center justify-between pt-2">
          <div className="text-right">
            <span className="text-2xl font-orbitron font-bold text-neon-green">
              ฿{item.price}
            </span>
          </div>
          
          <Button
            onClick={onAddToCart}
            className="cyber-button px-4 py-2 font-orbitron font-medium text-cyber-primary border-cyber-primary/40 hover:border-cyber-primary hover:text-black hover:bg-cyber-primary"
          >
            เพิ่มในตะกร้า
          </Button>
        </div>
      </div>

      {/* Hover effect overlay */}
      <div className={`
        absolute inset-0 pointer-events-none transition-opacity duration-300
        ${isHovered ? 'opacity-100' : 'opacity-0'}
      `}>
        <div className="absolute inset-0 bg-gradient-to-t from-neon-blue/5 via-transparent to-neon-pink/5" />
      </div>
    </div>
  );
};

export default FoodCard;
