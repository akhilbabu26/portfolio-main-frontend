import { motion } from 'framer-motion';
import { MdWork, MdSchool } from 'react-icons/md';

const experiences = [
  {
    type: 'work',
    role: 'Full-Stack Developer Intern',
    company: 'Brigion solutions',
    period: '2025 – Present',
    location: 'Calicut',
    description: 'Designing and building scalable REST APIs and microservices using Go and Gin framework.',
    points: [
      'Designed and built scalable RESTful APIs using Golang (Gin), implementing JWT authentication, role-based access control, and middleware pipelines for secure endpoints',
      'Architected and managed PostgreSQL schemas using GORM',
      'Developed responsive frontend components using React, Redux, and Tailwind CSS, ensuring seamless integration with backend services',
      'Containerized applications using Docker and followed a service-repository architecture, improving code maintainability and deployment consistency',
      'Integrated Redis for caching layers, reducing DB load by 60%',
    ],
  },
  // {
  //   type: 'work',
  //   role: 'Web Developer Intern',
  //   company: 'Tech Solutions Pvt. Ltd.',
  //   period: '2022 – 2023',
  //   location: 'Hybrid',
  //   description: 'Contributed to full-stack web development projects, building frontend components and assisting in API integration.',
  //   points: [
  //     'Built responsive React components and integrated third-party APIs',
  //     'Assisted in backend development using Node.js and Express',
  //     'Collaborated using Git workflows — feature branches, PRs, and code reviews',
  //     'Wrote unit tests to improve code reliability',
  //   ],
  // },
  // {
  //   type: 'education',
  //   role: 'Bachelor of Computer Science',
  //   company: 'University of Technology',
  //   period: '2019 – 2023',
  //   location: 'India',
  //   description: 'Studied core computer science fundamentals with a focus on algorithms, data structures, and distributed systems.',
  //   points: [
  //     'Graduated with honours in Computer Science',
  //     'Final project: Distributed task scheduling system in Go',
  //     'Active member of the coding club and open-source contributors group',
  //   ],
  // },
];

const Experience = () => {
  return (
    <section id="experience" className="py-28 relative">
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="section-tag">Journey</span>
          <h2 className="section-heading">Experience &amp; Education</h2>
          <div className="w-16 h-1 bg-blue-500 rounded-full mx-auto mt-4" />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-5 top-0 bottom-0 timeline-line md:left-1/2 md:-translate-x-1/2" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative flex items-start md:justify-center"
              >
                {/* Timeline dot */}
                <div className="absolute left-[14px] md:left-1/2 md:-translate-x-1/2 mt-6">
                  <div className="timeline-dot flex items-center justify-center">
                  </div>
                </div>

                {/* Card — alternating sides on desktop */}
                <div className={`ml-16 md:ml-0 md:w-[46%] ${index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}`}>
                  <div className="glass rounded-2xl p-6 border border-white/5 hover:border-blue-500/20 transition-all duration-300 group">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-1 gap-3">
                      <div className="flex items-center gap-2">
                        <div className="text-blue-400">
                          {exp.type === 'education' ? <MdSchool size={18} /> : <MdWork size={18} />}
                        </div>
                        <h3 className="text-white font-bold text-base group-hover:text-blue-400 transition-colors">
                          {exp.role}
                        </h3>
                      </div>
                      <span className="text-xs text-slate-500 font-mono bg-white/5 px-2 py-1 rounded-lg whitespace-nowrap shrink-0">
                        {exp.period}
                      </span>
                    </div>

                    <p className="text-blue-400 text-sm font-semibold mb-1">{exp.company}</p>
                    <p className="text-slate-600 text-xs mb-4">{exp.location}</p>
                    <p className="text-slate-400 text-sm mb-4 leading-relaxed italic">{exp.description}</p>

                    <ul className="space-y-2">
                      {exp.points.map((point, i) => (
                        <li key={i} className="flex items-start gap-2 text-slate-400 text-sm">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
