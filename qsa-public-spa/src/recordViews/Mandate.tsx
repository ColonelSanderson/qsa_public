import React, {useState} from 'react';
import {Redirect} from 'react-router';
import {Link, RouteComponentProps} from "react-router-dom";

import {Http} from "../utils/http";
import {AgencyResult} from "../models/AgencyResult";

import {
  dateArticleElement,
  noteArticleElement,
  /* basiclistElement, externalResourceArticleElement */
} from "../resultView/resultViewTemplates";
import Layout from "./Layout";
import {Note, RecordDisplay} from "../models/RecordDisplay";
import {
  iconForType,
  labelForMandateType,
  labelForType
} from "../utils/typeResolver";
import {AccordionPanel, MaybeLink, NoteDisplay, Relationship} from "./Helpers";
import {AdvancedSearchQuery} from "../models/AdvancedSearch";


const MandatePage: React.FC<any> = (route: any) => {
  const [currentMandate, setCurrentMandate] = useState<any | null>(null);
  const [notFoundRedirect, setNotFoundRedirect] = useState(false);
  const qsa_id: string = route.match.params.qsa_id;

  if (!currentMandate) {
    Http.get().fetchByQSAID(qsa_id, 'mandate')
      .then((json: any) => {
        if (json) {
          setCurrentMandate(new RecordDisplay(json))
        } else {
          setNotFoundRedirect(true);
        }
      })
      .catch((exception) => {
        console.error(exception);
        setNotFoundRedirect(true);
      });
  }

  if (notFoundRedirect) {
    return <Redirect to="/404" push={ true } />
  } else if (!currentMandate) {
    return <Layout footer={false}></Layout>;
  } else {
    route.setPageTitle(`Mandate: ${currentMandate.get('title')}`);

    const relatedQuery = AdvancedSearchQuery.emptyQuery().addStickyFilter('mandate_id', currentMandate.get('id'), currentMandate.get('title'));

    return (
      <Layout>
        <div className="row">
          <div className="col-sm-12">
            <h1>
              { currentMandate.get('title') }
              <div>
                <div className="badge">
                  <small>
                    <strong>
                      <i className={ iconForType('mandate') } aria-hidden="true"></i>&nbsp;{ labelForType('mandate') }
                    </strong>
                  </small>
                </div>
              </div>
            </h1>

            <section className="core-information">
              <h2 className="sr-only">Basic information</h2>
              <p className="lead">{ currentMandate.get('note') }</p>

              <ul className="list-group list-group-horizontal-md">
                <li className="list-group-item">
                  <span className="small">ID</span><br/>
                  { currentMandate.get('qsa_id_prefixed') }
                </li>
                <li className="list-group-item">
                  <span className="small">START DATE</span><br/>
                  {
                    currentMandate.getFirst('date', (date: any) => {
                      return date.begin && (`${date.begin}` + (date.certainty ? `(${date.certainty})`:''));
                    })
                  }
                </li>
                <li className="list-group-item">
                  <span className="small">END DATE</span><br/>
                  {
                    currentMandate.getFirst('date', (date: any) => {
                      return date.end && (`${date.end}` + (date.certainty_end ? `(${date.certainty_end})`:''));
                    })
                  }
                </li>
              </ul>

              {
                currentMandate.getFirst('date', (date: any) => {
                  return date.date_notes &&
                      <p className="footer small">Date notes: {date.date_notes}</p>;
                })
              }

              <h3 className="sr-only">Mandate descriptive metadata</h3>

              <ul className="list-group list-group-flush">
                {
                  currentMandate.getMaybe('mandate_type', (value: any) => {
                    return <li className="list-group-item list-group-item-action">
                      <div className="d-flex w-100 justify-content-between">
                        <h4 className="mb-1">Type</h4>
                      </div>
                      <p className="mb-1">{ labelForMandateType(value) }</p>
                    </li>
                  })
                }
                {
                  currentMandate.getMaybe('reference_number', (value: any) => {
                    return <li className="list-group-item list-group-item-action">
                      <div className="d-flex w-100 justify-content-between">
                        <h4 className="mb-1">Reference Number</h4>
                      </div>
                      <p className="mb-1">{ value }</p>
                    </li>
                  })
                }
              </ul>
            </section>

            <section>
              <h2>Relationships</h2>

              {
                <Link to={ `/search?` + relatedQuery.toQueryString() }
                      className="qg-btn btn-primary btn-sm">
                  Browse Related Series
                </Link>
              }


              { currentMandate.getArray('function_relationships').length > 0 && <h3>Related functions</h3> }
              <ul className="list-group list-group-flush">
                {
                  currentMandate.getArray('function_relationships').map((rlshp: any, idx: number) => {
                    return <li key={ idx } className="list-group-item">
                      { <Relationship relationship={ rlshp } /> }
                    </li>
                  })
                }
              </ul>

              { currentMandate.getArray('agent_relationships').length > 0 && <h3>Related agencies</h3> }
              <ul className="list-group list-group-flush">
                {
                  currentMandate.getArray('agent_relationships').map((rlshp: any, idx: number) => {
                    return <li key={ idx } className="list-group-item">
                      { <Relationship relationship={ rlshp } /> }
                    </li>
                  })
                }
              </ul>

              { currentMandate.getArray('mandate_relationships').length > 0 && <h3>Related mandates</h3> }
              <ul className="list-group list-group-flush">
                {
                  currentMandate.getArray('mandate_relationships').map((rlshp: any, idx: number) => {
                    return <li key={ idx } className="list-group-item">
                      { <Relationship relationship={ rlshp } /> }
                    </li>
                  })
                }
              </ul>
            </section>
          </div>
        </div>
      </Layout>
    );
  }
};

export default MandatePage;
