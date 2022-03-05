import React from 'react'


const AssessList = ({assessments}) =>
assessments.sort((a,b) => b.id - a.id)
.map(a => (
  <tr key={a.id}>
  <td className="p-name">{a.assessType}</td>
  <td className="p-comp">{a.document}</td>
  <td className="p-comp">{a.date}</td>
  <td className="p-comp">{a.account}</td>
</tr>
))

const Assessment = ({assessments}) => {

  return (
    <>
    <h3 className="orderTitle">Assessments</h3>
        <table className="table">
          <tr>
            <th>Assessment Type</th> 
            <th>Assessment (Document Icon here linked to assessment)</th>
            <th>Date / Time</th>
            <th>Added By User</th>
          </tr>
          <AssessList assessments={assessments} />
      </table>
    </>

  )
}

export default Assessment