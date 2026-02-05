import { TextField, Label, Input } from 'react-aria-components';
import { Filters } from '../../../types/brewery';

interface FilterInputProps {
  field: keyof Filters;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

export function FilterInput({
  field,
  label,
  placeholder,
  value,
  onChange,
}: FilterInputProps) {
  return (
    <TextField
      value={value}
      onChange={onChange}
      className="flex flex-col"
    >
      <Label className="text-xs sm:text-sm font-medium text-gray-300 dark:text-gray-300 mb-2">
        {label}
      </Label>
      <Input
        placeholder={placeholder}
        className="w-full min-h-[44px] px-4 py-3 text-base sm:text-sm bg-gray-700 dark:bg-gray-700 border border-gray-600 dark:border-gray-600 rounded-lg text-gray-100 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
      />
    </TextField>
  );
}
