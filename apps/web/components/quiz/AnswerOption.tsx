'use client'

interface AnswerOptionProps {
  option: string
  index: number
  isSelected: boolean
  type: 'radio' | 'checkbox'
  onChange: (index: number, checked: boolean) => void
  disabled?: boolean
}

export default function AnswerOption({
  option,
  index,
  isSelected,
  type,
  onChange,
  disabled = false
}: AnswerOptionProps) {
  const handleChange = () => {
    if (!disabled) {
      onChange(index, !isSelected)
    }
  }

  return (
    <label
      className={`flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
        isSelected
          ? 'border-blue-500 bg-blue-50'
          : 'border-gray-200 hover:border-gray-300 bg-white'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <input
        type={type}
        checked={isSelected}
        onChange={handleChange}
        disabled={disabled}
        className="mt-1 w-4 h-4"
      />
      <span className="flex-1 text-gray-800">{option}</span>
    </label>
  )
}