import React, { useState } from 'react';

interface AvatarProps {
  name: string;
  src?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showStatus?: boolean;
  isOnline?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: 'w-7 h-7 text-xs',
  md: 'w-9 h-9 text-xs font-medium',
  lg: 'w-11 h-11 text-sm font-semibold',
  xl: 'w-14 h-14 text-base font-semibold',
};

const statusClasses = {
  sm: 'w-2 h-2 ring-1',
  md: 'w-2.5 h-2.5 ring-2',
  lg: 'w-3 h-3 ring-2',
  xl: 'w-3.5 h-3.5 ring-2',
};

// Deterministic pastel color palette based on name
const BG_COLORS = [
  'bg-blue-600 text-white',
  'bg-indigo-600 text-white',
  'bg-violet-600 text-white',
  'bg-teal-600 text-white',
  'bg-emerald-600 text-white',
  'bg-amber-600 text-white',
  'bg-rose-600 text-white',
  'bg-cyan-600 text-white',
];

export const Avatar: React.FC<AvatarProps> = ({
  name,
  src,
  size = 'md',
  showStatus = false,
  isOnline = true,
  className = '',
}) => {
  const [imageError, setImageError] = useState(false);

  // Compute initials
  const initials = name
    .split(' ')
    .filter(Boolean)
    .map(n => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase() || 'U';

  // Compute color based on name string
  const colorIndex =
    Math.abs(
      name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    ) % BG_COLORS.length;
  const colorClass = BG_COLORS[colorIndex];

  return (
    <div className={`relative inline-flex shrink-0 ${className}`}>
      {src && !imageError ? (
        <img
          src={src}
          alt={name}
          onError={() => setImageError(true)}
          className={`${sizeClasses[size]} rounded-full object-cover ring-1 ring-slate-200/80 shadow-xs`}
        />
      ) : (
        <div
          className={`${sizeClasses[size]} ${colorClass} rounded-full flex items-center justify-center tracking-tight shadow-xs select-none`}
        >
          {initials}
        </div>
      )}

      {showStatus && (
        <span
          className={`absolute bottom-0 right-0 rounded-full ring-white ${statusClasses[size]} ${
            isOnline ? 'bg-emerald-500' : 'bg-slate-300'
          }`}
          title={isOnline ? 'Online' : 'Offline'}
        />
      )}
    </div>
  );
};
