import { Suspense } from 'react';
import ResponsiveContainer from '~/components/ResponsiveContainer';
import Section from '~/components/layout/Section';
import PageHeader from '~/components/ui/typography/PageHeader';
import { requireAppNotExpired } from '~/queries/appSettings';
import { requirePageAuth } from '~/utils/auth';
import ProtocolsTable from '../_components/ProtocolsTable/ProtocolsTable';
import UpdateUploadThingTokenAlert from '../_components/UpdateUploadThingTokenAlert';

export default async function ProtocolsPage() {
  await requireAppNotExpired();
  await requirePageAuth();

  return (
    <>
      <ResponsiveContainer>
        <PageHeader
          headerText="Protocols"
          subHeaderText="Upload and manage your interview protocols."
        />
        <Suspense fallback={null}>
          <UpdateUploadThingTokenAlert />
        </Suspense>
      </ResponsiveContainer>
      <ResponsiveContainer maxWidth="6xl">
        <Section>
          <ProtocolsTable />
        </Section>
      </ResponsiveContainer>
    </>
  );
}
