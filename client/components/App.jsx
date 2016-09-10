import React from 'react';
import axios from 'axios';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      image: "http://blog.teamtreehouse.com/wp-content/uploads/2015/05/InternetSlowdown_Day.gif",
      annotation: ''
    };
  }

  componentDidMount() {
    this.updateImage();
    this.fetchTasks();
  }

  fetchTasks() {
    axios.get('http://localhost:4567/v1/task/annotation', {
      auth: {
        username: 'my_api_key'
      }
    })
    .then((res) => {
      console.log(res);
      if (res.data.length) {
        this.setState({ tasks: res.data, image: res.data[0].attachment });
      } else {
        this.setState({ image: 'http://actusperformance.com/wp-content/uploads/2015/06/ID-100288828_DONE.jpg' });
      }
      this.updateImage();
    });
  }

  updateImage() {
    $('.image_frame').remove();
    var labels = (this.state.tasks.length) ? this.state.tasks[0].objects_to_annotate : '[]'
    var that = this;
    
    var options = {
      url: this.state.image,
      onchange: function(annotation) {
        that.setState({
          annotation: JSON.stringify(annotation)
        });
      },
      input_method: 'select',
      labels: JSON.parse(labels)
    };
    
    var editor = new BBoxAnnotator(options);
  }

  handleSubmit(e) {
    // on submit, need to issue PUT request and update the task in db to completed (if value is not empty array)
    // then POST the callbackurl
    // unshift the array and if there are none left, GET more tasks from server
    e.preventDefault(e);
    console.log('handleSubmit called:', this.state.annotation);
    this.setState({
      annotation: '',
      image: this.state.tasks[1],
      tasks: this.state.tasks.slice(1)
    });
    this.updateImage();
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


  