import { Hero } from './components/ui/hero';
import { Navbar } from './components/ui/navbar';

import {
  FaCss3,
  FaHtml5,
  FaJs,
  FaReact,
  FaSass,
  FaDocker,
  FaAws,
} from 'react-icons/fa';
import { RiNextjsFill, RiTailwindCssFill } from 'react-icons/ri';
import { TbBrandCSharp } from 'react-icons/tb';
import { AiOutlineDotNet } from 'react-icons/ai';
import { DiMsqlServer, DiPostgresql } from 'react-icons/di';
import { FaRegFilePdf } from 'react-icons/fa';

export default function Home() {
  return (
    <div className='w-full flex flex-col items-center gap-16 py-8 px-[10vw] md:px-[20vw] xl:px-[30vw] xl:gap-32'>
      <Navbar />

      <main className='w-full flex flex-col gap-20'>
        <Hero />

        <section className='p-4 flex gap-3 rounded-md'>
          <h2 className='min-w-20 max-w-20 w-full p-2 rounded-md text-lg font-bold bg-primary'>
            About
          </h2>
          <p className='text-base text-justify'>
            Fullstack Developer with 3+ years of hands-on experience. Passionate
            about creating functional, scalable solutions that make a real
            impact. I’ve worked on over 15 projects—ranging from legacy systems
            to modern technologies—always focusing on quality, collaboration,
            and tangible results. Currently seeking remote opportunities (within
            Brazil or abroad) in companies that value continuous growth and
            clear career progression. If you’re looking for a committed
            fullstack dev who delivers clean code and real outcomes, let’s talk!
          </p>
        </section>

        <section className='p-4 flex gap-4 rounded-md text-sm'>
          <h2 className='min-w-20 max-w-20 w-full p-2 rounded-md text-lg font-bold bg-primary'>
            Skills
          </h2>

          <div className='w-full flex flex-col gap-3'>
            <span className='p-2 rounded-md text-sm font-bold flex justify-center bg-pink-600'>
              Frontend
            </span>

            <div className='p-4 text-6xl flex gap-3 flex-wrap border border-dashed rounded-md border-pink-600'>
              <FaHtml5 className='text-orange-500' />
              <FaCss3 className='text-blue-400' />
              <FaJs className='text-yellow-400' />
              <FaSass className='text-pink-400' />
              <FaReact className='text-blue-400' />
              <RiNextjsFill className='text-black' />
              <RiTailwindCssFill className='text-blue-400' />
            </div>

            <span className='p-2 rounded-md text-sm font-bold flex justify-center bg-gray-600'>
              Backend
            </span>
            <div className='p-4 text-6xl flex gap-3 flex-wrap border border-dashed rounded-md border-gray-600'>
              <AiOutlineDotNet className='text-purple-500' />
              <TbBrandCSharp className='text-purple-500' />
              <DiMsqlServer className='text-red-400' />
              <DiPostgresql className='text-blue-400' />
              <FaDocker className='text-blue-400' />
              <FaAws className='text-black' />
            </div>
          </div>
        </section>

        <section className='p-4 flex gap-3 rounded-md border border-input  text-sm'>
          <h2 className='min-w-20 max-w-20 w-20 p-2 rounded-md text-lg break-words whitespace-normal font-bold bg-primary'>
            Experience
          </h2>

          <div className='flex flex-col gap-4'>
            <div className='flex flex-col'>
              <span className='text-lg font-bold'>Fullstack Development</span>
              <span className='text-base font-light'>A5 Solutions</span>
              <span className='text-base font-light'>Mar/2021 - At now</span>
            </div>

            <ul className='list-disc list-inside flex flex-col gap-4 text-justify font-light text-sm'>
              <li>
                Developed and maintained web applications using React/Next js,
                and .NET Core.
              </li>
              <li>
                Collaborated with cross-functional teams to design and implement
                new features.
              </li>
              <li>
                Participated in code reviews and contributed to best practices
                in software development.
              </li>
            </ul>
          </div>
        </section>

        <section className='p-4 flex gap-3 rounded-md border border-input  text-sm'>
          <h2 className='min-w-20 max-w-20 w-20 p-2 rounded-md text-lg break-words whitespace-normal font-bold bg-primary'>
            Education
          </h2>

          <div className='flex flex-col gap-16'>
            <div className='flex flex-col gap-6'>
              <div className='flex flex-col'>
                <span className='text-lg font-bold'>
                  Fullstack Web Development Bootcamp
                </span>
                <span className='text-base font-light'>Labenu</span>
                <span className='text-base font-light'>
                  Jun/2020 - Dec/2021
                </span>
              </div>

              <ul className='list-disc list-inside flex flex-col gap-4 text-justify font-light text-sm'>
                <li>
                  Completed a rigorous bootcamp focused on fullstack web
                  development.
                </li>
                <li>
                  Gained hands-on experience with React js, Node.js, and
                  database management.
                </li>
                <li>
                  Worked on multiple projects, collaborating with peers to build
                  real-world applications.
                </li>
              </ul>
            </div>

            <div className='flex flex-col gap-6'>
              <div className='flex flex-col'>
                <span className='text-lg font-bold'>
                  BS in Information Technology Management
                </span>
                <span className='text-base font-light'>
                  Anhanguera University
                </span>
                <span className='text-base font-light'>
                  Jan/2016 - Dec/2018
                </span>
              </div>

              <ul className='list-disc list-inside flex flex-col gap-4 text-justify font-light text-sm'>
                <li>
                  Focus on business analysis, leadership, and strategic
                  planning, aligning IT with organizational goals.
                </li>
                <li>
                  Expertise in infrastructure, networking, databases, and
                  security, aiming to optimize systems and services.
                </li>
                <li>
                  Use of PMBOK and agile frameworks for continuous delivery,
                  enhanced collaboration, and risk mitigation in IT projects.
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer className='w-full my-6 flex justify-center items-center'>
        <a
          href=''
          className='flex flex-row items-center gap-x-3 rounded-md border border-input px-4 py-2 text-sm shadow-sm transition-all hover:shadow-md'
        >
          <span className='relative flex items-center justify-center'>
            <FaRegFilePdf className='absolute inline-flex animate-ping border text-red-500 opacity-75' />
            <FaRegFilePdf className='relative inline-flex text-red-500' />
          </span>
          <span className='font-bold'>Download Resume</span>
        </a>
      </footer>
    </div>
  );
}
