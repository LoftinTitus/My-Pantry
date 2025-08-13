import React from 'react';
import { TrendingUp, ShoppingCart, Package, UtensilsCrossed } from 'lucide-react';

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  {
    id: 'calories',
    name: 'Calories',
    icon: TrendingUp,
    color: 'bg-pink-100',
    activeColor: 'bg-pink-200'
  },
  {
    id: 'grocery',
    name: 'Grocery',
    icon: ShoppingCart,
    color: 'bg-blue-100',
    activeColor: 'bg-blue-200'
  },
  {
    id: 'pantry',
    name: 'Pantry',
    icon: Package,
    color: 'bg-green-100',
    activeColor: 'bg-green-200'
  },
  {
    id: 'meals',
    name: 'Meals',
    icon: UtensilsCrossed,
    color: 'bg-purple-100',
    activeColor: 'bg-purple-200'
  }
];

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-gray-100 pb-safe">
      <div className="flex justify-around items-center py-2 px-6 max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-300 ios-button
                ${isActive ? tab.activeColor + ' scale-110' : tab.color + ' hover:scale-105'}
                min-w-[60px]
              `}
            >
              <Icon 
                size={24} 
                className={`
                  transition-colors duration-300
                  ${isActive ? 'text-gray-700' : 'text-gray-500'}
                `}
              />
              <span className={`
                text-xs mt-1 transition-colors duration-300
                ${isActive ? 'text-gray-700' : 'text-gray-500'}
              `}>
                {tab.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}