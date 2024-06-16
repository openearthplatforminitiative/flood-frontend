import { Dict, getDictonaryWithDefault } from '@/app/[lang]/dictionaries';
import CompleteOnboardingButton from '@/app/components/buttons/CompleteOnboardingButton';
import IconHeader from '@/app/components/onboarding/IconHeader';
import TitleBar from '@/app/components/onboarding/TitleBar';
import { getUserId } from '@/lib/auth-utils';
import { getUserIncludingSites } from '@/lib/prisma';
import {
  Add,
  AddLocationAltOutlined,
  ArrowBack,
  ArrowRight,
  Place,
} from '@mui/icons-material';
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import Link from 'next/link';

const SitesOnboardingPage = async ({
  params: { lang },
}: {
  params: { lang: string };
}) => {
  const dict: Dict = getDictonaryWithDefault(lang);
  const userId = await getUserId();
  if (!userId) throw new Error('No user id');
  const user = await getUserIncludingSites(userId);
  if (!user) throw new Error('No user found');

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
      <TitleBar
        dict={dict}
        icon={<ArrowBack fontSize="small" />}
        text="Back"
        href={`/${lang}/onboarding/notifications`}
      />
      <Box sx={{ height: '100%' }}>
        <IconHeader
          icon={<AddLocationAltOutlined />}
          text={dict.onBoarding.sites.sitesHeader}
        />
        <Box>
          <Typography variant={'subtitle2'} component={'p'}>
            {dict.onBoarding.sites.sitesInfo}
          </Typography>

          <List>
            {(user.sites || []).map((site) => {
              const types = site.types
                .map((type) => type.slice(0, 1).toUpperCase() + type.slice(1))
                .join(', ');
              return (
                <Link
                  href={`/${lang}/onboarding/sites/${site.id}`}
                  key={site.id}
                  style={{ textDecoration: 'none', color: 'black' }}
                >
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <Place />
                      </ListItemIcon>
                      <ListItemText primary={site.name} secondary={types} />
                      <ListItemIcon>
                        <ArrowRight />
                      </ListItemIcon>
                    </ListItemButton>
                  </ListItem>
                </Link>
              );
            })}
          </List>

          <Link href={`/${lang}/onboarding/sites/add`}>
            <Button
              variant={'outlined'}
              sx={{ width: '100%', marginTop: '24px' }}
              startIcon={<Add />}
            >
              {dict.onBoarding.sites.addNewSite}
            </Button>
          </Link>
        </Box>
      </Box>
      <CompleteOnboardingButton>{dict.confirm}</CompleteOnboardingButton>
    </Box>
  );
};

export default SitesOnboardingPage;
