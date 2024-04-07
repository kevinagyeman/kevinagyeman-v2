import InformationInfo from '@/components/information/information-info.component';
import { InformationSchema } from '@/types/information-schema';
import { getInformation } from '@/utils/server-utils';

export default async function About() {
  const information: InformationSchema | undefined = await getInformation();

  return (
    <>
      {information ? (
        <InformationInfo
          information={JSON.parse(JSON.stringify(information))}
        />
      ) : null}
    </>
  );
}
