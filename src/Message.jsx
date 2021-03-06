import React, {Component} from 'react';

class Message extends Component {



  render() {


    let regEx = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png)/g;
    // let regEx = /(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/g;

    let myArr = this.props.message.content.match(regEx);

    let originalMsg = this.props.message.content;

    let newMsg = originalMsg;

    let imgArr;


    if (myArr != null) {
      imgArr = myArr.map((imgLink) => {
        return (<img src={imgLink} className="url-pic" alt="chatty img" />)
         // return (<div dangerouslySetInnerHTML={{__html: <img src={imgLink} alt="chatty img" /> }} />)
      });


      myArr.forEach(function (imgUrl) {
        newMsg = originalMsg.replace(new RegExp(imgUrl, 'g'), "");
      });

      // This would be used to try to get an inline image replacement
      // myArr.forEach(function (imgUrl, i) {
      //   newMsg = originalMsg.replace(new RegExp(imgUrl, 'g'), imgArr[i]);
      // });

      // https://assets.marthastewart.com/styles/wmax-300/d33/vanilla-icecream-0611med107092des/vanilla-icecream-0611med107092des_vert.jpg
      // http://www.readersdigest.ca/wp-content/uploads/2015/11/gourmet-burger-1024x666.jpg

    }

    return (
      <React.Fragment>
        <div className="message">
          <span className="message-username">{this.props.message.username}</span>
          <span className="message-content">
          { newMsg }
          <br/>
          {imgArr}
          </span>
        </div>
      </React.Fragment>
    );

  }
}
export default Message;