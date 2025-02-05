import dynamic from 'next/dynamic';

interface WeatherIconProps {
  iconType: string;
}

const WeatherIcon = async ({ iconType: type }: WeatherIconProps) => {
  const Icon = await import(
    `@/public/assets/images/weather-icons//${type}.svg`
  );
  return Icon;
};

// const WeatherIcon = ({ iconType: type }: WeatherIconProps) =>
//   dynamic(
//     () => import(`@/public/assets/images/weather-icons/${type}.svg`)
//     // { ssr: false } // This will prevent server-side rendering for SiteMap component
//   );

export default WeatherIcon;
