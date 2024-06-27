interface WeatherIconProps {
  iconType: string;
}

const WeatherIcon = async ({ iconType: type }: WeatherIconProps) => {
  const Icon = (await import(`@/public/weather-icons/${type}.svg`)).default;
  return <Icon style={{ height: '100%' }} />;
};

export default WeatherIcon;
