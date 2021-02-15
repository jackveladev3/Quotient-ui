import React, { Component, createRef } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { updateQuoteDiscussions } from '../../../../actions/Data';
import { checkIfTeamMember } from '../../../../util';
import CommentWrite from './CommentWrite';
import PrivateNoteWrite from './PrivateNoteWrite';
import QuestionWrite from './QuestionWrite';

class PublicQuoteDisscussionWrite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commentShow: false,
            privateNoteShow: false,
            questionSectionShow: false,
        };
    }
    onClickAskQuestion = () => {
        const isPreviewMode = this.props.match.path === "/q/:entoken/preview";
        if (isPreviewMode) {
            toast.warn("This is just a preview.");
            return;
        }
        this.setState({ questionSectionShow: true });
    }
    render() {
        const { quote, teamMembers } = this.props;
        const isMember = checkIfTeamMember(quote.author, teamMembers);
        const isPreviewMode = this.props.match.path === "/q/:entoken/preview";
        return (
            <div className="no_print u-section-2">
                <div className="discuss-wrap">
                    {
                        isMember && !isPreviewMode ?
                            <React.Fragment>
                                <div className={`discuss-button-wrap ${this.state.commentShow || this.state.privateNoteShow ? "isHidden" : ""}`}>
                                    {
                                        quote.status === "draft" ?
                                            null
                                            : <button className="btn btn-sm btn-dark font-size-sm px-2 py-1 mr-2" onClick={() => this.setState({ commentShow: true })}>Comment</button>
                                    }
                                    <button className="btn btn-sm btn-success font-size-sm px-2 py-1" onClick={() => this.setState({ privateNoteShow: true })}>Private Note</button>
                                </div>
                                <CommentWrite commentShow={this.state.commentShow} onClickCancel={() => this.setState({ commentShow: false, privateNoteShow: false })} />
                                <PrivateNoteWrite privateNoteShow={this.state.privateNoteShow} onClickCancel={() => this.setState({ commentShow: false, privateNoteShow: false })} />
                            </React.Fragment>
                            : <React.Fragment>
                                <div className={`discuss-button-wrap ${this.state.questionSectionShow ? "d-none" : ""}`}>
                                    <button className="btn btn-hero-lg btn-outline-primary mr-1 mb-3" onClick={this.onClickAskQuestion}>Ask a Question</button>
                                </div>
                                <QuestionWrite questionSectionShow={this.state.questionSectionShow} onClickCancel={() => this.setState({ questionSectionShow: false })} />
                            </React.Fragment>
                    }
                </div>
            </div>
        )
    }
}
const mapStateToProps = ({ mainData, teamSetting }) => {
    const { quote } = mainData;
    const { teamMembers } = teamSetting;
    return { quote, teamMembers };
}
const mapDispatchToProps = {
    updateQuoteDiscussions
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PublicQuoteDisscussionWrite))