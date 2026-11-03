import { HiArrowLeft, HiArrowRight } from 'react-icons/hi';
import { SlArrowDown, SlArrowUp, SlMenu } from 'react-icons/sl';

import { BottomMenuProps } from '@/lib/definition';

export const BottomMenu = ({
  isOpen,
  setIsOpen,
  isExpanded,
  setIsExpanded,
  product,
  selectedPart,
  partColors,
  handleColorChange,
  handlePartSelect,
}: BottomMenuProps) => {
  const currentIndex = product.parts.findIndex(
    (part) => part.id === selectedPart,
  );
  const currentPart = product.parts.find((part) => part.id === selectedPart);
  const currentNumber = currentIndex !== -1 ? currentIndex + 1 : 1;
  const totalCount = product.parts.length;
  const handleNavigate = (direction: number) => {
    const validIndex = currentIndex === -1 ? 0 : currentIndex;

    const nextIndex =
      (validIndex + direction + product.parts.length) % product.parts.length;

    handlePartSelect(product.parts[nextIndex].id);
  };

  return (
    <div className={`${isOpen ? 'hidden' : ''}`}>
      <div className="grid grid-cols-3 px-12 py-6">
        <div className="justify-self-start">
          <button
            className="flex h-9.5 w-9.5 items-center justify-center rounded-full border border-gray-200 max-sm:hidden"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <SlArrowUp className="h-4 w-4" />
            ) : (
              <SlArrowDown className="h-4 w-4" />
            )}
          </button>
        </div>
        <div className="flex items-center justify-center gap-10">
          <button onClick={() => handleNavigate(-1)}>
            <HiArrowLeft className="h-5 w-5" />
          </button>
          <div className="min-w-64 text-center text-xl whitespace-nowrap max-md:min-w-44">
            <span className="text-[#111111]">{currentPart?.name}</span>
            <span className="ml-2 text-[#757575]">
              {currentNumber} / {totalCount}
            </span>
          </div>
          <button onClick={() => handleNavigate(1)}>
            <HiArrowRight className="h-5 w-5" />
          </button>
        </div>
        <div className="justify-self-end">
          <button
            className="flex items-center gap-2 rounded-full border border-gray-200 px-4 py-1.5 font-bold max-sm:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <SlMenu className="h-5 w-5" />
            メニュー
          </button>
        </div>
      </div>
      <div
        className={`scrollbar-none items-center justify-center gap-4 overflow-x-auto p-6 ${isExpanded ? `hidden` : `flex`}`}
      >
        {product.colorPalette.map((color) => {
          const isSelected = selectedPart
            ? partColors[selectedPart] === color.hex
            : false;
          return (
            <div key={color.id} className="text-center">
              <button
                style={{ backgroundColor: color.hex }}
                className={`h-8 w-8 rounded-full border border-gray-300 ${isSelected ? `ring-1 ring-gray-300 ring-offset-3` : ``}`}
                onClick={() => handleColorChange(color.hex)}
              ></button>
              <div
                className={`mt-2 text-sm whitespace-nowrap ${isSelected ? `opacity-100` : `opacity-0`}`}
              >
                {color.name}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
