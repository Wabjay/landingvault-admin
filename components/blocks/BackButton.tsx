import Image from 'next/image';
import React from 'react';
import Arrow from "@/assets/back.svg";
import { useNavigation } from '../utils/navigations';
import classNames from 'classnames';

interface BackButtonProps {
  color?: string;
  to?: string;
}

function BackButton({ color = 'green-600', to = '' }: BackButtonProps) {
  const { goBack, navigateTo } = useNavigation();

  return (
    <div className="w-full mx-auto laptop:px-0 laptop:bg-transparent desktop:px-0">
      <button
        className={classNames(
          'flex gap-2 py-2 h-10 px-4 mb-6 border',
          `bg-${color}`,
          { 'border-green-600': true }
        )}
        onClick={() => (to ? navigateTo(to) : goBack())}
        type="button"
      >
        <Image src={Arrow} alt="Back" className="w-4 h-4" />
        <span className={classNames(
          'text',
          { 'text-white': color === 'green-600' },
          { 'text-green-600': color !== 'green-600' }
        )}>
          Back
        </span>
      </button>
    </div>
  );
}

export default BackButton;
