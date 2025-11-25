import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FloatingButtonProps {
  icon: LucideIcon;
  onClick: () => void;
  label: string;
  variant?: 'default' | 'secondary';
}

const FloatingButton = ({ icon: Icon, onClick, label, variant = 'default' }: FloatingButtonProps) => {
  const baseClass = "w-12 h-12 rounded-full shadow-float hover:scale-110 transition-bounce";
  const variantClass = variant === 'default' 
    ? "glass animate-pulse-glow" 
    : "glass-dark";

  return (
    <Button
      onClick={onClick}
      className={`${baseClass} ${variantClass}`}
      size="icon"
      aria-label={label}
    >
      <Icon className="w-5 h-5" />
    </Button>
  );
};

export default FloatingButton;
