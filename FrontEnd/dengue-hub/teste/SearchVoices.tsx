"use client";

import {MagnifyingGlassIcon} from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter} from 'next/navigation';

import React from 'react'

const SearchVoices = () => {
    const SearchParams = useSearchParams();
    const Pathname = usePathname();
    const {replace} = useRouter();
  return (
    <div className=""></div>
  )
}

export default SearchVoices