import React from 'react';
import axios from 'axios';

const loadingImage = "http://blog.teamtreehouse.com/wp-content/uploads/2015/05/InternetSlowdown_Day.gif";
const doneImage = 'http://actusperformance.com/wp-content/uploads/2015/06/ID-100288828_DONE.jpg';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      image: loadingImage,
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
        this.setState({ image: doneImage });
      }
      this.updateImage();
    });
  }

  updateImage(image, tasks) {
    image = image || this.state.image;
    tasks = tasks || this.state.tasks;

    $('.image_frame').remove();
    let labels = (tasks.length) ? tasks[0].objects_to_annotate : '[]'
    let that = this;
    
    let options = {
      url: image,
      onchange: function(annotation) {
        that.setState({
          annotation: JSON.stringify(annotation)
        });
      },
      input_method: 'select',
      labels: JSON.parse(labels)
    };
    
    let editor = new BBoxAnnotator(options);
  }

  handleSubmit(e) {
    // on submit, need to issue PUT request and update the task in db to completed (if value is not empty array)
    // then POST the callbackurl
    // unshift the array and if there are none left, GET more tasks from server
    e.preventDefault(e);
    console.log('handleSubmit called:', this.state.annotation);
    let tasks = this.state.tasks.splice(1);
    let image;
    if (tasks.length) {
      image = tasks[0].attachment;

      this.setState({
        annotation: '',
        image: image,
        tasks: tasks
      });

      this.updateImage(image, tasks);
    } else {
      this.fetchTasks();
    }
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


  