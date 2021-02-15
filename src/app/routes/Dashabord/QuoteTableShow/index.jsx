import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AcceptedSection from './AcceptedSection';
import AwaitingSection from './AwaitingSection';
import DeclinedSection from './DeclinedSection';
import DraftSection from './DraftSection';
import StarterTips from './StarterTips';

class QuoteTableShow extends Component {
   render() {
      const { quotes } = this.props;
      const draftQuotes = quotes.filter((it) => it.status === "draft");
      const awaitingQuotes = quotes.filter((it) => { return (it.status === "awaiting" || it.status === "editing") });
      const acceptedQuotes = quotes.filter((it) => it.status === "accepted");
      const declinedQuotes = quotes.filter((it) => it.status === "declined");

      if (!quotes.length) return (<div className="col-md-6"></div>);
      else return (
         <div className="col-md-6">
            <div className="mb-5">
               {/* Draft Section */}
               <DraftSection draftQuotes={draftQuotes} />
               {/* Awating Acceptance Section*/}
               <AwaitingSection awaitingQuotes={awaitingQuotes} />
               {/* Accepted Section */}
               <AcceptedSection acceptedQuotes={acceptedQuotes} />
               {/* Declined Section */}
               <DeclinedSection declinedQuotes={declinedQuotes} />
            </div>
            <StarterTips />
         </div>
      );
   }
}

export default QuoteTableShow;