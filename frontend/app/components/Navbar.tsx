import { Box } from '@mui/material';
import { Dict } from '../[lang]/dictionaries';
import { mainLocations } from '../helpers/mainLocations';
import LogoCopy from './icons/LogoCopy';
import { NavBarButton } from './buttons/NavBarButton';
import { Logout } from '@mui/icons-material';

interface NavbarProps {
  dict: Dict;
  lang: string;
}

const Navbar = ({ dict, lang }: NavbarProps) => {
  const logOutLocation = {
    name: dict.signOut,
    icon: <Logout />,
    pathName: 'sign-out',
  };

  return (
    <Box
      className={
        'flex bg-primary-80 lg:h-full flex-col sticky lg:static bottom-0 left-0 right-0 lg:justify-start text-primary-10'
      }
    >
      <Box className="hidden lg:flex mt-10 mb-8 h-[77px] mx-6">
        <h2 className="flex text-4xl gap-2 items-center">
          <LogoCopy fontSize="inherit" />
          {dict.title}
        </h2>
      </Box>
      <Box className=" flex-grow flex lg:flex-col w-full lg:p-6 p-2 justify-around lg:pr-0 lg:gap-6">
        {mainLocations(dict).map((location) => (
          <NavBarButton key={location.name} location={location} lang={lang} />
        ))}
        <Box className="hidden lg:flex flex-grow flex-col justify-end">
          <NavBarButton location={logOutLocation} lang={lang} />
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;
