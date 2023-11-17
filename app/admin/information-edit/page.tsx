import AuthHandler from '@/components/auth-handler.component';
import InformationUpdate from '@/components/information/information-update.component';

const InformationEdit = () => {
  return (
    <>
      <h2 className='mb-5 text-3xl font-semibold'>Edit information</h2>
      <InformationUpdate />
    </>
  );
};

export default AuthHandler(InformationEdit);
