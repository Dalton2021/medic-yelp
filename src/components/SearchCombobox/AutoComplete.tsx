// 'use client';

// import { cn } from '@/lib/utils';
// import { Command as CommandPrimitive } from 'cmdk';
// import { Check } from 'lucide-react';
// import { useMemo, useState } from 'react';
// import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from '../ui/command';
// import { Input } from '../ui/input';
// import { Popover, PopoverAnchor, PopoverContent } from '../ui/popover';
// import { Skeleton } from '../ui/skeleton';

// type Props<T extends string> = {
//   selectedValue: T;
//   onSelectedValueChange: (value: T) => void;
//   searchValue: string;
//   onSearchValueChange: (value: string) => void;
//   items: { value: T; label: string }[];
//   isLoading?: boolean;
//   emptyMessage?: string;
//   placeholder?: string;
// };

// export function AutoComplete<T extends string>({
//   selectedValue,
//   onSelectedValueChange,
//   searchValue,
//   onSearchValueChange,
//   items,
//   isLoading,
//   emptyMessage = 'No items.',
//   placeholder = 'Search...',
// }: Props<T>) {
//   const [open, setOpen] = useState(false);

//   const labels = useMemo(
//     () =>
//       items.reduce((acc, item) => {
//         acc[item.value] = item.label;
//         return acc;
//       }, {} as Record<string, string>),
//     [items]
//   );

//   const filteredItems = useMemo(
//     () => items.filter((item) => item.label.toLowerCase().includes(searchValue.toLowerCase())),
//     [items, searchValue]
//   );

//   const reset = () => {
//     onSelectedValueChange('' as T);
//     onSearchValueChange('');
//   };

//   const onInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
//     if (!e.relatedTarget?.hasAttribute('cmdk-list') && labels[selectedValue] !== searchValue) {
//       reset();
//     }
//   };

//   const onSelectItem = (inputValue: string) => {
//     if (inputValue === selectedValue) {
//       reset();
//     } else {
//       onSelectedValueChange(inputValue as T);
//       onSearchValueChange(labels[inputValue] ?? '');
//     }
//     setOpen(false);
//   };

//   return (
//     <div className="flex items-center w-full">
//       <Popover open={open && searchValue.length >= 3} onOpenChange={setOpen}>
//         <PopoverAnchor asChild>
//           <Input
//             placeholder={placeholder}
//             className="rounded-full bg-white min-w-full"
//             value={searchValue}
//             onChange={(e) => onSearchValueChange(e.target.value)}
//             onKeyDown={(e) => setOpen(e.key !== 'Escape' && searchValue.length >= 3)}
//             onMouseDown={() => setOpen((open) => (searchValue.length >= 3 && !!searchValue) || !open)}
//             onFocus={() => setOpen(searchValue.length >= 3)}
//             onBlur={onInputBlur}
//           />
//         </PopoverAnchor>
//         <Command shouldFilter={false}>
//           {!open && <CommandList aria-hidden="true" className="hidden" />}
//           <PopoverContent
//             asChild
//             onOpenAutoFocus={(e) => e.preventDefault()}
//             onInteractOutside={(e) => {
//               if (e.target instanceof Element && e.target.hasAttribute('cmdk-input')) {
//                 e.preventDefault();
//               }
//             }}
//             className="w-[--radix-popover-trigger-width] p-0">
//             <CommandList>
//               {isLoading && (
//                 <CommandPrimitive.Loading>
//                   <div className="p-1">
//                     <Skeleton className="h-6 w-full" />
//                   </div>
//                 </CommandPrimitive.Loading>
//               )}
//               {filteredItems.length > 0 && !isLoading ? (
//                 <CommandGroup>
//                   {filteredItems.map((option) => (
//                     <CommandItem
//                       key={option.value}
//                       value={option.value}
//                       onMouseDown={(e) => e.preventDefault()}
//                       onSelect={onSelectItem}>
//                       <Check
//                         className={cn(
//                           'mr-2 h-4 w-4',
//                           selectedValue === option.value ? 'opacity-100' : 'opacity-0'
//                         )}
//                       />
//                       {option.label}
//                     </CommandItem>
//                   ))}
//                 </CommandGroup>
//               ) : null}
//               {!isLoading ? <CommandEmpty>{emptyMessage ?? 'No items.'}</CommandEmpty> : null}
//             </CommandList>
//           </PopoverContent>
//         </Command>
//       </Popover>
//     </div>
//   );
// }

