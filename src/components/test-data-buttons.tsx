import React from "react";

export default function TestDataButtons({
  setjd,
  setcv,
}: {
  setjd: (jd: string) => void;
  setcv: (cv: string) => void;
}) {
  const accountJD =
    "Job description Responsible for the daily accounting of a factory. Only immediate joiners should apply. Required Candidate profile Interested candidate may share their resume at 'career@gridcables.com' Role: Finance & Accounting - Other Industry Type: Electrical Equipment Department: Finance & Accounting Employment Type: Full Time, Permanent Role Category: Finance & Accounting - Other Education UG: B.Com in Commerce PG: Post Graduation Not Required Doctorate: Doctorate Not Required, Any Doctorate Key Skills gstaccounting";

  const acv =
    "Addalee Langston alangston@email.com (123) 456-7890 Richmond, VA LinkedIn Certified Public Accountant (CPA) with 7+ years of experience in public accounting and financial auditing. Looking for an opportunity in a fast growing company to build out best accounting practices and make accounting a competitive advantage within an organization like The Salvation Army. WORK EXPERIENCE Northrop Grumman - Accountant · Managed government and private foundation grants totaling over $18M annually · Worked closely with program management on budgets, programs, and financial reporting · Owned monthly analysis of GL reconciliation, and performed adjustments as needed · Led development and analysis of agency-wide budget to reach 27% more members YoY · Streamlined preparation and review of the GL through automation, saving 23 hours monthly Jefferson Lines - Accountant · Analyzed balance sheet accounts, and posted monthly journal entries, complying with GAAP · Performed monthly bank reconciliations and GL account analyses for assets worth $14M+ · Maintained cash basis financials used to generate partner K-1s · Owned maintenance and tracking of inter-company loan schedules to meet all deadlines Diversified Plastics - Junior Accountant Feb 2019 - current Minneapolis, MN Aug 2016 - Feb 2019 Minneapolis, MN · Ensured proper GL coding of expense reports for bank and credit card reconciliations August 2014 - August 2016 St. Cloud, MN · Recorded transactions in QuickBooks, and mailed invoices to customers 2 times per month · Maintained $300 in petty cash, and handled all bank deposits · Communicated with external parties to reconcile account problems within 48 hours EDUCATION Saint Cloud State University - Master of Business Administration , Accounting August 2014 - May 2016 St. Cloud, MN Capella University - Bachelor of Arts, Accounting August 2010 - May 2014 Minneapolis, MN SKILLS GAAP; GL accounting; QuickBooks; Excel ; Auditing; Tax accounting; Expense reporting CERTIFICATIONS · Certified Public Accountant (CPA)";

  const sdJD =
    "Job description Please read the Job description carefully and respond to all the questions. Failure to do so will automatically reject your application. The Role: Weblianz is hiring a skilled MERN Stack Developer. Requirements: · Must have at least 1+ years. relevant experience in MERN Stack development. · Backend development experience in NodeJS. Experience in writing Node JS Backend APIs and Microservices · Database experience in MongoDB, Mysql, MariaDB, PostgreSQL, Sequelize or similar ORM's. · Frontend development experience in React, Next.js · Experience in React Native is an added advantage · Good knowledge of Javascript, CSS ,SASS/ LESS, TailwindCSS, Bootstrap · Excellent communication in written and spoken English. · Self Starter and should be able to work independently with minimal supervision. Job Type: Full-time Pay: ₹120,000.00 - ₹360,000.00 per year Benefits: Work from home Schedule: Day shift Monday to Friday Tipe Lokasi: Remote Application Question(s): What is your current CTC ? What is your expected CTC ? What is your notice period ? Share your linkedin profile link Experience: Node.js: 1 year (Required) React: 1 year (Required) MySQL: 1 year (Required) total: 1 year (Required) MongoDB: 1 year (Required) Work Location: Remote";

  const sdCV =
    "Tasiana Ukura tukura@email.com (123) 456-7890 Seattle, WA WORK EXPERIENCE Fast - Senior Soware Engineer October 2016 - current LinkedIn Seattle, WA · Builtandmaintainedapplicationthatscaledto2Mdailyusers,communicatingwithcross-functional · teamsregardingproductanddesign · TransformedUIsusingReact,decreasingdebuggingtimeby62%andincreasingviewsby31% · Focusedonfront-enddevelopment,providingmentorshipandcoachingto6internseachsummer Oversaw a team of 4 to write scalable code for the e-commerce platform that increase payment protection by 15% Adaptiva - Soware Engineer May 2009 - October 2016 Seattle, WA · Developedcloud-basedtechnologieswithC++andJavatoassistFortune500companieswithscaling · contentdistributionby60%ormoreandincreasingtheirproductivityby40%ormore Teamed up with current clients to understand needs for improved functionality, and communicated with · engineersandclientstodevelopenhancementsthatboostedclientsatisfactionby27% · Manipulatedalgorithmstoalignwithmarketing,sales,andsolutions,improvingautomationby32% Drafted documentations delineating designs and specs for more than 20 projects Expedia Group - Soware Engineer Intern May 2008 - May 2009 Seattle, WA · Workedwith5otherinternsunderthesupervisionofseniorsoftwareengineerfullstackdevelopmentof · thee-commercesystem Received coaching and support from peers and senior software engineer, and gained practical experience · inusingJavaandPython · Studieddatastructurestorecommendchangesinalgorithms,whichboostedonlinesalesby6% Partnered with interns, using code composition to redesign a clean API that offered increased flexibility to to third parties, which generated a revenue increase of $1.5M EDUCATION University of Washington - B.S., Computer Science August 2004 - May 2008 Seattle, WA SKILLS Languages: Python, JavaScript, C++, Java; Frameworks: Django, NodeJS, React; Tools: jQuery, Unix, Git, Selenium; Databases: SQL (PostgreSQL, MySQL), NoSQL, AWS";

  return (
    <div className="grid grid-cols-2 gap-x-2">
      <div
        className="text-sm font-light cursor-pointer bg-gray-600 rounded-full mt-2 px-3 py-1"
        onClick={(_) => {
          setjd(accountJD);
        }}
      >
        Accountant Job Description
      </div>
      <div
        className="text-sm font-light cursor-pointer bg-gray-600 rounded-full mt-2 px-3 py-1"
        onClick={(_) => {
          setcv(acv);
        }}
      >
        Accountant Resume
      </div>
      <div
        className="text-sm font-light cursor-pointer bg-gray-600 rounded-full mt-2 px-3 py-1 "
        onClick={(_) => {
          setjd(sdJD);
        }}
      >
        Software Dev. Job Description
      </div>
      <div
        className="text-sm font-light cursor-pointer bg-gray-600 rounded-full mt-2 px-3 py-1 "
        onClick={(_) => {
          setcv(sdCV);
        }}
      >
        Software Dev.
      </div>
    </div>
  );
}
