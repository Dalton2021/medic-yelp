'use client';

import { cn } from '@/lib/utils';
import { Command as CommandPrimitive } from 'cmdk';
import { Check } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from '../ui/command';
import { Input } from '../ui/input';
import { Popover, PopoverAnchor, PopoverContent } from '../ui/popover';
import { Skeleton } from '../ui/skeleton';

type Props<T extends string> = {
  selectedValue: T;
  onSelectedValueChange: (value: T) => void;
  searchValue: string;
  onSearchValueChange: (value: string) => void;
  items: { value: T; label: React.JSX.Element; name: string }[];
  isLoading?: boolean;
  emptyMessage?: string;
  placeholder?: string;
  roundedFull?: boolean;
  inputClassName?: string;
  skipMinLength?: boolean;
  navigationUrl?: string;
  disableNavigation?: boolean;
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
  roundedFull = true,
  inputClassName,
  skipMinLength = false,
  navigationUrl,
  disableNavigation = false,
}: Props<T>) {
  const [open, setOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const router = useRouter();

  const labels = useMemo(
    () =>
      items.reduce((acc, item) => {
        acc[item.value] = item.name;
        return acc;
      }, {} as Record<string, string>),
    [items]
  );

  const filteredItems = useMemo(
    () => items.filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase())),
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
      
      // Handle navigation if enabled - use the newly selected value
      if (!disableNavigation && navigationUrl) {
        const finalUrl = `${navigationUrl}/${inputValue}`;
        router.push(finalUrl);
      }
    }
    setOpen(false);
  };

  return (
    <div className="flex items-center w-full">
      <Popover open={open && (skipMinLength || searchValue.length >= 1)} onOpenChange={setOpen}>
        <Command shouldFilter={false} className={`${roundedFull ? 'rounded-full' : inputClassName}`}>
          <PopoverAnchor asChild className={`${roundedFull ? 'rounded-full' : inputClassName}`}>
            <CommandPrimitive.Input
              className={`bg-white ${roundedFull ? 'rounded-full' : inputClassName}`}
              asChild
              value={searchValue}
              onValueChange={onSearchValueChange}
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  setOpen(false);
                } else if (e.key === 'ArrowDown') {
                  e.preventDefault();
                  setHighlightedIndex(prev => Math.min(prev + 1, filteredItems.length - 1));
                  setOpen(true);
                } else if (e.key === 'ArrowUp') {
                  e.preventDefault();
                  setHighlightedIndex(prev => Math.max(prev - 1, 0));
                  setOpen(true);
                } else if (e.key === 'Enter' && filteredItems.length > 0) {
                  e.preventDefault();
                  const selectedItem = filteredItems[highlightedIndex] || filteredItems[0];
                  onSelectItem(selectedItem.value);
                } else {
                  setOpen(skipMinLength || searchValue.length >= 1);
                  setHighlightedIndex(0);
                }
              }}
              onMouseDown={() => setOpen((open) => (skipMinLength || (searchValue.length >= 1 && !!searchValue)) || !open)}
              onFocus={() => setOpen((skipMinLength || searchValue.length >= 1) && !selectedValue)}
              onBlur={onInputBlur}>
              <Input
                placeholder={placeholder}
                className={`${roundedFull ? 'rounded-full' : inputClassName}`}
              />
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
            className="w-[--radix-popover-trigger-width] min-w-[300px] p-0">
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
                  {filteredItems.map((option, index) => (
                    <CommandItem
                      key={option.value}
                      value={option.value}
                      onMouseDown={(e) => e.preventDefault()}
                      onMouseEnter={() => setHighlightedIndex(index)}
                      onSelect={onSelectItem}
                      className={cn(
                        highlightedIndex === index ? 'bg-gray-100' : ''
                      )}>
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