'use client';

import { cn } from '@/lib/utils';
import { Command as CommandPrimitive } from 'cmdk';
import { Check } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from '../ui/command';
import { Input } from '../ui/input';
import { Popover, PopoverAnchor, PopoverContent } from '../ui/popover';
import { Skeleton } from '../ui/skeleton';

type Props<T extends string> = {
  selectedValue: T;
  onSelectedValueChange: (value: T) => void;
  searchValue: string;
  onSearchValueChange: (value: string) => void;
  items: { value: T; label: string }[];
  isLoading?: boolean;
  emptyMessage?: string;
  placeholder?: string;
};

export function AutoComplete<T extends string>({
  selectedValue,
  onSelectedValueChange,
  searchValue,
  onSearchValueChange,
  items,
  isLoading,
  emptyMessage = 'No items.',
  placeholder = 'Search...',
}: Props<T>) {
  const [open, setOpen] = useState(false);

  const labels = useMemo(
    () =>
      items.reduce((acc, item) => {
        acc[item.value] = item.label;
        return acc;
      }, {} as Record<string, string>),
    [items]
  );

  const filteredItems = useMemo(
    () => items.filter((item) => item.label.toLowerCase().includes(searchValue.toLowerCase())),
    [items, searchValue]
  );

  const reset = () => {
    onSelectedValueChange('' as T);
    onSearchValueChange('');
  };

  const onInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!e.relatedTarget?.hasAttribute('cmdk-list') && labels[selectedValue] !== searchValue) {
      reset();
    }
  };

  const onSelectItem = (inputValue: string) => {
    if (inputValue === selectedValue) {
      reset();
    } else {
      onSelectedValueChange(inputValue as T);
      onSearchValueChange(labels[inputValue] ?? '');
    }
    setOpen(false);
  };

  return (
    <div className="flex items-center w-full">
      <Popover open={open && searchValue.length >= 2} onOpenChange={setOpen}>
        <Command shouldFilter={false} className='rounded-full'>
          <PopoverAnchor asChild className="rounded-full">
            <CommandPrimitive.Input
              className=" bg-white rounded-full"
              asChild
              value={searchValue}
              onValueChange={onSearchValueChange}
              onKeyDown={(e) => setOpen(e.key !== 'Escape' && searchValue.length >= 2)}
              onMouseDown={() => setOpen((open) => (searchValue.length >= 2 && !!searchValue) || !open)}
              onFocus={() => setOpen(searchValue.length >= 2)}
              onBlur={onInputBlur}>
              <Input placeholder={placeholder} className="rounded-full" />
            </CommandPrimitive.Input>
          </PopoverAnchor>
          {!open && <CommandList aria-hidden="true" className="hidden" />}
          <PopoverContent
            asChild
            onOpenAutoFocus={(e) => e.preventDefault()}
            onInteractOutside={(e) => {
              if (e.target instanceof Element && e.target.hasAttribute('cmdk-input')) {
                e.preventDefault();
              }
            }}
            className="w-[--radix-popover-trigger-width] p-0">
            <CommandList>
              {isLoading && (
                <CommandPrimitive.Loading>
                  <div className="p-1">
                    <Skeleton className="h-6 w-full" />
                  </div>
                </CommandPrimitive.Loading>
              )}
              {filteredItems.length > 0 && !isLoading ? (
                <CommandGroup>
                  {filteredItems.map((option) => (
                    <CommandItem
                      key={option.value}
                      value={option.value}
                      onMouseDown={(e) => e.preventDefault()}
                      onSelect={onSelectItem}>
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          selectedValue === option.value ? 'opacity-100' : 'opacity-0'
                        )}
                      />
                      {option.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              ) : null}
              {!isLoading ? <CommandEmpty>{emptyMessage ?? 'No items.'}</CommandEmpty> : null}
            </CommandList>
          </PopoverContent>
        </Command>
      </Popover>
    </div>
  );
}
