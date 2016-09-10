import React from 'react';
import axios from 'axios';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: "http://blog.teamtreehouse.com/wp-content/uploads/2015/05/InternetSlowdown_Day.gif"
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
    });
  }

  createAnnotator() {
    $('.image_frame').remove();
    var editor = new BBoxAnnotator({
      url: this.state.image,
      onchange: function(annotation) {
        $("#annotation_data").val(JSON.stringify(annotation));
      },
      input_method: 'select',
      labels: ['girl', 'IE man']
    });
  }

  handleSubmit(e) {
    // on submit, need to issue PUT request and update the task in db
    e.preventDefault(e);
    console.log('handleSubmit called');

  }

  render() {
    this.createAnnotator();
    return (
        <form onSubmit={this.handleSubmit} >
          <textarea id="annotation_data" name="annotation" rows="30" cols="50" readOnly></textarea>
          <div>
            <input id="submit_button" type="submit" />
          </div>
        </form>
    );
  }
}


  