"use client"

interface SliderButtonProps {
  isMint: boolean
  setIsMint: (value: boolean) => void
}

export default function SliderButton({ isMint, setIsMint }: SliderButtonProps) {
  return (
    <div className="flex bg-gray-100 p-1 rounded-lg">
      <button
        className={`flex-1 py-2 px-4 rounded-md transition-colors ${
          isMint ? 'bg-white shadow-sm' : ''
        }`}
        onClick={() => setIsMint(true)}
      >
        Lend
      </button>
      <button
        className={`flex-1 py-2 px-4 rounded-md transition-colors ${
          !isMint ? 'bg-white shadow-sm' : ''
        }`}
        onClick={() => setIsMint(false)}
      >
        Borrow
      </button>
    </div>
  )
} 