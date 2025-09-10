'use client';

import dynamic from 'next/dynamic';

const MapFromAddressDynamic = dynamic(() => import('./MapFromAddress'), {
  ssr: false,
});

interface ClientMapWrapperProps {
  lat: number;
  lon: number;
  address: string;
}

export default function ClientMapWrapper({ lat, lon, address }: ClientMapWrapperProps) {
  return <MapFromAddressDynamic lat={lat} lon={lon} address={address} />;
}