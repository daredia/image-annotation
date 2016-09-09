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
    .then((res) => console.log(res));
  }

  createAnnotator() {
    var editor = new BBoxAnnotator({
      url: this.state.image,
      onchange: function(annotation) {
        $("#annotation_data").val(JSON.stringify(annotation));
      },
      input_method: 'select',
      labels: ['girl', 'IE man']
    });
  }

  render() {
    this.createAnnotator();
    return (
      <div>
        <div>
          <textarea id="annotation_data" name="annotation" rows="30" cols="50" readOnly></textarea>
        </div>
        <div>
          <input id="reset_button" type="reset" />
        </div>
      </div>
    );
  }
}


  