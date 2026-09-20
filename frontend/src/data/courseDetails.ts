export interface CourseInfo {
  targetAudience: string[];
  outcomes: string[];
  benefits: string[];
  whatYouReceive?: string[];
}

const COURSE_DETAILS: Record<string, CourseInfo> = {
  'Introduction to HACCP for Food Businesses (Foundation Level)': {
    targetAudience: [
      'New food business owners',
      'Restaurant and takeaway operators',
      'Small food manufacturers',
      'Catering businesses',
      'Food entrepreneurs',
      'Students entering the food industry',
    ],
    outcomes: [
      'Understanding of food safety hazards',
      'Knowledge of HACCP principles',
      'Ability to identify risks in food operations',
      'Basic food safety compliance knowledge',
      'Understanding of legal food safety requirements',
    ],
    benefits: [
      'Improved food safety awareness',
      'Better preparation for food safety inspections',
      'Foundation for HACCP Level 2 and Level 3 progression',
    ],
  },

  'Good Manufacturing Practice (GMP) for Food Manufacturing Compliance': {
    targetAudience: [
      'Production operatives',
      'Quality assurance staff',
      'Production supervisors',
      'Factory managers',
      'Technical managers',
      'Food business owners',
    ],
    outcomes: [
      'Understanding of GMP requirements',
      'Knowledge of contamination prevention',
      'Personal hygiene management skills',
      'Factory housekeeping best practices',
      'Compliance with retailer and certification standards',
    ],
    benefits: [
      'Enhanced manufacturing compliance',
      'Improved audit performance',
      'Reduced product defects and complaints',
    ],
  },

  'Food Safety & Hygiene Level 2 for Food Handlers (UK Standard)': {
    targetAudience: [
      'Food handlers',
      'Catering staff',
      'Restaurant workers',
      'Kitchen assistants',
      'Hospitality staff',
      'Food retail employees',
    ],
    outcomes: [
      'Safe food handling practices',
      'Personal hygiene requirements',
      'Temperature control knowledge',
      'Cross-contamination prevention skills',
      'Food safety legal responsibilities',
    ],
    benefits: [
      'Essential food industry qualification',
      'Increased employability',
      'Compliance with employer requirements',
    ],
  },

  'HACCP Level 2: Practical Implementation for Food Operations': {
    targetAudience: [
      'Supervisors',
      'Team leaders',
      'QA personnel',
      'Production staff',
      'Catering managers',
      'Food business operators',
    ],
    outcomes: [
      'Practical HACCP implementation skills',
      'Hazard identification techniques',
      'CCP monitoring procedures',
      'Corrective action management',
      'HACCP record-keeping skills',
    ],
    benefits: [
      'Ability to participate in HACCP teams',
      'Better compliance management',
      'Improved food safety systems',
    ],
  },

  'HACCP Level 3: HACCP System Development & Management': {
    targetAudience: [
      'HACCP team leaders',
      'QA Managers',
      'Technical Managers',
      'Production Managers',
      'Food Safety Managers',
      'Consultants',
    ],
    outcomes: [
      'HACCP system development skills',
      'HACCP validation and verification knowledge',
      'Risk assessment competence',
      'HACCP auditing techniques',
      'Food safety leadership capabilities',
    ],
    benefits: [
      'Qualification for senior technical roles',
      'Capability to lead HACCP teams',
      'Enhanced audit readiness',
    ],
  },

  "Food Allergen Management & Natasha's Law Compliance": {
    targetAudience: [
      'Food manufacturers',
      'Caterers',
      'Restaurants',
      'Retail food businesses',
      'QA personnel',
      'Technical managers',
    ],
    outcomes: [
      'Allergen identification skills',
      'Allergen risk assessment techniques',
      "Natasha's Law compliance knowledge",
      'Label verification competence',
      'Allergen control programme development skills',
    ],
    benefits: [
      'Reduced allergen incidents',
      'Legal compliance',
      'Increased consumer confidence',
    ],
  },

  'Internal Food Safety Auditing (HACCP & GMP Systems)': {
    targetAudience: [
      'Internal auditors',
      'QA Officers',
      'Technical staff',
      'Compliance officers',
      'Supervisors',
      'Managers',
    ],
    outcomes: [
      'Audit planning skills',
      'Audit execution techniques',
      'Root cause analysis capability',
      'CAPA management skills',
      'Audit reporting competence',
    ],
    benefits: [
      'Internal auditor competence',
      'Improved compliance performance',
      'Enhanced inspection readiness',
    ],
  },

  'Unit Operations in Food Processing: Principles & Industrial Applications': {
    targetAudience: [
      'Food technologists',
      'Process engineers',
      'Production managers',
      'Students',
      'Researchers',
      'Manufacturing personnel',
    ],
    outcomes: [
      'Understanding of food processing operations',
      'Process optimisation knowledge',
      'Equipment selection skills',
      'Energy efficiency awareness',
      'Product quality control techniques',
    ],
    benefits: [
      'Strong processing knowledge',
      'Improved production efficiency',
      'Better process troubleshooting skills',
    ],
  },

  'Food Processing Equipment Design & Hygienic Engineering': {
    targetAudience: [
      'Engineers',
      'Maintenance personnel',
      'Factory designers',
      'Food technologists',
      'Technical managers',
    ],
    outcomes: [
      'Equipment design principles',
      'Hygienic engineering requirements',
      'Material selection knowledge',
      'Equipment validation techniques',
      'Maintenance planning skills',
    ],
    benefits: [
      'Better equipment selection decisions',
      'Reduced contamination risks',
      'Improved operational efficiency',
    ],
  },

  'Food Factory Design & Hygienic Layout for Compliance': {
    targetAudience: [
      'Factory owners',
      'Engineers',
      'Consultants',
      'Technical managers',
      'Project managers',
    ],
    outcomes: [
      'Factory design principles',
      'Hygienic zoning knowledge',
      'Personnel and product flow design skills',
      'Utility planning competence',
      'Compliance requirements understanding',
    ],
    benefits: [
      'Better facility design decisions',
      'Reduced contamination risks',
      'Improved audit compliance',
    ],
  },

  'Sanitation Engineering & Cleaning Systems (CIP) in Food Factories': {
    targetAudience: [
      'Hygiene managers',
      'Engineers',
      'Production managers',
      'Technical personnel',
      'Maintenance teams',
    ],
    outcomes: [
      'CIP system design knowledge',
      'Cleaning validation techniques',
      'Sanitation programme development skills',
      'Chemical management competence',
      'Hygiene verification methods',
    ],
    benefits: [
      'Improved cleaning effectiveness',
      'Reduced contamination risks',
      'Better operational efficiency',
    ],
  },

  'Airflow, Ventilation & Environmental Control in Food Production': {
    targetAudience: [
      'Factory Engineers',
      'Facilities Managers',
      'Technical Managers',
      'QA Managers',
      'Food Safety Professionals',
      'Factory Owners',
    ],
    outcomes: [
      'Airflow principles in food factories',
      'Positive and negative air pressure systems',
      'HVAC design fundamentals',
      'Airborne contamination control',
      'Environmental monitoring requirements',
      'Regulatory and audit expectations',
    ],
    whatYouReceive: [
      'Environmental Control Templates',
      'HVAC Risk Assessment Tools',
      'Airflow Mapping Guide',
      'AFIA Certificate of Completion',
    ],
    benefits: [
      'Ability to manage factory environments',
      'Improved contamination prevention knowledge',
      'Enhanced engineering and food safety competence',
    ],
  },

  'Temperature Control & Thermal Processing in Food Manufacturing': {
    targetAudience: [
      'Production Supervisors',
      'Food Technologists',
      'QA Teams',
      'Process Engineers',
      'Technical Managers',
      'Factory Managers',
    ],
    outcomes: [
      'Principles of heat transfer',
      'Cooking, chilling and freezing systems',
      'Thermal processing validation',
      'Pasteurisation and sterilisation fundamentals',
      'Temperature monitoring systems',
      'Regulatory requirements',
    ],
    whatYouReceive: [
      'Thermal Processing Workbook',
      'Validation Templates',
      'Temperature Monitoring Forms',
      'AFIA Certificate of Completion',
    ],
    benefits: [
      'Strong understanding of thermal processing',
      'Improved process safety management',
      'Better CCP management skills',
    ],
  },

  'Hygienic Design of Food Processing Facilities (Advanced)': {
    targetAudience: [
      'Senior Engineers',
      'Factory Designers',
      'Consultants',
      'Project Managers',
      'Technical Directors',
      'Factory Owners',
    ],
    outcomes: [
      'Advanced hygienic design principles',
      'EHEDG and GFSI expectations',
      'Hygienic construction materials',
      'Factory expansion planning',
      'Risk-based facility design',
      'Future-ready food factory concepts',
    ],
    whatYouReceive: [
      'Hygienic Design Toolkit',
      'Facility Assessment Checklist',
      'Design Review Templates',
      'AFIA Certificate of Completion',
    ],
    benefits: [
      'Specialist facility design expertise',
      'Improved project management capability',
      'Enhanced consultancy opportunities',
    ],
  },

  'Food Microbiology for Food Manufacturing & Safety Control': {
    targetAudience: [
      'Laboratory Analysts',
      'Microbiologists',
      'Food Technologists',
      'QA Personnel',
      'Technical Managers',
      'Students',
    ],
    outcomes: [
      'Food microbiology fundamentals',
      'Foodborne pathogens',
      'Spoilage microorganisms',
      'Microbiological testing methods',
      'Result interpretation',
      'Food safety risk management',
    ],
    whatYouReceive: [
      'Laboratory Workbook',
      'Microbiology Reference Guide',
      'Case Study Pack',
      'AFIA Certificate of Completion',
    ],
    benefits: [
      'Improved laboratory competence',
      'Stronger food safety knowledge',
      'Enhanced technical decision-making skills',
    ],
  },

  'Environmental Monitoring & Hygiene Verification in Food Factories': {
    targetAudience: [
      'QA Teams',
      'Hygiene Managers',
      'Microbiologists',
      'Laboratory Personnel',
      'Technical Managers',
    ],
    outcomes: [
      'Environmental monitoring programme design',
      'ATP verification systems',
      'Swabbing techniques',
      'Trend analysis',
      'Investigation of hygiene failures',
      'Corrective action implementation',
    ],
    whatYouReceive: [
      'EMP Templates',
      'Swabbing Plans',
      'Trend Analysis Workbook',
      'AFIA Certificate of Completion',
    ],
    benefits: [
      'Ability to establish monitoring programmes',
      'Improved contamination control',
      'Enhanced audit readiness',
    ],
  },

  'Introduction to Quality Management Systems in Food Manufacturing': {
    targetAudience: [
      'Quality Assurance Officers',
      'Quality Managers',
      'Technical Managers',
      'Food Business Owners',
      'Compliance Officers',
      'Consultants',
    ],
    outcomes: [
      'Principles of Quality Management Systems',
      'ISO 9001 and food industry applications',
      'Document control systems',
      'Corrective and Preventive Actions (CAPA)',
      'Continuous improvement techniques',
      'Customer complaint management',
    ],
    whatYouReceive: [
      'AFIA Certificate of Completion',
      'QMS Templates and Forms',
      'CAPA Templates',
      'Internal Audit Checklist',
    ],
    benefits: [
      'Ability to manage food quality systems',
      'Improved audit performance',
      'Preparation for quality leadership roles',
    ],
  },

  'Food Product Development & Commercialisation (Concept to Market)': {
    targetAudience: [
      'Product Developers',
      'Food Technologists',
      'Entrepreneurs',
      'Research Scientists',
      'Production Managers',
      'Start-up Food Businesses',
    ],
    outcomes: [
      'Product development process',
      'Market research techniques',
      'Prototype development',
      'Product reformulation',
      'Product commercialisation',
      'Consumer sensory evaluation',
    ],
    whatYouReceive: [
      'Product Development Toolkit',
      'Product Launch Checklist',
      'Sensory Evaluation Templates',
      'AFIA Certificate of Completion',
    ],
    benefits: [
      'Ability to develop commercially viable products',
      'Enhanced innovation skills',
      'Improved product launch success',
    ],
  },

  'Food Packaging & Labelling Compliance (UK & International Standards)': {
    targetAudience: [
      'Packaging Technologists',
      'QA Personnel',
      'Production Managers',
      'Technical Managers',
      'Product Developers',
    ],
    outcomes: [
      'Packaging materials selection',
      'Packaging functions and performance',
      'Sustainable packaging solutions',
      'Packaging regulations',
      'Migration and food contact materials',
      'Packaging validation',
    ],
    whatYouReceive: [
      'Packaging Assessment Workbook',
      'Packaging Selection Guide',
      'AFIA Certificate of Completion',
    ],
    benefits: [
      'Better packaging decisions',
      'Reduced packaging failures',
      'Improved compliance knowledge',
    ],
  },

  'Food Product Registration & Regulatory Compliance (UK & Export)': {
    targetAudience: [
      'Technical Managers',
      'QA Officers',
      'Product Developers',
      'Food Business Owners',
      'Regulatory Affairs Personnel',
    ],
    outcomes: [
      'UK Food Information Regulations',
      "Natasha's Law requirements",
      'Nutrition labelling',
      'Allergen declaration',
      'Claims and marketing compliance',
      'Label verification',
    ],
    whatYouReceive: [
      'Label Compliance Toolkit',
      'Label Review Checklist',
      'AFIA Certificate of Completion',
    ],
    benefits: [
      'Improved regulatory compliance',
      'Reduced legal risks',
      'Better label approval capability',
    ],
  },

  'Root Cause Analysis & CAPA for Food Industry Compliance': {
    targetAudience: [
      'QA Teams',
      'Technical Managers',
      'Production Supervisors',
      'Auditors',
      'Compliance Officers',
    ],
    outcomes: [
      'Root cause analysis tools',
      'Fishbone diagram application',
      '5 Why methodology',
      'CAPA management',
      'Trend analysis',
      'Continuous improvement systems',
    ],
    whatYouReceive: [
      'RCA Toolkit',
      'CAPA Templates',
      'Investigation Forms',
      'AFIA Certificate of Completion',
    ],
    benefits: [
      'Better problem-solving skills',
      'Reduced recurring issues',
      'Stronger audit performance',
    ],
  },

  'Supplier Quality Management & Raw Material Assurance': {
    targetAudience: [
      'Procurement Teams',
      'Technical Managers',
      'QA Managers',
      'Supply Chain Professionals',
      'Food Business Owners',
    ],
    outcomes: [
      'Supplier risk assessment',
      'Supplier auditing',
      'Raw material specifications',
      'Supplier performance monitoring',
      'Supply chain food safety risks',
      'Approved supplier management',
    ],
    whatYouReceive: [
      'Supplier Audit Templates',
      'Risk Assessment Tools',
      'Supplier Approval Forms',
      'AFIA Certificate of Completion',
    ],
    benefits: [
      'Improved supplier management',
      'Reduced supply chain risks',
      'Better purchasing decisions',
    ],
  },

  'Food Fraud & Food Defence Management': {
    targetAudience: [
      'Technical Managers',
      'QA Personnel',
      'Food Business Owners',
      'Auditors',
      'Compliance Managers',
    ],
    outcomes: [
      'Food fraud vulnerability assessment',
      'TACCP principles',
      'VACCP principles',
      'Food defence strategies',
      'Supply chain security',
      'Threat mitigation planning',
    ],
    whatYouReceive: [
      'VACCP Template',
      'TACCP Template',
      'Risk Assessment Workbook',
      'AFIA Certificate of Completion',
    ],
    benefits: [
      'Enhanced food business protection',
      'Compliance with GFSI standards',
      'Reduced food fraud risks',
    ],
  },

  'Shelf-Life Testing & Product Stability for Food Products': {
    targetAudience: [
      'Food Technologists',
      'QA Managers',
      'Product Developers',
      'Microbiologists',
      'Technical Managers',
    ],
    outcomes: [
      'Shelf-life study design',
      'Microbiological validation',
      'Challenge testing',
      'Sensory evaluation',
      'Data interpretation',
      'Shelf-life documentation',
    ],
    whatYouReceive: [
      'Shelf-Life Study Templates',
      'Data Analysis Sheets',
      'AFIA Certificate of Completion',
    ],
    benefits: [
      'Improved product quality',
      'Better shelf-life decisions',
      'Enhanced technical competence',
    ],
  },

  'Lean Manufacturing & Continuous Improvement in Food Factories': {
    targetAudience: [
      'Supervisors',
      'Team Leaders',
      'Production Managers',
      'Operations Managers',
      'Factory Managers',
    ],
    outcomes: [
      'Lean manufacturing principles',
      'Waste identification and elimination',
      'Performance improvement tools',
      'Problem solving methodologies',
      'Operational excellence tools',
      'Team management for continuous improvement',
    ],
    whatYouReceive: [
      'Lean Toolkit',
      'Operational Excellence Workbook',
      'AFIA Certificate of Completion',
    ],
    benefits: [
      'Stronger operational leadership',
      'Improved team performance',
      'Career progression into management roles',
    ],
  },

  'ISO 9001: Quality Management Systems for Food Industry Compliance': {
    targetAudience: [
      'Quality Managers',
      'Technical Managers',
      'Management Representatives',
      'Internal Auditors',
      'QA Teams',
      'Consultants',
    ],
    outcomes: [
      'ISO 9001:2015 requirements',
      'Quality Management System implementation',
      'Risk-based thinking',
      'Process approach to quality',
      'Internal audit techniques',
      'Documentation and record control',
    ],
    whatYouReceive: [
      'ISO 9001 Implementation Guide',
      'QMS Templates',
      'Internal Audit Checklist',
      'AFIA Certificate of Completion',
    ],
    benefits: [
      'Ability to implement and maintain ISO 9001 QMS',
      'Improved operational consistency',
      'Greater market credibility and customer confidence',
    ],
  },

  'ISO 22000 Food Safety Management Systems': {
    targetAudience: [
      'Food Safety Managers',
      'Technical Managers',
      'Consultants',
      'Auditors',
      'QA Managers',
    ],
    outcomes: [
      'ISO 22000 requirements',
      'Risk-based thinking',
      'Food Safety Management System development',
      'Internal auditing',
      'Documentation systems',
      'Certification preparation',
    ],
    whatYouReceive: [
      'FSMS Templates',
      'ISO 22000 Checklist',
      'Internal Audit Forms',
      'AFIA Certificate of Completion',
    ],
    benefits: [
      'Ability to implement ISO 22000',
      'Improved compliance knowledge',
      'Greater employability in food industry',
    ],
  },

  'SALSA Implementation for Small Food Businesses': {
    targetAudience: [
      'Small Food Manufacturers',
      'Start-ups',
      'Food Entrepreneurs',
      'Technical Managers',
      'Business Owners',
    ],
    outcomes: [
      'SALSA standard requirements',
      'Documentation development',
      'Audit preparation',
      'Traceability systems',
      'Supplier approval',
      'HACCP integration',
    ],
    whatYouReceive: [
      'SALSA Readiness Toolkit',
      'Documentation Templates',
      'AFIA Certificate of Completion',
    ],
    benefits: [
      'Improved readiness for SALSA certification',
      'Enhanced business credibility',
      'Retailer approval opportunities',
    ],
  },

  'BRCGS Food Safety Fundamentals': {
    targetAudience: [
      'QA Personnel',
      'Technical Managers',
      'Factory Managers',
      'Auditors',
      'Food Safety Teams',
    ],
    outcomes: [
      'BRCGS Food Safety requirements',
      'Site standards',
      'HACCP expectations',
      'Documentation requirements',
      'Audit preparation',
      'Non-conformance management',
    ],
    whatYouReceive: [
      'BRCGS Readiness Toolkit',
      'Audit Checklist',
      'AFIA Certificate of Completion',
    ],
    benefits: [
      'Improved understanding of global standards',
      'Better retailer compliance',
      'Enhanced technical credibility',
    ],
  },

  'Microbiological Sampling & Testing for Food Safety Compliance': {
    targetAudience: [
      'Laboratory technicians',
      'QA Officers',
      'Food technologists',
      'Environmental monitoring teams',
      'Technical managers',
    ],
    outcomes: [
      'Sampling plan design',
      'Microbiological testing methods',
      'Interpretation of test results',
      'Regulatory microbiological limits',
      'Corrective action when limits are exceeded',
    ],
    benefits: [
      'Improved laboratory competence',
      'Better food safety decision-making',
      'Stronger audit and inspection readiness',
    ],
  },

  'Food Formulation & Ingredient Functionality': {
    targetAudience: [
      'Food technologists',
      'Product developers',
      'Research scientists',
      'Production managers',
      'Start-up food businesses',
    ],
    outcomes: [
      'Ingredient selection and functionality',
      'Recipe and formulation development',
      'Stability and texture optimisation',
      'Clean label formulation approaches',
      'Cost-effective ingredient substitution',
    ],
    benefits: [
      'Stronger product formulation skills',
      'Improved product consistency',
      'Ability to innovate with clean label trends',
    ],
  },

  'Sensory Evaluation & Consumer Testing for Food Products': {
    targetAudience: [
      'Product developers',
      'Food technologists',
      'QA staff',
      'Marketing teams',
      'Students',
    ],
    outcomes: [
      'Sensory evaluation methods',
      'Panel design and management',
      'Consumer testing techniques',
      'Data analysis and interpretation',
      'Product benchmarking',
    ],
    benefits: [
      'Better product decisions based on consumer insight',
      'Improved product launch success rates',
      'Stronger sensory evaluation capability',
    ],
  },

  'Quality Documentation, Traceability & Record Control Systems': {
    targetAudience: [
      'QA personnel',
      'Technical managers',
      'Compliance officers',
      'Food business owners',
      'Production supervisors',
    ],
    outcomes: [
      'Document control system design',
      'Traceability system implementation',
      'Record retention requirements',
      'Version control management',
      'Audit-ready documentation practices',
    ],
    benefits: [
      'Improved documentation standards',
      'Better audit performance',
      'Reduced compliance risk',
    ],
  },

  'Quality Control Techniques & In-Process Inspection in Food Production': {
    targetAudience: [
      'QA inspectors',
      'Production staff',
      'Supervisors',
      'Technical managers',
      'Quality teams',
    ],
    outcomes: [
      'In-process inspection methods',
      'Sampling and acceptance criteria',
      'Statistical quality control basics',
      'Non-conformance identification',
      'Inspection record management',
    ],
    benefits: [
      'Improved product quality at point of production',
      'Reduced defect rates',
      'Stronger compliance culture',
    ],
  },

  'Internal Quality Auditing (ISO & Food Manufacturing Systems)': {
    targetAudience: [
      'Internal auditors',
      'QA Managers',
      'Technical staff',
      'Management Representatives',
      'Compliance officers',
    ],
    outcomes: [
      'Audit planning and scheduling',
      'Audit techniques and questioning skills',
      'Non-conformance reporting',
      'CAPA follow-up',
      'Audit report writing',
    ],
    whatYouReceive: [
      'Audit Planning Templates',
      'Non-Conformance Forms',
      'CAPA Follow-up Templates',
      'AFIA Certificate of Completion',
    ],
    benefits: [
      'Qualified internal auditor competence',
      'Improved internal audit programme',
      'Better preparation for third-party audits',
    ],
  },

  'Statistical Process Control (SPC) for Food Manufacturing Efficiency': {
    targetAudience: [
      'Quality engineers',
      'Production managers',
      'Process engineers',
      'Technical managers',
      'Continuous improvement teams',
    ],
    outcomes: [
      'SPC principles and tools',
      'Control chart design and interpretation',
      'Process capability analysis',
      'Variation reduction techniques',
      'Data-driven decision making',
    ],
    benefits: [
      'Reduced process variation',
      'Improved product consistency',
      'Data-driven quality improvement capability',
    ],
  },

  'Non-Conformance Management & CAPA Systems for Food Compliance': {
    targetAudience: [
      'QA teams',
      'Technical managers',
      'Production supervisors',
      'Compliance officers',
      'Auditors',
    ],
    outcomes: [
      'Non-conformance identification and classification',
      'CAPA system management',
      'Root cause investigation',
      'Effectiveness verification',
      'Regulatory reporting requirements',
    ],
    whatYouReceive: [
      'NCR Templates',
      'CAPA Management Forms',
      'Effectiveness Verification Checklist',
      'AFIA Certificate of Completion',
    ],
    benefits: [
      'Reduced recurring non-conformances',
      'Improved audit performance',
      'Stronger compliance management system',
    ],
  },

  'Laboratory Quality Management Systems for Food Testing Labs': {
    targetAudience: [
      'Laboratory managers',
      'QA officers',
      'Food safety scientists',
      'Accreditation managers',
      'Technical directors',
    ],
    outcomes: [
      'ISO 17025 requirements',
      'Laboratory quality system development',
      'Method validation principles',
      'Measurement uncertainty',
      'Proficiency testing',
    ],
    whatYouReceive: [
      'Laboratory QMS Templates',
      'ISO 17025 Checklist',
      'AFIA Certificate of Completion',
    ],
    benefits: [
      'Ability to implement laboratory quality systems',
      'Improved accreditation readiness',
      'Enhanced scientific credibility',
    ],
  },

  'Product Stability, Packaging & Shelf-Life Interaction': {
    targetAudience: [
      'Product developers',
      'Packaging technologists',
      'Food technologists',
      'QA managers',
      'Technical managers',
    ],
    outcomes: [
      'Packaging-product interaction mechanisms',
      'Barrier properties of packaging materials',
      'Shelf-life prediction modelling',
      'Modified atmosphere packaging',
      'Migration and food contact compliance',
    ],
    benefits: [
      'Better packaging and shelf-life decisions',
      'Reduced packaging failures',
      'Improved product quality over shelf life',
    ],
  },

  'Scaling Food Production: From Pilot Plant to Factory': {
    targetAudience: [
      'Food technologists',
      'Process engineers',
      'Production managers',
      'Entrepreneurs',
      'R&D teams',
    ],
    outcomes: [
      'Scale-up principles and challenges',
      'Equipment selection for scale-up',
      'Process parameter translation',
      'Factory trial management',
      'Cost-efficiency at scale',
    ],
    benefits: [
      'Successful product commercialisation',
      'Reduced scale-up failures',
      'Stronger technical leadership in production',
    ],
  },

  'Introduction to Health, Safety & Environment (HSE) in Food Manufacturing': {
    targetAudience: [
      'Food manufacturing workers',
      'Supervisors',
      'New employees',
      'Line managers',
      'HSE officers',
    ],
    outcomes: [
      'Legal duties under health and safety law',
      'Common workplace hazards in food manufacturing',
      'Basic risk assessment principles',
      'Emergency procedures',
      'Environmental responsibilities',
    ],
    benefits: [
      'Improved personal safety awareness',
      'Reduced workplace accidents',
      'Compliance with legal health and safety duties',
    ],
  },

  'Workplace Hazard Identification & Risk Assessment (Food Industry)': {
    targetAudience: [
      'Supervisors',
      'Safety representatives',
      'Production managers',
      'HSE officers',
      'Team leaders',
    ],
    outcomes: [
      'Hazard identification techniques',
      'Risk assessment methodology',
      'Control measure selection',
      'Risk register management',
      'Review and monitoring of assessments',
    ],
    whatYouReceive: [
      'Risk Assessment Templates',
      'Hazard Identification Checklist',
      'AFIA Certificate of Completion',
    ],
    benefits: [
      'Reduced workplace incidents',
      'Legal compliance with risk assessment duties',
      'Safer working environment',
    ],
  },

  'Fire Safety & Emergency Response in Food Factories': {
    targetAudience: [
      'Factory managers',
      'Safety officers',
      'Supervisors',
      'Fire wardens',
      'Production managers',
    ],
    outcomes: [
      'Fire risk assessment',
      'Fire prevention measures',
      'Emergency evacuation procedures',
      'Fire warden responsibilities',
      'Business continuity planning',
    ],
    benefits: [
      'Improved fire safety management',
      'Legal compliance',
      'Reduced business risk from fire incidents',
    ],
  },

  'Occupational Health & Industrial Hygiene in Food Production': {
    targetAudience: [
      'Occupational health practitioners',
      'HSE managers',
      'Production managers',
      'HR professionals',
      'Factory supervisors',
    ],
    outcomes: [
      'Occupational health risk identification',
      'Exposure monitoring techniques',
      'Health surveillance requirements',
      'PPE selection and management',
      'Industrial hygiene programme development',
    ],
    benefits: [
      'Reduced occupational health risks',
      'Improved legal compliance',
      'Healthier, more productive workforce',
    ],
  },

  'Incident Investigation & Root Cause Analysis for Workplace Safety': {
    targetAudience: [
      'HSE officers',
      'Supervisors',
      'Managers',
      'Safety representatives',
      'HR teams',
    ],
    outcomes: [
      'Incident investigation methodology',
      'Evidence collection techniques',
      'Root cause analysis tools',
      'Corrective action planning',
      'Regulatory reporting requirements',
    ],
    whatYouReceive: [
      'Investigation Report Template',
      'RCA Toolkit',
      'AFIA Certificate of Completion',
    ],
    benefits: [
      'Reduced repeat incidents',
      'Improved safety culture',
      'Better legal compliance and reporting',
    ],
  },

  'Safe Machinery Operation & Lockout/Tagout Procedures': {
    targetAudience: [
      'Machine operators',
      'Maintenance technicians',
      'Production supervisors',
      'HSE officers',
      'Engineers',
    ],
    outcomes: [
      'Machinery safety hazards',
      'Safe operating procedures',
      'Lockout/Tagout (LOTO) procedures',
      'Permit to work systems',
      'Pre-operation machinery checks',
    ],
    benefits: [
      'Reduced machinery-related accidents',
      'Legal compliance',
      'Safer maintenance and production operations',
    ],
  },

  'Food Processing for Entrepreneurs: From Idea to Production': {
    targetAudience: [
      'Food entrepreneurs',
      'Start-up founders',
      'Small business owners',
      'Aspiring food manufacturers',
      'Students',
    ],
    outcomes: [
      'Food business idea validation',
      'Route to market planning',
      'Basic food processing knowledge',
      'Regulatory requirements for food businesses',
      'Setting up a compliant food production unit',
    ],
    benefits: [
      'Faster route to launching a food business',
      'Reduced regulatory risk',
      'Stronger foundation for food entrepreneurship',
    ],
  },

  'Small Food Factory Setup & Operational Management': {
    targetAudience: [
      'Food entrepreneurs',
      'Factory owners',
      'Operations managers',
      'Technical managers',
      'Business owners',
    ],
    outcomes: [
      'Factory planning and layout',
      'Equipment procurement',
      'Regulatory registration and compliance',
      'Staffing and operational management',
      'Food safety system setup',
    ],
    benefits: [
      'Compliant factory from day one',
      'Reduced setup errors and rework',
      'Stronger operational management capability',
    ],
  },

  'Food Manufacturing Business Planning & Costing': {
    targetAudience: [
      'Food entrepreneurs',
      'Business owners',
      'Operations managers',
      'Finance teams',
      'Start-up food businesses',
    ],
    outcomes: [
      'Business plan development',
      'Product costing and pricing',
      'Cash flow planning',
      'Funding and investment options',
      'Break-even analysis',
    ],
    whatYouReceive: [
      'Business Plan Template',
      'Product Costing Spreadsheet',
      'AFIA Certificate of Completion',
    ],
    benefits: [
      'Better financial planning for food businesses',
      'Improved investment readiness',
      'Stronger business decision-making',
    ],
  },

  // ── Courses 29–40 ─────────────────────────────────────────────────────────

  'Food Factory Utilities Management (Water, Steam, Compressed Air & Refrigeration)': {
    targetAudience: [
      'Engineers',
      'Maintenance Managers',
      'Factory Managers',
      'Technical Managers',
      'Utility Supervisors',
    ],
    outcomes: [
      'Food-grade utility requirements',
      'Water treatment systems',
      'Steam generation and distribution',
      'Compressed air quality management',
      'Refrigeration system operation',
      'Utility risk management',
    ],
    whatYouReceive: [
      'Utility Audit Checklist',
      'Utility Management Templates',
      'AFIA Certificate of Completion',
    ],
    benefits: [
      'Improved utility efficiency',
      'Reduced operational costs',
      'Better compliance management',
    ],
  },

  'Hygienic Zoning & Contamination Control': {
    targetAudience: [
      'QA Personnel',
      'Technical Managers',
      'Production Managers',
      'Factory Designers',
      'Food Safety Professionals',
    ],
    outcomes: [
      'Hygienic zoning principles',
      'High-care and high-risk management',
      'Personnel flow control',
      'Product flow design',
      'Cross-contamination prevention',
      'Environmental monitoring integration',
    ],
    whatYouReceive: [
      'Zoning Assessment Toolkit',
      'Factory Zoning Templates',
      'AFIA Certificate of Completion',
    ],
    benefits: [
      'Improved food safety performance',
      'Reduced contamination incidents',
      'Better audit outcomes',
    ],
  },

  'Cleaning Validation & Verification in Food Factories': {
    targetAudience: [
      'Hygiene Teams',
      'QA Personnel',
      'Technical Managers',
      'Production Managers',
      'Auditors',
    ],
    outcomes: [
      'Cleaning validation principles',
      'ATP verification methods',
      'Microbiological verification',
      'Cleaning programme design',
      'Trend analysis',
      'Corrective action management',
    ],
    whatYouReceive: [
      'Cleaning Validation Templates',
      'Verification Checklists',
      'AFIA Certificate of Completion',
    ],
    benefits: [
      'Improved hygiene effectiveness',
      'Better compliance performance',
      'Reduced contamination risks',
    ],
  },

  'Food Process Validation & Verification': {
    targetAudience: [
      'Food Technologists',
      'QA Managers',
      'Technical Managers',
      'Production Managers',
      'Researchers',
    ],
    outcomes: [
      'Process validation principles',
      'Verification activities',
      'Statistical process control',
      'Validation study design',
      'Documentation requirements',
      'Regulatory expectations',
    ],
    whatYouReceive: [
      'Validation Protocol Templates',
      'Verification Checklists',
      'AFIA Certificate of Completion',
    ],
    benefits: [
      'Strong validation expertise',
      'Better process control',
      'Enhanced technical competence',
    ],
  },

  'Environmental Monitoring Programme (EMP) Development': {
    targetAudience: [
      'Microbiologists',
      'QA Personnel',
      'Technical Managers',
      'Food Safety Teams',
      'Laboratory Personnel',
    ],
    outcomes: [
      'EMP design and implementation',
      'Risk-based sampling plans',
      'Indicator organism management',
      'Pathogen surveillance programmes',
      'Trend analysis',
      'Corrective action strategies',
    ],
    whatYouReceive: [
      'EMP Development Toolkit',
      'Sampling Templates',
      'AFIA Certificate of Completion',
    ],
    benefits: [
      'Improved factory hygiene control',
      'Better audit readiness',
      'Enhanced food safety assurance',
    ],
  },

  'Advanced Food Microbiology & Pathogen Control': {
    targetAudience: [
      'Microbiologists',
      'Laboratory Scientists',
      'Food Technologists',
      'Researchers',
      'QA Managers',
    ],
    outcomes: [
      'Foodborne pathogens',
      'Spoilage organisms',
      'Microbial ecology',
      'Pathogen control strategies',
      'Challenge testing',
      'Interpretation of microbiological data',
    ],
    whatYouReceive: [
      'Laboratory Reference Guide',
      'Pathogen Control Workbook',
      'AFIA Certificate of Completion',
    ],
    benefits: [
      'Specialist microbiology knowledge',
      'Enhanced laboratory capability',
      'Stronger food safety expertise',
    ],
  },

  'Laboratory Quality Management Systems (ISO 17025 Fundamentals)': {
    targetAudience: [
      'Laboratory Personnel',
      'Laboratory Managers',
      'Quality Officers',
      'Researchers',
      'Technical Managers',
    ],
    outcomes: [
      'ISO 17025 requirements',
      'Laboratory documentation systems',
      'Method validation',
      'Measurement uncertainty',
      'Internal auditing',
      'Quality control programmes',
    ],
    whatYouReceive: [
      'ISO 17025 Toolkit',
      'Laboratory Audit Checklist',
      'AFIA Certificate of Completion',
    ],
    benefits: [
      'Laboratory quality competence',
      'Improved accreditation readiness',
      'Career advancement opportunities',
    ],
  },

  'Food Safety Culture & Behavioural Change': {
    targetAudience: [
      'Senior Management',
      'Supervisors',
      'Team Leaders',
      'QA Personnel',
      'Food Safety Managers',
    ],
    outcomes: [
      'Food safety culture principles',
      'Behaviour-based food safety',
      'Leadership influence',
      'Employee engagement',
      'Culture assessment techniques',
      'Continuous improvement',
    ],
    whatYouReceive: [
      'Food Safety Culture Toolkit',
      'Assessment Templates',
      'AFIA Certificate of Completion',
    ],
    benefits: [
      'Stronger organisational food safety culture',
      'Improved employee compliance',
      'Better audit performance',
    ],
  },

  'Crisis Management & Food Recall Systems': {
    targetAudience: [
      'Technical Managers',
      'Food Safety Managers',
      'Quality Managers',
      'Business Owners',
      'Compliance Officers',
    ],
    outcomes: [
      'Crisis management planning',
      'Food recall procedures',
      'Traceability systems',
      'Incident investigation',
      'Regulatory communication',
      'Mock recall exercises',
    ],
    whatYouReceive: [
      'Recall Plan Template',
      'Crisis Management Toolkit',
      'AFIA Certificate of Completion',
    ],
    benefits: [
      'Improved emergency preparedness',
      'Reduced business risks',
      'Enhanced consumer protection',
    ],
  },

  'Food Business Start-Up & Compliance Management': {
    targetAudience: [
      'Food Entrepreneurs',
      'Restaurant Owners',
      'Catering Businesses',
      'Food Start-Ups',
      'Agrifood Entrepreneurs',
    ],
    outcomes: [
      'Business registration requirements',
      'Food safety compliance',
      'HACCP implementation',
      'Licensing requirements',
      'Food labelling basics',
      'Inspection readiness',
    ],
    whatYouReceive: [
      'Business Compliance Toolkit',
      'HACCP Starter Pack',
      'AFIA Certificate of Completion',
    ],
    benefits: [
      'Faster business setup',
      'Reduced compliance risks',
      'Stronger business foundation',
    ],
  },

  'Research Methods & Data Analysis for Food Scientists': {
    targetAudience: [
      'Researchers',
      'Postgraduate Students',
      'Food Scientists',
      'Laboratory Personnel',
      'Academic Staff',
    ],
    outcomes: [
      'Experimental design',
      'Research methodology',
      'Statistical analysis',
      'Data interpretation',
      'Scientific writing',
      'Research ethics',
    ],
    whatYouReceive: [
      'Research Workbook',
      'Statistical Analysis Templates',
      'AFIA Certificate of Completion',
    ],
    benefits: [
      'Improved research capability',
      'Better publication readiness',
      'Stronger analytical skills',
    ],
  },

  'Regenerative Agriculture & Nutrient-Dense Food Systems': {
    targetAudience: [
      'Farmers',
      'Agronomists',
      'Food Scientists',
      'Sustainability Managers',
      'Researchers',
      'Food Businesses',
    ],
    outcomes: [
      'Principles of regenerative agriculture',
      'Soil health management',
      'Nutrient density assessment',
      'Sustainable food systems',
      'Carbon-smart farming',
      'Future food production models',
    ],
    whatYouReceive: [
      'Regenerative Agriculture Toolkit',
      'Sustainability Assessment Guide',
      'AFIA Certificate of Completion',
    ],
    benefits: [
      'Expertise in emerging food systems',
      'Sustainability leadership skills',
      'Future-focused agrifood knowledge',
    ],
  },

  // ── Courses 46–50 ─────────────────────────────────────────────────────────

  'Food Factory Design & Construction Project Management': {
    targetAudience: [
      'Factory Owners',
      'Investors',
      'Engineers',
      'Consultants',
      'Construction Professionals',
    ],
    outcomes: [
      'Food factory construction requirements',
      'Project planning and budgeting',
      'Utility design considerations',
      'Regulatory compliance requirements',
      'Contractor management',
      'Factory commissioning',
    ],
    whatYouReceive: [
      'Project Planning Templates',
      'Factory Design Checklist',
      'Construction Audit Toolkit',
      'AFIA Certificate of Completion',
    ],
    benefits: [
      'Ability to manage factory projects',
      'Reduced construction errors',
      'Improved investment decisions',
    ],
  },

  'Advanced HACCP Verification, Validation & Troubleshooting': {
    targetAudience: [
      'HACCP Team Leaders',
      'Technical Managers',
      'Food Safety Managers',
      'Consultants',
      'Auditors',
    ],
    outcomes: [
      'Validation methodologies',
      'Verification programme development',
      'CCP effectiveness assessment',
      'HACCP troubleshooting techniques',
      'Audit preparation',
      'Regulatory expectations',
    ],
    whatYouReceive: [
      'Validation Templates',
      'Verification Checklists',
      'HACCP Review Toolkit',
      'AFIA Certificate of Completion',
    ],
    benefits: [
      'Advanced HACCP expertise',
      'Improved audit outcomes',
      'Enhanced leadership capability',
    ],
  },

  'Food Manufacturing Data Analysis & KPI Management': {
    targetAudience: [
      'Production Managers',
      'QA Managers',
      'Operations Managers',
      'Continuous Improvement Teams',
      'Supervisors',
    ],
    outcomes: [
      'KPI development',
      'Data collection systems',
      'Statistical process control',
      'Dashboard development',
      'Trend analysis',
      'Performance improvement techniques',
    ],
    whatYouReceive: [
      'KPI Dashboard Templates',
      'Excel Analysis Tools',
      'Improvement Action Plans',
      'AFIA Certificate of Completion',
    ],
    benefits: [
      'Data-driven decision making',
      'Improved operational performance',
      'Strong management capability',
    ],
  },

  'Lean Manufacturing & Continuous Improvement for Food Factories': {
    targetAudience: [
      'Production Managers',
      'Supervisors',
      'Operations Teams',
      'Factory Managers',
      'Continuous Improvement Professionals',
    ],
    outcomes: [
      'Lean manufacturing principles',
      'Waste identification',
      '5S implementation',
      'Kaizen techniques',
      'Root cause analysis',
      'Continuous improvement frameworks',
    ],
    whatYouReceive: [
      'Lean Toolkit',
      '5S Templates',
      'Improvement Project Workbook',
      'AFIA Certificate of Completion',
    ],
    benefits: [
      'Increased factory efficiency',
      'Reduced operational costs',
      'Improved leadership skills',
    ],
  },

  'Food Industry Technical Manager Development Programme': {
    targetAudience: [
      'Aspiring Technical Managers',
      'QA Supervisors',
      'QA Managers',
      'Food Safety Officers',
      'Compliance Professionals',
    ],
    outcomes: [
      'Technical department leadership',
      'Food safety governance',
      'Audit management',
      'Customer complaint management',
      'Team development',
      'Strategic quality management',
    ],
    whatYouReceive: [
      'Technical Manager Toolkit',
      'Leadership Workbook',
      'Audit Management Resources',
      'AFIA Certificate of Completion',
    ],
    benefits: [
      'Preparation for Technical Manager roles',
      'Leadership and management skills',
      'Enhanced career progression opportunities',
    ],
  },

  'Integrated Food Risk Management & Preventive Controls (HACCP • VACCP • TACCP • HARPC)': {
    targetAudience: [
      'Food Safety Managers',
      'Quality Assurance Managers',
      'HACCP Team Leaders',
      'Production Managers',
      'Factory Managers',
      'Food Technologists',
      'Food Scientists',
      'Regulatory Officers',
      'Internal Auditors',
      'Consultants',
      'Food Business Owners',
      'Export Managers',
      'Retail Technical Managers',
      'Government Food Inspectors',
    ],
    outcomes: [
      'HACCP (Hazard Analysis & Critical Control Points) implementation skills',
      'VACCP (Vulnerability Assessment & Critical Control Points) competence',
      'TACCP (Threat Assessment & Critical Control Points) capability',
      'HARPC (Hazard Analysis and Risk-Based Preventive Controls) application skills',
      'Ability to integrate multiple risk frameworks into a single food safety management system',
    ],
    whatYouReceive: [
      'Integrated Risk Management Toolkit',
      'HACCP/VACCP/TACCP/HARPC Templates',
      'Preventive Controls Workbook',
      'AFIA Certificate of Completion',
    ],
    benefits: [
      'Qualification for leadership roles in food safety and quality management',
      'Globally recognised risk management skills',
      'Mastery of international food safety and regulatory compliance requirements',
      'Consulting-level capability in risk assessment and preventive control implementation',
    ],
  },
};

function normalise(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();
}

export function getCourseDetails(title: string): CourseInfo | null {
  if (COURSE_DETAILS[title]) return COURSE_DETAILS[title];
  const normTitle = normalise(title);
  for (const [key, val] of Object.entries(COURSE_DETAILS)) {
    if (normalise(key) === normTitle) return val;
  }
  return null;
}
