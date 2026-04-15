// ユーザーアバター表示
export default function UserAvatar({ src, name, size = 'md' }: { src: string; name: string; size?: 'sm' | 'md' | 'lg' }) {
  const sizeClass = { sm: 'w-8 h-8', md: 'w-10 h-10', lg: 'w-16 h-16' }[size];
  return (
    <img src={src} alt={name} className={`${sizeClass} rounded-full bg-bg-card object-cover`} />
  );
}
