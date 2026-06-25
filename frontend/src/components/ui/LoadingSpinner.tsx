export default function LoadingSpinner({ text = 'Loading...' }: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4">
      <div className="w-12 h-12 border-4 border-primary-100 border-t-primary rounded-full animate-spin" />
      <p className="text-gray-500">{text}</p>
    </div>
  );
}
