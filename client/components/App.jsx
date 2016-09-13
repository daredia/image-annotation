import React from 'react';
import axios from 'axios';

const doneImage = 'http://actusperformance.com/wp-content/uploads/2015/06/ID-100288828_DONE.jpg';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      image: null,
      annotation: ''
    };
  }

  componentDidMount() {
    this.fetchTasks();
  }

  fetchTasks() {
    axios.get('http://localhost:4567/v1/task/annotation', {
      auth: {
        username: 'my_api_key'
      }
    })
    .then((res) => {
      let image = (res.data.length) ? res.data[0].attachment : doneImage;
      this.setState({ tasks: res.data, image: image });
      this.updateImage();
    })
    .catch((err) => console.log(err));
  }

  updateImage(image, tasks) {
    image = image || this.state.image;
    tasks = tasks || this.state.tasks;

    $('.image_frame').remove();
    let labels = (tasks.length) ? tasks[0].objects_to_annotate : '[]';
    let that = this;
    
    let options = {
      url: image,
      onchange: (annotation) => {
        that.setState({
          annotation: JSON.stringify(annotation)
        });
      }
    };

    if (tasks.length && tasks[0].with_labels) {
      options.input_method = 'select';
      options.labels = JSON.parse(labels);
    } else {
      options.input_method = 'fixed';
    }
    
    let editor = new BBoxAnnotator(options);
  }

  handleSubmit(e) {
    e.preventDefault(e);
    if (this.state.annotation && this.state.annotation !== '[]') {

      let url = 'http://localhost:4567/v1/task/annotation/';
      url += this.state.tasks[0]._id;

      axios.put(url, {
        annotation: this.state.annotation
      }, {
        auth: {
          username: 'my_api_key'
        }
      })
      .then((res) => {
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
          this.setState({ annotation: '' });
          this.fetchTasks();
        }
      })
      .catch((err) => console.log(err));
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)} >
        <p>{(this.state.tasks.length) ? 'Instructions: ' + this.state.tasks[0].instruction : 'You\'re done!' }</p>
        <p>{(this.state.tasks.length) ? 'Objects to annotate: ' + this.state.tasks[0].objects_to_annotate : 'Refresh the page to see any new tasks'}</p>
        <textarea 
          value={this.state.annotation}
          id="annotation_data"
          name="annotation" 
          rows="30" 
          cols="50" 
          readOnly>
        </textarea>
        <div><input id="submit_button" type="submit" /></div>
      </form>
    );
  }
}