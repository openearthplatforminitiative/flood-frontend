import { Box, Button } from '@mui/material';
import { getDictonaryWithDefault } from '@/app/[lang]/dictionaries';
import Link from 'next/link';
import { Add } from '@mui/icons-material';
import Header from '@/app/components/Header';
import { Suspense } from 'react';
import { FloodWarnings } from './FloodWarnings';
import { SiteList, SiteListSkeleton } from './SiteList';
import { ContentContainer } from '@/app/components/ContentContainer';
import { getUserId } from "@/lib/auth-utils";
import { getOrCreateUser } from "@/lib/prisma";
import { OnboardingModal } from '@/app/components/onboarding/OnboardingModal';

const Sites = async ({ params: { lang } }: { params: { lang: string } }) => {
  const dict = getDictonaryWithDefault(lang);

  const userId = await getUserId();
  let showOnboardingModal = false;

  if (userId) {
    const user = await getOrCreateUser(userId);
    showOnboardingModal = !user.completedOnboarding;
  }

  return (
    <>
      <Header title={dict.navbar.sites} />
      <ContentContainer>
        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          <Suspense>
            <FloodWarnings dict={dict} />
          </Suspense>
          <Box className="relative mt-4 lg:mt-6 mb-2 lg:mb-4 flex flex-wrap justify-between items-center">
            <h2 className="text-2xl lg:text-4xl text-primary-20">
              {dict.sites.title}
            </h2>
            <Box className="order-last lg:order-none sticky bottom-[93px] w-full lg:w-auto z-50">
              <Link href={'sites/add'}>
                <Button
                  variant={'contained'}
                  sx={{ width: '100%' }}
                  startIcon={<Add />}
                >
                  {dict.onBoarding.sites.addNewSite}
                </Button>
              </Link>
            </Box>
            <Box className="w-full">
              <Suspense fallback={<SiteListSkeleton />}>
                <SiteList dict={dict} />
              </Suspense>
            </Box>
          </Box>
        </Box>
      </ContentContainer>
      <OnboardingModal lang={lang} open={showOnboardingModal}  />
    </>
  );
};

export default Sites;
