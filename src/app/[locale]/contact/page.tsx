import Contact from '@/components/contact.component';
import { InformationSchema } from '@/types/information-schema';
import { getInformation } from '@/utils/server-utils';

export default async function Contacts() {
  const information: InformationSchema | undefined = await getInformation();
  if (information) {
    return <Contact information={JSON.parse(JSON.stringify(information))} />;
  }
}
