import React from "react"

const PageFooter: React.FC = () => {
  return (
    <footer>
      <div className="qg-site-map row">
        <div>
          <h3>
            <a href="https://www.qld.gov.au/">Queensland Government</a>
            <button className="btn btn-link qg-toggle-icon-right collapsed visible-xs-inline-block" data-toggle="collapse" data-target="#footer-info-qg" aria-expanded="false" aria-controls="footer-info-qg"><span className="sr-only">More Queensland Government pages</span>&nbsp;</button>
          </h3>
          <ul className="collapse" id="footer-info-qg">
            <li><a href="https://www.qld.gov.au/about/contact-government/contacts/">Government contacts</a></li>
            <li><a href="https://www.qld.gov.au/about/contact-government/have-your-say/">Have your say</a></li>
            <li><a href="https://www.qld.gov.au/about/staying-informed/">Staying informed</a></li>
            <li><a href="https://www.qld.gov.au/about/government-jobs/">Government jobs</a></li>
            <li><a href="https://www.qld.gov.au/about/how-government-works/">How government works</a></li>
            <li><a href="https://data.qld.gov.au/">Queensland Government data</a></li>
            <li><a href="https://publications.qld.gov.au/">Queensland Government publications</a></li>
            <li><a href="https://www.forgov.qld.gov.au/PageFooter.tsx?utm_medium=website&utm_source=qgov-site&utm_campaign=dsiti-for-gov&utm_content=swe-footer">For government employees</a></li>
          </ul>
        </div>
        <div>
          <h3>
            <a href="https://www.qld.gov.au/queenslanders/">For Queenslanders</a>
            <button className="btn btn-link qg-toggle-icon-right collapsed visible-xs-inline-block" data-toggle="collapse" data-target="#footer-info-for-qld" aria-expanded="false" aria-controls="footer-info-qg"><span className="sr-only">More Queensland Government pages</span>&nbsp;</button>
          </h3>
          <ul className="col-2 collapse"  id="footer-info-for-qld">
            <li><a href="https://www.qld.gov.au/transport/">Transport and motoring</a></li>
            <li><a href="https://www.qld.gov.au/jobs/">Employment and jobs</a></li>
            <li><a href="https://www.qld.gov.au/housing/">Homes and housing</a></li>
            <li><a href="https://www.qld.gov.au/education/">Education and training</a></li>
            <li><a href="https://www.qld.gov.au/community/">Community support</a></li>
            <li><a href="https://www.qld.gov.au/health/">Health and wellbeing</a></li>
            <li><a href="https://www.qld.gov.au/emergency/">Emergency services and safety</a></li>
            <li><a href="https://www.qld.gov.au/about/">About Queensland and its government</a></li>
            <li><a href="https://www.qld.gov.au/families/">Parents and families</a></li>
            <li><a href="https://www.qld.gov.au/disability/">People with disability</a></li>
            <li><a href="https://www.qld.gov.au/seniors/">Seniors</a></li>
            <li><a href="https://www.qld.gov.au/atsi/">Aboriginal and Torres Strait Islander peoples</a></li>
            <li><a href="https://www.qld.gov.au/youth/">Youth</a></li>
            <li><a href="https://www.qld.gov.au/environment/">Environment, land and water</a></li>
            <li><a href="https://www.qld.gov.au/law/">Your rights, crime and the law</a></li>
            <li><a href="https://www.qld.gov.au/recreation/">Recreation, sport and arts</a></li>
          </ul>
        </div>
        <div>
          <h3>
            <a href="http://www.business.qld.gov.au/">Business and industry</a>
            <button className="btn btn-link qg-toggle-icon-right collapsed visible-xs-inline-block" data-toggle="collapse" data-target="#footer-info-bi" aria-expanded="false" aria-controls="footer-info-qg"><span className="sr-only">More Queensland Government pages</span>&nbsp;</button>
          </h3>
          <ul className="collapse" id="footer-info-bi">
            <li><a href="https://www.business.qld.gov.au/starting-business">Starting a business</a></li>
            <li><a href="https://www.business.qld.gov.au/running-business">Running a business</a></li>
            <li><a href="https://www.business.qld.gov.au/running-business/employing">Employing people</a></li>
            <li><a href="https://www.business.qld.gov.au/running-business/employing/payroll-tax">Payroll tax</a></li>
            <li><a href="https://www.business.qld.gov.au/industries">Industries</a></li>
            <li><a href="https://www.business.qld.gov.au/industries/invest">Investing in Queensland</a></li>
            <li><a href="https://www.business.qld.gov.au/industries/invest/chinese-s" lang="zh">昆士兰州的投资机会</a></li>
            <li><a href="https://www.business.qld.gov.au/industries/invest/chinese-t" lang="zh">昆士蘭州的投資機會</a></li>
            <li><a href="https://www.business.qld.gov.au/industries/invest/japanese" lang="ja">クイーンズランド州への投資機会</a></li>
            <li><a href="https://www.business.qld.gov.au/industries/invest/korean" lang="ko">퀸즈랜드 투자 기회</a></li>
            <li><a href="https://www.business.qld.gov.au/industries/invest/invertir-turismo" lang="sp">Oportunidades de inversión en Queensland</a></li>
          </ul>
        </div>
      </div>
      <div className="qg-legal row">
        <ul className="list-inline">
          <li><a href="https://www.qld.gov.au/contact-us/" className="no-print">Contact us</a></li>
          <li><a href="https://www.qld.gov.au/help/" className="no-print">Help</a></li>
          <li><a href="https://www.qld.gov.au/legal/copyright/">Copyright</a></li>
          <li><a href="https://www.qld.gov.au/legal/disclaimer/">Disclaimer</a></li>
          <li><a href="https://www.qld.gov.au/legal/privacy/">Privacy</a></li>
          <li><a href="https://www.qld.gov.au/right-to-information/">Right to information</a></li>
          <li><a href="https://www.qld.gov.au/help/accessibility/" className="no-print">Accessibility</a></li>
          <li><a href="http://www.smartjobs.qld.gov.au/" className="no-print">Jobs in Queensland Government</a></li>
          <li id="link-languages"><a href="https://www.qld.gov.au/languages/" className="no-print">Other languages</a></li>
        </ul>
        <p className="qg-copyright">&copy; The State of Queensland <span id="qg-copyright-owner"></span><span id="qg-copyright-daterange"></span></p>
        <p><a href="https://www.qld.gov.au/">Queensland Government</a></p>
      </div>
    </footer>
  );
};

export default PageFooter;