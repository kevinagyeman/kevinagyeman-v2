'use client';

import { ProjectSchema } from '@/types/project-schema';
import Autoplay from 'embla-carousel-autoplay';
import { ArrowRight, LucideBriefcase } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React from 'react';
import DisplayCompanyDate from './display-company-date.component';
import SkillsList from './skills-list.component';
import { Button } from './ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';
import EditAsAdmin from './edit-as-admin.component';
import TitleSection from './title-section';

type WorkListUserProps = {
  worksList: ProjectSchema[];
};

export default function WorkListUser({ worksList }: WorkListUserProps) {
  const t = useTranslations('index');
  const plugin = React.useRef(Autoplay({ delay: 2000 }));

  return (
    <div className='py-5 max-w-5xl m-auto'>
      <div className='px-4'>
        <TitleSection
          title={'Relevant work experience'}
          subtitle={' A list of some relevant experiences'}
        />
      </div>
      <Carousel
        opts={{
          align: 'start',
        }}
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        className='pl-4'
      >
        <CarouselContent className='w-full'>
          {worksList?.map((project: ProjectSchema, index: number) => (
            <CarouselItem key={index} className='md:basis-1/2'>
              <div className='flex flex-col gap-y-1 border rounded-xl p-6'>
                <div className='flex'>
                  <div>
                    <h3 className='text-2xl font-semibold line-clamp-1'>
                      {project.title}
                    </h3>
                  </div>
                  <div className='ml-auto'>
                    <LucideBriefcase />
                  </div>
                </div>
                <div>
                  <DisplayCompanyDate
                    startDate={project.startDate}
                    endDate={project.endDate}
                    company={project.company}
                    isPresentDate={project.isPresentDate}
                  />
                </div>
                <p className='line-clamp-1 text-muted-foreground'>
                  {project.shortDescription}
                </p>
                {project?.skills && (
                  <SkillsList
                    skills={project?.skills}
                    numberOfSkills={3}
                    type='homepage'
                  />
                )}
                <div className='mt-2'>
                  <Button asChild>
                    <Link
                      href={`/project/${project.id}`}
                      rel='canonical'
                      prefetch={true}
                    >
                      Read more <ArrowRight className='w-5 h-5 ml-1' />
                    </Link>
                  </Button>
                  <EditAsAdmin
                    href={'/admin/dashboard/project-edit?id=' + project.id}
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className='flex gap-x-3 my-3'>
          <div>
            <CarouselPrevious variant={'secondary'} />
          </div>
          <div>
            <CarouselNext variant={'secondary'} />
          </div>
        </div>
      </Carousel>
    </div>
  );
}
