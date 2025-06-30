
import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface FloatingCartProps {
  totalItems: number;
}

const FloatingCart = ({ totalItems }: FloatingCartProps) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible && totalItems === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        className="relative w-16 h-16 rounded-full cyber-button bg-neon-blue/20 border-2 border-neon-blue/50 hover:border-neon-blue text-neon-blue hover:bg-neon-blue hover:text-black shadow-[0_0_20px_rgba(0,212,255,0.3)] animate-glow"
        onClick={() => {
          // Handle cart click - could open cart modal or navigate to cart page
          console.log('Cart clicked');
        }}
      >
        <ShoppingCart className="w-6 h-6" />
        
        {totalItems > 0 && (
          <Badge className="absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center p-0 bg-neon-pink/90 text-white border-neon-pink/50 font-orbitron font-bold text-xs animate-neon-pulse">
            {totalItems > 99 ? '99+' : totalItems}
          </Badge>
        )}
      </Button>
    </div>
  );
};

export default FloatingCart;
