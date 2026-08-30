import Image from 'next/image';

interface LogoProps {
  type: 'citizen' | 'admin';
  size?: number;
  className?: string;
}

export default function Logo({ type, size = 48, className = "" }: LogoProps) {
  const src = type === 'citizen' ? '/citizen_logo.jpg' : '/admin_logo.jpg';
  
  return (
    <div className={`rounded-full overflow-hidden flex-shrink-0 border-2 border-gov-gold/50 shadow-md ${className}`} style={{ width: size, height: size }}>
      <img 
        src={src} 
        alt={`${type} Logo`} 
        width={size} 
        height={size}
        className="w-full h-full object-cover"
      />
    </div>
  );
}
