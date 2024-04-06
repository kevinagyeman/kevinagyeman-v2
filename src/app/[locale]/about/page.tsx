import InformationInfo from '@/components/information/information-info.component';
import { InformationSchema } from '@/types/information-schema';
import { getInformation } from '@/utils/utils';
import { RecoilRoot } from 'recoil';

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
