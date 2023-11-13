import { Box } from '@mui/material';
import {
  defaultLocale,
  Dict,
  getDictionary,
  isLang,
} from '@/app/[lang]/dictionaries';
import Title from '@/app/components/Title';

const ForgotPassword = async ({
  params: { lang },
}: {
  params: { lang: string };
}) => {
  const dict: Dict = getDictionary(isLang(lang) ? lang : defaultLocale);

  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        border: '2px solid black',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '32px 32px 40px 32px',
      }}
    >
      <Title dict={dict} large={false} />
      Forgot password form
    </Box>
  );
};

export default ForgotPassword;
