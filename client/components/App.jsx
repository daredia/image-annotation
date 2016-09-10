import React from 'react';
import axios from 'axios';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: "http://blog.teamtreehouse.com/wp-content/uploads/2015/05/InternetSlowdown_Day.gif",
      annotation: ''
    };
  }

  componentDidMount() {
    axios.get('http://localhost:4567/v1/task/annotation', {
      auth: {
        username: 'my_api_key'
      }
    })
    .then((res) => {
      console.log(res);
      this.setState({ image: res.data[0].attachment })
      this.createAnnotator();
    });
  }

  createAnnotator() {
    $('.image_frame').remove();
    var that = this;
    var editor = new BBoxAnnotator({
      url: this.state.image,
      onchange: function(annotation) {
        that.setState({
          annotation: JSON.stringify(annotation)
        });
      },
      input_method: 'select',
      labels: ['girl', 'IE man']
    });
  }

  handleSubmit(e) {
    // on submit, need to issue PUT request and update the task in db to completed (if value is not empty array)
    // then POST the callbackurl
    // unshift the array and if there are none left, GET more tasks from server
    e.preventDefault(e);
    console.log('handleSubmit called:', this.state.annotation);
    this.setState({
      annotation: ''
    })
  }

  render() {
    return (
        <form onSubmit={this.handleSubmit.bind(this)} >
          <textarea 
            value={this.state.annotation}
            id="annotation_data"
            name="annotation" 
            rows="30" 
            cols="50" 
            readOnly>
          </textarea>
          <div>
            <input id="submit_button" type="submit" />
          </div>
        </form>
    );
  }
}


  