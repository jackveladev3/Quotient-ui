import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import NavCrump from '../../../../components/NavCrump';
import { SETTINGS_TEAM_PATH, SETTINGS_PATH } from '../../../../constants/PathNames';
import { ToastErrorNotification } from '../../../../util';
import axios from '../../../../util/Api';

export const InviteForm = (props) => {
   const [firstName, setFirstName] = useState("");
   const [lastName, setLastName] = useState("");
   const [email, setEmail] = useState("");
   const [role, setRole] = useState(false);

   const onClickSend = () => {
      if (!email) {
         toast.success('Email address is a required field.');
         return;
      }
      if (!firstName || !lastName) {
         toast.success('You\'re missing some required information');
         return;
      }
      axios.post('/settings/team/invite', { firstName, lastName, email, role })
         .then(() => {
            toast.success('Invite has been sent.');
            props.history.push('/app/settings/team');
         })
         .catch(err => {
            const { errors } = err.response.data;
            ToastErrorNotification(errors);
         });
   }
   return (
      <React.Fragment>
         <NavCrump linkTo={SETTINGS_TEAM_PATH}>
            Team Members
         </NavCrump>
         <div className="content">
            <h1>Invite a New Team Member</h1>
            <div className="maxWidth-800">
               <p className="mb-4">
                  Simply enter the name and email address of your new Team&nbsp;Member.
                  <br />
                  They'll receive an email with an 'Accept Invite' link – where they can set their own password.
               </p>
               <div className="mb-5">
                  <div className="form-group row">
                     <div className="col-md-6 col-sm-12">
                        <label htmlFor="memberFirstName">First Name</label>
                        <input type="text" className="form-control mr-3" placeholder="First Name"
                           value={firstName}
                           onChange={(ev) => setFirstName(ev.target.value)} />
                     </div>
                     <div className="col-md-6 col-sm-12">
                        <label htmlFor="memberLastName">Last Name</label>
                        <input type="text" className="form-control" placeholder="Last Name"
                           value={lastName}
                           onChange={(ev) => setLastName(ev.target.value)} />
                     </div>
                  </div>
                  <div className="form-group row">
                     <div className="col-12">
                        <label htmlFor="memberEmailAddress">Email Address</label>
                        <input type="text" className="form-control mr-3" placeholder="Email Address"
                           value={email}
                           onChange={(ev) => setEmail(ev.target.value)} />
                     </div>
                  </div>
               </div>

               <div className="form-check mb-5">
                  <input className="form-check-input" type="checkbox" defaultValue id="invite_administrator" name="invite_administrator"
                     checked={role}
                     onChange={() => setRole(!role)}
                  />
                  <label className="form-check-label" htmlFor="invite_administrator">
                     Give Administrator Powers
                  <p className="text-secondary fa-xs">An administrator may invite, add and remove others</p>
                  </label>
               </div>
               <div className="mb-5">
                  <button className="btn btn-lg btn-rounded btn-hero-primary mr-1" onClick={onClickSend}>Send Invitation</button>
                  <Link className="btn btn-lg btn-rounded btn-hero-secondary" to={SETTINGS_TEAM_PATH}>Cancel</Link>
               </div>
            </div>
         </div>
      </React.Fragment>

   )
}

export default InviteForm