import React, {useState, useEffect} from 'react';
import { Redirect } from 'react-router';
import { AdvancedSearchQuery } from '../models/AdvancedSearch';

const AspaceAdvancedSearch: React.FC<{advancedSearchQuery: AdvancedSearchQuery, limitedTo?: JSX.Element[] }> = (props) => {
  const [advancedSearchQuery, setAdvancedSearchQuery] = useState(props.advancedSearchQuery);
  const [needsRedirect, redirectForSearch] = useState('');

  /* const recordTypes: Array<string[]> = [
   *   [AspaceResultTypes.Agency, 'Agencies'],
   *   [AspaceResultTypes.Series, 'Series'],
   * ]; */

  const keywordTypes = [
    ['keywords', 'Keywords'],
    ['title', 'Title'],
    ['qsa_id_search','QSA ID'],
    ['previous_system_ids', 'Previous System ID'],
  ];

  const recordTypes = [
    ['resource', 'Series'],
    ['archival_object', 'Item'],
    ['agent_corporate_entity', 'Agency'],
    ['mandate','Mandate'],
    ['function','Function'],
  ];

  const onSubmit = (e: any) => {
    // Any filters are cleared when a new search fires
    redirectForSearch('/search?' + advancedSearchQuery.clearFilters().toQueryString());
  }

  if (needsRedirect) {
    return <Redirect to={ needsRedirect } push={ true }></Redirect>;
  } else {
    return (
      <div id="advancedSearchContainer" className="container">
        <form method="GET" onSubmit={ (e) => { e.preventDefault(); onSubmit(e) } }>
          <button style={{display: "none"}} aria-hidden="true"></button>
          {
            advancedSearchQuery.map((clause, idx) => (
              <div className="form-row" key={ clause.id }>
                <div className="form-group col-md-2">
                  { idx === 0 && <span className="form-control-plaintext text-right">Search for:</span>}
                  {
                  <select name="op[]"
                          className="form-control custom-select"
                          style={{display: (idx === 0) ? 'none' : 'block'}}
                          value={ clause.boolean_operator }
                          onChange={ (e) => setAdvancedSearchQuery(advancedSearchQuery.operatorChanged(e, idx)) }>
                    <option value="AND">AND</option>
                    <option value="OR">OR</option>
                    <option value="NOT">NOT</option>
                  </select>
                  }
                </div>

                <div className="form-group col-md-5">
                  <input type="text"
                         className="form-control"
                         name="q[]"
                         value={ clause.query }
                         onChange={ (e) => setAdvancedSearchQuery(advancedSearchQuery.queryChanged(e, idx)) }
                  >
                  </input>
                </div>

                <div className="form-group col-md-2">
                  <select name="f[]"
                          className="form-control"
                          value={ clause.target_field }
                          onChange={ (e) => setAdvancedSearchQuery(advancedSearchQuery.fieldChanged(e, idx)) }>
                    { keywordTypes.map(([value, label], idx) => (<option key={ value } value={ value }>{label}</option>)) }
                  </select>
                </div>

                <div className="form-group col-md-1">
                  <button className="qg-btn btn-default btn-sm" tabIndex={ 0 } onClick={ (e) => { e.preventDefault(); setAdvancedSearchQuery(advancedSearchQuery.addEmpty()) } }><i className="fa fa-plus"></i></button>
                </div>

                {idx > 0 &&
                 <div className="form-group col-md-1">
                   <button className="qg-btn btn-default btn-sm" tabIndex={ 0 } onClick={ (e) => { e.preventDefault(); setAdvancedSearchQuery(advancedSearchQuery.remove(idx)) } }><i className="fa fa-minus"></i></button>
                 </div>
                }
              </div>
            ))
          }
          <div className="form-group">
            <div><small>Limit to:</small></div>
            <div style={ {columns: 3} }>
              {
                recordTypes.map((recordType) => {
                  return <div key={ recordType[0] }>
                    <label>
                      <input onChange={(e) => setAdvancedSearchQuery(advancedSearchQuery.setType(recordType[0], e.target.checked))}
                             type="checkbox"
                             name="type[]"
                             value={ recordType[0] }
                             checked={ !!advancedSearchQuery.isTypeSelected(recordType[0]) }>
                      </input> { recordType[1] }
                     </label>
                   </div>
                })
              }
            </div>
          </div>
          <div className="form-group">
            <div className="form-inline">
              <div className="form-row">
                <div className="form-group">
                  <label>From&nbsp;&nbsp;
                    <input onChange={(e) => setAdvancedSearchQuery(advancedSearchQuery.setFromDate(e.target.value))}
                           className="form-control"
                           type="text"
                           name="from"
                           value={ advancedSearchQuery.getFromDate() || '' }>
                    </input>
                  </label>
                </div>
                <div className="form-group">
                  <label>&nbsp;&nbsp;to&nbsp;&nbsp;
                    <input onChange={(e) => setAdvancedSearchQuery(advancedSearchQuery.setToDate(e.target.value))}
                           className="form-control"
                           type="text"
                           name="to"
                           value={ advancedSearchQuery.getToDate() || '' }>
                    </input>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="form-row">
              <label>
                <input type="checkbox"
                       name="open"
                       checked={ !!advancedSearchQuery.isOpenRecordsOnly() }
                       onChange={(e) => setAdvancedSearchQuery(advancedSearchQuery.setOpenRecordsOnly(e.target.checked))}>
                </input> Open records only
              </label>
            </div>
            <div className="form-row">
              <label>
                <input type="checkbox"
                       name="has_digital"
                       checked={ !!advancedSearchQuery.hasDigitalObjects() }
                       onChange={(e) => setAdvancedSearchQuery(advancedSearchQuery.setHasDigitalObjects(e.target.checked))}>
                </input> Records with digital objects only
              </label>
            </div>
          </div>
          <div>
            <button className="qg-btn btn-primary">Submit</button>
            <small>{props.limitedTo && props.limitedTo}</small>
          </div>
        </form>
      </div>
    );
  }
};

export default AspaceAdvancedSearch;
