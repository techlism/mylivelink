import { cn } from '@/lib/utils';
import React, { HTMLAttributes, ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
}

const Container: React.FC<ContainerProps & { className?: HTMLAttributes<HTMLDivElement>['className'] }> = ({ children, className }) => {
  return (
    <div className={cn("border rounded-lg p-4 backdrop-blur-md backdrop-saturate-200 bg-opacity-75 bg-[#ababab68] dark:bg-[#222222af] max-w-[90vw] sm:max-w-[90vw] md:max-w-[60vw] lg:max-w-[60vw] grid grid-cols-1 items-center", className)}>
      {children}
    </div>
  );
};

export default Container;