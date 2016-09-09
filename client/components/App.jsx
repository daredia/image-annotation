import React from 'react';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    var editor = new BBoxAnnotator({
      url: "http://i.imgur.com/trsL3fU.jpg",
      onchange: function(annotation) {
        $("#annotation_data").val(JSON.stringify(annotation));
      }
    });

  }

  render() {
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


  