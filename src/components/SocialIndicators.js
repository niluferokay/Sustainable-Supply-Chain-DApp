import React from 'react'
import * as GiIcons from 'react-icons/gi';

const SocialIndicators = ({onAdd}) => {

  return (
    <>
    <div className="lca-container">
    <div className='lca-indicator'>
      <table className='lca-table'>
      <caption>Social Indicators</caption>
      <thead>
          <th>Categories</th>
          <th>Indicators</th>
          <th>Measurements</th>
          <th>Values</th>
          <th>Units</th>
      </thead>
      <tbody>
    <tr>
    <th rowspan='17'>Labor Practices</th>
    <th rowspan='2'>Employee training and development<GiIcons.GiElectric/></th>
      <th>Average training hours per employee per year</th>
      <td>trainh/trainemp</td>
      <td></td>
    </tr>
    <tr>
      <th>Percentage of employees trained per year</th>
      <td>trainemp*100/emp</td>
      <td>%</td>
    </tr>
    <tr>
    <th rowspan='1'>Employee turnover<GiIcons.GiElectric/></th>
      <th>Employee turnover per year</th>
      <td>resemp/hiredemp</td>
      <td></td>
    </tr>
    <tr>
    <th rowspan='2'>Full and part-time employees<GiIcons.GiElectric/></th>
      <th>Percentage of full-time employees</th>
      <td>fullemp*100/emp</td>
      <td>%</td>
    </tr>
    <tr>
      <th>Percentage part-time employees</th>
      <td>(emp-fullemp)*100</td>
      <td>%</td>
    </tr>
    <tr>
    <th rowspan='2'>Hours of work<GiIcons.GiElectric/></th>
      <th>Contractual working hours per employee per week</th>
      <td>workh/45</td>
      <td></td>
    </tr>
    <tr>
      <th>Overtime hours per employee per week</th>
      <td>overtimeh</td>
      <td></td>
    </tr>
    <tr>
    <th rowspan='2'>Fair wage<GiIcons.GiElectric/></th>
      <th>Percentage of employee wage to the minimum wage</th>
      <td>empwage*100/4250</td>
      <td>%</td>
    </tr>
    <tr>
      <th>Percentage of full-time employees earning below minimum wage</th>
      <td>minwage*100/emp</td>
      <td>%</td>
    </tr>
    <tr>
    <th rowspan='1'>Social benefits and security<GiIcons.GiElectric/></th>
      <th>Percentage of employees entitled for health insurance, parental leave, unemployment, disability and invalidity coverage, retirement provision</th>
      <td>insurance*100/emp</td>
      <td>%</td>
    </tr>
    <tr>
    <th rowspan='3'>Gender diversity<GiIcons.GiElectric/></th>
      <th>Wage diversity of genders</th>
      <td>femwage/malwage</td>
      <td></td>
    </tr>
    <tr>
      <th>Employee gender diversity</th>
      <td>fem/male</td>
      <td></td>
    </tr>
    <tr>
      <th>Percentage of female employees in board of directors and management positions</th>
      <td>femboard*100/empboard</td>
      <td>%</td>
    </tr>
    <tr>
    <th rowspan='3'>Diversity among the workforce<GiIcons.GiElectric/></th>
      <th>Percentage of disabled employees</th>
      <td>disabled*100/emp</td>
      <td>%</td>
    </tr>
    <tr>
      <th>Percentage of minority employees</th>
      <td>minority*100/emp</td>
      <td>%</td>
    </tr>
    <tr>
      <th>Percentage of employees with age over 65</th>
      <td>older*100/emp</td>
      <td>%</td>
    </tr>
    <tr>
    <th rowspan='1'>Social standards (SA8000, ISO26000)<GiIcons.GiElectric/></th>
      <th>Existence of external certifications regarding social standards</th>
      <td>socialstand</td>
      <td></td>
    </tr>
    <tr>
    <th rowspan='6'>Work Health and Safety</th>
    <th rowspan='5'>Occupational health and safety<GiIcons.GiElectric/></th>
      <th>Occupational health and safety compliance</th>
      <td>ilo</td>
      <td></td>
    </tr>
    <tr>
      <th>Existence of fire-fighting equipment and emergency exits </th>
      <td>fire</td>
      <td></td>
    </tr>
    <tr>
      <th>Provision of medical assistance and first aid </th>
      <td>medical</td>
      <td></td>
    </tr>
    <tr>
    <th>Access to drinking water and sanitation</th>
      <td>sanitation</td>
      <td></td>
    </tr>
    <tr>
    <th>Provision of protective gear</th>
      <td>gear</td>
      <td></td>
    </tr>
    <tr>
    <th rowspan='1'>Accidents<GiIcons.GiElectric/></th>
      <th>Work accidents per year</th>
      <td>workacc</td>
      <td></td>
    </tr>
    <tr>
    <th rowspan='7'>Human Rights</th>
    <th rowspan='2'>Freedom of association<GiIcons.GiElectric/></th>
      <th>Presence of unions within the organization</th>
      <td>union</td>
      <td></td>
    </tr>
    <tr>
      <th>Percentage of employees joined to labor unions</th>
      <td>empunion*100/emp</td>
      <td>%</td>
    </tr>
    <tr>
    <th rowspan='1'>Collective bargaining agreements<GiIcons.GiElectric/></th>
      <th>Percentage of employees covered by collective bargaining agreements</th>
      <td>bargain*100/emp</td>
      <td>%</td>
    </tr>
    <tr>
    <th rowspan='1'>Discrimination<GiIcons.GiElectric/></th>
      <th>Discrimination incidents</th>
      <td>discri</td>
      <td></td>
    </tr>
    <tr>
    <th rowspan='2'>Child and forced labor<GiIcons.GiElectric/></th>
      <th>Child labor </th>
      <td>child</td>
      <td></td>
    </tr>
    <tr>
      <th>Forced labor</th>
      <td>forced</td>
      <td></td>
    </tr>
    <tr>
    <th rowspan='1'>Rights of indigenous people<GiIcons.GiElectric/></th>
      <th>Violation of the rights of indigenous people</th>
      <td>indig</td>
      <td></td>
    </tr>
    <tr>
    <th rowspan='6'>Society</th>
    <th rowspan='1'>Job localization<GiIcons.GiElectric/></th>
      <th>Percentage of local employees</th>
      <td>localemp*100/emp</td>
      <td>%</td>
    </tr>
    <tr>
    <th rowspan='1'>Source localization<GiIcons.GiElectric/></th>
      <th>Percentage of local suppliers</th>
      <td>localsup*100/suppliers</td>
      <td>%</td>
    </tr>
    <tr>
    <th rowspan='1'>Community development<GiIcons.GiElectric/></th>
      <th>Percentage of charity donations to earnings per year</th>
      <td>donation*100/earning</td>
      <td>%</td>
    </tr>
    <tr>
    <th rowspan='1'>Anti-corruption<GiIcons.GiElectric/></th>
      <th>Corruption incidents</th>
      <td>corrup</td>
      <td></td>
    </tr>
    <tr>
    <th rowspan='1'>Anti-competitive behavior<GiIcons.GiElectric/></th>
      <th>Legal actions pending or completed regarding anti-competitive behavior</th>
      <td>anticomp</td>
      <td></td>
    </tr>
    <tr>
    <th rowspan='1'>Supplier sustainability assessment<GiIcons.GiElectric/></th>
      <th>Percentage of suppliers monitored on social sustainability</th>
      <td>socialsus*100/suppliers</td>
      <td>%</td>
    </tr>
    <tr>
    <th rowspan='5'>Customer Responsibility</th>
    <th rowspan='2'>Customer health and safety<GiIcons.GiElectric/></th>
      <th>Percentage of products and services for which health and safety impacts are assessed</th>
      <td>productassess*100/product</td>
      <td>%</td>
    </tr>
    <tr>
      <th>Health and safety incidents concerning products and services</th>
      <td>productincident</td>
      <td></td>
    </tr>
    <tr>
    <th rowspan='2'>Respect for privacy<GiIcons.GiElectric/></th>
      <th>Customer privacy complaints</th>
      <td>privacy</td>
      <td></td>
    </tr>
    <tr>
      <th>Leaks, thefts, or losses of customer data</th>
      <td>leaks</td>
      <td></td>
    </tr>
    <tr>
    <th rowspan='1'>Customer satisfaction<GiIcons.GiElectric/></th>
      <th>Customer complaints</th>
      <td>cuscomp</td>
      <td></td>
    </tr>
      </tbody>
      </table>
    </div>
    </div>
    </>
  )
}

export default SocialIndicators