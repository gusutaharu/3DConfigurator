import { RiCheckFill, RiCloseLargeLine } from 'react-icons/ri';

import { MenuProps } from '@/lib/definition';

export const DrawerContent = ({
  handleTouchStart,
  handleTouchEnd,
  product,
  setIsOpen,
  selectedPart,
  handlePartSelect,
  partColors,
}: MenuProps) => {
  return (
    <>
      <div
        className="flex items-center justify-between"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex gap-2 text-2xl">
          <p className="font-bold">コンポーネンツ</p>
          <span className="text-gray-400">{product.parts.length}</span>
        </div>
        <button
          className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 max-sm:hidden"
          onClick={() => setIsOpen(false)}
        >
          <RiCloseLargeLine className="h-5 w-5" />
        </button>
      </div>
      <div className="max-h-[65vh] scrollbar-none overflow-y-auto max-sm:max-h-[80vh]">
        <ul className="grid grid-cols-2 gap-10 pt-10 max-sm:flex max-sm:flex-col max-sm:gap-0">
          {product.parts.map((part) => {
            const checked = selectedPart ? part.id === selectedPart : false;
            return (
              <li
                className="flex cursor-pointer items-center gap-4 whitespace-nowrap max-sm:border-b max-sm:border-gray-300 max-sm:py-8 max-sm:last:border-b-0"
                key={part.id}
                onClick={() => {
                  handlePartSelect(part.id);
                  setIsOpen(false);
                }}
              >
                <span
                  className="inline-block h-1 w-1 rounded-full p-1 ring-1 ring-gray-300"
                  style={{ backgroundColor: partColors[part.id] }}
                />
                {part.name}
                {checked && (
                  <RiCheckFill className="ml-20 h-6 w-6 max-sm:ml-auto" />
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
