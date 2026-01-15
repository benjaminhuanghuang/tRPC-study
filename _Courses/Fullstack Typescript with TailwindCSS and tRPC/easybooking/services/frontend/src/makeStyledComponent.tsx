import { type ComponentRef, type JSX } from 'react';
import clsx from 'clsx';
import React, { createElement, forwardRef } from 'react';

type StyledComponentProps<T extends keyof JSX.IntrinsicElements> = {
  className?: string;
} & React.ComponentProps<T>;

function makeStyledComponent<T extends keyof JSX.IntrinsicElements>(
  Element: T,
  ...predefinedClassNames: string[]
): React.ForwardRefExoticComponent<
  React.PropsWithoutRef<StyledComponentProps<T>> &
    React.RefAttributes<ComponentRef<T>>
> {
  const predefinedClassName = clsx(...predefinedClassNames);
  const StyledComponent = forwardRef<ComponentRef<T>, StyledComponentProps<T>>(
    ({ className, ...props }, ref) => {
      const combinedClassName = clsx(predefinedClassName, className);
      return createElement(Element, {
        ref,
        className: combinedClassName,
        ...props,
      });
    },
  );

  StyledComponent.displayName = `Styled ${Element}`;
  return StyledComponent;
}

export default makeStyledComponent;
