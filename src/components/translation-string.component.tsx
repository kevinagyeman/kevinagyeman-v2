import { useTranslations } from 'next-intl';

type TranslationStringProps = {
  mainPath: string;
  translationPath: string;
};

export default function TranslationString({
  mainPath,
  translationPath,
}: TranslationStringProps) {
  const t = useTranslations(mainPath);
  return t(translationPath);
}
