import React from 'react';
import { ReactTinyDOM } from './renderer';

class App extends React.Component {

  render() {
    return (
      <div>
        <Text>Hi</Text>
      </div>
    );
  }
}

ReactTinyDOM.render(<HelloWorld />, document.querySelector('.root'));
