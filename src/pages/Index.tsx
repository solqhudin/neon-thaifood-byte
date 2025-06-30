
import { useState, useEffect } from 'react';
import { Search, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import HeroCarousel from '@/components/HeroCarousel';
import FoodCard from '@/components/FoodCard';
import FloatingCart from '@/components/FloatingCart';

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

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<{[key: number]: number}>({});
  const [activeSection, setActiveSection] = useState('recommended');
  const { toast } = useToast();

  const foodItems: FoodItem[] = [
    {
      id: 1,
      name: 'ส้มตำไทย',
      nameEn: 'Thai Papaya Salad',
      price: 120,
      image: '/lovable-uploads/f536494c-f87b-4060-af19-e115847ec848.png',
      category: 'salad',
      description: 'ส้มตำรสจัดจ้าน เสิร์ฟพร้อมผักสด',
      popular: true,
      recommended: true
    },
    {
      id: 2,
      name: 'ผัดไทยกุ้งสด',
      nameEn: 'Pad Thai with Fresh Shrimp',
      price: 180,
      image: '/lovable-uploads/ae2f51db-dcd5-440e-8c12-702f777f6071.png',
      category: 'noodle',
      description: 'ผัดไทยกุ้งสดรสชาติเข้มข้น โรยหน้าด้วยถั่วลิสงคั่ว',
      popular: true,
      recommended: true
    },
    {
      id: 3,
      name: 'ปลาทอดน้ำปลา',
      nameEn: 'Fried Fish with Fish Sauce',
      price: 220,
      image: '/lovable-uploads/2a886c64-c084-40ac-a730-2df25430bd23.png',
      category: 'seafood',
      description: 'ปลาทอดกรอบ ราดน้ำปลาหวาน เสิร์ฟพร้อมผักสด',
      popular: true,
      recommended: false
    },
    {
      id: 4,
      name: 'ทอดมันปลา',
      nameEn: 'Thai Fish Cakes',
      price: 150,
      image: '/lovable-uploads/f455e66a-c40b-48c1-9d8e-8a6324e1a81a.png',
      category: 'appetizer',
      description: 'ทอดมันปลาเนื้อแน่น เสิร์ฟพร้อมน้ำจิ้มแจ่วบอง',
      popular: false,
      recommended: true
    },
    {
      id: 5,
      name: 'ยำถั่วพลู',
      nameEn: 'Wild Betel Leaf Salad',
      price: 160,
      image: '/lovable-uploads/4d807182-3b11-42a0-ac29-9c5c9db4cd64.png',
      category: 'salad',
      description: 'ยำถั่วพลูกรอบ รสเปรี้ยวหวานเผ็ด',
      popular: false,
      recommended: false
    },
    {
      id: 6,
      name: 'กุ้งเผา',
      nameEn: 'Grilled Prawns',
      price: 280,
      image: '/lovable-uploads/346a8499-50e7-4e19-ae98-20fa7adc2043.png',
      category: 'seafood',
      description: 'กุ้งใหญ่เผาไฟ หอมกลิ่นใบมะกรูด',
      popular: true,
      recommended: false
    }
  ];

  const addToCart = (item: FoodItem) => {
    setCart(prev => ({
      ...prev,
      [item.id]: (prev[item.id] || 0) + 1
    }));
    
    toast({
      title: "เพิ่มในตะกร้าแล้ว!",
      description: `${item.name} ถูกเพิ่มในตะกร้าของคุณ`,
      duration: 2000,
    });
  };

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, count) => sum + count, 0);
  };

  const filteredItems = foodItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.nameEn.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeSection === 'recommended') return matchesSearch && item.recommended;
    if (activeSection === 'popular') return matchesSearch && item.popular;
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-cyber-gradient">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-black/30 border-b border-neon-blue/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-neon-blue rounded-lg flex items-center justify-center animate-neon-pulse">
                <span className="text-black font-orbitron font-bold">C</span>
              </div>
              <h1 className="text-2xl font-orbitron font-bold text-neon">
                ChefMate
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neon-blue w-4 h-4" />
                <Input
                  placeholder="ค้นหาเมนูอาหาร..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-black/40 border-neon-blue/30 text-white placeholder:text-gray-400 focus:border-cyber-primary focus:ring-cyber-primary"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Menu Navigation */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          {[
            { key: 'recommended', label: 'แนะนำ', color: 'neon-green' },
            { key: 'popular', label: 'ยอดนิยม', color: 'neon-pink' },
            { key: 'all', label: 'เมนูทั้งหมด', color: 'neon-blue' }
          ].map((section) => (
            <Button
              key={section.key}
              onClick={() => setActiveSection(section.key)}
              className={`cyber-button px-6 py-3 font-orbitron font-medium ${
                activeSection === section.key 
                  ? `text-${section.color} border-${section.color}/50 bg-${section.color}/10` 
                  : 'text-white border-white/20 bg-white/5'
              }`}
            >
              {section.label}
              {section.key === 'recommended' && (
                <Badge className="ml-2 bg-neon-green/20 text-neon-green border-neon-green/30">
                  Hot
                </Badge>
              )}
            </Button>
          ))}
        </div>

        {/* Food Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <FoodCard
                item={item}
                onAddToCart={() => addToCart(item)}
              />
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-orbitron text-neon mb-2">ไม่พบเมนูที่ค้นหา</h3>
            <p className="text-gray-400">ลองเปลี่ยนคำค้นหาหรือเลือกหมวดหมู่อื่น</p>
          </div>
        )}
      </div>

      {/* Floating Cart */}
      <FloatingCart totalItems={getTotalItems()} />
    </div>
  );
};

export default Index;
