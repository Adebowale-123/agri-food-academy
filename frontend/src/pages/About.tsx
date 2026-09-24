import {
  CheckCircle,
  Target,
  Eye,
  Globe,
  BookOpen,
  Microscope,
  Factory,
  FlaskConical,
  Lightbulb,
  ShieldCheck,
  Sparkles,
  GraduationCap,
  Users,
  HeartHandshake,
  MapPin,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const STRATEGIC_GOALS = [
  { icon: '🎓', title: 'Develop People', desc: 'Build the technical, professional and leadership capabilities required for the present and future needs of the agri-food sector.' },
  { icon: '🏭', title: 'Strengthen Industry', desc: 'Support food businesses and organisations in advancing food safety, quality, compliance, manufacturing excellence and continuous improvement.' },
  { icon: '🔬', title: 'Advance Research & Innovation', desc: 'Connect science, industry and emerging technologies to address real-world food-system challenges and translate knowledge into practical solutions.' },
  { icon: '🌍', title: 'Expand Access to Knowledge', desc: 'Make high-quality, industry-relevant agri-food education accessible to professionals, entrepreneurs, students and organisations across geographical boundaries.' },
  { icon: '🇳🇬', title: 'Accelerate African Agri-Food Capability', desc: 'Contribute to stronger professional, scientific and technical capacity across Africa, beginning with our expanding presence in Nigeria.' },
  { icon: '🤝', title: 'Build Global Connections', desc: 'Create networks and partnerships connecting professionals, researchers, businesses, institutions and innovators across Africa, the UK and the wider world.' },
];

const PILLARS = [
  {
    n: '01',
    icon: BookOpen,
    title: 'Professional Education & Training',
    desc: 'We develop structured, industry-focused programmes that translate scientific and technical knowledge into practical professional competence.',
    groups: [
      { label: 'Food Safety & Compliance', items: 'HACCP · Good Manufacturing Practice · Food Safety & Hygiene · Allergen Management · Food Risk Management · Preventive Controls · Internal Auditing · Food Labelling · Regulatory Compliance' },
      { label: 'Food Science & Laboratory Systems', items: 'Food Microbiology · Environmental Monitoring · Hygiene Verification · Laboratory Systems · Microbiological Risk · Food Quality' },
      { label: 'Food Manufacturing & Engineering', items: 'Unit Operations · Thermal Processing · Hygienic Equipment Design · Food Factory Design · Cleaning and Sanitation Engineering · CIP Systems · Airflow, Ventilation and Environmental Control' },
      { label: 'Quality & Operational Excellence', items: 'Quality Management · Risk Assessment · Root Cause Analysis · Process Improvement · Auditing · Continuous Improvement' },
    ],
    note: 'Our professional learning pathways progress through Foundation, Intermediate and Advanced levels, enabling learners to develop from fundamental understanding to specialist technical competence.',
  },
  {
    n: '02',
    icon: Users,
    title: 'Workforce Development',
    subtitle: 'Building Capability Where It Matters Most',
    desc: 'Technology, systems and standards are important, but their effectiveness ultimately depends on the people responsible for applying them. AFIA supports organisations in strengthening workforce capability across Production, Technical, Quality, Hygiene, Engineering, Laboratory, Supply Chain, Operations and Management.',
    note: 'Our workforce-development programmes can include technical upskilling, competency development, compliance training, professional development, workplace scenarios, problem-solving and continuous-improvement learning. We aim to move beyond training attendance towards a more meaningful outcome: competence that can be understood, demonstrated and applied in the workplace.',
  },
  {
    n: '03',
    icon: FlaskConical,
    title: 'Research & Knowledge Exchange',
    subtitle: 'From Evidence to Impact',
    desc: 'Research creates greater value when knowledge reaches the people and organisations capable of applying it. AFIA seeks to strengthen the connection between research, industry and professional practice.',
    note: 'Our areas of interest include food microbiology and foodborne pathogens, antimicrobial resistance and One Health, food-safety risk assessment, food manufacturing and process optimisation, novel processing technologies, sustainable food systems, food quality and nutrition, predictive microbiology, hygienic engineering, digital food systems, and artificial intelligence and emerging technologies. Through applied research, evidence reviews, technical publications, collaboration and knowledge exchange, we aim to make scientific evidence more accessible and useful to industry, professionals and wider society.',
  },
  {
    n: '04',
    icon: Lightbulb,
    title: 'Innovation & Industry Development',
    subtitle: 'Preparing for the Future of Food',
    desc: 'The global food industry is being reshaped by artificial intelligence, automation, advanced analytics, genomics, novel processing technologies, sustainability requirements and increasingly connected supply chains.',
    note: 'AFIA seeks to help professionals and organisations understand these developments and translate innovation into responsible, practical applications. We aim to create an environment where scientific evidence, industry experience, education and emerging technology converge to address real food-system challenges.',
  },
];

const STANDARD_PRINCIPLES = [
  { icon: Microscope, title: 'Science-Led', desc: 'We ground our technical content in established scientific principles, credible evidence and recognised industry practice.' },
  { icon: Factory, title: 'Industry-Relevant', desc: 'We connect learning to the challenges professionals encounter in real food businesses, laboratories, manufacturing operations and supply chains.' },
  { icon: Target, title: 'Application-Focused', desc: 'We emphasise the interpretation and practical application of knowledge, not simply the memorisation of concepts.' },
  { icon: Globe, title: 'Accessible', desc: 'We use digital and flexible learning approaches to broaden access to high-quality professional agri-food education.' },
  { icon: Sparkles, title: 'Future-Focused', desc: 'We evolve alongside advances in science, regulation, manufacturing, sustainability and technology to prepare professionals for both current and emerging challenges.' },
];

const AFRICA_PRIORITIES = [
  { title: 'Developing Industry-Ready Professionals', desc: 'Strengthening the ability of students, graduates and working professionals to translate scientific and technical knowledge into workplace competence.' },
  { title: 'Strengthening Food Safety & Manufacturing Capability', desc: 'Supporting professionals and organisations in developing stronger cultures and systems around food safety, quality, manufacturing, hygiene, laboratory practice and continuous improvement.' },
  { title: 'Supporting SMEs & Entrepreneurs', desc: 'Expanding access to the technical knowledge required to develop safe products, understand regulatory responsibilities, strengthen manufacturing systems and scale food businesses responsibly.' },
  { title: 'Connecting Research, Industry & Innovation', desc: 'Creating stronger links between researchers, universities, manufacturers, entrepreneurs and professionals so that scientific knowledge can contribute more directly to practical challenges and commercial opportunities.' },
  { title: 'Developing the Next Generation', desc: 'Helping young Africans recognise the breadth of careers and opportunities available across modern agri-food systems, from food science, microbiology and engineering to manufacturing, quality management, data science, research, entrepreneurship and emerging technologies.' },
];

const GLOBAL_OUTLOOK = [
  { flag: '🇬🇧', title: 'United Kingdom', subtitle: 'Our Foundation', desc: 'Our UK establishment provides the organisational foundation from which we develop professional education, research, technical knowledge and international partnerships.' },
  { flag: '🇳🇬', title: 'Nigeria', subtitle: 'Our Emerging African Platform', desc: "Our planned Nigerian presence will enable deeper engagement with one of Africa's largest agri-food markets and support locally relevant programmes, collaborations and industry-development initiatives." },
  { flag: '🌍', title: 'Africa', subtitle: 'Our Commitment', desc: 'We aim to progressively develop partnerships and learning opportunities that strengthen professional and organisational capability across African food systems.' },
  { flag: '🌐', title: 'Global', subtitle: 'Our Outlook', desc: 'Our wider ambition is to connect professionals, researchers, businesses, educators and innovators across geographical boundaries, enabling knowledge and ideas to contribute to better food systems worldwide.' },
];

const WHO_WE_SERVE = [
  'Food professionals developing specialist competence and advancing their careers',
  'Food manufacturers strengthening safety, quality and operational systems',
  'Technical and quality teams responsible for HACCP, hygiene, auditing, compliance and food-safety management',
  'Food entrepreneurs and SMEs developing and scaling businesses',
  'Students and graduates preparing for industry careers',
  'Scientists and laboratory professionals working across microbiology, analytical testing and quality control',
  'Researchers, universities, businesses, institutions and industry organisations interested in applied research and knowledge exchange',
];

const FUTURE_CAPABILITIES = [
  'Understand the science.',
  'Recognise the hazard.',
  'Assess the risk.',
  'Interpret the evidence.',
  'Apply the standard.',
  'Control the process.',
  'Investigate the failure.',
  'Improve the system.',
  'Embrace innovation.',
  'Protect the consumer.',
];

function Divider() {
  return <div className="max-w-7xl mx-auto px-4 sm:px-6"><div className="border-t border-gray-200" /></div>;
}

export default function About() {
  return (
    <div className="pt-16">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary-dark to-primary py-20 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 text-accent px-4 py-1.5 rounded-full text-sm font-semibold mb-5">About AFIA</div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Advancing Knowledge. Developing People. Transforming Food Systems.
          </h1>
          <p className="text-primary-100 text-xl leading-relaxed">
            The Agri-Food Innovation Academy (AFIA) is a professional education, workforce development, research and innovation organisation dedicated to advancing capability across the global agri-food sector.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <p className="text-gray-600 leading-relaxed mb-4">
            AFIA is operated by Agri-Food Technology Academy Limited, a company registered in the United Kingdom. From our UK foundation, we are building an internationally connected platform that brings together education, science, industry and innovation to strengthen the people and organisations shaping the future of food.
          </p>
          <p className="text-gray-600 leading-relaxed mb-8">
            Our work spans food safety, food science, food manufacturing, quality and compliance, laboratory systems, food engineering, professional development, applied research and emerging technologies.
          </p>
          <blockquote className="border-l-4 border-accent bg-surface rounded-r-2xl px-6 py-5">
            <p className="text-primary font-semibold text-lg leading-relaxed">
              At the heart of AFIA is a clear belief: better food systems begin with better knowledge, stronger capability and people equipped to turn both into action.
            </p>
            <p className="text-gray-500 mt-3">That is the future we are working to build.</p>
          </blockquote>
        </div>
      </section>

      <Divider />

      {/* Who We Are */}
      <section className="py-20 bg-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-primary mb-6 text-center">Who We Are</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            The global agri-food sector is changing rapidly. Advances in technology, evolving regulations, emerging food-safety risks, sustainability pressures, climate change, increasingly sophisticated manufacturing systems and changing consumer expectations are redefining how food is produced, processed, tested and managed.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            The professionals and organisations operating within this environment need more than information. They need the capability to understand science, assess risk, interpret evidence, apply standards, solve problems, improve systems and innovate responsibly.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            AFIA exists to help develop that capability. We bridge the gap between knowledge and practice by transforming scientific, regulatory and technical knowledge into practical learning, professional competence and industry-relevant solutions.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Our ambition extends beyond delivering courses. We are building an agri-food knowledge and innovation ecosystem where people develop, organisations strengthen, research connects with industry, and knowledge is translated into meaningful impact.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-8">
          <div className="bg-surface rounded-2xl p-8 border border-gray-100 shadow-sm">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-5">
              <Target className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-2xl font-bold text-primary mb-4">Our Mission</h3>
            <p className="text-gray-600 leading-relaxed">
              To advance agri-food capability through industry-focused education, workforce development, applied research and innovation, equipping people and organisations with the knowledge and skills to build safer, smarter and more sustainable food systems.
            </p>
          </div>
          <div className="bg-surface rounded-2xl p-8 border border-gray-100 shadow-sm">
            <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center mb-5">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-primary mb-4">Our Vision</h3>
            <p className="text-gray-600 leading-relaxed">
              To be a globally recognised hub for agri-food education, research and innovation, developing people and advancing solutions that transform food systems worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Strategic Goals */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-primary mb-2">Our Strategic Goals</h2>
            <p className="text-gray-500">Our strategy is built around six priorities</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {STRATEGIC_GOALS.map(({ icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl mb-3">{icon}</div>
                <h4 className="font-bold text-primary mb-2">{title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-primary mb-4">What We Do</h2>
            <p className="text-gray-600 leading-relaxed">
              AFIA operates across four interconnected pillars that reflect how knowledge is developed, transferred and applied within modern food systems.
            </p>
          </div>
          <div className="space-y-10">
            {PILLARS.map(({ n, icon: Icon, title, subtitle, desc, groups, note }) => (
              <div key={n} className="bg-surface rounded-2xl p-8 border border-gray-100">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-accent mb-1">{n}</div>
                    <h3 className="text-xl font-bold text-primary">{title}</h3>
                    {subtitle && <p className="text-sm text-gray-500 font-medium mt-0.5">{subtitle}</p>}
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed mb-4">{desc}</p>
                {groups && (
                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    {groups.map((g) => (
                      <div key={g.label} className="bg-white rounded-xl p-4 border border-gray-100">
                        <div className="font-semibold text-primary text-sm mb-1.5">{g.label}</div>
                        <div className="text-gray-500 text-xs leading-relaxed">{g.items}</div>
                      </div>
                    ))}
                  </div>
                )}
                {note && <p className="text-gray-500 text-sm leading-relaxed italic">{note}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Philosophy */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold mb-2 text-center">Our Learning Philosophy</h2>
          <p className="text-accent font-semibold text-center mb-8">We Teach Beyond the Standard</p>
          <p className="text-primary-100 leading-relaxed mb-4">
            Knowing what a standard requires is important. Professional competence requires something more: understanding why the requirement exists, how it should be applied, how its effectiveness is verified and what action is required when a system fails.
          </p>
          <ul className="text-primary-100 leading-relaxed mb-6 space-y-1.5 list-disc list-inside">
            <li>A microbiological failure must be investigated.</li>
            <li>A HACCP deviation must be assessed.</li>
            <li>A recurring hygiene failure requires root-cause analysis.</li>
            <li>A manufacturing process must be understood and controlled.</li>
            <li>A factory environment must minimise contamination risks.</li>
            <li>A food label must meet applicable regulatory requirements.</li>
          </ul>
          <p className="text-primary-100 leading-relaxed mb-8">
            And professionals must be capable of interpreting evidence and making sound, risk-based decisions.
          </p>
          <div className="bg-white/10 rounded-2xl p-6 text-center font-semibold mb-6">
            Scientific Principles + Regulatory Understanding + Risk-Based Thinking + Industry Scenarios + Problem Solving + Practical Application
          </div>
          <p className="text-white text-lg font-semibold text-center">
            Our objective is not simply to help people know more. It is to help them become more capable.
          </p>
        </div>
      </section>

      {/* The AFIA Standard */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-primary mb-2">The AFIA Standard</h2>
            <p className="text-gray-500">Five principles guide how we develop our programmes, partnerships and professional activities</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {STANDARD_PRINCIPLES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h4 className="font-bold text-primary mb-2">{title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commitment to Africa */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-primary mb-2 text-center">Our Commitment to Africa</h2>
          <p className="text-accent font-semibold text-center mb-8">Building Capability for the Future of African Food Systems</p>
          <p className="text-gray-600 leading-relaxed mb-4">
            Africa is central to AFIA's long-term vision. The continent combines enormous agricultural potential, expanding consumer markets, a dynamic entrepreneurial ecosystem and a young population capable of playing a significant role in the future of food.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            Unlocking that potential requires more than investment in infrastructure and technology. It requires investment in people, knowledge, science, professional competence and innovation.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            AFIA aims to contribute to that development by expanding access to industry-relevant education, strengthening technical capability, supporting knowledge exchange and creating stronger connections between professionals, businesses, researchers, entrepreneurs and institutions.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Our ambition is to contribute to an African agri-food sector where professionals can access high-quality technical education; businesses can strengthen food-safety and quality systems; entrepreneurs can scale more responsibly; research connects more effectively with industry; and organisations can develop the capabilities required to compete in increasingly sophisticated regional and global markets.
          </p>
        </div>
      </section>

      {/* Nigeria */}
      <section className="py-20 bg-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 justify-center mb-6">
            <MapPin className="w-6 h-6 text-accent" />
            <h2 className="text-3xl font-bold text-primary">Nigeria: Our Emerging African Platform</h2>
          </div>
          <p className="text-gray-600 leading-relaxed mb-4">
            Nigeria represents an important next stage in AFIA's development. Following our establishment in the United Kingdom, we are preparing to establish a formal presence and expand our operations in Nigeria.
          </p>
          <p className="text-gray-600 leading-relaxed mb-3 font-medium">Our planned Nigerian presence will enable closer engagement with:</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {['Food manufacturers', 'SMEs', 'Universities', 'Research institutions', 'Laboratories', 'Food professionals', 'Students and graduates', 'Entrepreneurs', 'Industry associations', 'Agricultural and food-processing organisations'].map((item) => (
              <span key={item} className="bg-white px-3 py-1.5 rounded-full text-sm text-gray-700 border border-gray-200">{item}</span>
            ))}
          </div>
          <p className="text-gray-600 leading-relaxed mb-4">
            Our focus will include professional education, workforce development, technical capability building, research collaboration, knowledge exchange and industry-focused innovation. Nigeria will also provide an important platform from which AFIA can progressively develop partnerships and initiatives across other African markets.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Our approach is not simply to transfer knowledge from one region to another. We seek to connect international knowledge and good practice with African expertise, local realities and locally relevant solutions.
          </p>
        </div>
      </section>

      {/* Priorities in Africa */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-primary mb-2">Our Priorities in Africa</h2>
            <p className="text-gray-500">Our African development strategy focuses on five interconnected priorities</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {AFRICA_PRIORITIES.map(({ title, desc }, i) => (
              <div key={title} className="bg-surface rounded-2xl p-6 border border-gray-100 flex gap-4">
                <div className="w-9 h-9 rounded-full bg-primary text-white font-bold flex items-center justify-center flex-shrink-0 text-sm">{i + 1}</div>
                <div>
                  <h4 className="font-bold text-primary mb-1.5">{title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Outlook */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-primary mb-2">Our Global Outlook</h2>
            <p className="text-gray-500">AFIA is being built as an internationally connected organisation with a clear pathway for growth</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {GLOBAL_OUTLOOK.map(({ flag, title, subtitle, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="text-3xl mb-3">{flag}</div>
                <h4 className="font-bold text-primary">{title}</h4>
                <p className="text-xs text-accent font-semibold mb-2">{subtitle}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-primary mb-2 text-center">Who We Serve</h2>
          <p className="text-gray-500 text-center mb-10">Our community extends across the agri-food value chain</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {WHO_WE_SERVE.map((item) => (
              <div key={item} className="flex items-start gap-3 bg-surface rounded-xl p-4 border border-gray-100">
                <HeartHandshake className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-gray-600 text-sm leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preparing Professionals for the Future of Food */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold mb-6 text-center">Preparing Professionals for the Future of Food</h2>
          <p className="text-primary-100 leading-relaxed mb-4">
            Tomorrow's food professionals will operate at the intersection of science, technology, regulation, sustainability and business. Artificial intelligence will increasingly support decision-making. Automation will continue to reshape manufacturing. Genomics and advanced analytics will strengthen food-safety surveillance.
          </p>
          <p className="text-primary-100 leading-relaxed mb-8">
            Data will become increasingly important in risk management and process optimisation. Sustainability and climate pressures will influence how food is produced, processed and distributed. And global food systems will require professionals capable of navigating this complexity responsibly.
          </p>
          <p className="text-accent font-semibold mb-4">AFIA aims to develop people who can:</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {FUTURE_CAPABILITIES.map((item) => (
              <div key={item} className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2.5 text-sm">
                <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Ambition */}
      <section className="py-20 bg-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-primary mb-6 text-center">Our Ambition</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            AFIA is being built to become more than a place where people take courses. We envision an organisation where professionals develop, businesses strengthen, researchers collaborate, knowledge is translated and innovation creates impact.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            A place where graduates become industry-ready. Where entrepreneurs develop the knowledge required to build safer and more scalable food businesses. Where experienced professionals deepen their expertise. Where organisations strengthen workforce capability. Where researchers and industry collaborate around meaningful challenges. And where knowledge developed in one part of the world can contribute to stronger food systems elsewhere.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Our success will therefore not be measured simply by the number of courses delivered or certificates issued. It will be measured by the capability we develop, the organisations we strengthen, the knowledge we translate, the partnerships we build and the impact our community creates.
          </p>
        </div>
      </section>

      {/* Closing */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
            <GraduationCap className="w-7 h-7 text-accent" />
          </div>
          <h2 className="text-3xl font-bold text-primary mb-6">One Academy. A Global Food-System Vision.</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            From our foundation in the United Kingdom, our emerging presence in Nigeria, and our long-term commitment to Africa and the wider world, AFIA is building connections between Education and Industry, Science and Application, Research and Innovation, Knowledge and Impact.
          </p>
          <p className="text-primary font-semibold text-lg leading-relaxed mb-10">
            Because the future of food will depend not only on what we know but on our ability to apply that knowledge to make food systems better.
          </p>
          <div className="flex items-center justify-center gap-2 text-gray-400 mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-sm">Operated by Agri-Food Technology Academy Limited, United Kingdom</span>
          </div>
          <p className="text-primary font-bold">Learn. Apply. Innovate.</p>
          <p className="text-gray-500 text-sm mt-1">Advancing Knowledge. Developing People. Transforming Food Systems.</p>
        </div>
      </section>

      {/* Partner with AFIA */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Partner with AFIA</h2>
          <p className="text-primary-100 text-lg mb-3 font-semibold">
            Invest in People. Build Competence. Drive Compliance. Inspire Innovation.
          </p>
          <p className="text-primary-200 mb-8">
            Together, let's transform industries and build sustainable futures.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/register" className="bg-accent text-white font-bold px-8 py-4 rounded-lg text-lg hover:bg-accent-light transition-colors">
              Start Learning Today
            </Link>
            <Link to="/contact" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary transition-colors">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
