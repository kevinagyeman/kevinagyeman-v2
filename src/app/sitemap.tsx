import { ProjectSchema } from '@/types/project-schema';
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXTAUTH_URL;
  // const projects: ProjectSchema[] | undefined = await getProjects(
  //   {
  //     fieldPath: 'createdAt',
  //     directionStr: 'desc',
  //   },
  //   {
  //     fieldPath: 'isPublished',
  //     opStr: '==',
  //     value: true,
  //   }
  // );

  // ...[
  //   projects?.map((project: ProjectSchema) => ({
  //     url: `${siteUrl}/project/${project.id}`,
  //     lastModified: new Date(),
  //     changeFrequency: 'yearly',
  //     priority: 0.5,
  //   })),
  // ],

  return [
    {
      url: `${siteUrl}`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ];
}
